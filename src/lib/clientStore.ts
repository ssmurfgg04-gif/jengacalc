// Client-side data layer. Tries the server API first (durable, shared); falls
// back to localStorage so submissions still persist per-browser on hosts with
// no writable filesystem (e.g. serverless static deploys).

export interface BuildCostPayload {
  county: string;
  houseType: string;
  bedrooms: number;
  sizeSqm: number;
  finishTier: string;
  totalCostKes: number;
  submitterName?: string;
  notes?: string;
}

export interface PricePayload {
  materialName: string;
  county: string;
  town?: string;
  priceKes: number;
  unit: string;
  submitterName?: string;
}

const LS_BUILD = 'jengacalc.buildCosts';
const LS_PRICE = 'jengacalc.prices';

function readLs<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLs<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // storage full or unavailable — ignore
  }
}

export async function submitBuildCost(data: BuildCostPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/build-cost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) return true;
    throw new Error('server rejected');
  } catch {
    // Fallback: persist locally.
    const record = { ...data, createdAt: new Date().toISOString() };
    writeLs(LS_BUILD, [...readLs<typeof record>(LS_BUILD), record]);
    return true;
  }
}

export async function submitPrice(data: PricePayload): Promise<boolean> {
  try {
    const res = await fetch('/api/price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) return true;
    throw new Error('server rejected');
  } catch {
    const record = { ...data, approved: false, createdAt: new Date().toISOString() };
    writeLs(LS_PRICE, [...readLs<typeof record>(LS_PRICE), record]);
    return true;
  }
}

export interface RecentBuildCost {
  county: string;
  houseType: string;
  bedrooms: number;
  sizeSqm: number;
  finishTier: string;
  totalCostKes: number;
  notes?: string;
  createdAt: string;
}

export async function fetchRecentBuildCosts(): Promise<{ total: number; submissions: RecentBuildCost[] }> {
  try {
    const res = await fetch('/api/build-cost');
    if (res.ok) {
      const data = await res.json();
      return { total: data.total ?? 0, submissions: data.submissions ?? [] };
    }
    throw new Error('server unavailable');
  } catch {
    const ls = readLs<RecentBuildCost>(LS_BUILD);
    return { total: ls.length, submissions: ls.slice(-20).reverse() };
  }
}

export function exportBuildCostsCsv(): void {
  if (typeof window === 'undefined') return;
  fetch('/api/build-cost?format=csv')
    .then((r) => {
      if (!r.ok) throw new Error('no server');
      return r.text();
    })
    .then((csv) => download(csv, 'jengacalc-build-costs.csv'))
    .catch(() => {
      // Fallback: build CSV from localStorage.
      const rows = readLs<RecentBuildCost>(LS_BUILD);
      const header = 'County,House Type,Bedrooms,Size (sqm),Finish Tier,Total Cost (KES),Notes,Created At';
      const body = rows
        .map((r) =>
          [r.county, r.houseType, r.bedrooms, r.sizeSqm, r.finishTier, r.totalCostKes, r.notes ?? '', r.createdAt]
            .map((c) => `"${String(c).replace(/"/g, '""')}"`)
            .join(','),
        )
        .join('\n');
      download(`${header}\n${body}`, 'jengacalc-build-costs.csv');
    });
}

function download(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
