import { a as addBuildCost, c as countBuildCosts, b as buildCostsCsv, l as listBuildCosts } from '../../chunks/serverStore_BUbCQxBR.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function bad(msg) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
}
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON body.");
  }
  const county = String(body.county ?? "").trim();
  const houseType = String(body.houseType ?? "").trim();
  const bedrooms = Number(body.bedrooms);
  const sizeSqm = Number(body.sizeSqm);
  const finishTier = String(body.finishTier ?? "").trim();
  const totalCostKes = Number(body.totalCostKes);
  if (!county || !houseType || !finishTier) return bad("County, house type, and finish level are required.");
  if (!Number.isFinite(bedrooms) || bedrooms < 1 || bedrooms > 20) return bad("Bedrooms must be between 1 and 20.");
  if (!Number.isFinite(sizeSqm) || sizeSqm < 10 || sizeSqm > 2e3) return bad("Floor area must be between 10 and 2000 sqm.");
  if (!Number.isFinite(totalCostKes) || totalCostKes < 1e4 || totalCostKes > 2e9)
    return bad("Total cost must be a valid positive number.");
  const record = addBuildCost({
    county,
    houseType,
    bedrooms,
    sizeSqm,
    finishTier,
    totalCostKes,
    notes: body.notes ? String(body.notes).slice(0, 500) : void 0,
    submitterName: body.submitterName ? String(body.submitterName).slice(0, 80) : void 0
  });
  return new Response(JSON.stringify({ ok: true, id: record.id, total: countBuildCosts() }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
};
const GET = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("format") === "csv") {
    return new Response(buildCostsCsv(), {
      headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="jengacalc-build-costs.csv"' }
    });
  }
  return new Response(
    JSON.stringify({ total: countBuildCosts(), submissions: listBuildCosts(100) }),
    { headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
