import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export interface LeaderData {
  id: string;
  name: string;
  position: string;
  photo?: string; // optional — privacy
  email?: string;
}

export interface ProgramData {
  id: string;
  title: string;
  description: string;
  image?: string; // optional
}

export interface ChapterData {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  description: string;
  longDescription: string;
  coverImage: string;
  history?: string;
  purpose?: string;
  community?: string;
  goals: string[];
  email: string;
  phone?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  leadership: LeaderData[];
  programs: ProgramData[];
  createdAt: string;
  updatedAt: string;
}

export type ChapterInput = Omit<ChapterData, "id" | "createdAt" | "updatedAt">;

const COLLECTION = "chapters";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getChapters(): Promise<ChapterData[]> {
  const q = query(collection(db, COLLECTION), orderBy("name"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ChapterData);
}

export async function getChapterBySlug(
  slug: string,
): Promise<ChapterData | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as ChapterData;
}

export async function getChapterById(id: string): Promise<ChapterData | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ChapterData;
}

function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export async function createChapter(input: ChapterInput): Promise<string> {
  const now = new Date().toISOString();
  const ref = await addDoc(collection(db, COLLECTION), {
    ...clean(input),
    createdAt: now,
    updatedAt: now,
  });
  return ref.id;
}

export async function updateChapter(
  id: string,
  input: Partial<ChapterInput>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...clean(input),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteChapter(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
