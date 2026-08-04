import type { APIRoute } from 'astro';
import { COUNTIES, GUIDES } from '@/data/kenya';

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://jengacalc.co.ke';
  const pages = [
    '',
    '/calculator',
    '/prices',
    '/guides',
    '/counties',
    '/submit-build-cost',
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    ...COUNTIES.map((c) => `/counties/${c.slug}`),
  ];

  const urls = pages
    .map(
      (path) => `  <url>
    <loc>${base}${path}</loc>
    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.startsWith('/counties/') ? '0.8' : '0.7'}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
