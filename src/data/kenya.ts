export type FinishTier = 'basic' | 'mid' | 'high_end';
export type HouseType = 'bungalow' | 'maisonette' | 'bedsitter' | 'apartment';

export interface CountyInfo {
  slug: string;
  name: string;
  region: 'Nairobi' | 'Central' | 'Rift Valley' | 'Western' | 'Nyanza' | 'Coast' | 'Eastern' | 'North Eastern';
  laborMultiplier: number;
  transportMultiplier: number;
}

export const COUNTIES: CountyInfo[] = [
  { slug: 'nairobi', name: 'Nairobi', region: 'Nairobi', laborMultiplier: 1.15, transportMultiplier: 1.00 },
  { slug: 'kiambu', name: 'Kiambu', region: 'Central', laborMultiplier: 1.05, transportMultiplier: 1.05 },
  { slug: 'machakos', name: 'Machakos', region: 'Eastern', laborMultiplier: 0.95, transportMultiplier: 1.10 },
  { slug: 'kajiado', name: 'Kajiado', region: 'Rift Valley', laborMultiplier: 0.90, transportMultiplier: 1.15 },
  { slug: 'nakuru', name: 'Nakuru', region: 'Rift Valley', laborMultiplier: 0.90, transportMultiplier: 1.10 },
  { slug: 'mombasa', name: 'Mombasa', region: 'Coast', laborMultiplier: 1.00, transportMultiplier: 1.20 },
  { slug: 'kilifi', name: 'Kilifi', region: 'Coast', laborMultiplier: 0.90, transportMultiplier: 1.25 },
  { slug: 'kisumu', name: 'Kisumu', region: 'Nyanza', laborMultiplier: 0.90, transportMultiplier: 1.15 },
  { slug: 'eldoret', name: 'Eldoret (Uasin Gishu)', region: 'Rift Valley', laborMultiplier: 0.90, transportMultiplier: 1.10 },
  { slug: 'nyeri', name: 'Nyeri', region: 'Central', laborMultiplier: 0.95, transportMultiplier: 1.08 },
  { slug: 'meru', name: 'Meru', region: 'Eastern', laborMultiplier: 0.90, transportMultiplier: 1.12 },
  { slug: 'kakamega', name: 'Kakamega', region: 'Western', laborMultiplier: 0.85, transportMultiplier: 1.18 },
  { slug: 'kisii', name: 'Kisii', region: 'Nyanza', laborMultiplier: 0.85, transportMultiplier: 1.15 },
  { slug: 'garissa', name: 'Garissa', region: 'North Eastern', laborMultiplier: 0.85, transportMultiplier: 1.30 },
  { slug: 'nakuru-rongai', name: 'Rongai (Nakuru)', region: 'Rift Valley', laborMultiplier: 0.88, transportMultiplier: 1.12 },
  { slug: 'thika', name: 'Thika (Kiambu)', region: 'Central', laborMultiplier: 1.00, transportMultiplier: 1.03 },
];

export const HOUSE_TYPES: { value: HouseType; label: string; description: string }[] = [
  { value: 'bungalow', label: 'Bungalow', description: 'Single-storey house, the most common type for families in Kenya.' },
  { value: 'maisonette', label: 'Maisonette', description: 'Two-storey house with living areas downstairs and bedrooms upstairs.' },
  { value: 'bedsitter', label: 'Bedsitter / Single Room', description: 'Compact single-room rental unit with shared or attached amenities.' },
  { value: 'apartment', label: 'Apartment Unit', description: 'A single unit within a multi-storey residential block.' },
];

export const FINISH_TIERS: { value: FinishTier; label: string; description: string; perSqm: number }[] = [
  {
    value: 'basic',
    label: 'Basic (Rental standard)',
    description: 'Cement floors, basic fittings, standard mabati or tiles. Typical for rental units.',
    perSqm: 32000,
  },
  {
    value: 'mid',
    label: 'Mid-range (Owner-occupier)',
    description: 'Tiled floors, painted interior, decent fittings, moderate kitchen and bath finishes.',
    perSqm: 42000,
  },
  {
    value: 'high_end',
    label: 'High-end (Premium)',
    description: 'Premium tiles or hardwood, fitted kitchen, high-quality sanitary ware, detailed finishes.',
    perSqm: 62000,
  },
];

export interface CostBreakdownItem {
  category: string;
  share: number;
  description: string;
}

export const COST_BREAKDOWN: CostBreakdownItem[] = [
  { category: 'Foundation & Substructure', share: 0.15, description: 'Excavation, concrete, blinding, footings, foundation walls, hardcore filling, slab.' },
  { category: 'Walls & Superstructure', share: 0.22, description: 'Blocks, bricks, mortar, lintels, columns, ring beams.' },
  { category: 'Roofing', share: 0.12, description: 'Trusses, mabati or tiles, ridges, gutters, fascia.' },
  { category: 'Doors & Windows', share: 0.08, description: 'Steel or wooden doors, aluminium or timber windows, frames, locks.' },
  { category: 'Electrical', share: 0.07, description: 'Wiring, sockets, switches, DB board, lighting fixtures.' },
  { category: 'Plumbing', share: 0.08, description: 'Pipes, tanks, sanitary ware, fittings, drainage.' },
  { category: 'Finishes', share: 0.18, description: 'Floor tiles or screed, wall plaster and paint, ceiling, kitchen fit-out.' },
  { category: 'Labor & Supervision', share: 0.10, description: 'Fundi and casual labor, foreman, site supervision, QS fees.' },
];

export interface MaterialPrice {
  materialName: string;
  category: string;
  unit: string;
  priceKes: number;
  county: string | null;
  source: string;
  lastUpdated: string;
}

