import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export type AdminRole = "superAdmin" | "chapterEditor";

export interface AdminRoleState {
  role: AdminRole | null;
  chapterId: string | null;
  chapterName: string | null;
  displayName: string | null;
  email: string | null;
  uid: string | null;
  loading: boolean;
}

/**
 * Reads the current Firebase Auth user's Firestore users/{uid} document
 * and exposes their role and assigned chapterId.
 */
export function useAdminRole(): AdminRoleState {
  const [state, setState] = useState<AdminRoleState>({
    role: null,
    chapterId: null,
    chapterName: null,
    displayName: null,
    email: null,
    uid: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({
          role: null,
          chapterId: null,
          chapterName: null,
          displayName: null,
          email: null,
          uid: null,
          loading: false,
        });
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setState({
            role: data.role ?? null,
            chapterId: data.chapterId ?? null,
            chapterName: data.chapterName ?? null,
            displayName: data.displayName ?? user.displayName ?? null,
            email: data.email ?? user.email ?? null,
            uid: user.uid,
            loading: false,
          });
        } else {
          // No role doc found — treat as unauthenticated for safety
          setState({
            role: null,
            chapterId: null,
            chapterName: null,
            displayName: null,
            email: user.email,
            uid: user.uid,
            loading: false,
          });
        }
      } catch {
        setState({
          role: null,
          chapterId: null,
          chapterName: null,
          displayName: null,
          email: null,
          uid: null,
          loading: false,
        });
      }
    });

    return unsubscribe;
  }, []);

  return state;
}
