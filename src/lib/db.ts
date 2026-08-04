import { PGlite } from '@electric-sql/pglite';
import { MATERIAL_PRICES } from '@/data/kenya';

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS material_prices (
  id SERIAL PRIMARY KEY,
  material_name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  price_kes NUMERIC NOT NULL,
  county TEXT,
  source TEXT NOT NULL DEFAULT 'JengaCalc research',
  last_updated TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (to_char(now(), 'YYYY-MM-DD'))
);

CREATE TABLE IF NOT EXISTS user_price_submissions (
  id SERIAL PRIMARY KEY,
  material_name TEXT NOT NULL,
  county TEXT NOT NULL,
  town TEXT,
  price_kes NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  submitter_name TEXT,
  notes TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TEXT NOT NULL DEFAULT (to_char(now(), 'YYYY-MM-DD'))
);

CREATE TABLE IF NOT EXISTS build_cost_submissions (
  id SERIAL PRIMARY KEY,
  county TEXT NOT NULL,
  house_type TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  size_sqm NUMERIC NOT NULL,
  finish_tier TEXT NOT NULL,
  total_cost_kes NUMERIC NOT NULL,
  notes TEXT,
  submitter_name TEXT,
  created_at TEXT NOT NULL DEFAULT (to_char(now(), 'YYYY-MM-DD'))
);
`;

async function seedPrices(db: PGlite): Promise<void> {
  const result = await db.query<{ count: number }>(
    'SELECT COUNT(*) as count FROM material_prices'
  );
  if (result.rows.length > 0 && Number(result.rows[0].count) > 0) return;

  for (const p of MATERIAL_PRICES) {
    await db.query(
      `INSERT INTO material_prices (material_name, category, unit, price_kes, county, source, last_updated)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [p.materialName, p.category, p.unit, p.priceKes, p.county, p.source, p.lastUpdated]
    );
  }
}

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite('idb://jengacalc');
    await db.exec(SCHEMA_SQL);
    await seedPrices(db);
    dbInstance = db;
    return db;
  })();

  return initPromise;
}

export interface DbMaterialPrice {
  material_name: string;
  category: string;
  unit: string;
  price_kes: number;
  county: string | null;
  source: string;
  last_updated: string;
}

export async function fetchMaterialPrices(): Promise<DbMaterialPrice[]> {
  const db = await getDb();
  const result = await db.query<DbMaterialPrice>(
    'SELECT material_name, category, unit, price_kes, county, source, last_updated FROM material_prices ORDER BY category, price_kes'
  );
  return result.rows;
}

export async function submitPrice(data: {
  materialName: string;
  county: string;
  town?: string;
  priceKes: number;
  unit: string;
  submitterName?: string;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO user_price_submissions (material_name, county, town, price_kes, unit, submitter_name)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.materialName, data.county, data.town ?? null, data.priceKes, data.unit, data.submitterName ?? null]
  );
}

export async function submitBuildCost(data: {
  county: string;
  houseType: string;
  bedrooms: number;
  sizeSqm: number;
  finishTier: string;
  totalCostKes: number;
  submitterName?: string;
  notes?: string;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO build_cost_submissions (county, house_type, bedrooms, size_sqm, finish_tier, total_cost_kes, submitter_name, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [data.county, data.houseType, data.bedrooms, data.sizeSqm, data.finishTier, data.totalCostKes, data.submitterName ?? null, data.notes ?? null]
  );
}
