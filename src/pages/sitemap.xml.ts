import type { APIRoute } from 'astro';
import { COUNTIES, GUIDES } from '@/data/kenya';

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://jengacalc.co.ke';
  const today = new Date().toISOString().slice(0, 10);
  const pages: { path: string; freq: string; priority: string }[] = [
    { path: '', freq: 'weekly', priority: '1.0' },
    { path: '/calculator', freq: 'weekly', priority: '0.9' },
    { path: '/prices', freq: 'weekly', priority: '0.8' },
    { path: '/guides', freq: 'weekly', priority: '0.8' },
    { path: '/counties', freq: 'weekly', priority: '0.8' },
    { path: '/submit-build-cost', freq: 'monthly', priority: '0.6' },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, freq: 'monthly' as const, priority: '0.8' })),
    ...COUNTIES.map((c) => ({ path: `/counties/${c.slug}`, freq: 'monthly' as const, priority: '0.7' })),
  ];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
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
