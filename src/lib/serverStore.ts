// Server-only JSON file store.
// Persists submissions to a single JSON file on disk so that real build-cost
// and price submissions survive reloads and are shared across all visitors
// when the site is served from a long-running Node process (astro dev, astro
// preview, or any Node host).
//
// NOTE: On purely static hosts with ephemeral filesystems (e.g. Netlify/Vercel
// serverless), file writes do not persist across invocations. For that case the
// client also mirrors submissions to localStorage (see @/lib/clientStore).
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface BuildCostRecord {
  id: string;
  county: string;
  houseType: string;
  bedrooms: number;
  sizeSqm: number;
  finishTier: string;
  totalCostKes: number;
  notes?: string;
  submitterName?: string;
  createdAt: string;
}

interface PriceRecord {
  id: string;
  materialName: string;
  county: string;
  town?: string;
  priceKes: number;
  unit: string;
  submitterName?: string;
  approved: boolean;
  createdAt: string;
}

interface StoreData {
  buildCosts: BuildCostRecord[];
  prices: PriceRecord[];
}

// Anchor the data directory at the project root (process.cwd()), which is the
// working directory for `astro dev`, `astro build`, and the standalone Node
// server when started from the project root. Resolving via import.meta.url
// would point into dist/ after bundling and get wiped on every build.
const DATA_DIR = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'jengacalc-submissions.json');

function emptyData(): StoreData {
  return { buildCosts: [], prices: [] };
}

function read(): StoreData {
  try {
    if (!existsSync(DATA_FILE)) return emptyData();
    const raw = readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    return {
      buildCosts: Array.isArray(parsed.buildCosts) ? parsed.buildCosts : [],
      prices: Array.isArray(parsed.prices) ? parsed.prices : [],
    };
  } catch {
    return emptyData();
  }
}

function write(data: StoreData): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Storage unavailable (read-only FS / serverless) — swallow, client mirrors.
  }
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function listBuildCosts(limit = 100): BuildCostRecord[] {
  return read().buildCosts.slice(-limit).reverse();
}

export function countBuildCosts(): number {
  return read().buildCosts.length;
}

export function addBuildCost(data: Omit<BuildCostRecord, 'id' | 'createdAt'>): BuildCostRecord {
  const store = read();
  const record: BuildCostRecord = { ...data, id: uid(), createdAt: new Date().toISOString() };
  store.buildCosts.push(record);
  write(store);
  return record;
}

export function listPrices(limit = 100): PriceRecord[] {
  return read().prices.filter((p) => p.approved).slice(-limit).reverse();
}

export function addPrice(data: Omit<PriceRecord, 'id' | 'createdAt' | 'approved'>): PriceRecord {
  const store = read();
  const record: PriceRecord = { ...data, id: uid(), approved: false, createdAt: new Date().toISOString() };
  store.prices.push(record);
  write(store);
  return record;
}

export function buildCostsCsv(): string {
  const rows = read().buildCosts;
  const header = 'County,House Type,Bedrooms,Size (sqm),Finish Tier,Total Cost (KES),Notes,Created At';
  const body = rows
    .map((r) =>
      [r.county, r.houseType, r.bedrooms, r.sizeSqm, r.finishTier, r.totalCostKes, (r.notes ?? '').replace(/,/g, ' '), r.createdAt]
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(','),
    )
    .join('\n');
  return `${header}\n${body}`;
}
