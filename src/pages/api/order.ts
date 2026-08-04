import type { APIRoute } from 'astro';
import { addOrder, countOrders } from '@/lib/serverStore';

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

  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const county = String(body.county ?? '').trim();
  const houseType = String(body.houseType ?? '').trim();
  const priceKes = Number(body.priceKes);

  if (!email.includes('@') || !/^07\d{8}$/.test(phone.replace(/\s/g, '')))
    return bad('A valid email and M-Pesa phone number are required.');
  if (!county || !houseType) return bad('Build details are required.');
  if (!Number.isFinite(priceKes) || priceKes <= 0) return bad('Price must be a positive number.');

  const record = await addOrder({
    email: email.slice(0, 120),
    phone: phone.slice(0, 20),
    county,
    houseType,
    bedrooms: Number(body.bedrooms) || 0,
    sizeSqm: Number(body.sizeSqm) || 0,
    finishTier: String(body.finishTier ?? '').slice(0, 40),
    priceKes,
    currency: 'KES',
  });

  return new Response(
    JSON.stringify({ ok: true, id: record.id, totalOrders: await countOrders() }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ totalOrders: await countOrders() }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
