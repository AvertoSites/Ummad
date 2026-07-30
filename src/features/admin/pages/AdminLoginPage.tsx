import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, Lock, Mail } from "lucide-react";
import { signIn } from "../services/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // Redirect back to the page they were trying to reach, defaulting to /admin
  const from =
    (location.state as { from?: Location } | null)?.from?.pathname ?? "/admin";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Enter your email address above, then click Forgot Password.");
      return;
    }
    setResetLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSent(true);
    } catch {
      setError("Could not send reset email. Please check the email address.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 grid place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to access the UMAD admin dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email
            </span>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="you@ummad.org"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">
              Password
            </span>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter your password"
              />
            </div>
          </label>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {resetSent && (
            <p className="text-sm font-medium text-green-600">
              Reset email sent! Check your inbox.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="w-full text-center text-xs text-slate-500 hover:text-sky-700 transition-colors disabled:opacity-50"
          >
            {resetLoading ? "Sending reset email…" : "Forgot Password?"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <House size={16} />
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
