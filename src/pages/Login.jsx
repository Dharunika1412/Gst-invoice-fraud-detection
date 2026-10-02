import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { isSignedIn, signIn } from "../utils/risk.js";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("dharunika@fabrics.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isSignedIn()) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid work email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    signIn();
    navigate(location.state?.from || "/dashboard", { replace: true });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-brand-700 p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
            <ShieldCheck size={22} aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">Invoice Guard</span>
        </div>
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight">
            Find risky invoices before they reach your GST return.
          </h2>
          <p className="mt-4 max-w-md text-brand-100">
            Anomaly detection for MSMEs that flags mismatched GSTINs, duplicate invoices and inflated credit claims.
          </p>
        </div>
       
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm" noValidate>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted">Use any email and a password of 4 or more characters.</p>

          <label htmlFor="email" className="mt-8 block text-sm font-medium">Work email</label>
          <div className="relative mt-1.5">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input id="email" type="email" className="input pl-9" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>

          <label htmlFor="password" className="mt-5 block text-sm font-medium">Password</label>
          <div className="relative mt-1.5">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input id="password" type="password" className="input pl-9" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-risk-highbg px-3 py-2 text-sm text-risk-high">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full py-2.5">Sign in</button>
        </form>
      </div>
    </div>
  );
}
