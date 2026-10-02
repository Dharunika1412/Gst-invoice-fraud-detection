import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl font-semibold tracking-tight">404</p>
      <h1 className="mt-3 text-lg font-semibold">This page does not exist</h1>
      <p className="mt-1 text-sm text-muted">Check the address or return to the dashboard.</p>
      <Link to="/dashboard" className="btn-primary mt-6">Go to dashboard</Link>
    </div>
  );
}
