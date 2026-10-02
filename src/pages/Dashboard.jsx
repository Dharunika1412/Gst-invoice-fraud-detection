import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FileText, IndianRupee, ShieldAlert, TriangleAlert } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import RiskBadge from "../components/ui/RiskBadge.jsx";
import { invoices, monthlyTrend } from "../data/mockData.js";
import { formatINR, riskLevel } from "../utils/risk.js";

const COLORS = { High: "#B42318", Medium: "#D98A0B", Low: "#2E9E5B" };

export default function Dashboard() {
  const counts = { High: 0, Medium: 0, Low: 0 };
  invoices.forEach((i) => (counts[riskLevel(i.score)] += 1));
  const pie = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const creditAtRisk = invoices.filter((i) => i.score >= 50).reduce((sum, i) => sum + i.tax, 0);
  const topRisk = [...invoices].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of invoices scanned this month and where the risk is concentrated."
        actions={<Link to="/upload" className="btn-primary">Upload invoices</Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Invoices scanned" value="329" hint="This month" icon={FileText} />
        <StatCard label="High risk" value={counts.High} hint="Hold credit until verified" icon={ShieldAlert} tone="high" />
        <StatCard label="Needs review" value={counts.Medium} hint="Confirm with supplier" icon={TriangleAlert} tone="mid" />
        <StatCard label="Credit at risk" value={formatINR(creditAtRisk)} hint="Tax on medium and high risk" icon={IndianRupee} tone="high" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2">
          <h2 className="font-semibold">Scanned and flagged invoices</h2>
          <p className="text-sm text-muted">Last six months</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E3E7EC" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="scanned" name="Scanned" stroke="#0F766E" strokeWidth={2} fill="url(#scanFill)" />
                <Area type="monotone" dataKey="flagged" name="Flagged" stroke="#B42318" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">Risk distribution</h2>
          <p className="text-sm text-muted">Latest batch of {invoices.length} invoices</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={2}>
                  {pie.map((slice) => (
                    <Cell key={slice.name} fill={COLORS[slice.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            {pie.map((slice) => (
              <li key={slice.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[slice.name] }} />
                  {slice.name}
                </span>
                <span className="font-medium">{slice.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-semibold">Highest risk invoices</h2>
          <Link to="/results" className="text-sm font-medium text-brand-700 hover:underline">View all results</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-y border-line bg-canvas text-muted">
              <tr>
                <th className="px-5 py-2.5 font-medium">Invoice</th>
                <th className="px-5 py-2.5 font-medium">Supplier</th>
                <th className="px-5 py-2.5 font-medium">Amount</th>
                <th className="px-5 py-2.5 font-medium">Score</th>
                <th className="px-5 py-2.5 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {topRisk.map((inv) => (
                <tr key={inv.id} className="border-b border-line last:border-0 hover:bg-canvas">
                  <td className="px-5 py-3 font-medium">
                    <Link to={`/invoices/${inv.id}`} className="text-brand-700 hover:underline">{inv.id}</Link>
                  </td>
                  <td className="px-5 py-3">{inv.supplier}</td>
                  <td className="px-5 py-3">{formatINR(inv.amount)}</td>
                  <td className="px-5 py-3 font-mono">{inv.score}</td>
                  <td className="px-5 py-3"><RiskBadge score={inv.score} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
