import type { APIRoute } from 'astro';
import { addPrice, listPrices } from '@/lib/serverStore';

export const prerender = false;

function bad(msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid JSON body.');
  }

  const materialName = String(body.materialName ?? '').trim();
  const county = String(body.county ?? '').trim();
  const unit = String(body.unit ?? '').trim();
  const priceKes = Number(body.priceKes);

  if (!materialName || !county || !unit) return bad('Material name, county, and unit are required.');
  if (!Number.isFinite(priceKes) || priceKes <= 0 || priceKes > 100_000_000)
    return bad('Price must be a valid positive number.');

  const record = addPrice({
    materialName: materialName.slice(0, 120),
    county: county.slice(0, 80),
    town: body.town ? String(body.town).slice(0, 80) : undefined,
    priceKes,
    unit: unit.slice(0, 60),
    submitterName: body.submitterName ? String(body.submitterName).slice(0, 80) : undefined,
  });

  return new Response(JSON.stringify({ ok: true, id: record.id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ submissions: listPrices(50) }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
