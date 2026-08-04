import {
  COUNTIES,
  FINISH_TIERS,
  COST_BREAKDOWN,
  type CountyInfo,
  type FinishTier,
  type HouseType,
} from '@/data/kenya';

export interface EstimateInput {
  countySlug: string;
  houseType: HouseType;
  bedrooms: number;
  finishTier: FinishTier;
  sizeSqm: number;
}

export interface EstimateLineItem {
  category: string;
  description: string;
  lowKes: number;
  highKes: number;
  share: number;
}

export interface EstimateResult {
  totalLow: number;
  totalHigh: number;
  midpoint: number;
  perSqmLow: number;
  perSqmHigh: number;
  sizeSqm: number;
  breakdown: EstimateLineItem[];
  county: CountyInfo;
  finishTierLabel: string;
  houseTypeLabel: string;
}

const HOUSE_TYPE_MULTIPLIER: Record<HouseType, number> = {
  bedsitter: 0.92,
  bungalow: 1.0,
  maisonette: 1.12,
  apartment: 0.95,
};

const HOUSE_TYPE_LABELS: Record<HouseType, string> = {
  bedsitter: 'Bedsitter / Single Room',
  bungalow: 'Bungalow',
  maisonette: 'Maisonette',
  apartment: 'Apartment Unit',
};

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const county = COUNTIES.find((c) => c.slug === input.countySlug) ?? COUNTIES[0];
  const tier = FINISH_TIERS.find((t) => t.value === input.finishTier) ?? FINISH_TIERS[1];

  const basePerSqm = tier.perSqm;
  const typeMultiplier = HOUSE_TYPE_MULTIPLIER[input.houseType];

  const adjustedPerSqm =
    basePerSqm * typeMultiplier * county.laborMultiplier * county.transportMultiplier;

  const perSqmLow = Math.round((adjustedPerSqm * 0.88) / 100) * 100;
  const perSqmHigh = Math.round((adjustedPerSqm * 1.12) / 100) * 100;

  const totalLow = perSqmLow * input.sizeSqm;
  const totalHigh = perSqmHigh * input.sizeSqm;

  const breakdown: EstimateLineItem[] = COST_BREAKDOWN.map((item) => ({
    category: item.category,
    description: item.description,
    share: item.share,
    lowKes: Math.round((totalLow * item.share) / 1000) * 1000,
    highKes: Math.round((totalHigh * item.share) / 1000) * 1000,
  }));

  return {
    totalLow,
    totalHigh,
    midpoint: Math.round((totalLow + totalHigh) / 2),
    perSqmLow,
    perSqmHigh,
    sizeSqm: input.sizeSqm,
    breakdown,
    county,
    finishTierLabel: tier.label,
    houseTypeLabel: HOUSE_TYPE_LABELS[input.houseType],
  };
}

export function formatKes(amount: number): string {
  if (amount >= 1_000_000) {
    return `KES ${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function formatKesFull(amount: number): string {
  return `KES ${Math.round(amount).toLocaleString('en-KE')}`;
}

export function getDefaultSize(houseType: HouseType, bedrooms: number): number {
  if (houseType === 'bedsitter') return 20;
  if (houseType === 'apartment') return 45 + bedrooms * 10;
  if (houseType === 'maisonette') return 60 + bedrooms * 18;
  return 45 + bedrooms * 20;
}