export const MATERIAL_PRICES: MaterialPrice[] = [
  { materialName: 'Bamburi Cement (42.5N)', category: 'Cement', unit: '50kg bag', priceKes: 850, county: null, source: 'Bamburi website / hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Savanna Cement (42.5)', category: 'Cement', unit: '50kg bag', priceKes: 780, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Simba Cement (42.5)', category: 'Cement', unit: '50kg bag', priceKes: 760, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Mabati (Box Profile 0.3mm)', category: 'Roofing', unit: '3m sheet', priceKes: 1450, county: null, source: 'Mabati Rolling Mills / hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Mabati (Box Profile 0.4mm)', category: 'Roofing', unit: '3m sheet', priceKes: 1850, county: null, source: 'Mabati Rolling Mills / hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Roman Tiles (Clay)', category: 'Roofing', unit: 'piece', priceKes: 65, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Y16 Deformed Bar', category: 'Steel', unit: '12m length', priceKes: 1450, county: null, source: 'Steel surveys / hardware', lastUpdated: '2026-08-01' },
  { materialName: 'Y12 Deformed Bar', category: 'Steel', unit: '12m length', priceKes: 950, county: null, source: 'Steel surveys / hardware', lastUpdated: '2026-08-01' },
  { materialName: 'Y8 Deformed Bar', category: 'Steel', unit: '12m length', priceKes: 520, county: null, source: 'Steel surveys / hardware', lastUpdated: '2026-08-01' },
  { materialName: 'D12 Mild Steel', category: 'Steel', unit: '12m length', priceKes: 720, county: null, source: 'Steel surveys / hardware', lastUpdated: '2026-08-01' },
  { materialName: '6m Masonry Block (150mm)', category: 'Walling', unit: 'piece', priceKes: 60, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Maxi Block (200mm)', category: 'Walling', unit: 'piece', priceKes: 75, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Common Brick (Fired)', category: 'Walling', unit: 'piece', priceKes: 15, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'River Sand (Sharp)', category: 'Aggregates', unit: '7-tonne lorry', priceKes: 28000, county: null, source: 'Hardware surveys / supplier quotes', lastUpdated: '2026-08-01' },
  { materialName: 'Ballast (3/4 inch)', category: 'Aggregates', unit: '7-tonne lorry', priceKes: 32000, county: null, source: 'Hardware surveys / supplier quotes', lastUpdated: '2026-08-01' },
  { materialName: 'Hardcore Stone', category: 'Aggregates', unit: '7-tonne lorry', priceKes: 18000, county: null, source: 'Hardware surveys / supplier quotes', lastUpdated: '2026-08-01' },
  { materialName: 'Crown Paint (Vinyl Silk Emulsion)', category: 'Paint', unit: '4-litre', priceKes: 3200, county: null, source: 'Crown Paints website', lastUpdated: '2026-08-01' },
  { materialName: 'Crown Paint (Vinyl Matt Emulsion)', category: 'Paint', unit: '4-litre', priceKes: 2800, county: null, source: 'Crown Paints website', lastUpdated: '2026-08-01' },
  { materialName: 'Ceramic Floor Tiles (300x300mm)', category: 'Finishes', unit: 'box (1.44 sqm)', priceKes: 1800, county: null, source: 'Hardware surveys / Jumia Building Materials', lastUpdated: '2026-08-01' },
  { materialName: 'Porcelain Floor Tiles (600x600mm)', category: 'Finishes', unit: 'box (1.08 sqm)', priceKes: 4200, county: null, source: 'Hardware surveys / Jumia Building Materials', lastUpdated: '2026-08-01' },
  { materialName: 'Gypsum Ceiling Board (9mm)', category: 'Finishes', unit: '1.2x2.4m board', priceKes: 1450, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'PVC Conduit Pipe (20mm)', category: 'Electrical', unit: '6m length', priceKes: 180, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: '2.5mm Single Core Cable', category: 'Electrical', unit: '100m roll', priceKes: 4800, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: '13A Switch Socket', category: 'Electrical', unit: 'piece', priceKes: 350, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { category: 'Plumbing', materialName: 'PPR Pipe (25mm hot/cold)', unit: '4m length', priceKes: 580, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Plastic Water Tank (1000L)', category: 'Plumbing', unit: 'piece', priceKes: 8500, county: null, source: 'Hardware surveys', lastUpdated: '2026-01-15' },
  { materialName: 'WC Pan (White, close-coupled)', category: 'Plumbing', unit: 'piece', priceKes: 6500, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Steel Door (Flush, 900x2100mm)', category: 'Doors & Windows', unit: 'piece', priceKes: 8500, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Aluminium Sliding Window (1200x1200mm)', category: 'Doors & Windows', unit: 'piece', priceKes: 7500, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Timber (Cypress 4x2)', category: 'Timber', unit: '14ft length', priceKes: 1200, county: null, source: 'Timber yard surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Timber (Cypress 6x2)', category: 'Timber', unit: '14ft length', priceKes: 1800, county: null, source: 'Timber yard surveys', lastUpdated: '2026-08-01' },
  { materialName: 'Plywood (18mm WBP)', category: 'Timber', unit: '8x4ft sheet', priceKes: 4200, county: null, source: 'Hardware surveys', lastUpdated: '2026-08-01' },
];

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: 'Budgeting' | 'Materials' | 'Design' | 'Process';
  readTime: string;
  publishDate: string;
  keywords: string[];
  content: string;
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'how-to-budget-for-a-4-bedroom-house-in-kenya',
    title: 'How to Budget for a 4-Bedroom House in Kenya',
    description: 'A complete walkthrough of what goes into a 4-bedroom build budget — from foundation to finishing — with real cost ranges for 2026.',
    category: 'Budgeting',
    readTime: '8 min read',
    publishDate: '2026-08-01',
    keywords: ['budget 4 bedroom house kenya', 'cost of building 4 bedroom house', 'house construction budget kenya'],
    content: `## The single biggest mistake Kenyans make

Most people budget for materials and forget that **labor, transport, and professional fees can eat 25–30% of the total project cost.** A house that costs KES 4.5M in materials will cost you closer to KES 6M all-in.

This guide breaks down every line item so you walk into your project with eyes open.

## Step 1: Know your cost per square metre

In Kenya, construction costs are typically quoted per square metre of **plinth area** (the total floor area enclosed by the external walls). As of mid-2026, the going rates are:

| Finish level | Cost per sqm (KES) | What you get |
|---|---|---|
| Basic (rental standard) | 30,000 – 35,000 | Cement floors, basic fittings, standard mabati roof |
| Mid-range (owner-occupier) | 38,000 – 48,000 | Tiled floors, painted interior, decent kitchen and bath |
| High-end (premium) | 55,000 – 70,000+ | Premium tiles or hardwood, fitted kitchen, quality sanitary ware |

A typical 4-bedroom bungalow in Kenya is roughly **120–150 sqm**. At mid-range finishes, that puts you at:

> 135 sqm × KES 42,000/sqm = **KES 5,670,000** (midpoint estimate)

But that is just the shell. Let's break it down.

## Step 2: The cost breakdown

Here is how your total budget splits across construction stages for a standard 4-bedroom bungalow:

### Foundation & Substructure — ~15%
This covers excavation, concrete for the footing, foundation walls, hardcore filling, and the floor slab. On a good site (flat, stable soil), expect KES 680,000 – 850,000. On a sloped site or black-cotton soil, this can jump 30–50% because you need deeper excavation and more concrete.

### Walls & Superstructure — ~22%
Blocks, mortar, lintels, columns, and the ring beam. A 4-bedroom bungalow uses roughly 3,500–4,500 blocks. At KES 60–75 per block, that's KES 210,000 – 340,000 in blocks alone. Add mortar (cement + sand), steel for columns, and labor.

### Roofing — ~12%
Trusses (timber or steel), mabati or clay tiles, ridges, gutters, and fascia. A 150 sqm roof using box-profile mabati (0.4mm) runs about KES 450,000 – 600,000. Clay tiles push this to KES 700,000+.

### Doors & Windows — ~8%
A 4-bedroom house needs roughly 10 doors (including the main entrance) and 12–15 windows. Steel doors start at KES 8,500 each; aluminium sliding windows at KES 7,500. Budget KES 400,000 – 550,000.

### Electrical — ~7%
Wiring, conduit, sockets, switches, the DB board, and lighting fixtures. For a 4-bedroom, expect KES 350,000 – 480,000. This assumes standard fittings — premium lighting and smart-home wiring will push it higher.

### Plumbing — ~8%
Pipes, tanks, sanitary ware (toilets, sinks, showers), and drainage. Two bathrooms + kitchen + utility: KES 400,000 – 550,000. A 1,000L plastic tank is about KES 8,500; a close-coupled WC pan is KES 6,500.

### Finishes — ~18%
Floor tiles, wall plaster and paint, ceiling, kitchen cabinets, and built-in wardrobes. This is where finish level matters most. Basic: KES 600,000. Mid: KES 1,000,000. High-end: KES 1,500,000+.

### Labor & Supervision — ~10%
Fundi labor, casual labor, foreman, and site supervision. Some contractors quote this as a percentage (15–20% of materials); others quote per square metre. Budget KES 450,000 – 650,000 for a 4-bedroom bungalow.

## Step 3: The hidden costs nobody mentions

- **Professional fees:** Architect (3–5% of construction cost), structural engineer (1–3%), QS (1–3%). For a KES 5.6M build, that's KES 280,000 – 620,000.
- **Council approvals and NCA fees:** KES 15,000 – 50,000 depending on county.
- **Water and electricity on site:** KES 30,000 – 80,000 for temporary connections.
- **Contingency:** Always add 10–15% to your total. Things go wrong. Materials get wasted. Prices move.

## Step 4: Worked example

Let's put it together for a 135 sqm, 4-bedroom bungalow in Kiambu with mid-range finishes:

| Stage | Low (KES) | High (KES) |
|---|---|---|
| Foundation | 680,000 | 850,000 |
| Walls & superstructure | 1,000,000 | 1,240,000 |
| Roofing | 450,000 | 600,000 |
| Doors & windows | 400,000 | 550,000 |
| Electrical | 350,000 | 480,000 |
| Plumbing | 400,000 | 550,000 |
| Finishes | 900,000 | 1,100,000 |
| Labor & supervision | 450,000 | 650,000 |
| **Subtotal** | **4,630,000** | **6,020,000** |
| Professional fees (5%) | 232,000 | 301,000 |
| Approvals & site utilities | 50,000 | 100,000 |
| Contingency (10%) | 463,000 | 602,000 |
| **Total** | **5,375,000** | **7,023,000** |

So a realistic budget for this build is **KES 5.4M – 7.0M**, with KES 6.2M being a sensible planning figure.

## Step 5: How to keep costs under control

1. **Lock in material prices early.** Cement and steel move monthly. Buy and store if you have secure site storage.
2. **Don't change the plan mid-build.** Every variation costs you 15–25% more than doing it right the first time.
3. **Pay your fundis per stage, not per day.** Daily pay encourages slow work.
4. **Buy materials yourself, hire labor only.** "Materials + labor" contracts are where most cost overruns happen.
5. **Visit the site weekly.** The biggest source of waste is unsupervised work.

## The takeaway

A 4-bedroom bungalow in Kenya with mid-range finishes costs roughly **KES 5.4M – 7.0M** all-in as of 2026. The number that matters is not the cost per square metre — it is the total project cost including fees, approvals, and contingency. Budget for the real number, not the brochure number.

Use the calculator on this site to get a tailored estimate for your county and finish level.`
  },
  {
    slug: 'mabati-prices-in-kenya-2026-guide',
    title: 'Mabati Prices in Kenya: A 2026 Guide',
    description: 'Current prices for box profile, corrugated, and tile-profile mabati in Kenya, with brand comparisons and what to choose for your project.',
    category: 'Materials',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['mabati prices kenya', 'box profile mabati price', 'mabati rolling mills prices', 'roofing sheets kenya'],
    content: `## Why mabati prices keep moving

Mabati (corrugated and box-profile roofing sheets) is priced off **global steel coil prices**, which have been volatile since 2023. The mill price shifts, and within two weeks your local hardware updates its shelf price. This guide reflects prices as of August 2026, but you should always confirm at your supplier before committing.

## The main types of mabati in Kenya

### Box profile (most common for homes)
The "box" or "tile profile" shape gives rigidity and a modern look. It comes in two thicknesses:

| Thickness | Price per 3m sheet (KES) | Best for |
|---|---|---|
| 0.3mm | 1,400 – 1,500 | Small residential, cost-sensitive builds |
| 0.4mm | 1,800 – 1,950 | Standard for family homes — better wind and hail resistance |

0.4mm is worth the extra cost for any permanent home. The 0.3mm sheet flexes under foot traffic during installation and dents more easily.

### Corrugated (classic "mabati")
The old-style wavy sheet. Cheaper but less rigid, so it needs more purlins (support battens). Common for farm structures, perimeter walls, and low-cost housing.

| Thickness | Price per 3m sheet (KES) |
|---|---|
| 0.3mm | 1,100 – 1,250 |
| 0.4mm | 1,500 – 1,700 |

### Tile-profile mabati
Pressed to look like clay tiles. More expensive but popular for upscale homes because it mimics the look of clay at a fraction of the weight.

| Thickness | Price per 3m sheet (KES) |
|---|---|
| 0.4mm | 2,100 – 2,400 |
| 0.5mm | 2,600 – 3,000 |

### Clay tiles (not mabati, but the alternative)
Real clay roofing tiles (Mabati Rolling Mills' "Versatile" line, or imported from Spain/India) cost KES 65 – 120 per piece. A 150 sqm roof needs roughly 1,500 tiles, so KES 100,000 – 180,000 in tiles alone — plus a heavier roof structure to carry the load.

## The main brands

| Brand | Known for | Price position |
|---|---|---|
| Mabati Rolling Mills (MRM) | Widest range, best availability | Mid-market |
| Safal Building Systems | Versatile tile profile, Colorplus | Premium |
| Royal Mabati | Budget box profile, aggressive pricing | Budget |
| Ncolor | Coloured box profile | Mid-market |

MRM and Safal are the safest bets for quality and warranty. Royal Mabati is fine for cost-sensitive projects but check the zinc coating — cheaper sheets rust faster at the coast.

## How much mabati do you need?

For a simple gable roof on a 150 sqm house, you need roughly **70–85 sheets** (3m length, 0.4mm box profile), plus ridges, ridges, gutters, and fascia. That works out to:

> 80 sheets × KES 1,850 = **KES 148,000** in sheets
> Plus ridges, gutters, fascia: **KES 30,000 – 45,000**
> Total roofing sheets: **KES 178,000 – 193,000**

Add timber trusses or steel trusses (KES 80,000 – 150,000) and labor (KES 40,000 – 60,000), and your total roofing package is **KES 300,000 – 400,000** for a standard 4-bedroom.

## Coastal and humid areas: pay attention to coating

If you are building in Mombasa, Kilifi, Malindi, or anywhere within 20km of the ocean, buy **AZ150** (aluminium-zinc) coated sheets, not plain galvanised. The salt air will eat through a standard AZ100 coating in 5–7 years. AZ150 costs about 15% more but lasts twice as long on the coast.

## The takeaway

For most Kenyan homes, **0.4mm box-profile mabati from MRM or Safal** is the sweet spot of price, durability, and availability. Budget KES 300,000 – 400,000 for the full roofing package (sheets + structure + labor) on a standard 4-bedroom bungalow. Check prices at your local hardware right before you buy — they move monthly.`
  },
  {
    slug: 'cement-prices-in-kenya-today',
    title: 'Cement Prices in Kenya Today: What to Expect in 2026',
    description: 'Brand-by-brand cement prices, what drives the differences, and how to avoid the most common buying mistakes.',
    category: 'Materials',
    readTime: '5 min read',
    publishDate: '2026-08-01',
    keywords: ['cement price kenya today', 'bamburi cement price', 'simba cement price', 'savanna cement price'],
    content: `## Current cement prices (August 2026)

| Brand | Type | Price per 50kg bag (KES) |
|---|---|---|
| Bamburi | 42.5N (Tembo) | 830 – 880 |
| Bamburi | 32.5R (Fundi) | 720 – 770 |
| Savanna | 42.5 | 750 – 800 |
| Simba | 42.5 | 740 – 790 |
| National | 42.5 | 720 – 770 |
| Mombasa | 42.5 | 700 – 750 |
| EAPC (Bamburi sister) | 42.5N | 820 – 870 |

Prices vary by **KES 30–80 per bag** depending on where you buy. Nairobi and Thika hardware tend to be cheapest because the factories are nearby. Upcountry, add KES 50–100 per bag for transport.

## What do the numbers mean?

- **42.5** and **32.5** refer to the **strength class** (in MPa at 28 days). 42.5 is stronger and sets faster — use it for structural concrete (foundations, columns, slabs). 32.5 is fine for plaster and non-structural work.
- **N** means normal early-strength gain. **R** means rapid early-strength. For most residential work, N is what you want.

## How many bags do you need?

A rough guide for a standard 4-bedroom bungalow (135 sqm, mid-range):

| Stage | Bags of cement |
|---|---|
| Foundation & slab | 150 – 200 |
| Walls (blockwork + mortar) | 120 – 160 |
| Plastering (internal + external) | 100 – 140 |
| Screed and tiling | 40 – 60 |
| **Total** | **410 – 560 bags** |

At KES 850 per bag (Bamburi 42.5N), that's **KES 348,000 – 476,000** in cement alone. Cement is typically 10–12% of your total build cost.

## Common buying mistakes

1. **Buying from a yard with slow turnover.** Cement absorbs moisture from the air. Bags sitting in a yard for months develop hard lumps and lose strength. Buy from a busy hardware where stock moves fast.
2. **Storing cement on site for too long.** Once you buy, use it within 2–3 months. Store it off the ground, under cover, and stacked no more than 8 bags high.
3. **Mixing brands in the same batch.** Different cements have different setting times and shrinkage characteristics. Pick one brand and stick with it for the whole project.
4. **Assuming "cement is cement."** The difference between a KES 740 bag and a KES 870 bag is not just branding — it's clinker quality, grinding fineness, and consistency. For structural concrete, buy the better brand.

## The takeaway

For a standard residential build, budget **KES 350,000 – 480,000** in cement (roughly 450–550 bags). Bamburi 42.5N is the safe default for structural work. Buy from a high-turnover supplier, use it within 3 months, and don't mix brands.`
  },
  {
    slug: 'cost-to-build-a-3-bedroom-bungalow-in-kenya',
    title: 'Cost to Build a 3-Bedroom Bungalow in Kenya',
    description: 'A realistic, itemised cost breakdown for a 3-bedroom bungalow in Kenya, with county-by-county price differences.',
    category: 'Budgeting',
    readTime: '7 min read',
    publishDate: '2026-08-01',
    keywords: ['cost to build 3 bedroom bungalow kenya', '3 bedroom house cost kenya', 'bungalow construction cost'],
    content: `## The short answer

A 3-bedroom bungalow in Kenya costs **KES 3.8M – 5.6M** all-in as of 2026, depending on county and finish level. The sensible planning figure for a mid-range build in most counties is **KES 4.5M**.

## What "3-bedroom bungalow" means here

We are talking about a single-storey house of roughly **90–110 sqm**, with three bedrooms, one or two bathrooms, a sitting room, a kitchen, and a small verandah. This is the most common house type Kenyans build.

## The cost breakdown

Using 100 sqm as the baseline and mid-range finishes (KES 42,000/sqm):

| Stage | Share | Low (KES) | High (KES) |
|---|---|---|---|
| Foundation & substructure | 15% | 510,000 | 630,000 |
| Walls & superstructure | 22% | 748,000 | 924,000 |
| Roofing | 12% | 408,000 | 504,000 |
| Doors & windows | 8% | 272,000 | 336,000 |
| Electrical | 7% | 238,000 | 294,000 |
| Plumbing | 8% | 272,000 | 336,000 |
| Finishes | 18% | 612,000 | 756,000 |
| Labor & supervision | 10% | 340,000 | 420,000 |
| **Construction subtotal** | | **3,400,000** | **4,200,000** |
| Professional fees (5%) | | 170,000 | 210,000 |
| Approvals & site utilities | | 40,000 | 80,000 |
| Contingency (10%) | | 340,000 | 420,000 |
| **Total** | | **3,950,000** | **4,910,000** |

For high-end finishes, add 30–50% to the finishes and labor lines. For basic (rental standard), subtract 20–25%.

## How county changes the number

The same 3-bedroom bungalow costs differently depending on where you build:

| County | vs. baseline | Estimated total (mid-range) |
|---|---|---|
| Nairobi | +15% labor | KES 4.6M – 5.4M |
| Kiambu / Thika | +5% labor, +5% transport | KES 4.3M – 5.0M |
| Nakuru / Eldoret | -10% labor, +10% transport | KES 4.0M – 4.7M |
| Mombasa / Kilifi | baseline labor, +20% transport | KES 4.2M – 4.9M |
| Kisumu / Kakamega | -15% labor, +15% transport | KES 4.0M – 4.7M |
| Garissa / Mandera | -15% labor, +30% transport | KES 4.3M – 5.1M |

Transport matters more than most people think. If you are building far from a cement factory or a major hardware hub, your material costs rise even if local labor is cheaper.

## What pushes the cost up

- **Sloped or black-cotton soil:** Foundation costs jump 30–50%.
- **Borehole or septic tank:** Add KES 150,000 – 400,000.
- **Solar and backup power:** Add KES 100,000 – 300,000.
- **Boundary wall and gate:** Add KES 200,000 – 500,000.
- **Driveway and landscaping:** Add KES 100,000 – 300,000.

These are often forgotten in the initial budget and hit in the last 20% of the project.

## What you can do to save

1. **Build single-storey, not maisonette.** A bungalow needs a simpler foundation and roof structure. The same floor area as a maisonette costs 10–15% less.
2. **Use blocks, not bricks.** Machine-cut blocks are faster to lay and need less mortar. Bricks are cheaper per piece but the labor and mortar eat the saving.
3. **Buy materials yourself.** A "materials + labor" contract is where most overruns happen. Buy cement, steel, and mabati yourself; hire labor per stage.
4. **Keep the design simple.** Every corner, dormer, and curve adds cost. A rectangular plan is the cheapest shape to build.

## The takeaway

Budget **KES 4.5M** for a 3-bedroom bungalow in most Kenyan counties with mid-range finishes. The number moves by KES 500,000 – 800,000 depending on county, soil, and finish level. Use the calculator on this site to get a tailored estimate for your specific county and house type.`
  },
  {
    slug: 'choosing-between-bungalow-and-maisonette',
    title: 'Bungalow vs Maisonette: Which Is Cheaper to Build in Kenya?',
    description: 'A side-by-side cost and lifestyle comparison to help you decide between a single-storey bungalow and a two-storey maisonette.',
    category: 'Design',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['bungalow vs maisonette kenya', 'maisonette cost kenya', 'cheaper to build bungalow or maisonette'],
    content: `## The question every Kenyan builder faces

You have a plot. You want 3–4 bedrooms. Should you build a single-storey bungalow or a two-storey maisonette? The answer depends on three things: **land size, budget, and how you want to live in the house.**

## Cost per square metre: the headline

| Type | Cost per sqm (mid-range, KES) | Why |
|---|---|---|
| Bungalow | 38,000 – 48,000 | Simpler foundation, simpler roof |
| Maisonette | 42,000 – 52,000 | Needs a stronger foundation for two storeys, staircase, more complex roof |

The maisonette costs **10–15% more per square metre** than a bungalow of the same floor area. But — and this is the key — a maisonette needs **less land** because it stacks the same floor area on two levels.

## The land question

A 4-bedroom bungalow needs roughly **150 sqm of footprint** plus setbacks, parking, and garden. On a 50x100 plot (1/8 acre), that leaves very little outdoor space.

A 4-bedroom maisonette needs roughly **75–85 sqm of footprint** because the bedrooms sit upstairs. On the same 50x100 plot, you keep a garden, a driveway, and room for a boundary wall with a gate.

**If you have a small plot, the maisonette is the better use of land.** If you have a large plot, the bungalow gives you a bigger, more comfortable house without the cost of a staircase and a two-storey structure.

## The real cost comparison

Let's compare a 4-bedroom bungalow (135 sqm, single storey) with a 4-bedroom maisonette (135 sqm over two floors):

| Item | Bungalow | Maisonette |
|---|---|---|
| Foundation | KES 680k – 850k | KES 850k – 1,050k (stronger) |
| Walls & superstructure | KES 1.0M – 1.24M | KES 1.1M – 1.35M (extra floor, columns) |
| Roofing | KES 450k – 600k | KES 350k – 480k (smaller roof area) |
| Staircase | — | KES 150k – 250k |
| Slab (first floor) | — | KES 250k – 350k |
| Doors & windows | KES 400k – 550k | KES 450k – 600k (more windows) |
| Electrical | KES 350k – 480k | KES 400k – 520k |
| Plumbing | KES 400k – 550k | KES 450k – 600k |
| Finishes | KES 900k – 1.1M | KES 950k – 1.15M |
| Labor & supervision | KES 450k – 650k | KES 550k – 750k |
| **Construction subtotal** | **KES 4.63M – 6.02M** | **KES 5.35M – 6.95M** |

The maisonette costs roughly **KES 700,000 – 930,000 more** for the same floor area. But you save on land — and in many Kenyan towns, land is the more expensive input.

## Lifestyle factors

### Bungalow advantages
- **Better for elderly or disabled family members.** No stairs.
- **Easier to extend.** You can add a room sideways later.
- **Easier to maintain.** Cleaning gutters, painting, and repairs are all at ground level.
- **Cooler in hot areas.** A single-storey roof ventilates better.

### Maisonette advantages
- **Better views.** upstairs bedrooms look out over the compound and neighbourhood.
- **More privacy.** Living areas downstairs, bedrooms upstairs.
- **Smaller footprint.** Leaves more outdoor space on a small plot.
- **Higher resale value per square metre.** in Nairobi and Kiambu, maisonettes command a premium.

## When to choose which

- **Choose a bungalow if:** you have a large plot, you have elderly parents who will live with you, or you are building in a hot area (coast, eastern Kenya).
- **Choose a maisonette if:** you have a 50x100 plot or smaller, you are in an urban area where land is expensive, or you want a more modern, upscale look.

## The takeaway

For the same floor area, a maisonette costs **10–15% more** to build than a bungalow, mainly because of the stronger foundation, the first-floor slab, and the staircase. But on a small plot, the maisonette saves you land — and in most Kenyan towns, that land saving is worth more than the construction premium. Use the calculator on this site to compare both options for your county and budget.`
  },
  {
    slug: 'how-to-avoid-being-overcharged-by-fundis',
    title: 'How to Avoid Being Overcharged by Fundis in Kenya',
    description: 'Practical, field-tested ways to protect your budget from inflated quotes, material theft, and padded labor costs.',
    category: 'Process',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['how to avoid being overcharged by fundis', 'fundis kenya', 'construction cost overruns kenya'],
    content: `## The reality

Most Kenyan builders lose **15–30% of their budget** to overcharging, material theft, and padded labor. Not because fundis are dishonest — most are not — but because the information gap between you and the fundi is enormous. The fundi knows what things cost and how long they take. You do not. This guide closes that gap.

## 1. Get at least three quotes — and compare line by line

Never accept the first quote. Get three. But do not just compare the total at the bottom — compare **line by line**. A quote that is 20% cheaper often has a line item missing (e.g., no provision for plaster, or no electrical fittings). The cheap quote is not cheap; it is incomplete.

Ask each contractor to break the quote into:
- Materials (with quantities)
- Labor (per stage)
- Equipment hire
- Contingency

If a contractor refuses to itemise, walk away.

## 2. Buy materials yourself

The single biggest source of overcharging is the "materials + labor" contract. The contractor quotes you a total, buys cheaper materials than they claimed, and pockets the difference. Or they buy the right materials and inflate the quantities.

**Instead:** buy cement, steel, mabati, and tiles yourself. Hire the fundi for labor only, per stage. You control the material quality and the quantities. The fundi cannot inflate what they do not buy.

## 3. Pay per stage, not per day or per month

Daily pay encourages slow work. Monthly pay encourages the fundi to string the project along. **Stage-based pay** is the Kenyan standard for a reason:

| Stage | When you pay |
|---|---|
| Foundation | After the slab is cast and cured |
| Walls | After walling is complete up to ring beam |
| Roofing | After mabati is fixed |
| Finishes | After plaster, tiling, and painting |

Hold back 10–15% until the stage is inspected and signed off. Never pay 100% upfront for any stage.

## 4. Track materials on site

Material theft is the silent budget killer. A bag of cement goes missing here, a sheet of mabati there. Over a 6-month build, it adds up to KES 50,000 – 200,000.

- **Keep a materials register.** Every delivery, note the quantity and supplier. Every day, the fundi signs for what they received.
- **Do a weekly stock count.** Cement bags, blocks, steel bars. It takes 10 minutes and saves you thousands.
- **Lock up high-value items.** Cement, steel, and electricals go in a lockable store on site.

## 5. Know the going rates

You cannot negotiate if you do not know the price. Use the material price tracker on this site to check current prices for cement, steel, mabati, and tiles in your county. Print it out. When a fundi quotes you KES 950 for a bag of cement that costs KES 850 at the hardware, you have the evidence.

## 6. Supervise — or hire someone who will

If you cannot be on site at least weekly, hire a clerk of works or a trusted foreman to supervise. This costs KES 15,000 – 30,000 per month but saves far more in prevented waste and theft. The biggest cost overruns happen on sites that nobody is watching.

## 7. Write everything down

Every agreement, every variation, every payment. A written record protects both you and the fundi. If something goes wrong, you have evidence. If the fundi tries to renegotiate mid-build, you have the original agreement.

## The takeaway

You do not need to be a construction expert to avoid being overcharged. You need to (1) get multiple itemised quotes, (2) buy materials yourself, (3) pay per stage with a retention, (4) track materials, (5) know the going rates, and (6) show up. The fundi who knows you are watching is the fundi who gives you a fair deal.`
  },
  {
    slug: 'cost-of-building-a-2-bedroom-house-in-kenya',
    title: 'Cost of Building a 2-Bedroom House in Kenya',
    description: 'A detailed cost guide for 2-bedroom houses — the most affordable entry point for Kenyan homeowners and rental investors.',
    category: 'Budgeting',
    readTime: '5 min read',
    publishDate: '2026-08-01',
    keywords: ['cost of building 2 bedroom house kenya', '2 bedroom house cost kenya', 'cheapest house to build kenya'],
    content: `## The short answer

A 2-bedroom house in Kenya costs **KES 2.2M – 3.6M** all-in as of 2026, depending on county and finish level. For a mid-range owner-occupier build in most counties, plan for **KES 2.8M**.

## What we are building

A 2-bedroom house is typically **60–75 sqm**, with two bedrooms, one bathroom, a sitting room, a kitchen, and a small verandah. This is the most affordable permanent house a Kenyan can build, and it is the standard unit for small-scale rental investment.

## The cost breakdown

Using 70 sqm and mid-range finishes (KES 42,000/sqm):

| Stage | Low (KES) | High (KES) |
|---|---|---|
| Foundation & substructure | 357,000 | 441,000 |
| Walls & superstructure | 524,000 | 647,000 |
| Roofing | 286,000 | 353,000 |
| Doors & windows | 190,000 | 235,000 |
| Electrical | 167,000 | 206,000 |
| Plumbing | 190,000 | 235,000 |
| Finishes | 428,000 | 529,000 |
| Labor & supervision | 238,000 | 294,000 |
| **Construction subtotal** | **2,380,000** | **2,940,000** |
| Professional fees (5%) | 119,000 | 147,000 |
| Approvals & site utilities | 30,000 | 60,000 |
| Contingency (10%) | 238,000 | 294,000 |
| **Total** | **2,767,000** | **3,441,000** |

For basic (rental standard) finishes, subtract 20–25%. For high-end, add 30–40%.

## The rental investment angle

A 2-bedroom house is the standard unit for Kenyans building rental units on a 50x100 plot. You can fit **4–6 units** on a single 1/8-acre plot if you build single-room or bedsitter blocks.

| Unit type | Cost per unit (basic) | Monthly rent (KES) | Payback (years) |
|---|---|---|---|
| Bedsitter | 700k – 900k | 8,000 – 12,000 | 6 – 9 |
| 1-bedroom | 1.2M – 1.6M | 15,000 – 20,000 | 6 – 8 |
| 2-bedroom | 2.2M – 2.8M | 25,000 – 35,000 | 6 – 9 |

These payback periods assume you build in an area with rental demand — near towns, along transport corridors, or close to universities and hospitals.

## County variation

| County | Estimated total (mid-range) |
|---|---|
| Nairobi / Kiambu | KES 3.0M – 3.6M |
| Nakuru / Eldoret | KES 2.7M – 3.2M |
| Mombasa / Kilifi | KES 2.8M – 3.4M |
| Kisumu / Kakamega | KES 2.6M – 3.1M |
| Meru / Nyeri | KES 2.7M – 3.2M |

## How to keep it cheap

1. **Keep it simple.** A rectangular plan, no dormers, no curves. Every complication adds 5–10%.
2. **Use blocks, not bricks.** Faster to lay, less mortar.
3. **Basic finishes for rental.** Cement floors, standard mabati, basic fittings. Tenants do not pay more for premium tiles.
4. **Build two units at once.** If you are building rentals, doing two units at the same time saves 10–15% because you share foundation, plumbing, and labor.

## The takeaway

A 2-bedroom house in Kenya costs **KES 2.2M – 3.6M** all-in. For rental investment, build basic finishes and keep the design simple. The payback period is 6–9 years in most Kenyan towns. Use the calculator on this site to get a tailored estimate for your county.`
  },
  {
    slug: 'solar-backup-power-cost-guide-kenya',
    title: 'Solar & Backup Power: What It Costs to Go Off-Grid in Kenya',
    description: 'A practical guide to sizing and costing a solar or backup power system for a Kenyan home, with real prices for 2026.',
    category: 'Materials',
    readTime: '7 min read',
    publishDate: '2026-08-01',
    keywords: ['solar power cost kenya', 'backup power kenya', 'inverter price kenya', 'solar system sizing kenya'],
    content: `## Why every Kenyan builder should think about power

Kenya Power outages are not going away. If you are building a new home, wiring it for solar or backup power from day one costs a fraction of what it costs to retrofit later. This guide helps you size the system and know what to budget.

## The three options

### Option 1: Basic backup (inverter + battery)
Powers lights, TV, WiFi, and a few sockets during an outage. Does not run a fridge or a pump.

| Component | Spec | Price (KES) |
|---|---|---|
| Inverter (pure sine wave) | 3kVA / 24V | 45,000 – 65,000 |
| Battery (lithium, LiFePO4) | 100Ah / 24V | 80,000 – 120,000 |
| Installation & wiring | | 15,000 – 25,000 |
| **Total** | | **140,000 – 210,000** |

### Option 2: Hybrid solar (inverter + battery + panels)
Runs lights, TV, fridge, and a few appliances on solar during the day, switches to grid at night.

| Component | Spec | Price (KES) |
|---|---|---|
| Hybrid inverter | 5kVA / 48V | 80,000 – 130,000 |
| Batteries (LiFePO4) | 200Ah / 48V (or 2×100Ah) | 160,000 – 240,000 |
| Solar panels | 4 × 450W monocrystalline | 80,000 – 120,000 |
| Mounting, cabling, installation | | 40,000 – 60,000 |
| **Total** | | **360,000 – 550,000** |

### Option 3: Full off-grid solar
Powers everything in a standard 3–4 bedroom house without grid connection. You need this only if you are in an area without grid power, or if you want zero KPLC bills.

| Component | Spec | Price (KES) |
|---|---|---|
| Off-grid inverter | 8–10kVA / 48V | 150,000 – 250,000 |
| Batteries (LiFePO4) | 400Ah / 48V (or 4×100Ah) | 320,000 – 480,000 |
| Solar panels | 8–12 × 450W | 160,000 – 300,000 |
| Mounting, cabling, installation | | 60,000 – 100,000 |
| **Total** | | **690,000 – 1,130,000** |

## How to size your system

### Step 1: List what you want to run
| Appliance | Watts | Hours/day | Wh/day |
|---|---|---|---|
| LED lights (10) | 100 | 5 | 500 |
| TV | 100 | 5 | 500 |
| Fridge | 150 | 24 | 3,600 |
| Laptop / phone charging | 100 | 4 | 400 |
| Water pump | 500 | 1 | 500 |
| **Total daily use** | | | **5,500 Wh** |

### Step 2: Size the battery
Daily use ÷ battery voltage ÷ depth of discharge (0.8 for LiFePO4):
> 5,500 ÷ 48 ÷ 0.8 = **143Ah**

Round up to the nearest standard size: **200Ah at 48V** (about 9.6kWh of storage).

### Step 3: Size the panels
You want enough panels to recharge the battery in 4–5 hours of good sun. Kenya averages 5 peak sun hours.
> 5,500 Wh ÷ 5 hours ÷ 0.75 (system efficiency) = **1,466W of panels**

Round up: **4 × 450W panels (1,800W)**.

### Step 4: Size the inverter
Add up the running watts of everything that might be on at once, plus a 30% surge margin for motor starts (fridge, pump):
> (100 + 100 + 150 + 100 + 500) × 1.3 = **1,235W running, so a 3kVA inverter is the minimum.**

For a full house with a washing machine or microwave, go to 5kVA.

## What to buy and what to avoid

- **Buy lithium (LiFePO4), not lead-acid.** Lithium costs 2–3x more upfront but lasts 10+ years vs. 2–3 for lead-acid. The lifecycle cost is lower.
- **Buy pure sine wave inverters.** Modified sine wave is cheaper but damages motors and electronics over time.
- **Buy monocrystalline panels, not polycrystalline.** More efficient, smaller footprint, better in low light.
- **Avoid no-name brands.** Stick with Lento, Felicity, Growatt, Deye, or Victron. The warranty matters.

## The takeaway

For most Kenyan homes, a **hybrid solar system (Option 2) at KES 360,000 – 550,000** is the sweet spot. It runs your essentials on solar during the day, keeps the lights on during outages, and pays back in 4–6 years of saved electricity bills. If you are building new, wire for solar from the start — it costs KES 15,000 – 30,000 extra in the electrical stage and saves you KES 50,000+ in retrofitting later.`
  },
  {
    slug: 'cost-to-build-a-maisonette-in-kenya',
    title: 'Cost to Build a Maisonette in Kenya',
    description: 'A full breakdown of maisonette construction costs in Kenya, including the premium over bungalows and where the extra money goes.',
    category: 'Budgeting',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['cost to build maisonette kenya', 'maisonette construction cost', '4 bedroom maisonette cost kenya'],
    content: `## The short answer

A 4-bedroom maisonette in Kenya costs **KES 5.5M – 7.5M** all-in as of 2026, depending on county and finish level. The sensible planning figure for a mid-range build is **KES 6.5M**.

## What makes a maisonette different

A maisonette is a **two-storey house** with living areas (sitting room, kitchen, dining) on the ground floor and bedrooms on the upper floor. It needs:

- A **stronger foundation** to carry the weight of two storeys
- A **first-floor slab** (reinforced concrete or hollow-pot)
- A **staircase**
- A **more complex roof** (or a smaller roof, since the footprint is smaller)
- **More plumbing and electrical** risers

These add **KES 700,000 – 1,000,000** to the cost of the same floor area as a bungalow.

## The cost breakdown

Using 135 sqm over two floors, mid-range finishes:

| Stage | Low (KES) | High (KES) |
|---|---|---|
| Foundation & substructure | 850,000 | 1,050,000 |
| Walls & superstructure | 1,100,000 | 1,350,000 |
| First-floor slab | 250,000 | 350,000 |
| Staircase | 150,000 | 250,000 |
| Roofing | 350,000 | 480,000 |
| Doors & windows | 450,000 | 600,000 |
| Electrical | 400,000 | 520,000 |
| Plumbing | 450,000 | 600,000 |
| Finishes | 950,000 | 1,150,000 |
| Labor & supervision | 550,000 | 750,000 |
| **Construction subtotal** | **5,500,000** | **7,050,000** |
| Professional fees (5%) | 275,000 | 352,500 |
| Approvals & site utilities | 50,000 | 100,000 |
| Contingency (10%) | 550,000 | 705,000 |
| **Total** | **6,375,000** | **8,207,500** |

## County variation

| County | Estimated total (mid-range) |
|---|---|
| Nairobi / Kiambu | KES 6.8M – 8.2M |
| Nakuru / Eldoret | KES 6.2M – 7.5M |
| Mombasa / Kilifi | KES 6.5M – 7.8M |
| Kisumu / Kakamega | KES 6.0M – 7.3M |
| Meru / Nyeri | KES 6.2M – 7.5M |

## Where the extra money goes vs a bungalow

| Item | Bungalow (135 sqm) | Maisonette (135 sqm) | Difference |
|---|---|---|---|
| Foundation | KES 680k – 850k | KES 850k – 1,050k | +KES 170k – 200k |
| First-floor slab | — | KES 250k – 350k | +KES 250k – 350k |
| Staircase | — | KES 150k – 250k | +KES 150k – 250k |
| Roofing | KES 450k – 600k | KES 350k – 480k | -KES 100k – 120k |
| Labor | KES 450k – 650k | KES 550k – 750k | +KES 100k – 100k |
| **Net difference** | | | **+KES 370k – 780k** |

The maisonette costs roughly **KES 400,000 – 800,000 more** than the same floor area as a bungalow. But it uses less land — and in Nairobi, Kiambu, and Mombasa, that land saving is worth more than the construction premium.

## When a maisonette makes sense

- **Small plot (50x100 or less).** You need the floor area but cannot spread it out.
- **Urban area.** Maisonettes have higher resale value per sqm in Nairobi, Kiambu, and Mombasa.
- **You want a modern look.** Two-storey houses have more architectural presence.
- **You want privacy.** Living downstairs, sleeping upstairs.

## When a bungalow is better

- **Large plot.** No need to stack — spread out and keep it simple.
- **Elderly or disabled family members.** No stairs.
- **Hot climate.** A single-storey roof ventilates better.
- **Tight budget.** The bungalow is always cheaper for the same floor area.

## The takeaway

A 4-bedroom maisonette in Kenya costs **KES 6.0M – 8.2M** all-in, roughly KES 400,000 – 800,000 more than the same floor area as a bungalow. The premium pays for itself on small, expensive plots in urban areas. Use the calculator on this site to compare both options for your county.`
  },
  {
    slug: 'building-a-rental-unit-in-kenya-cost-guide',
    title: 'Building a Rental Unit in Kenya: The Complete Cost Guide',
    description: 'Everything you need to budget for a rental unit — from single bedsitters to 2-bedroom flats — with real ROI calculations.',
    category: 'Budgeting',
    readTime: '8 min read',
    publishDate: '2026-08-01',
    keywords: ['rental unit cost kenya', 'build rental units kenya', 'rental investment kenya', 'bedsitter cost kenya'],
    content: `## Why rentals are Kenya's most popular property investment

A 50x100 plot in most Kenyan towns costs KES 1.5M – 4M. Building rental units on it is the most common way Kenyans earn passive income from land. But the economics only work if you know the real costs and the real rents. This guide gives you both.

## The unit types

| Unit type | Size (sqm) | Cost per unit (basic, KES) | Monthly rent (KES) |
|---|---|---|---|
| Bedsitter | 20 – 25 | 700,000 – 900,000 | 8,000 – 12,000 |
| 1-bedroom | 35 – 45 | 1,200,000 – 1,600,000 | 15,000 – 20,000 |
| 2-bedroom | 55 – 70 | 2,200,000 – 2,800,000 | 25,000 – 35,000 |
| Single room (SQ) | 12 – 15 | 350,000 – 500,000 | 4,000 – 6,000 |

## How many units fit on a 50x100 plot?

A 50x100 plot is roughly 465 sqm. After setbacks (2m each side), parking, and walkways, you have about **250–300 sqm of buildable area**.

| Unit type | Units per plot | Total build cost (KES) |
|---|---|---|
| Bedsitter | 8 – 10 | 5.6M – 9.0M |
| 1-bedroom | 5 – 6 | 6.0M – 9.6M |
| 2-bedroom | 3 – 4 | 6.6M – 11.2M |
| Single room (SQ) | 12 – 16 | 4.2M – 8.0M |

## The full cost breakdown for a bedsitter block (8 units)

| Stage | Cost (KES) |
|---|---|
| Foundation (shared for 8 units) | 900,000 |
| Walls & superstructure | 1,400,000 |
| Roofing | 500,000 |
| Doors & windows | 600,000 |
| Electrical | 400,000 |
| Plumbing (shared water + drainage) | 500,000 |
| Finishes (basic) | 700,000 |
| Labor & supervision | 600,000 |
| **Construction subtotal** | **5,600,000** |
| Professional fees (3%) | 168,000 |
| Approvals & water connection | 80,000 |
| Contingency (10%) | 560,000 |
| **Total** | **6,408,000** |
| **Cost per unit (8 units)** | **801,000** |

## The ROI calculation

Using 8 bedsitters at KES 10,000/month rent:

| Item | Amount (KES) |
|---|---|
| Monthly rental income | 80,000 |
| Monthly expenses (maintenance, vacancy, management) | 12,000 |
| Net monthly income | 68,000 |
| Annual net income | 816,000 |
| Total build cost | 6,408,000 |
| **Gross yield** | **12.5%** |
| **Simple payback** | **7.9 years** |

Compare this to a 2-bedroom bungalow for yourself: it costs KES 4.5M and you live in it. The rental block costs KES 6.4M and pays you KES 68,000/month. For investment, the rental block wins — if you build in an area with rental demand.

## Where to build

The payback period only works if the units rent. Build in areas with:

- **Proximity to towns and employment centres.** People rent where they work.
- **Transport corridors.** Units near a matatu route rent faster than those 2km off the road.
- **Universities and hospitals.** Students and staff are reliable tenants.
- **Growing towns.** Ruaka, Kitengela, Syokimau, Rongai, and Eldoret town are current hotspots.

## What drives the cost up

- **Sloped or black-cotton soil.** Foundation costs jump 30–50%.
- **Water and sewer connection.** If there is no county water, you need a borehole (KES 800k – 1.5M) or a tank delivery system.
- **Boundary wall and gate.** KES 200k – 500k.
- **Parking and walkways.** KES 100k – 200k for cabro paving.

## How to keep costs down

1. **Build single-storey, not multi-storey.** A single-storey block of bedsitters costs 20–30% less than a 3-storey version of the same units. You lose some units, but you save on foundation, slab, and staircase costs.
2. **Share plumbing.** Stack the units so they share drainage lines and water tanks. Do not run separate plumbing for each unit.
3. **Basic finishes.** Tenants in this price range do not pay more for premium tiles. Cement screed, basic paint, standard mabati.
4. **Build all units at once.** Building 8 units in one go costs 15–20% less per unit than building 2 units, then 2 more, then 2 more. You share foundation, roofing, and labor.

## The takeaway

A bedsitter block of 8 units costs roughly **KES 6.4M** all-in and pays back in **7–9 years** at KES 10,000/month rent per unit. The investment works if you build in an area with rental demand and keep the finishes basic. Use the calculator on this site to estimate costs for your specific unit type and county.`
  },
  {
    slug: 'foundation-types-and-costs-in-kenya',
    title: 'Foundation Types and Costs in Kenya: What to Choose',
    description: 'Strip, raft, pad, and pile foundations compared — with cost ranges and when each makes sense for Kenyan soils.',
    category: 'Design',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['foundation cost kenya', 'strip foundation kenya', 'raft foundation kenya', 'black cotton soil foundation'],
    content: `## Why your foundation matters most

The foundation is 15–20% of your build cost, and it is the one stage where **getting it wrong is catastrophic.** A cracked foundation cannot be cheaply fixed. It can mean demolishing and rebuilding. So this is not the place to save money — but it is also not the place to overspend on a foundation you do not need.

## The four main foundation types in Kenya

### 1. Strip foundation (most common, cheapest)
A continuous strip of concrete under the load-bearing walls. Used on **stable, well-draining soil** (red soil, murram, rocky ground).

| House size | Cost (KES) |
|---|---|
| 2-bedroom (70 sqm) | 250,000 – 350,000 |
| 3-bedroom (100 sqm) | 350,000 – 480,000 |
| 4-bedroom bungalow (135 sqm) | 510,000 – 680,000 |
| 4-bedroom maisonette (135 sqm) | 680,000 – 850,000 |

**When to use:** Flat site, red soil or murram, good drainage, no high water table.

### 2. Pad foundation (for framed structures)
Isolated concrete pads under columns, connected by ground beams. Used for **framed structures** (columns and beams carry the load, not walls).

| House size | Cost (KES) |
|---|---|
| 4-bedroom maisonette (framed) | 800,000 – 1,100,000 |
| Apartment block (4 units) | 1,200,000 – 1,800,000 |

**When to use:** When you are building a framed structure (common for maisonettes and apartments), or when the soil is too soft for strip but not bad enough to need a raft.

### 3. Raft foundation (for soft soil)
A single reinforced concrete slab covering the entire footprint of the house. It "floats" on the soil, spreading the load evenly. Used on **black cotton soil, clay, or loose fill**.

| House size | Cost (KES) |
|---|---|
| 3-bedroom (100 sqm) | 550,000 – 750,000 |
| 4-bedroom bungalow (135 sqm) | 750,000 – 1,000,000 |
| 4-bedroom maisonette (135 sqm) | 1,000,000 – 1,300,000 |

**When to use:** Black cotton soil, clay, reclaimed land, or any soil that shrinks and swells with moisture. Common in parts of Nairobi (Embakasi, Ruai), Kisumu, and the coast.

### 4. Pile foundation (for very weak soil or high water table)
Deep concrete piles driven or bored into the ground until they reach firm strata. The most expensive option, but sometimes the only option.

| House size | Cost (KES) |
|---|---|
| 4-bedroom (any) | 1,500,000 – 3,000,000+ |

**When to use:** Very soft soil, high water table, reclaimed land near water, or when the firm strata is more than 3m below the surface. Rare for residential houses — usually only needed for high-rise apartments or very poor ground.

## How to know which one you need

You cannot guess. You need a **soil investigation** (geotechnical survey) before you choose a foundation. A basic soil test costs KES 15,000 – 35,000 and tells you:

- The soil type and bearing capacity
- The depth of firm strata
- The water table level
- Whether the soil is expansive (shrinks and swells)

**Do not skip this.** A KES 25,000 soil test can save you KES 500,000 in foundation costs (by confirming you do not need a raft) or save your entire house (by confirming you do).

## Black cotton soil: the Kenyan builder's enemy

Black cotton soil is expansive — it swells when wet and shrinks when dry. This movement cracks foundations and walls. It is common in:

- Parts of Nairobi (Embakasi, Ruai, Syokimau)
- Kisumu and the lakeshore
- The coast (parts of Mombasa and Kilifi)
- Floodplains and former swamps

If you have black cotton soil, you need either:
- A **raft foundation** (most common for houses)
- **Piles** (for larger or heavier structures)
- **Soil replacement**: excavate the black cotton to 1–1.5m depth and backfill with hardcore and murram (cheaper but only works if the black cotton layer is shallow)

## The takeaway

For most Kenyan residential builds on good soil, a **strip foundation** at KES 350,000 – 680,000 is all you need. On black cotton or clay, budget for a **raft foundation** at KES 750,000 – 1,300,000. Always do a soil test first — it costs KES 25,000 and tells you which foundation to build, saving you from both overbuilding and underbuilding.`
  },
  {
    slug: 'cost-of-building-permits-and-approvals-in-kenya',
    title: 'Building Permits and Approvals in Kenya: What They Cost',
    description: 'A county-by-county guide to NCA fees, county approval fees, and the hidden costs of getting your project signed off.',
    category: 'Process',
    readTime: '5 min read',
    publishDate: '2026-08-01',
    keywords: ['building permit cost kenya', 'nca fees kenya', 'county approval fees', 'building approvals kenya'],
    content: `## The approvals you need before you build

Before you cast a single block, you need approvals from three bodies:

1. **The county government** — planning permission and a building permit
2. **The National Construction Authority (NCA)** — project registration
3. **NEMA** — environmental impact assessment (only for large projects)

Skipping any of these can mean demolition orders, fines, or — most commonly — being unable to sell or mortgage the property later because it has no paperwork.

## NCA fees (national, fixed)

The NCA charges a registration fee based on the project value:

| Project value (KES) | NCA fee (KES) |
|---|---|
| Up to 1M | 5,000 |
| 1M – 5M | 10,000 |
| 5M – 20M | 20,000 |
| 20M – 100M | 50,000 |
| 100M+ | 100,000 |

You also need to register your contractor with the NCA (if you are using one). This costs KES 5,000 – 15,000 depending on the contractor's category.

## County building permit fees (varies by county)

Each county sets its own permit fees. These are based on the **plinth area** (total floor area) of the building:

| County | Fee per sqm (KES) | For a 135 sqm house |
|---|---|---|
| Nairobi | 200 – 300 | 27,000 – 40,500 |
| Kiambu | 150 – 250 | 20,250 – 33,750 |
| Machakos | 100 – 200 | 13,500 – 27,000 |
| Nakuru | 100 – 200 | 13,500 – 27,000 |
| Mombasa | 200 – 300 | 27,000 – 40,500 |
| Kisumu | 100 – 200 | 13,500 – 27,000 |
| Uasin Gishu (Eldoret) | 100 – 200 | 13,500 – 27,000 |

Some counties also charge a **plan scrutiny fee** (KES 5,000 – 15,000) and a **construction inspection fee** (KES 5,000 – 10,000).

## NEMA EIA (for larger projects)

An Environmental Impact Assessment is required for projects that are:
- More than 2 storeys
- More than 100 dwelling units
- On a plot larger than 2 acres
- In a sensitive area (near a river, forest, or national park)

An EIA costs KES 30,000 – 100,000 (done by a NEMA-registered expert) plus the NEMA review fee of KES 10,000 – 30,000.

For a standard residential house (1–2 storeys, single plot), you typically do **not** need a full EIA — just a basic environmental audit, which costs KES 10,000 – 20,000.

## The hidden costs

| Item | Cost (KES) |
|---|---|
| Architect's drawings (if not included in their fee) | 15,000 – 50,000 |
| Structural engineer's drawings | 10,000 – 30,000 |
| Title deed / search | 1,000 – 2,000 |
| Surveyor (if boundaries are unclear) | 10,000 – 25,000 |
| Stamp duty (on land transfer, not construction) | 4% of land value |
| Utility connection (water + electricity) | 30,000 – 80,000 |

## Total approval costs for a typical 4-bedroom house

| Item | Cost (KES) |
|---|---|
| NCA registration | 10,000 |
| County building permit | 27,000 |
| Plan scrutiny fee | 10,000 |
| Basic environmental audit | 15,000 |
| Utility connections | 50,000 |
| Drawings and searches | 30,000 |
| **Total** | **142,000** |

For most residential builds, budget **KES 100,000 – 200,000** for all approvals and connections. It is a small percentage of the total build (2–4%) but it is a cost that many people forget — and it has to be paid before construction starts.

## The takeaway

Budget **KES 100,000 – 200,000** for approvals and connections on a standard residential build. The NCA fee is fixed nationally; the county permit fee varies. Do not skip approvals — unapproved buildings cannot be sold or mortgaged, and counties are increasingly demolishing illegal structures.`
  },
  {
    slug: 'cost-of-finishes-tiles-paint-cabinetry',
    title: 'Finishes: Tiles, Paint, and Cabinetry — What They Really Cost',
    description: 'A breakdown of finishing costs in Kenya, from budget to premium, with brand recommendations and where to save vs splurge.',
    category: 'Materials',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['finishes cost kenya', 'tile prices kenya', 'paint cost kenya', 'kitchen cabinets cost kenya'],
    content: `## Why finishes are the biggest swing factor

Finishes are **18% of your total build cost** — but they are also the stage where you have the most control. The same house can cost KES 600,000 or KES 1,500,000 in finishes depending on what you choose. This guide helps you make those choices with real numbers.

## Floor tiles

| Type | Price per sqm (KES) | Best for |
|---|---|---|
| Ceramic (300x300mm) | 1,200 – 1,500 | Bathrooms, kitchens — budget option |
| Ceramic (600x600mm) | 1,500 – 2,200 | Living areas — mid-range |
| Porcelain (600x600mm) | 2,800 – 4,200 | Living areas — premium, more durable |
| Porcelain (marble look) | 4,500 – 7,000 | High-end living areas |
| Natural stone (granite/marble) | 6,000 – 12,000 | High-end, feature floors |

For a 135 sqm house, you need roughly **120 sqm of floor tiles** (after deducting walls):

| Type | Total cost (120 sqm) |
|---|---|
| Ceramic (budget) | 144,000 – 180,000 |
| Ceramic (mid) | 180,000 – 264,000 |
| Porcelain (mid) | 336,000 – 504,000 |
| Porcelain (premium) | 540,000 – 840,000 |

Add **KES 40,000 – 60,000** for adhesive, grout, and labor.

## Wall paint

| Brand | Type | Price per 4L (KES) | Coverage (sqm per 4L) |
|---|---|---|---|
| Crown | Vinyl Matt Emulsion | 2,800 | 40 – 50 |
| Crown | Vinyl Silk Emulsion | 3,200 | 40 – 50 |
| Dulux | Vinyl Matt | 3,000 | 40 – 50 |
| Dulux | Vinyl Silk | 3,500 | 40 – 50 |
| Crown | WeatherGuard (exterior) | 3,800 | 35 – 45 |

For a 135 sqm house, you need roughly **350 – 450 sqm of painted surface** (walls + ceiling):

> 400 sqm ÷ 45 sqm per 4L = **9 tins**
> 9 tins × KES 3,200 = **KES 28,800** (one coat of interior silk)
> Add primer + undercoat + 2 coats: **KES 50,000 – 70,000 total**

For exterior paint, add another KES 20,000 – 30,000.

## Kitchen cabinets

| Type | Cost per linear metre (KES) | For a 3m kitchen |
|---|---|---|
| MDF (flat-pack, budget) | 15,000 – 25,000 | 45,000 – 75,000 |
| MDF (made-to-measure) | 25,000 – 40,000 | 75,000 – 120,000 |
| Solid wood (hardwood) | 45,000 – 80,000 | 135,000 – 240,000 |

Add a countertop:

| Material | Price per linear metre (KES) |
|---|---|
| Laminate | 5,000 – 8,000 |
| Granite | 15,000 – 25,000 |
| Quartz | 25,000 – 40,000 |

A standard 3m kitchen with MDF cabinets and granite countertop: **KES 90,000 – 145,000**.

## Wardrobes

| Type | Cost per linear metre (KES) | For 4 bedrooms (6m total) |
|---|---|---|
| MDF (budget) | 12,000 – 20,000 | 72,000 – 120,000 |
| MDF (made-to-measure) | 20,000 – 35,000 | 120,000 – 210,000 |
| Solid wood | 35,000 – 60,000 | 210,000 – 360,000 |

## Bathroom fittings

| Item | Budget (KES) | Mid (KES) | Premium (KES) |
|---|---|---|---|
| WC pan (close-coupled) | 4,500 | 6,500 | 12,000 – 20,000 |
| Wash basin + pedestal | 3,500 | 5,500 | 10,000 – 18,000 |
| Shower set | 3,000 | 6,000 | 15,000 – 30,000 |
| Mixer taps (pair) | 2,500 | 4,500 | 8,000 – 15,000 |
| **Per bathroom** | **13,500** | **22,500** | **45,000 – 83,000** |

## Where to save and where to splurge

### Save on:
- **Floor tiles in bedrooms.** Nobody sees them under furniture. Use ceramic, not porcelain.
- **Paint.** Crown Vinyl Matt is fine for ceilings and bedrooms. You do not need silk everywhere.
- **Cabinet internals.** MDF with good hinges is fine. The doors are what people see.

### Splurge on:
- **Floor tiles in the living area.** This is the first thing visitors see. Porcelain, not ceramic.
- **The front door.** A solid timber or steel door with good hardware sets the tone.
- **Bathroom fittings in the master bathroom.** You use them every day. A good shower and a quality WC pan are worth it.
- **The kitchen countertop.** Granite or quartz. Laminate scratches and stains within 2 years.

## The takeaway

Finishes cost **KES 600,000 (basic) to KES 1,500,000 (premium)** for a standard 4-bedroom house. The biggest swing is in floor tiles and kitchen/bathroom fittings. Save on bedrooms and ceilings; splurge on the living area, front door, and master bathroom. Use the calculator on this site to see how finish level changes your total budget.`
  },
  {
    slug: 'cost-to-build-a-1-bedroom-house-in-kenya',
    title: 'Cost of Building a 1-Bedroom House in Kenya',
    description: 'A realistic cost guide for 1-bedroom houses and bedsitters — the most affordable permanent housing option in Kenya.',
    category: 'Budgeting',
    readTime: '4 min read',
    publishDate: '2026-08-01',
    keywords: ['cost of building 1 bedroom house kenya', 'bedsitter cost kenya', '1 bedroom house cost', 'cheapest house build kenya'],
    content: `## The short answer

A 1-bedroom house in Kenya costs **KES 1.2M – 2.0M** all-in as of 2026. A bedsitter costs **KES 700,000 – 900,000**. These are the most affordable permanent housing options in Kenya.

## 1-bedroom house cost breakdown

Using 45 sqm and mid-range finishes:

| Stage | Low (KES) | High (KES) |
|---|---|---|
| Foundation & substructure | 229,500 | 283,500 |
| Walls & superstructure | 336,600 | 415,800 |
| Roofing | 183,600 | 226,800 |
| Doors & windows | 122,400 | 151,200 |
| Electrical | 107,100 | 132,300 |
| Plumbing | 122,400 | 151,200 |
| Finishes | 275,400 | 340,200 |
| Labor & supervision | 153,000 | 189,000 |
| **Construction subtotal** | **1,529,400** | **1,890,000** |
| Professional fees (3%) | 45,882 | 56,700 |
| Approvals & site utilities | 20,000 | 40,000 |
| Contingency (10%) | 152,940 | 189,000 |
| **Total** | **1,748,222** | **2,175,700** |

For basic finishes, subtract 20–25%.

## Bedsitter cost breakdown

Using 20 sqm and basic finishes (KES 32,000/sqm):

| Stage | Low (KES) | High (KES) |
|---|---|---|
| Foundation & substructure | 96,000 | 118,400 |
| Walls & superstructure | 140,800 | 173,600 |
| Roofing | 76,800 | 94,720 |
| Doors & windows | 51,200 | 63,200 |
| Electrical | 44,800 | 55,360 |
| Plumbing | 51,200 | 63,200 |
| Finishes | 115,200 | 142,240 |
| Labor & supervision | 64,000 | 78,880 |
| **Construction subtotal** | **640,000** | **789,600** |
| Approvals & utilities | 15,000 | 25,000 |
| Contingency (10%) | 64,000 | 78,960 |
| **Total** | **719,000** | **893,560** |

## County variation

| County | 1-bedroom (mid) | Bedsitter (basic) |
|---|---|---|
| Nairobi / Kiambu | 1.9M – 2.2M | 800k – 950k |
| Nakuru / Eldoret | 1.7M – 2.0M | 720k – 860k |
| Mombasa / Kilifi | 1.8M – 2.1M | 760k – 900k |
| Kisumu / Kakamega | 1.6M – 1.9M | 690k – 820k |

## Why build a 1-bedroom or bedsitter?

1. **Most affordable permanent housing.** If you have land and a limited budget, this is how you get a permanent roof over your head.
2. **Rental investment.** 1-bedroom units rent for KES 15,000 – 20,000/month in most towns. Bedsitters rent for KES 8,000 – 12,000.
3. **Starter home.** Build a 1-bedroom now, extend later when you can afford it.
4. **Quick to build.** A 1-bedroom house takes 2–3 months from foundation to handover.

## How to keep it cheap

1. **Keep it under 50 sqm.** Every extra square metre adds KES 32,000 – 42,000.
2. **Open-plan kitchen and sitting room.** Fewer walls, less cost.
3. **Shared bathroom.** One bathroom, not two.
4. **Basic finishes.** Cement screed floors, standard paint, basic mabati roof.
5. **Build it yourself.** For a unit this small, you can manage the fundis directly without a main contractor.

## The takeaway

A 1-bedroom house costs **KES 1.2M – 2.0M** and a bedsitter costs **KES 700k – 900k** in most Kenyan counties. These are the most affordable entry points to permanent housing or rental investment. Use the calculator on this site to get a tailored estimate for your county.`
  },
  {
    slug: 'how-to-hire-a-contractor-in-kenya',
    title: 'How to Hire a Contractor in Kenya Without Getting Burned',
    description: 'A step-by-step guide to vetting, contracting, and managing a builder — with the clauses that protect you when things go wrong.',
    category: 'Process',
    readTime: '7 min read',
    publishDate: '2026-08-01',
    keywords: ['how to hire contractor kenya', 'construction contract kenya', 'nca registered contractor', 'building contractor kenya'],
    content: `## The wrong way to hire a contractor

Most Kenyans hire a contractor the same way: a friend recommends someone, you meet once, agree on a total price, shake hands, and start building. Six months later, the project is 40% over budget, the contractor has disappeared, and you have no legal recourse.

This guide is the right way.

## Step 1: Verify they are NCA-registered

Every construction contractor in Kenya must be registered with the **National Construction Authority (NCA)**. The NCA categorises contractors from NCA 1 (largest, can build anything) to NCA 8 (smallest, minor works only).

For a residential house:
- **NCA 4–6** is sufficient for a standard bungalow or maisonette
- **NCA 3–5** for an apartment block

Check their registration on the NCA website or ask for their NCA certificate. If they are not registered, walk away. An unregistered contractor cannot get NCA project approval, and you will be stuck with an illegal build.

## Step 2: Visit their previous projects

Ask for 3 recent projects. Go and see them. Talk to the owners if you can. You are checking for:

- **Quality of finishes.** Look at tile alignment, paint coverage, and joint quality.
- **Timeliness.** Did they finish on time? Ask the owner.
- **Cost management.** Did the project stay within budget? Ask the owner.
- **Willingness to recommend.** Would the owner hire them again?

If a contractor cannot give you 3 recent projects with owners who will talk to you, they are not experienced enough for your build.

## Step 3: Get itemised quotes from at least three contractors

A proper quote breaks the cost into:

1. **Materials** — with quantities and unit prices
2. **Labor** — per stage
3. **Equipment hire**
4. **Contingency** (usually 5–10%)

If a contractor gives you a single total number with no breakdown, they are either hiding something or they do not know their own costs. Either way, walk away.

Compare the quotes **line by line**, not just the totals. A quote that is 20% cheaper usually has a line item missing.

## Step 4: Check their financial stability

A contractor who is broke will use your deposit to finish their previous project, then start yours with the next client's deposit. This is how projects stall.

Ask for:
- **Bank references** (a letter from their bank confirming they have an active business account)
- **Evidence of ongoing projects** (if they have 3 other projects running, they have cash flow)
- **Supplier references** (a hardware or a cement distributor who confirms they pay on time)

You do not need to audit their books. You need to confirm they are not one unpaid invoice away from collapse.

## Step 5: Write a proper contract

A handshake is not a contract. Your contract should include:

### Essential clauses:
1. **Scope of work** — what they are building, to what drawings and specifications
2. **Contract sum** — the total, broken down by stage
3. **Payment terms** — stage-based, with 10–15% retention per stage
4. **Completion date** — with a liquidated damages clause (they pay you KES X per day of delay)
5. **Variations** — how changes to the scope are priced and approved (in writing, before the work is done)
6. **Defects liability period** — 3–6 months after handover, during which they fix any defects for free
7. **Termination** — your right to terminate if they abandon the site or fail to perform
8. **Insurance** — they must have third-party insurance and worker's compensation

### Payment schedule (standard):
| Stage | % of contract sum |
|---|---|
| On signing | 10% (mobilisation) |
| Foundation complete | 20% |
| Walling to ring beam | 20% |
| Roofing complete | 20% |
| Finishes complete | 20% |
| After defects liability | 10% (retention released) |

**Never pay more than 10% upfront.** A contractor who demands 30% or 50% upfront is using your money to fund another project.

## Step 6: Manage them actively

Hiring a good contractor is not the end of your job. You still need to:

- **Visit the site weekly.** The biggest source of quality problems is unsupervised work.
- **Approve every variation in writing.** If the contractor adds work without your written approval, you do not pay for it.
- **Pay on time when stages are complete.** If you delay payment, the contractor delays work — and you lose the moral authority to demand progress.
- **Document everything.** Photos, emails, WhatsApp messages, and site meeting notes. If there is a dispute, the paper trail wins.

## Step 7: Hold the retention

The 10% retention is your insurance. Do not release it until the defects liability period (3–6 months after handover) is over and all defects are fixed. If you release it early, the contractor has no incentive to come back and fix the cracked tile or the leaking pipe.

## The takeaway

Hire an NCA-registered contractor, visit their previous projects, get itemised quotes from three, write a proper contract with stage-based payments and retention, and manage them actively. The contractor works for you — not the other way around. A good contractor is worth their fee. A bad one will cost you 30% more than you budgeted.`
  },
  {
    slug: 'cost-to-build-vs-buy-a-house-in-kenya',
    title: 'Build vs Buy: Is It Cheaper to Build or Buy a House in Kenya?',
    description: 'A side-by-side comparison of the cost of building a house versus buying an existing one in Kenya, with the hidden costs of each.',
    category: 'Budgeting',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    keywords: ['build vs buy house kenya', 'cheaper to build or buy kenya', 'cost of building vs buying house'],
    content: `## The question

You have KES 5M – 8M. Do you buy an existing house, or do you buy land and build? The answer depends on where you want to live, how much time you have, and whether you value control over convenience.

## The headline comparison

For a 4-bedroom house in a mid-market Nairobi suburb (e.g., Kitengela, Ruaka, Syokimau):

| Option | Cost (KES) | Time | Customisation |
|---|---|---|---|
| Buy existing | 7.5M – 9.5M | 1–3 months | Limited (you renovate) |
| Buy land + build | 6.5M – 8.5M | 8–14 months | Full control |

Building is typically **10–20% cheaper** than buying a comparable house, but it takes 8–14 months and demands your time. Buying is more expensive but you move in immediately.

## Option 1: Buy an existing house

### What you pay:
| Item | Cost (KES) |
|---|---|
| House price | 7,500,000 – 9,500,000 |
| Stamp duty (4% of price) | 300,000 – 380,000 |
| Lawyer's fees (1.5%) | 112,500 – 142,500 |
| Agent's fees (usually seller pays, but sometimes split) | 0 – 190,000 |
| Mortgage processing fee (if mortgaged) | 50,000 – 100,000 |
| **Total** | **7,962,500 – 10,312,500** |

### Pros:
- **Move in immediately.** No construction wait.
- **What you see is what you get.** You can inspect the house before buying.
- **Established neighbourhood.** You know the area, the neighbours, and the amenities.
- **Easier to mortgage.** Banks lend more easily on completed houses.

### Cons:
- **More expensive.** You pay a premium for someone else's time and effort.
- **Limited customisation.** You get their layout, their finishes, their choices.
- **Hidden defects.** A fresh paint job can hide structural cracks, leaking roofs, or poor plumbing.
- **Renovation costs.** If you want to change anything, you pay on top of the purchase price.

## Option 2: Buy land and build

### What you pay:
| Item | Cost (KES) |
|---|---|
| Plot (50x100, mid-market suburb) | 1,500,000 – 3,500,000 |
| Construction (4-bedroom, mid-range) | 5,400,000 – 7,000,000 |
| Approvals and connections | 100,000 – 200,000 |
| Professional fees | 280,000 – 620,000 |
| Contingency (10%) | 540,000 – 700,000 |
| **Total** | **7,820,000 – 12,020,000** |

### Pros:
- **10–20% cheaper** than buying a comparable house.
- **Full control.** You choose the layout, the finishes, the everything.
- **Modern specifications.** You build to current standards, not 10-year-old ones.
- **Personal satisfaction.** You get exactly what you want.

### Cons:
- **8–14 months of work.** Building is a part-time job for that period.
- **Cost overruns.** Even with a good budget, expect 10–15% more than you planned.
- **Stress.** Managing fundis, suppliers, and contractors is demanding.
- **Harder to mortgage.** Banks are cautious about lending for construction on undeveloped land.

## The hidden costs of buying

- **Renovation.** Most existing houses need KES 200,000 – 800,000 in updates (paint, tiles, kitchen, electrical).
- **Deferred maintenance.** A 10-year-old house may need a new roof, new plumbing, or new electricals within 5 years.
- **Inflated asking prices.** In hot markets, sellers ask 10–20% above fair value. Negotiate hard.

## The hidden costs of building

- **Time.** 8–14 months of project management.
- **Cost overruns.** Budget 10–15% extra.
- **Opportunity cost.** If you are paying rent while building, add that to the total.
- **Land risk.** Make sure the title is clean and the land is not in a dispute.

## When to buy

- You need to move immediately (job relocation, family situation).
- You found a house that is exactly what you want.
- You do not have the time to manage a build.
- You are in a hot market where land + construction is more expensive than buying (rare, but it happens in prime Nairobi areas).

## When to build

- You have 8–14 months before you need to move in.
- You want a specific layout or design.
- You want to save 10–20%.
- You already have land.
- You are building outside Nairobi, where land is cheaper and building is the only realistic option.

## The takeaway

Building is **10–20% cheaper** than buying a comparable house in Kenya, but it costs you 8–14 months and active management. If you have the time and the temperament, build. If you need to move now or you value convenience, buy. Use the calculator on this site to estimate the build cost for your specific design and county, then compare it to asking prices in your target area.`
  },
];
