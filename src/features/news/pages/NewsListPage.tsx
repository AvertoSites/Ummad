import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper } from "lucide-react";
import { useNews } from "../hooks/useNews";
import { useChapters } from "../../chapters/hooks/useChapters";
import { NewsCard } from "../../../components/shared/NewsCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function NewsListPage() {
  const { t } = useTranslation();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { articles, loading: articlesLoading } = useNews();
  const [activeChapter, setActiveChapter] = useState("all");

  const filters = [
    { id: "all", label: t("news.allChapters") },
    ...chapters.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered =
    activeChapter === "all"
      ? articles
      : articles.filter((a) => a.chapterId === activeChapter);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3"
          >
            {t("news.eyebrow")}
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            {t("news.title")}
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-sky-200 max-w-xl mx-auto"
          >
            {t("news.description")}
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {chaptersLoading
            ? [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex-shrink-0 h-9 w-24 bg-slate-100 rounded-full animate-pulse"
                />
              ))
            : filters.map((f, i) => (
                <motion.button
                  key={f.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => setActiveChapter(f.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeChapter === f.id
                      ? "bg-sky-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </motion.button>
              ))}
        </div>
      </div>

      {/* Articles */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articlesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-slate-100 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 text-slate-400"
            >
              <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">
                {activeChapter === "all"
                  ? "No articles published yet."
                  : "No articles for this chapter yet."}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
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
