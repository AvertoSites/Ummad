import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;

/**
 * Reads the current Firebase Auth user's Firestore users/{uid} document
 * and exposes their role and assigned chapterId.
 *
 * Auto-bootstrap: if the logged-in email matches VITE_ADMIN_EMAIL and no
 * role document exists yet, a superAdmin doc is created automatically so the
 * admin never has to manually bootstrap their account.
 *
 * Chapter editors always have their doc created at account-creation time
 * (via createChapterEditor), so they never trigger this branch.
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
          // Role doc exists — read it normally
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
          // No role doc found.
          // If this is the designated admin email, auto-create a superAdmin doc.
          const isDesignatedAdmin =
            ADMIN_EMAIL &&
            user.email &&
            user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

          if (isDesignatedAdmin) {
            const adminDoc = {
              role: "superAdmin" as const,
              chapterId: null,
              chapterName: null,
              displayName: user.displayName ?? "Super Admin",
              email: user.email,
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", user.uid), adminDoc);
            setState({
              role: "superAdmin",
              chapterId: null,
              chapterName: null,
              displayName: adminDoc.displayName,
              email: user.email,
              uid: user.uid,
              loading: false,
            });
          } else {
            // Unknown user with no role doc — treat as unauthenticated for safety
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
