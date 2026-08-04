import { useState, useEffect, useMemo } from 'react';
import { MATERIAL_PRICES, type MaterialPrice } from '@/data/kenya';
import { submitPrice } from '@/lib/clientStore';

const CATEGORIES = ['All', 'Cement', 'Steel', 'Roofing', 'Walling', 'Aggregates', 'Timber', 'Paint', 'Finishes', 'Electrical', 'Plumbing', 'Doors & Windows'];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PriceTracker() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  useEffect(() => {
    // Prices come from the curated static dataset (refreshed monthly).
    // Short delay so the skeleton state feels intentional rather than flashy.
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  const prices: MaterialPrice[] = useMemo(() => MATERIAL_PRICES, []);

  const filtered = useMemo(() => {
    return prices.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (search && !p.materialName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [prices, category, search]);

  const lastUpdatedDate = useMemo(() => {
    const dates = prices.map((p) => new Date(p.lastUpdated).getTime());
    return dates.length > 0 ? new Date(Math.max(...dates)) : new Date();
  }, [prices]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Last updated {formatDate(lastUpdatedDate.toISOString())}</p>
          <p className="mt-1 text-sm text-ink-500">
            {filtered.length} materials listed. Prices are national averages — local rates may vary.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowSubmitForm(true)}
          className="btn-ghost text-sm"
        >
          + Submit a price
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
        <select
          className="select-field sm:w-56"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="mt-8 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-md bg-ink-100" />
          ))}
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-200 text-left">
                <th className="px-3 py-3 font-medium text-ink-500">Material</th>
                <th className="px-3 py-3 font-medium text-ink-500">Category</th>
                <th className="px-3 py-3 font-medium text-ink-500">Unit</th>
                <th className="px-3 py-3 text-right font-medium text-ink-500">Price (KES)</th>
                <th className="hidden px-3 py-3 font-medium text-ink-500 lg:table-cell">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-ink-100 transition-colors hover:bg-ink-50">
                  <td className="px-3 py-3 font-medium text-ink-800">{p.materialName}</td>
                  <td className="px-3 py-3">
                    <span className="inline-block rounded-full bg-clay-50 px-2.5 py-0.5 text-xs text-clay-700">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-ink-500">{p.unit}</td>
                  <td className="px-3 py-3 text-right font-mono font-semibold text-ink-900">
                    {p.priceKes.toLocaleString('en-KE')}
                  </td>
                  <td className="hidden px-3 py-3 text-xs text-ink-400 lg:table-cell">{p.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-ink-400">No materials found. Try a different search.</p>
          )}
        </div>
      )}

      {showSubmitForm && <SubmitPriceForm onClose={() => setShowSubmitForm(false)} />}
    </div>
  );
}

function SubmitPriceForm({ onClose }: { onClose: () => void }) {
  const [materialName, setMaterialName] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [town, setTown] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('50kg bag');
  const [submitterName, setSubmitterName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialName || !county || !price || !unit) {
      setError('Please fill in the material name, county, price, and unit.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const ok = await submitPrice({
        materialName,
        county,
        town: town || undefined,
        priceKes: Number(price),
        unit,
        submitterName: submitterName || undefined,
      });
      if (!ok) throw new Error('submit failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-md border border-moss-200 bg-moss-50 p-6 text-center">
        <p className="font-display text-lg text-moss-500">Thank you for your submission!</p>
        <p className="mt-2 text-sm text-ink-600">
          We'll review your price and add it to the tracker once verified.
        </p>
        <button onClick={onClose} className="btn-ghost mt-4">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-md border border-ink-200 bg-white p-6">
      <h3 className="font-display text-lg font-medium text-ink-900">Submit a Local Price</h3>
      <p className="mt-1 text-sm text-ink-500">
        Seen a different price in your area? Share it and help other builders.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1.5 block">Material name *</label>
          <input className="input-field" value={materialName} onChange={(e) => setMaterialName(e.target.value)} placeholder="e.g. Bamburi Cement 42.5N" />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">County *</label>
          <input className="input-field" value={county} onChange={(e) => setCounty(e.target.value)} placeholder="e.g. Kiambu" />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">Town</label>
          <input className="input-field" value={town} onChange={(e) => setTown(e.target.value)} placeholder="e.g. Thika" />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">Price (KES) *</label>
          <input type="number" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 850" />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">Unit *</label>
          <input className="input-field" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g. 50kg bag" />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">Your name (optional)</label>
          <input className="input-field" value={submitterName} onChange={(e) => setSubmitterName(e.target.value)} placeholder="Optional" />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-rust-500">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Submitting...' : 'Submit Price'}
        </button>
        <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
