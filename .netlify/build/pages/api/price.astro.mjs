import { d as addPrice, e as listPrices } from '../../chunks/serverStore_BUbCQxBR.mjs';
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
  const materialName = String(body.materialName ?? "").trim();
  const county = String(body.county ?? "").trim();
  const unit = String(body.unit ?? "").trim();
  const priceKes = Number(body.priceKes);
  if (!materialName || !county || !unit) return bad("Material name, county, and unit are required.");
  if (!Number.isFinite(priceKes) || priceKes <= 0 || priceKes > 1e8)
    return bad("Price must be a valid positive number.");
  const record = addPrice({
    materialName: materialName.slice(0, 120),
    county: county.slice(0, 80),
    town: body.town ? String(body.town).slice(0, 80) : void 0,
    priceKes,
    unit: unit.slice(0, 60),
    submitterName: body.submitterName ? String(body.submitterName).slice(0, 80) : void 0
  });
  return new Response(JSON.stringify({ ok: true, id: record.id }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
};
const GET = async () => {
  return new Response(JSON.stringify({ submissions: listPrices(50) }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
