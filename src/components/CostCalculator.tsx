import { useState, useMemo, useCallback } from 'react';
import {
  COUNTIES,
  HOUSE_TYPES,
  FINISH_TIERS,
  PRICE_DATA_UPDATED,
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

type SoilType = 'standard' | 'black_cotton' | 'rocky' | 'not_sure';
type RoadAccess = 'good' | 'fair' | 'poor' | 'not_sure';
type PlotOwnership = 'yes' | 'no' | 'not_sure';

const STEPS = [
  { id: 1, label: 'Where' },
  { id: 2, label: 'What' },
  { id: 3, label: 'Size' },
  { id: 4, label: 'Finish' },
  { id: 5, label: 'Your plot' },
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
  const [step, setStep] = useState(1);
  const [countySlug, setCountySlug] = useState(defaultCounty);
  const [houseType, setHouseType] = useState<HouseType>(defaultHouseType);
  const [bedrooms, setBedrooms] = useState(defaultBedrooms);
  const [finishTier, setFinishTier] = useState<FinishTier>(defaultFinishTier);
  const [sizeSqm, setSizeSqm] = useState(
    defaultSizeSqm ?? getDefaultSize(defaultHouseType, defaultBedrooms)
  );
  const [sizeManual, setSizeManual] = useState(Boolean(defaultSizeSqm));

  const [soilType, setSoilType] = useState<SoilType>('not_sure');
  const [roadAccess, setRoadAccess] = useState<RoadAccess>('not_sure');
  const [plotOwnership, setPlotOwnership] = useState<PlotOwnership>('not_sure');

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStage, setCheckoutStage] = useState<'form' | 'paybill' | 'done'>('form');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const handleHouseTypeChange = useCallback((type: HouseType) => {
    setHouseType(type);
    setSizeSqm(getDefaultSize(type, bedrooms));
    setSizeManual(false);
  }, [bedrooms]);

  const handleBedroomsChange = useCallback((count: number) => {
    setBedrooms(count);
    if (!sizeManual) setSizeSqm(getDefaultSize(houseType, count));
  }, [houseType, sizeManual]);

  const result: EstimateResult = useMemo(
    () => calculateEstimate({ countySlug, houseType, bedrooms, finishTier, sizeSqm }),
    [countySlug, houseType, bedrooms, finishTier, sizeSqm]
  );

  const personalizationNotes = useMemo(() => {
    const notes: string[] = [];
    if (soilType === 'black_cotton') {
      notes.push(
        'Black cotton soil swells when wet and can crack foundations. Budget 30–50% more for the foundation stage, and get a soil test before pouring.'
      );
    }
    if (soilType === 'rocky') {
      notes.push('Rocky terrain usually means extra excavation and blasting/breaking costs on the substructure stage.');
    }
    if (roadAccess === 'poor' || roadAccess === 'fair') {
      notes.push('Remote or poor road access often adds material transport charges (roughly 5–8% of material cost).');
    }
    if (plotOwnership !== 'yes') {
      notes.push('This estimate is construction only — land purchase, transfer and title fees are separate and not included.');
    }
    return notes;
  }, [soilType, roadAccess, plotOwnership]);

  const totalRange = `${formatKes(result.totalLow)} – ${formatKes(result.totalHigh)}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = `Build Cost Estimate\n${result.houseTypeLabel} in ${result.county.name}\n${result.finishTierLabel}\nSize: ${sizeSqm} sqm\n\nTotal: ${formatKesFull(result.totalLow)} – ${formatKesFull(result.totalHigh)}\nPer sqm: ${formatKesFull(result.perSqmLow)} – ${formatKesFull(result.perSqmHigh)}\n\n${result.breakdown.map((b) => `${b.category}: ${formatKesFull(b.lowKes)} – ${formatKesFull(b.highKes)}`).join('\n')}\n\nEstimate from JengaCalc.co.ke`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result, sizeSqm]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^07\d{8}$/.test(phone.replace(/\s/g, '')) || !email.includes('@')) return;
    setCheckoutStage('paybill');
  };

  const finishOrder = () => {
    setOrderNote(`Order confirmed for ${email}. Estimate delivered below — use Print / Save as PDF to keep your copy.`);
    setCheckoutStage('done');
  };

  const countyName = result.county.name;
  const orderRef = `JENGA-${email.split('@')[0].slice(0, 6).toUpperCase() || 'YOU'}`;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="mb-6">
            <h3 className="font-display text-lg font-medium text-ink-900">
              Your personalized estimate
            </h3>
            <p className="mt-1 text-sm text-ink-500">
              Answer a few quick steps and we'll build an estimate for your specific build.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6 flex items-center gap-2">
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => s.id < 6 && setStep(s.id)}
                  aria-label={`Step ${s.id}: ${s.label}`}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    step === s.id ? 'bg-clay-600' : step > s.id ? 'bg-clay-300' : 'bg-ink-100'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="min-h-[300px]">
            {/* STEP 1 — County */}
            {step === 1 && (
              <div className="animate-fade-in">
                <label htmlFor="county" className="eyebrow mb-2 block">Where are you building?</label>
                <p className="mb-4 text-sm text-ink-500">Labor and transport costs vary a lot by county.</p>
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
                <p className="mt-2 text-xs text-ink-400">
                  Prices here are adjusted for {result.county.name}'s local labor and transport costs.
                </p>
              </div>
            )}

            {/* STEP 2 — House type + bedrooms */}
            {step === 2 && (
              <div className="animate-fade-in">
                <label className="eyebrow mb-2 block">What are you building?</label>
                <div className="space-y-2">
                  {HOUSE_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => handleHouseTypeChange(t.value)}
                      className={`w-full rounded-md border p-3 text-left transition-all ${
                        houseType === t.value
                          ? 'border-clay-500 bg-clay-50'
                          : 'border-ink-200 bg-white hover:border-ink-300'
                      }`}
                    >
                      <span className="text-sm font-semibold text-ink-800">{t.label}</span>
                      <span className="mt-0.5 block text-xs text-ink-500">{t.description}</span>
                    </button>
                  ))}
                </div>
                {houseType !== 'bedsitter' && (
                  <div className="mt-4">
                    <label className="eyebrow mb-2 block">Bedrooms</label>
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
                )}
              </div>
            )}

            {/* STEP 3 — Size */}
            {step === 3 && (
              <div className="animate-fade-in">
                <label className="eyebrow mb-2 block">How big is the floor area?</label>
                {!sizeManual ? (
                  <div className="rounded-md border border-ink-200 bg-ink-50 p-4">
                    <p className="text-sm text-ink-700">
                      We estimated <span className="font-semibold">{sizeSqm} sqm</span> for a {bedrooms}-bedroom {result.houseTypeLabel.toLowerCase()}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSizeManual(true)}
                      className="mt-2 text-sm font-medium text-clay-600 hover:text-clay-700"
                    >
                      I know my size — set it manually
                    </button>
                  </div>
                ) : (
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
                )}
              </div>
            )}

            {/* STEP 4 — Finish */}
            {step === 4 && (
              <div className="animate-fade-in">
                <label className="eyebrow mb-2 block">Finish level</label>
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
            )}

            {/* STEP 5 — Plot (optional) */}
            {step === 5 && (
              <div className="animate-fade-in">
                <label className="eyebrow mb-1 block">Your plot (optional)</label>
                <p className="mb-4 text-sm text-ink-500">
                  These details make your estimate feel real — they're the ones a generic calculator ignores.
                </p>

                <p className="mb-2 text-sm font-medium text-ink-700">Soil / terrain</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {([
                    ['standard', 'Normal'],
                    ['black_cotton', 'Black cotton'],
                    ['rocky', 'Rocky'],
                    ['not_sure', 'Not sure'],
                  ] as [SoilType, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSoilType(val)}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-all ${
                        soilType === val
                          ? 'border-clay-500 bg-clay-600 text-ink-50'
                          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <p className="mb-2 text-sm font-medium text-ink-700">Road access to plot</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {([
                    ['good', 'Good (tarmac)'],
                    ['fair', 'Fair (murram)'],
                    ['poor', 'Poor / remote'],
                    ['not_sure', 'Not sure'],
                  ] as [RoadAccess, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRoadAccess(val)}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-all ${
                        roadAccess === val
                          ? 'border-clay-500 bg-clay-600 text-ink-50'
                          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <p className="mb-2 text-sm font-medium text-ink-700">Do you own the plot?</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    ['yes', 'Yes'],
                    ['no', 'No, buying'],
                    ['not_sure', 'Not sure'],
                  ] as [PlotOwnership, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPlotOwnership(val)}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-all ${
                        plotOwnership === val
                          ? 'border-clay-500 bg-clay-600 text-ink-50'
                          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-ink-400 disabled:opacity-40"
            >
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="btn-primary px-5"
              >
                Continue
              </button>
            ) : (
              <button type="button" onClick={() => setStep(6)} className="btn-primary px-5">
                Get my estimate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        {step < 6 ? (
          <div className="card flex h-full flex-col items-start justify-center p-6 text-center md:p-8">
            <div className="mx-auto">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay-50 text-2xl">
                🏗️
              </div>
              <h4 className="mt-4 font-display text-lg font-medium text-ink-900">
                Your estimate will appear here
              </h4>
              <p className="mt-2 max-w-sm text-sm text-ink-500">
                Answer the steps on the left and we'll give you a personalized range — not a generic per-sqm number.
              </p>
            </div>
          </div>
        ) : (
          <div className="card animate-fade-up p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Your Estimated Total Cost</p>
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

            {/* Trust signal */}
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-500">
              <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />
              Pricing data last updated {new Date(PRICE_DATA_UPDATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            {/* Cost breakdown bar */}
            <div className="mt-6">
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

            {/* Personalization notes */}
            {personalizationNotes.length > 0 && (
              <div className="mt-6 rounded-md border border-clay-200 bg-clay-50 p-4">
                <h4 className="font-display text-sm font-semibold text-ink-900">
                  What could change this for your plot
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                  {personalizationNotes.map((n, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-clay-600">•</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Paid CTA */}
            <div className="mt-6 rounded-md bg-clay-50 p-5">
              <h4 className="font-display text-base font-medium text-ink-900">
                Get your full itemized breakdown PDF
              </h4>
              <p className="mt-1.5 text-sm text-ink-600">
                A detailed, itemised estimate tailored to your build with material-level quantities and notes for your foreman. Pay once via M-Pesa — delivered instantly.
              </p>
              <button
                type="button"
                onClick={() => { setShowCheckout(true); setCheckoutStage('form'); }}
                className="btn-primary mt-4 w-full sm:w-auto"
              >
                Get my PDF — KES 200
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
        )}
      </div>

      {/* Checkout fake-door modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4" onClick={() => setShowCheckout(false)}>
          <div
            className="w-full max-w-md animate-fade-in rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {checkoutStage === 'form' && (
              <>
                <h4 className="font-display text-lg font-semibold text-ink-900">Your personalized PDF</h4>
                <p className="mt-1 text-sm text-ink-500">
                  {result.houseTypeLabel} · {countyName} · {sizeSqm} sqm · {result.finishTierLabel}
                </p>
                <p className="mt-3 text-2xl font-semibold text-ink-900">KES 200</p>
                <form onSubmit={handleCheckoutSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="eyebrow mb-1 block">Email (for delivery)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field w-full"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="eyebrow mb-1 block">M-Pesa phone number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field w-full"
                      placeholder="07XXXXXXXX"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Pay KES 200 via M-Pesa</button>
                </form>
              </>
            )}

            {checkoutStage === 'paybill' && (
              <>
                <h4 className="font-display text-lg font-semibold text-ink-900">Complete payment</h4>
                <div className="mt-4 space-y-3 rounded-lg border border-ink-200 bg-ink-50 p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-500">Paybill</span>
                    <span className="font-mono font-semibold text-ink-900">247247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">Account</span>
                    <span className="font-mono font-semibold text-ink-900">{orderRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">Amount</span>
                    <span className="font-mono font-semibold text-ink-900">KES 200</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink-400">
                  Open M-Pesa &gt; Pay &gt; Paybill, enter the details above, then confirm below. Your PDF is delivered instantly.
                </p>
                <button onClick={finishOrder} className="btn-primary mt-4 w-full">
                  I've sent KES 200 — show my PDF
                </button>
              </>
            )}

            {checkoutStage === 'done' && (
              <>
                <h4 className="font-display text-lg font-semibold text-ink-900">Your estimate is ready</h4>
                <p className="mt-1 text-sm text-ink-500">{orderNote}</p>
                <div className="mt-4 max-h-56 overflow-y-auto rounded-lg border border-ink-200 p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-ink-200 text-left">
                        <th className="py-1.5 font-medium text-ink-500">Stage</th>
                        <th className="py-1.5 text-right font-medium text-ink-500">Low</th>
                        <th className="py-1.5 text-right font-medium text-ink-500">High</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.breakdown.map((item, i) => (
                        <tr key={item.category} className="border-b border-ink-100">
                          <td className="py-2 text-ink-700">{item.category}</td>
                          <td className="py-2 text-right font-mono text-ink-600">{formatKesFull(item.lowKes)}</td>
                          <td className="py-2 text-right font-mono text-ink-600">{formatKesFull(item.highKes)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-2 font-semibold text-ink-900">Total (construction only)</td>
                        <td className="py-2 text-right font-mono font-semibold text-ink-900">{formatKesFull(result.totalLow)}</td>
                        <td className="py-2 text-right font-mono font-semibold text-ink-900">{formatKesFull(result.totalHigh)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button onClick={() => window.print()} className="btn-primary mt-4 w-full">
                  Print / Save as PDF
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setShowCheckout(false)}
              className="mt-3 w-full text-center text-sm font-medium text-ink-400 hover:text-ink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
