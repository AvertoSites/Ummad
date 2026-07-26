import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { Submission } from "../SubmissionsContext";

const SUB_COL = "submissions";

function toData(id: string, d: DocumentData): Submission {
  return {
    id,
    title: d.title ?? "",
    excerpt: d.excerpt ?? "",
    content: d.content ?? "",
    imageUrl: d.imageUrl ?? undefined,
    videoUrl: d.videoUrl ?? undefined,
    authorName: d.authorName ?? "",
    authorEmail: d.authorEmail ?? "",
    chapterId: d.chapterId ?? "",
    chapterName: d.chapterName ?? "",
    category: d.category ?? "",
    submittedAt: d.submittedAt ?? "",
    status: d.status ?? "pending",
  };
}

export async function getSubmissions(): Promise<Submission[]> {
  const q = query(collection(db, SUB_COL), orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toData(d.id, d.data()));
}

function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export async function addSubmissionToFirestore(
  data: Omit<Submission, "id" | "submittedAt" | "status">,
): Promise<Submission> {
  const submittedAt = new Date().toISOString().split("T")[0];
  const docRef = await addDoc(collection(db, SUB_COL), {
    ...clean(data),
    submittedAt,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return { ...data, id: docRef.id, submittedAt, status: "pending" };
}

export async function updateSubmissionStatus(
  id: string,
  status: Submission["status"],
  rejectionReason?: string,
): Promise<void> {
  await updateDoc(doc(db, SUB_COL, id), {
    status,
    updatedAt: serverTimestamp(),
    ...(rejectionReason ? { rejectionReason } : {}),
  });
}
