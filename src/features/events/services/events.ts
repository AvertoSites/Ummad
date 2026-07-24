import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export interface EventData {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  date: string;
  time: string;
  endDate?: string;
  location: string;
  address?: string;
  chapterId: string;
  chapterName: string;
  category: string;
  registrationUrl?: string;
  isFree: boolean;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventInput {
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  date: string;
  time: string;
  endDate?: string;
  location: string;
  address?: string;
  chapterId: string;
  chapterName: string;
  category: string;
  registrationUrl?: string;
  isFree: boolean;
  capacity?: number;
}

const EVENTS_COL = "events";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function toData(id: string, d: DocumentData): EventData {
  return {
    id,
    slug: d.slug ?? "",
    title: d.title ?? "",
    description: d.description ?? "",
    fullDescription: d.fullDescription ?? "",
    image: d.image ?? undefined,
    date: d.date ?? "",
    time: d.time ?? "",
    endDate: d.endDate ?? undefined,
    location: d.location ?? "",
    address: d.address ?? undefined,
    chapterId: d.chapterId ?? "",
    chapterName: d.chapterName ?? "",
    category: d.category ?? "",
    registrationUrl: d.registrationUrl ?? undefined,
    isFree: d.isFree ?? false,
    capacity: d.capacity ?? undefined,
    createdAt: d.createdAt?.toDate?.().toISOString() ?? d.createdAt ?? "",
    updatedAt: d.updatedAt?.toDate?.().toISOString() ?? d.updatedAt ?? "",
  };
}

export async function getEvents(): Promise<EventData[]> {
  const q = query(collection(db, EVENTS_COL), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toData(d.id, d.data()));
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const q = query(
    collection(db, EVENTS_COL),
    where("slug", "==", slug),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return toData(d.id, d.data());
}

function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export async function createEvent(input: EventInput): Promise<string> {
  const docRef = await addDoc(collection(db, EVENTS_COL), {
    ...clean(input),
    slug: slugify(input.title),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateEvent(
  id: string,
  input: Partial<EventInput>,
): Promise<void> {
  await updateDoc(doc(db, EVENTS_COL, id), {
    ...clean(input),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, EVENTS_COL, id));
}
