import type { APIRoute } from 'astro';
import { addBuildCost, listBuildCosts, countBuildCosts, buildCostsCsv } from '@/lib/serverStore';

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

  const county = String(body.county ?? '').trim();
  const houseType = String(body.houseType ?? '').trim();
  const bedrooms = Number(body.bedrooms);
  const sizeSqm = Number(body.sizeSqm);
  const finishTier = String(body.finishTier ?? '').trim();
  const totalCostKes = Number(body.totalCostKes);

  if (!county || !houseType || !finishTier) return bad('County, house type, and finish level are required.');
  if (!Number.isFinite(bedrooms) || bedrooms < 1 || bedrooms > 20) return bad('Bedrooms must be between 1 and 20.');
  if (!Number.isFinite(sizeSqm) || sizeSqm < 10 || sizeSqm > 2000) return bad('Floor area must be between 10 and 2000 sqm.');
  if (!Number.isFinite(totalCostKes) || totalCostKes < 10000 || totalCostKes > 2000000000)
    return bad('Total cost must be a valid positive number.');

  const record = await addBuildCost({
    county,
    houseType,
    bedrooms,
    sizeSqm,
    finishTier,
    totalCostKes,
    notes: body.notes ? String(body.notes).slice(0, 500) : undefined,
    submitterName: body.submitterName ? String(body.submitterName).slice(0, 80) : undefined,
  });

  return new Response(JSON.stringify({ ok: true, id: record.id, total: await countBuildCosts() }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get('format') === 'csv') {
    return new Response(await buildCostsCsv(), {
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="jengacalc-build-costs.csv"' },
    });
  }
  return new Response(
    JSON.stringify({ total: await countBuildCosts(), submissions: await listBuildCosts(100) }),
    { headers: { 'Content-Type': 'application/json' } },
  );
};
