import { useEffect, useState } from "react";
import {
  getNewsArticles,
  getNewsArticleBySlug,
  type NewsArticleData,
} from "../services/news";

/** Returns only PUBLISHED articles for public pages. */
export function useNews() {
  const [articles, setArticles] = useState<NewsArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getNewsArticles()
      .then((data) => {
        if (!cancelled) {
          setArticles(data.filter((a) => a.status === "published"));
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { articles, loading, error };
}

export function useNewsArticle(slug: string) {
  const [article, setArticle] = useState<NewsArticleData | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getNewsArticleBySlug(slug)
      .then((data) => {
        if (!cancelled) {
          setArticle(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { article, loading, error };
}
