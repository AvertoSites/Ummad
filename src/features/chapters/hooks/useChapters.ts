import { useEffect, useState } from "react";
import {
  getChapters,
  getChapterBySlug,
  type ChapterData,
} from "../services/chapters";

export function useChapters() {
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getChapters()
      .then(setChapters)
      .catch(() => setError("Failed to load chapters."))
      .finally(() => setLoading(false));
  }, []);

  return { chapters, loading, error };
}

export function useChapterBySlug(slug: string) {
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    getChapterBySlug(slug)
      .then(setChapter)
      .catch(() => setError("Failed to load chapter."))
      .finally(() => setLoading(false));
  }, [slug]);

  return { chapter, loading, error };
}
