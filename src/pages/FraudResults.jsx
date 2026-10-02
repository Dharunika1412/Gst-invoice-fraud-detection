import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download, SearchX } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import RiskBadge from "../components/ui/RiskBadge.jsx";
import { invoices } from "../data/mockData.js";
import { formatINR, riskLevel } from "../utils/risk.js";

const filters = ["All", "High", "Medium", "Low"];

export default function FraudResults() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState(params.get("q") || "");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...invoices]
      .sort((a, b) => b.score - a.score)
      .filter((i) => filter === "All" || riskLevel(i.score) === filter)
      .filter((i) => !q || [i.id, i.supplier, i.gstin].some((v) => v.toLowerCase().includes(q)));
  }, [filter, query]);

  return (
    <>
      <PageHeader
        title="Fraud detection results"
        description="Invoices ranked by anomaly score. Scores of 80 or more should be held until verified."
        actions={<button className="btn-secondary"><Download size={16} aria-hidden="true" />Export results</button>}
      />

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-lg bg-canvas p-1" role="group" aria-label="Filter by risk">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${filter === f ? "bg-white shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <input className="input sm:max-w-xs" placeholder="Filter by invoice, supplier or GSTIN" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Filter results" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-canvas text-muted">
              <tr>
                <th className="px-5 py-2.5 font-medium">Invoice</th>
                <th className="px-5 py-2.5 font-medium">Supplier</th>
                <th className="px-5 py-2.5 font-medium">GSTIN</th>
                <th className="px-5 py-2.5 font-medium">Date</th>
                <th className="px-5 py-2.5 font-medium">Amount</th>
                <th className="px-5 py-2.5 font-medium">Score</th>
                <th className="px-5 py-2.5 font-medium">Risk</th>
                <th className="px-5 py-2.5 font-medium">Flags</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((inv) => (
                <tr key={inv.id} className="border-t border-line hover:bg-canvas">
                  <td className="px-5 py-3 font-medium">
                    <Link to={`/invoices/${inv.id}`} className="text-brand-700 hover:underline">{inv.id}</Link>
                  </td>
                  <td className="px-5 py-3">{inv.supplier}</td>
                  <td className="px-5 py-3 font-mono text-xs">{inv.gstin}</td>
                  <td className="px-5 py-3">{inv.date}</td>
                  <td className="px-5 py-3">{formatINR(inv.amount)}</td>
                  <td className="px-5 py-3 font-mono">{inv.score}</td>
                  <td className="px-5 py-3"><RiskBadge score={inv.score} /></td>
                  <td className="px-5 py-3 text-muted">{inv.flags.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <SearchX size={32} className="text-muted" aria-hidden="true" />
            <p className="mt-3 font-medium">No invoices match these filters</p>
            <p className="mt-1 text-sm text-muted">Clear the search or choose All to see every invoice.</p>
            <button className="btn-secondary mt-4" onClick={() => { setFilter("All"); setQuery(""); }}>Clear filters</button>
          </div>
        )}
      </div>
    </>
  );
}
