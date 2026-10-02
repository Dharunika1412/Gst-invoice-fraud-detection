import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { signOut } from "../../utils/risk.js";

export default function Navbar({ onMenu }) {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    navigate(query ? `/results?q=${encodeURIComponent(query)}` : "/results");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
      <button className="rounded-md p-2 text-muted hover:bg-canvas lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <form onSubmit={handleSearch} className="relative max-w-md flex-1" role="search">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input name="q" className="input pl-9" placeholder="Search invoice, supplier or GSTIN" aria-label="Search invoices" />
      </form>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-md p-2 text-muted hover:bg-canvas" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-risk-high" />
        </button>
        <div className="hidden items-center gap-2 border-l border-line pl-3 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">RK</span>
          <div className="leading-tight">
            <p className="text-sm font-medium">Dharunika</p>
            <p className="text-xs text-muted">Finance manager</p>
          </div>
        </div>
        <button className="btn-secondary px-3" onClick={handleSignOut}>
          <LogOut size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
