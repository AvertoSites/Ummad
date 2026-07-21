import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

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
}

interface SubmissionsContextValue {
  submissions: Submission[];
  addSubmission: (
    data: Omit<Submission, "id" | "submittedAt" | "status">,
  ) => void;
  updateStatus: (id: string, status: Submission["status"]) => void;
}

const SubmissionsContext = createContext<SubmissionsContextValue | null>(null);

export function SubmissionsProvider({ children }: PropsWithChildren) {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "s1",
      title: "How Our Community Garden Changed Lives in Ottawa",
      excerpt:
        "A volunteer's firsthand account of UMAD's community garden initiative and its surprising impact beyond food production.",
      content:
        "When I first joined UMAD's community garden project last spring, I expected to learn about growing vegetables. What I didn't expect was the profound social transformation I would witness...\n\nThe garden became a gathering place for Somali-Canadian families from across Ottawa. Elders shared traditional farming knowledge passed down through generations in Somalia. Young children who had never seen a vegetable grow from seed were captivated.",
      authorName: "Zamzam Haji",
      authorEmail: "zamzam@email.com",
      chapterId: "ottawa",
      chapterName: "Ottawa Chapter",
      category: "Community",
      submittedAt: "2026-07-20",
      status: "pending",
    },
    {
      id: "s2",
      title: "Youth Voices: Growing Up Between Two Worlds",
      excerpt:
        "A collection of reflections from Somali-American youth on identity, belonging, and what UMAD means to them.",
      content:
        "I was born in Washington D.C. to parents who arrived from Somalia in the late 1990s. Growing up, I always felt caught between two identities...\n\nUMAD's youth programs gave me a space where I didn't have to choose. I could be fully American and fully Somali at the same time.",
      authorName: "Abdullahi Mohamed",
      authorEmail: "a.mohamed@email.com",
      chapterId: "washington",
      chapterName: "Washington Chapter",
      category: "Youth",
      submittedAt: "2026-07-18",
      status: "pending",
    },
  ]);

  function addSubmission(
    data: Omit<Submission, "id" | "submittedAt" | "status">,
  ) {
    const newSub: Submission = {
      ...data,
      id: `s${Date.now()}`,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setSubmissions((prev) => [newSub, ...prev]);
  }

  function updateStatus(id: string, status: Submission["status"]) {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  }

  return (
    <SubmissionsContext.Provider
      value={{ submissions, addSubmission, updateStatus }}
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
