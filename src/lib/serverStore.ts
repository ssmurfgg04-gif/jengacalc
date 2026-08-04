// Durable persistence for JengaCalc submissions.
//
// In production (Netlify), data is stored in Netlify Blobs — a durable,
// free key-value store that persists across serverless invocations.
// In local dev (where the Netlify runtime is absent), we fall back to a
// JSON file on disk so the same code paths work everywhere.

import { getStore } from '@netlify/blobs';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const IS_NETLIFY = Boolean(process.env.NETLIFY);

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

interface OrderRecord {
  id: string;
  email: string;
  phone: string;
  county: string;
  houseType: string;
  bedrooms: number;
  sizeSqm: number;
  finishTier: string;
  priceKes: number;
  currency: string;
  createdAt: string;
}

interface StoreData {
  buildCosts: BuildCostRecord[];
  prices: PriceRecord[];
  orders: OrderRecord[];
}

const BLOB_KEY = 'data';

function emptyData(): StoreData {
  return { buildCosts: [], prices: [], orders: [] };
}

function normalize(raw: Partial<StoreData>): StoreData {
  return {
    buildCosts: Array.isArray(raw.buildCosts) ? raw.buildCosts : [],
    prices: Array.isArray(raw.prices) ? raw.prices : [],
    orders: Array.isArray(raw.orders) ? raw.orders : [],
  };
}

// ---- Local file backend (dev) ----
const DATA_DIR = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'jengacalc-submissions.json');

function readFile(): StoreData {
  try {
    if (!existsSync(DATA_FILE)) return emptyData();
    return normalize(JSON.parse(readFileSync(DATA_FILE, 'utf-8')));
  } catch {
    return emptyData();
  }
}

function writeFile(data: StoreData): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Ignore — durable storage unavailable.
  }
}

// ---- Netlify Blobs backend (prod) ----
function blobStore() {
  return getStore({ name: 'jengacalc' });
}

async function readBlob(): Promise<StoreData> {
  try {
    const raw = await blobStore().get(BLOB_KEY);
    if (raw === null) return emptyData();
    const text = typeof raw === 'string' ? raw : new TextDecoder().decode(raw);
    return normalize(JSON.parse(text));
  } catch {
    return emptyData();
  }
}

async function writeBlob(data: StoreData): Promise<void> {
  await blobStore().set(BLOB_KEY, JSON.stringify(data));
}

async function read(): Promise<StoreData> {
  return IS_NETLIFY ? readBlob() : readFile();
}

async function write(data: StoreData): Promise<void> {
  if (IS_NETLIFY) await writeBlob(data);
  else writeFile(data);
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function listBuildCosts(limit = 100): Promise<BuildCostRecord[]> {
  return (await read()).buildCosts.slice(-limit).reverse();
}

export async function countBuildCosts(): Promise<number> {
  return (await read()).buildCosts.length;
}

export async function addBuildCost(data: Omit<BuildCostRecord, 'id' | 'createdAt'>): Promise<BuildCostRecord> {
  const store = await read();
  const record: BuildCostRecord = { ...data, id: uid(), createdAt: new Date().toISOString() };
  store.buildCosts.push(record);
  await write(store);
  return record;
}

export async function listPrices(limit = 100): Promise<PriceRecord[]> {
  return (await read()).prices.filter((p) => p.approved).slice(-limit).reverse();
}

export async function addPrice(data: Omit<PriceRecord, 'id' | 'createdAt' | 'approved'>): Promise<PriceRecord> {
  const store = await read();
  const record: PriceRecord = { ...data, id: uid(), approved: false, createdAt: new Date().toISOString() };
  store.prices.push(record);
  await write(store);
  return record;
}

export async function addOrder(data: Omit<OrderRecord, 'id' | 'createdAt'>): Promise<OrderRecord> {
  const store = await read();
  const record: OrderRecord = { ...data, id: uid(), createdAt: new Date().toISOString() };
  store.orders.push(record);
  await write(store);
  return record;
}

export async function countOrders(): Promise<number> {
  return (await read()).orders.length;
}

export async function buildCostsCsv(): Promise<string> {
  const rows = (await read()).buildCosts;
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
