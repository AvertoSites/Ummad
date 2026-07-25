import { useEffect, useState } from "react";
import { getSiteStats, type SiteStats } from "../../admin/services/siteStats";

const FALLBACK: SiteStats = {
  volunteers: "—",
  projects: "—",
  people: "—",
};

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteStats()
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {
        // Keep fallback values — likely a permissions issue
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
