import { deleteApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth, createSecondaryApp } from "../../../lib/firebase";

export interface EditorProfile {
  uid: string;
  displayName: string;
  email: string;
  chapterId: string;
  chapterName: string;
  createdAt: string;
}

/**
 * Creates a new chapter editor Firebase Auth account using a secondary app
 * instance (so the super admin stays logged in), then writes the Firestore
 * users/{uid} role document.
 */
export async function createChapterEditor(
  email: string,
  password: string,
  displayName: string,
  chapterId: string,
  chapterName: string,
): Promise<void> {
  const { secondaryApp, secondaryAuth } = createSecondaryApp();
  try {
    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password,
    );
    const uid = cred.user.uid;

    await setDoc(doc(db, "users", uid), {
      role: "chapterEditor",
      chapterId,
      chapterName,
      displayName,
      email,
      createdAt: new Date().toISOString(),
    });
  } finally {
    // Always clean up the secondary app regardless of success or failure
    await deleteApp(secondaryApp);
  }
}

/**
 * Lists all chapter editors from the Firestore users collection.
 */
export async function listChapterEditors(): Promise<EditorProfile[]> {
  const q = query(
    collection(db, "users"),
    where("role", "==", "chapterEditor"),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    uid: d.id,
    displayName: d.data().displayName ?? "",
    email: d.data().email ?? "",
    chapterId: d.data().chapterId ?? "",
    chapterName: d.data().chapterName ?? "",
    createdAt: d.data().createdAt ?? "",
  }));
}

/**
 * Removes a chapter editor's Firestore role document, instantly revoking
 * their dashboard access. Their Firebase Auth account becomes an empty shell.
 */
export async function removeChapterEditor(uid: string): Promise<void> {
  await deleteDoc(doc(db, "users", uid));
}

/**
 * Sends a Firebase password reset email to the editor's registered address.
 * The editor receives a link to set a new password.
 */
export async function sendEditorPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Writes (or overwrites) the super admin's own Firestore users/{uid} doc.
 * Call this once manually from the browser console or from a setup screen
 * to bootstrap the very first super admin account.
 *
 * Usage (in browser console while logged in as admin):
 *   import { bootstrapSuperAdmin } from './userManagement';
 *   await bootstrapSuperAdmin();
 */
export async function bootstrapSuperAdmin(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");
  await setDoc(
    doc(db, "users", user.uid),
    {
      role: "superAdmin",
      chapterId: null,
      chapterName: null,
      displayName: "Super Admin",
      email: user.email,
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  );
}
