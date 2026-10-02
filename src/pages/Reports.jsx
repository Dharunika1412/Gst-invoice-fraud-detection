import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Check, Download, FileText } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import { flagTypes, reports } from "../data/mockData.js";

export default function Reports() {
  const [downloaded, setDownloaded] = useState(null);

  const download = (id) => {
    setDownloaded(id);
    setTimeout(() => setDownloaded(null), 2000);
  };

  return (
    <>
      <PageHeader
        title="Reports"
        description="Monthly and quarterly summaries you can share with your accountant or auditor."
        actions={<button className="btn-primary"><FileText size={16} aria-hidden="true" />Generate report</button>}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="card p-5 lg:col-span-2">
          <h2 className="font-semibold">Most common flags</h2>
          <p className="text-sm text-muted">Quarter to date</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flagTypes} layout="vertical" margin={{ left: 24, right: 16 }}>
                <CartesianGrid stroke="#E3E7EC" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis type="category" dataKey="type" tickLine={false} axisLine={false} fontSize={12} width={110} />
                <Tooltip />
                <Bar dataKey="count" name="Invoices" fill="#0F766E" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card overflow-hidden lg:col-span-3">
          <h2 className="p-5 pb-3 font-semibold">Available reports</h2>
          <ul>
            {reports.map((r) => (
              <li key={r.id} className="flex items-center gap-4 border-t border-line px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <FileText size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted">{r.period}, generated {r.generated}, {r.format} ({r.size})</p>
                </div>
                <button className="btn-secondary px-3" onClick={() => download(r.id)}>
                  {downloaded === r.id ? <Check size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
                  {downloaded === r.id ? "Saved" : "Download"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
