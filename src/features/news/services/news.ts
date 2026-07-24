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

export type NewsStatus = "published" | "pending" | "rejected";

export interface NewsArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  videoUrl?: string;
  author: string;
  authorEmail?: string;
  publishedAt: string;
  category: string;
  chapterId: string;
  chapterName: string;
  tags: string[];
  status: NewsStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewsInput {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  videoUrl?: string;
  author: string;
  authorEmail?: string;
  category: string;
  chapterId: string;
  chapterName: string;
  tags?: string[];
  status?: NewsStatus;
}

const NEWS_COL = "news";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function toData(id: string, d: DocumentData): NewsArticleData {
  return {
    id,
    slug: d.slug ?? "",
    title: d.title ?? "",
    excerpt: d.excerpt ?? "",
    content: d.content ?? "",
    image: d.image ?? undefined,
    videoUrl: d.videoUrl ?? undefined,
    author: d.author ?? "",
    authorEmail: d.authorEmail ?? undefined,
    publishedAt: d.publishedAt ?? "",
    category: d.category ?? "",
    chapterId: d.chapterId ?? "",
    chapterName: d.chapterName ?? "",
    tags: Array.isArray(d.tags) ? d.tags : [],
    status: d.status ?? "published",
    createdAt: d.createdAt?.toDate?.().toISOString() ?? d.createdAt ?? "",
    updatedAt: d.updatedAt?.toDate?.().toISOString() ?? d.updatedAt ?? "",
  };
}

/** Returns ALL articles (all statuses) ordered by date desc — admin use. */
export async function getNewsArticles(): Promise<NewsArticleData[]> {
  const q = query(collection(db, NEWS_COL), orderBy("publishedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toData(d.id, d.data()));
}

export async function getNewsArticleBySlug(
  slug: string,
): Promise<NewsArticleData | null> {
  const q = query(
    collection(db, NEWS_COL),
    where("slug", "==", slug),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return toData(d.id, d.data());
}

/** Remove keys whose value is undefined so Firestore doesn't reject them. */
function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export async function createNewsArticle(input: NewsInput): Promise<string> {
  const now = new Date().toISOString().split("T")[0];
  const docRef = await addDoc(collection(db, NEWS_COL), {
    ...clean(input),
    slug: slugify(input.title),
    tags: input.tags ?? [],
    status: input.status ?? "published",
    publishedAt: now,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateNewsArticle(
  id: string,
  input: Partial<NewsInput>,
): Promise<void> {
  await updateDoc(doc(db, NEWS_COL, id), {
    ...clean(input),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNewsArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, NEWS_COL, id));
}
