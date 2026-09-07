import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const BASE =
  "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:shadow-lg";

interface CardProps {
  /** Internal route — when set, the whole card is a link. */
  to?: string;
  className?: string;
  children: ReactNode;
}

/** Shared surface for news / event / chapter cards. */
export function Card({ to, className = "", children }: CardProps) {
  const cls = `${BASE} ${className}`;
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

interface CardMediaProps {
  /** "video" = 16:9, "wide" = 16:10. */
  ratio?: "video" | "wide";
  /** Fallback wash colour. */
  tone?: "sky" | "amber";
  className?: string;
  children: ReactNode;
}

/** Aspect-ratio media well with a branded fallback wash. */
export function CardMedia({
  ratio = "video",
  tone = "sky",
  className = "",
  children,
}: CardMediaProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br to-slate-100 ${
        tone === "amber" ? "from-amber-50" : "from-sky-50"
      } ${ratio === "video" ? "aspect-video" : "aspect-[16/10]"} ${className}`}
    >
      {children}
    </div>
  );
}
