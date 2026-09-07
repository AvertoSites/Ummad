import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, Search, X } from "lucide-react";
import { useNews } from "../hooks/useNews";
import { useChapters } from "../../chapters/hooks/useChapters";
import { NewsCard } from "../../../components/shared/NewsCard";
import { PageHeader } from "../../../components/shared/PageHeader";
import { FilterScroller } from "../../../components/shared/FilterScroller";
import { CardSkeletonGrid } from "../../../components/shared/CardSkeleton";
import { fadeUp } from "../../../lib/motion";
import { filterPillClass } from "../../../lib/ui";

export function NewsListPage() {
  const { t } = useTranslation();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { articles, loading: articlesLoading } = useNews();
  const [activeChapter, setActiveChapter] = useState("all");
  const [queryText, setQueryText] = useState("");

  const filters = [
    { id: "all", label: t("news.allChapters") },
    ...chapters.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return articles
      .filter((a) => activeChapter === "all" || a.chapterId === activeChapter)
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
  }, [articles, activeChapter, queryText]);

  const hasFilters = activeChapter !== "all" || queryText.trim() !== "";

  return (
    <div className="min-h-screen bg-white pt-16">
      <PageHeader
        eyebrow={t("news.eyebrow")}
        title={t("news.title")}
        description={t("news.description")}
      >
        <div className="max-w-md mx-auto relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder={t("news.searchPlaceholder")}
            aria-label={t("news.searchPlaceholder")}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-0"
          />
          {queryText && (
            <button
              type="button"
              onClick={() => setQueryText("")}
              aria-label={t("general.close")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 rounded-md p-1"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {chaptersLoading ? (
            <div className="flex items-center gap-2 py-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex-shrink-0 h-9 w-24 bg-slate-100 rounded-full animate-pulse"
                />
              ))}
            </div>
          ) : (
            <FilterScroller>
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveChapter(f.id)}
                  className={filterPillClass(activeChapter === f.id)}
                >
                  {f.label}
                </button>
              ))}
            </FilterScroller>
          )}
        </div>
      </div>

      {/* Articles */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!articlesLoading && (
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-sm text-slate-500">
                {t("general.results", { count: filtered.length })}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveChapter("all");
                    setQueryText("");
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
                >
                  <X size={14} /> {t("general.clearFilters")}
                </button>
              )}
            </div>
          )}

          {articlesLoading ? (
            <CardSkeletonGrid count={6} />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 text-slate-400"
            >
              <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">
                {hasFilters
                  ? t("news.noResults")
                  : "No articles published yet."}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter + queryText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((article, i) => (
                  <motion.div
                    key={article.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
