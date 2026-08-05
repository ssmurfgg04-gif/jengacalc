import { useState, useEffect, useRef, useCallback } from 'react';

interface PagefindResult {
  url: string;
  meta: { title?: string };
  excerpt?: string;
}

interface PagefindDoc {
  id: string;
  data: () => Promise<{ url: string; meta: { title: string }; excerpt: string }>;
}

interface PagefindApi {
  search: (q: string) => Promise<{ results: PagefindDoc[] }>;
}

interface PagefindWindow extends Window {
  __pagefindApi?: PagefindApi;
}

// Lazily-loaded singleton so the search UI only fetches Pagefind's JS/WASM
// once, and only after the user actually opens search. The module is loaded
// by `/pagefind-bootstrap.js` (a static file injected as a classic <script>),
// which keeps the absolute URL out of Vite's static analysis.
let pagefindPromise: Promise<PagefindApi> | null = null;

function loadPagefind(): Promise<PagefindApi> {
  if (!pagefindPromise) {
    pagefindPromise = new Promise<PagefindApi>((resolve, reject) => {
      const w = window as PagefindWindow;
      if (w.__pagefindApi) {
        resolve(w.__pagefindApi);
        return;
      }
      const onReady = () => {
        if (w.__pagefindApi) {
          cleanup();
          resolve(w.__pagefindApi);
        }
      };
      const onError = () => {
        cleanup();
        reject(new Error('Pagefind failed to load'));
      };
      const cleanup = () => {
        window.removeEventListener('pagefind-ready', onReady);
        window.removeEventListener('pagefind-error', onError);
      };
      window.addEventListener('pagefind-ready', onReady);
      window.addEventListener('pagefind-error', onError);
      if (document.querySelector('script[data-pagefind-bootstrap]')) return;
      const s = document.createElement('script');
      s.src = '/pagefind-bootstrap.js';
      s.async = true;
      s.dataset.pagefindBootstrap = 'true';
      s.onerror = onError;
      document.head.appendChild(s);
    });
  }
  return pagefindPromise;
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const pagefind = await loadPagefind();
      const { results: found } = await pagefind.search(q);
      const mapped = await Promise.all(
        found.slice(0, 8).map(async (r) => {
          const d = await r.data();
          return { url: d.url, meta: { title: d.meta.title }, excerpt: d.excerpt };
        }),
      );
      setResults(mapped);
    } catch {
      setUnavailable(true);
    }
    setSearching(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!open) return;
    timerRef.current = setTimeout(() => runSearch(query), 250);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, open, runSearch]);

  const openSearch = () => {
    setUnavailable(false);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-600 transition-colors hover:border-ink-400 hover:text-ink-900"
        aria-label="Search the site"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-900/60 p-4 pt-[10vh]"
          onClick={() => setOpen(false)}
          data-pagefind-ignore
        >
          <div
            className="w-full max-w-xl animate-fade-in rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="flex items-center gap-3 border-b border-ink-100 px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-ink-400">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators, guides, prices, counties…"
                aria-label="Search query"
                className="w-full bg-transparent py-4 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 text-xs font-medium text-ink-400 hover:text-ink-600"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {unavailable ? (
                <p className="px-4 py-8 text-center text-sm text-ink-400">
                  Search isn't available here yet — try it on the live site.
                </p>
              ) : searching ? (
                <p className="px-4 py-8 text-center text-sm text-ink-400">Searching…</p>
              ) : query.trim() && results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-ink-400">
                  No results for &ldquo;{query}&rdquo;.
                </p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-3 transition-colors hover:bg-ink-50"
                      >
                        <p className="text-sm font-semibold text-ink-800">{r.meta.title}</p>
                        {r.excerpt && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500 [&_mark]:bg-clay-100 [&_mark]:text-clay-800" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
