import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export interface SiteStats {
  volunteers: string; // e.g. "500+"
  projects: string;   // e.g. "40+"
  people: string;     // e.g. "50k+"
}

const DOC_REF = doc(db, "siteSettings", "stats");

export async function getSiteStats(): Promise<SiteStats | null> {
  const snap = await getDoc(DOC_REF);
  if (!snap.exists()) return null;
  return snap.data() as SiteStats;
}

export async function updateSiteStats(stats: Partial<SiteStats>): Promise<void> {
  await setDoc(DOC_REF, stats, { merge: true });
}
