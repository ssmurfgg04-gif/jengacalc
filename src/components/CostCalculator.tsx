import { useState, useMemo, useCallback } from 'react';
import {
  COUNTIES,
  HOUSE_TYPES,
  FINISH_TIERS,
  type FinishTier,
  type HouseType,
} from '@/data/kenya';
import {
  calculateEstimate,
  formatKes,
  formatKesFull,
  getDefaultSize,
  type EstimateResult,
} from '@/lib/costEngine';

const CHART_COLORS = [
  '#B06B2E',
  '#332F27',
  '#3D5A2A',
  '#1F6A99',
  '#8C2D20',
  '#D4BC2A',
  '#6B6454',
  '#A89820',
];

interface Props {
  defaultCounty?: string;
  defaultHouseType?: HouseType;
  defaultBedrooms?: number;
  defaultFinishTier?: FinishTier;
  defaultSizeSqm?: number;
}

export default function CostCalculator({
  defaultCounty = 'nairobi',
  defaultHouseType = 'bungalow',
  defaultBedrooms = 3,
  defaultFinishTier = 'mid',
  defaultSizeSqm,
}: Props) {
  const [countySlug, setCountySlug] = useState(defaultCounty);
  const [houseType, setHouseType] = useState<HouseType>(defaultHouseType);
  const [bedrooms, setBedrooms] = useState(defaultBedrooms);
  const [finishTier, setFinishTier] = useState<FinishTier>(defaultFinishTier);
  const [sizeSqm, setSizeSqm] = useState(
    defaultSizeSqm ?? getDefaultSize(defaultHouseType, defaultBedrooms)
  );
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleHouseTypeChange = useCallback((type: HouseType) => {
    setHouseType(type);
    setSizeSqm(getDefaultSize(type, bedrooms));
  }, [bedrooms]);

  const handleBedroomsChange = useCallback((count: number) => {
    setBedrooms(count);
    setSizeSqm(getDefaultSize(houseType, count));
  }, [houseType]);

  const result: EstimateResult = useMemo(
    () => calculateEstimate({ countySlug, houseType, bedrooms, finishTier, sizeSqm }),
    [countySlug, houseType, bedrooms, finishTier, sizeSqm]
  );

  const totalRange = `${formatKes(result.totalLow)} – ${formatKes(result.totalHigh)}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = `Build Cost Estimate\n${result.houseTypeLabel} in ${result.county.name}\n${result.finishTierLabel}\nSize: ${sizeSqm} sqm\n\nTotal: ${formatKesFull(result.totalLow)} – ${formatKesFull(result.totalHigh)}\nPer sqm: ${formatKesFull(result.perSqmLow)} – ${formatKesFull(result.perSqmHigh)}\n\n${result.breakdown.map((b) => `${b.category}: ${formatKesFull(b.lowKes)} – ${formatKesFull(b.highKes)}`).join('\n')}\n\nEstimate from JengaCalc.co.ke`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result, sizeSqm]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <h3 className="font-display text-lg font-medium text-ink-900">Your Build</h3>
          <p className="mt-1 text-sm text-ink-500">Tell us what you're building.</p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="county" className="eyebrow mb-2 block">County</label>
              <select
                id="county"
                className="select-field"
                value={countySlug}
                onChange={(e) => setCountySlug(e.target.value)}
              >
                {COUNTIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="houseType" className="eyebrow mb-2 block">House Type</label>
              <select
                id="houseType"
                className="select-field"
                value={houseType}
                onChange={(e) => handleHouseTypeChange(e.target.value as HouseType)}
              >
                {HOUSE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-ink-400">
                {HOUSE_TYPES.find((t) => t.value === houseType)?.description}
              </p>
            </div>

            <div>
              <label htmlFor="bedrooms" className="eyebrow mb-2 block">Bedrooms</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleBedroomsChange(n)}
                    className={`flex-1 rounded-md border py-2.5 text-sm font-medium transition-all ${
                      bedrooms === n
                        ? 'border-clay-500 bg-clay-600 text-ink-50'
                        : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="finishTier" className="eyebrow mb-2 block">Finish Level</label>
              <div className="space-y-2">
                {FINISH_TIERS.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setFinishTier(tier.value)}
                    className={`w-full rounded-md border p-3 text-left transition-all ${
                      finishTier === tier.value
                        ? 'border-clay-500 bg-clay-50'
                        : 'border-ink-200 bg-white hover:border-ink-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-800">{tier.label}</span>
                      <span className="font-mono text-xs text-clay-600">
                        KES {tier.perSqm.toLocaleString()}/sqm
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">{tier.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="sizeSqm" className="eyebrow mb-2 flex items-center justify-between">
                <span>Floor Area</span>
                <span className="font-mono text-ink-800">{sizeSqm} sqm</span>
              </label>
              <input
                id="sizeSqm"
                type="range"
                min={20}
                max={300}
                step={5}
                value={sizeSqm}
                onChange={(e) => setSizeSqm(Number(e.target.value))}
                className="w-full accent-clay-600"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>20 sqm</span>
                <span>300 sqm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="card animate-fade-up p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Estimated Total Cost</p>
              <p className="mt-2 font-display text-display-md font-semibold text-ink-900">
                {totalRange}
              </p>
              <p className="mt-2 text-sm text-ink-500">
                {result.houseTypeLabel} &middot; {result.county.name} &middot; {result.finishTierLabel}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ink-400 hover:text-ink-900"
              >
                {copied ? 'Copied!' : 'Copy estimate'}
              </button>
              <div className="text-right">
                <p className="eyebrow">Per sqm</p>
                <p className="mt-1 font-mono text-lg text-ink-700">
                  {formatKes(result.perSqmLow)} – {formatKes(result.perSqmHigh)}
                </p>
              </div>
            </div>
          </div>

          {/* Cost breakdown bar */}
          <div className="mt-8">
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {result.breakdown.map((item, i) => (
                <div
                  key={item.category}
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${item.share * 100}%`,
                    backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                  }}
                  title={`${item.category}: ${Math.round(item.share * 100)}%`}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {result.breakdown.map((item, i) => (
                <div key={item.category} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="truncate text-xs text-ink-600">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown toggle */}
          <button
            type="button"
            onClick={() => setShowBreakdown((s) => !s)}
            className="mt-6 flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
          >
            {showBreakdown ? 'Hide' : 'Show'} itemised breakdown
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showBreakdown && (
            <div className="mt-4 animate-fade-in overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200">
                    <th className="py-2 text-left font-medium text-ink-500">Stage</th>
                    <th className="py-2 text-right font-medium text-ink-500">Low</th>
                    <th className="py-2 text-right font-medium text-ink-500">High</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((item, i) => (
                    <tr key={item.category} className="border-b border-ink-100">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-sm"
                            style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                          />
                          <span className="text-ink-700">{item.category}</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-mono text-ink-600">{formatKesFull(item.lowKes)}</td>
                      <td className="py-2.5 text-right font-mono text-ink-600">{formatKesFull(item.highKes)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-ink-300 bg-ink-50">
                    <td className="py-3 font-semibold text-ink-900">Total (construction only)</td>
                    <td className="py-3 text-right font-mono font-semibold text-ink-900">{formatKesFull(result.totalLow)}</td>
                    <td className="py-3 text-right font-mono font-semibold text-ink-900">{formatKesFull(result.totalHigh)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-ink-400">
                Excludes professional fees (3–5%), approvals (KES 100k–200k), and contingency (10%).
                Add these for your all-in budget.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 rounded-md bg-clay-50 p-5">
            <h4 className="font-display text-base font-medium text-ink-900">
              Get the full Bill of Quantities
            </h4>
            <p className="mt-1.5 text-sm text-ink-600">
              Download a detailed, itemised BOQ with material quantities for your foreman.
              Pay KES 200 via M-Pesa. Delivered instantly.
            </p>
            <button className="btn-primary mt-4 w-full sm:w-auto">
              Download Full BOQ — KES 200
            </button>
          </div>

          {/* Submit your build cost */}
          <div className="mt-4 border-t border-ink-100 pt-4">
            <p className="text-sm text-ink-500">
              Already built something similar?{' '}
              <a href="/submit-build-cost" className="link-underline font-medium text-clay-600">
                Share your actual cost
              </a>{' '}
              to help other builders get better estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
