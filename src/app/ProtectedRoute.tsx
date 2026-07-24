import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { subscribeToAuthState } from "../features/admin/services/auth";

/**
 * Wraps any routes that require an active Firebase auth session.
 * - While Firebase is resolving the session: neutral loading screen.
 * - No session: redirect to /admin/login, preserving the attempted URL.
 * - Session confirmed: render child routes via <Outlet />.
 */
export function ProtectedRoute() {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setAuthState(user ? "authenticated" : "unauthenticated");
    });
    return unsubscribe;
  }, []);

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-slate-100 grid place-items-center">
        <p className="text-sm text-slate-500 animate-pulse">Loading…</p>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    // Preserve the page they tried to visit so we can redirect back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
