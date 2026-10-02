import { riskLevel } from "../../utils/risk.js";

const styles = {
  High: "bg-risk-highbg text-risk-high",
  Medium: "bg-risk-midbg text-risk-mid",
  Low: "bg-risk-lowbg text-risk-low",
};

export default function RiskBadge({ score }) {
  const level = riskLevel(score);
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${styles[level]}`}>
      {level}
    </span>
  );
}
