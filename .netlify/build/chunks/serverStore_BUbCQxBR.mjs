import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "jengacalc-submissions.json");
function emptyData() {
  return { buildCosts: [], prices: [] };
}
function read() {
  try {
    if (!existsSync(DATA_FILE)) return emptyData();
    const raw = readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      buildCosts: Array.isArray(parsed.buildCosts) ? parsed.buildCosts : [],
      prices: Array.isArray(parsed.prices) ? parsed.prices : []
    };
  } catch {
    return emptyData();
  }
}
function write(data) {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
  }
}
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function listBuildCosts(limit = 100) {
  return read().buildCosts.slice(-limit).reverse();
}
function countBuildCosts() {
  return read().buildCosts.length;
}
function addBuildCost(data) {
  const store = read();
  const record = { ...data, id: uid(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  store.buildCosts.push(record);
  write(store);
  return record;
}
function listPrices(limit = 100) {
  return read().prices.filter((p) => p.approved).slice(-limit).reverse();
}
function addPrice(data) {
  const store = read();
  const record = { ...data, id: uid(), approved: false, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  store.prices.push(record);
  write(store);
  return record;
}
function buildCostsCsv() {
  const rows = read().buildCosts;
  const header = "County,House Type,Bedrooms,Size (sqm),Finish Tier,Total Cost (KES),Notes,Created At";
  const body = rows.map(
    (r) => [r.county, r.houseType, r.bedrooms, r.sizeSqm, r.finishTier, r.totalCostKes, (r.notes ?? "").replace(/,/g, " "), r.createdAt].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
  ).join("\n");
  return `${header}
${body}`;
}

export { addBuildCost as a, buildCostsCsv as b, countBuildCosts as c, addPrice as d, listPrices as e, listBuildCosts as l };
