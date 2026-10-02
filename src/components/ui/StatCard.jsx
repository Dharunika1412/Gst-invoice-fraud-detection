export default function StatCard({ label, value, hint, icon: Icon, tone = "brand" }) {
  const tones = {
    brand: "bg-brand-50 text-brand-700",
    high: "bg-risk-highbg text-risk-high",
    mid: "bg-risk-midbg text-risk-mid",
    low: "bg-risk-lowbg text-risk-low",
  };
  return (
    <div className="card flex items-start justify-between gap-4 p-5">
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      </div>
      {Icon && (
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
