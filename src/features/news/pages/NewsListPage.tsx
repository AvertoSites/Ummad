import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { newsArticles } from "../../../data/news";
import { chapters } from "../../../data/chapters";
import { NewsCard } from "../../../components/shared/NewsCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

export function NewsListPage() {
  const { t } = useTranslation();
  const [activeChapter, setActiveChapter] = useState("all");

  const filters = [
    { id: "all", label: t("news.allChapters") },
    ...chapters.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered =
    activeChapter === "all"
      ? newsArticles
      : newsArticles.filter((a) => a.chapterId === activeChapter);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3">
            {t("news.eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            {t("news.title")}
          </h1>
          <p className="text-sky-200 max-w-xl mx-auto">
            {t("news.description")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveChapter(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeChapter === f.id
                  ? "bg-sky-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>No articles found for this chapter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
