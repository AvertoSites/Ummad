/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import {
  getSubmissions,
  addSubmissionToFirestore,
  updateSubmissionStatus,
} from "./services/submissions";

export interface Submission {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  authorName: string;
  authorEmail: string;
  chapterId: string;
  chapterName: string;
  category: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

interface SubmissionsContextValue {
  submissions: Submission[];
  loading: boolean;
  addSubmission: (
    data: Omit<Submission, "id" | "submittedAt" | "status">,
  ) => Promise<void>;
  updateStatus: (
    id: string,
    status: Submission["status"],
    rejectionReason?: string,
  ) => Promise<void>;
}

const SubmissionsContext = createContext<SubmissionsContextValue | null>(null);

export function SubmissionsProvider({ children }: PropsWithChildren) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubmissions()
      .then((data) => setSubmissions(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function addSubmission(
    data: Omit<Submission, "id" | "submittedAt" | "status">,
  ) {
    const newSub = await addSubmissionToFirestore(data);
    setSubmissions((prev) => [newSub, ...prev]);
  }

  async function updateStatus(
    id: string,
    status: Submission["status"],
    rejectionReason?: string,
  ) {
    await updateSubmissionStatus(id, status, rejectionReason);
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status, rejectionReason } : s,
      ),
    );
  }

  return (
    <SubmissionsContext.Provider
      value={{ submissions, loading, addSubmission, updateStatus }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
}

export function useSubmissions() {
  const ctx = useContext(SubmissionsContext);
  if (!ctx)
    throw new Error("useSubmissions must be used inside SubmissionsProvider");
  return ctx;
}
