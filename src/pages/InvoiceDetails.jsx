import { Link, useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeft, CheckCircle2, TriangleAlert } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import RiskBadge from "../components/ui/RiskBadge.jsx";
import { featureContribution, invoices } from "../data/mockData.js";
import { formatINR, riskLevel } from "../utils/risk.js";

const action = {
  High: "Hold input tax credit and escalate to your accountant.",
  Medium: "Ask the supplier to confirm the invoice details.",
  Low: "No action needed. The invoice fits the supplier's normal pattern.",
};

export default function InvoiceDetails() {
  const { id } = useParams();
  const invoice = invoices.find((i) => i.id === id);

  if (!invoice) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <h1 className="text-lg font-semibold">Invoice not found</h1>
        <p className="mt-1 text-sm text-muted">No invoice with the number {id} exists in the current results.</p>
        <Link to="/results" className="btn-primary mt-5">Back to results</Link>
      </div>
    );
  }

  const level = riskLevel(invoice.score);
  const barColor = level === "High" ? "#B42318" : level === "Medium" ? "#D98A0B" : "#2E9E5B";
  const fields = [
    ["Supplier", invoice.supplier],
    ["GSTIN", invoice.gstin],
    ["Invoice date", invoice.date],
    ["Taxable value", formatINR(invoice.amount)],
    ["Tax amount", formatINR(invoice.tax)],
  ];

  return (
    <>
      <Link to="/results" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to results
      </Link>
      <PageHeader
        title={invoice.id}
        description={`${invoice.supplier}, dated ${invoice.date}`}
        actions={
          <>
            <button className="btn-secondary">Mark as verified</button>
            <button className="btn-primary">Hold credit</button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="font-semibold">Risk score</h2>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-semibold tracking-tight">{invoice.score}</span>
            <span className="pb-2 text-sm text-muted">out of 100</span>
            <span className="ml-auto pb-2"><RiskBadge score={invoice.score} /></span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas">
            <div className="h-full" style={{ width: `${invoice.score}%`, background: barColor }} />
          </div>
          <p className="mt-4 text-sm text-muted">{action[level]}</p>
        </section>

        <section className="card p-5 lg:col-span-2">
          <h2 className="font-semibold">Invoice details</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="card p-5 lg:col-span-2">
          <h2 className="font-semibold">What drove the score</h2>
          <p className="text-sm text-muted">Relative contribution of each signal</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureContribution(invoice)} layout="vertical" margin={{ left: 24, right: 16 }}>
                <CartesianGrid stroke="#E3E7EC" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis type="category" dataKey="feature" tickLine={false} axisLine={false} fontSize={12} width={120} />
                <Tooltip />
                <Bar dataKey="weight" name="Contribution" fill={barColor} radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">Flags raised</h2>
          {invoice.flags.length === 0 ? (
            <p className="mt-4 flex items-start gap-2 text-sm text-muted">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-risk-low" aria-hidden="true" />
              No anomalies found against this supplier's history.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {invoice.flags.map((flag) => (
                <li key={flag} className="flex items-start gap-2 text-sm">
                  <TriangleAlert size={18} className="mt-0.5 shrink-0 text-risk-high" aria-hidden="true" />
                  {flag}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
