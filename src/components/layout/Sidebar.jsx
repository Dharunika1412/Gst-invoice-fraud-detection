import { NavLink } from "react-router-dom";
import { FileBarChart, LayoutDashboard, ShieldAlert, ShieldCheck, Upload, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload invoices", icon: Upload },
  { to: "/results", label: "Fraud results", icon: ShieldAlert },
  { to: "/reports", label: "Reports", icon: FileBarChart },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Invoice Guard</p>
              <p className="text-xs text-muted">GST compliance</p>
            </div>
          </div>
          <button className="rounded-md p-1 text-muted hover:bg-canvas lg:hidden" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-muted hover:bg-canvas hover:text-ink"
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="m-3 rounded-lg bg-canvas p-4 text-xs text-muted">
          Sample data only. No invoices leave your browser.
        </div>
      </aside>
    </>
  );
}
