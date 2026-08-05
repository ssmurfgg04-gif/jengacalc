import('/_pagefind/pagefind.js')
  .then((mod) => {
    window.__pagefindApi = mod;
    window.__pagefindLoaded = true;
    window.dispatchEvent(new Event('pagefind-ready'));
  })
  .catch((err) => {
    console.error('Pagefind bootstrap failed', err);
    window.dispatchEvent(new Event('pagefind-error'));
  });