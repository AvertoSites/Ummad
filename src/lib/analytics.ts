/* ─────────────────────────────────────────────────────────────
   analytics.ts — Google Analytics 4 (GA4) helpers
   Measurement ID: G-CTD3YLG3T4
   ───────────────────────────────────────────────────────────── */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

const GA_ID = "G-CTD3YLG3T4";

/** Low-level gtag() wrapper — safe to call even before the script loads */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function gtag(...args: any[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// ── Page view ────────────────────────────────────────────────

/** Send a manual page_view hit (used by usePageTracking) */
export function trackPageView(path: string, title?: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    send_to: GA_ID,
  });
}

// ── Content events ────────────────────────────────────────────

export function trackArticleView(params: {
  slug: string;
  title: string;
  category?: string;
}) {
  gtag("event", "view_item", {
    content_type: "news_article",
    item_id: params.slug,
    item_name: params.title,
    item_category: params.category ?? "news",
    send_to: GA_ID,
  });
}

export function trackEventView(params: {
  slug: string;
  title: string;
  date?: string;
}) {
  gtag("event", "view_item", {
    content_type: "event",
    item_id: params.slug,
    item_name: params.title,
    item_date: params.date,
    send_to: GA_ID,
  });
}

export function trackChapterView(params: { slug: string; name: string }) {
  gtag("event", "view_item", {
    content_type: "chapter",
    item_id: params.slug,
    item_name: params.name,
    send_to: GA_ID,
  });
}

// ── Engagement events ─────────────────────────────────────────

export function trackArticleSubmit(status: "started" | "submitted" | "error") {
  gtag("event", "article_submit", {
    event_category: "engagement",
    event_label: status,
    send_to: GA_ID,
  });
}

export function trackContactClick(method: "email" | "phone" | "social") {
  gtag("event", "contact_click", {
    event_category: "engagement",
    event_label: method,
    send_to: GA_ID,
  });
}

export function trackLanguageSwitch(to: string) {
  gtag("event", "language_switch", {
    event_category: "ui",
    event_label: to,
    send_to: GA_ID,
  });
}

export function trackSearch(query: string) {
  gtag("event", "search", {
    search_term: query,
    send_to: GA_ID,
  });
}

// ── React Router page-view hook ───────────────────────────────

/**
 * Mount once at the app root (inside <BrowserRouter>).
 * Fires a GA4 page_view on every route change automatically.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
}
