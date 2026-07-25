import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useChapters } from "../hooks/useChapters";
import { ChapterCard } from "../../../components/shared/ChapterCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" as const },
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

export function ChaptersPage() {
  const { t } = useTranslation();
  const { chapters, loading } = useChapters();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3"
          >
            {t("chapters.eyebrow")}
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            {t("chapters.title")}
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-sky-200 max-w-2xl mx-auto text-lg"
          >
            {t("chapters.description")}
          </motion.p>
        </div>
      </div>

      {/* Chapters Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : chapters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-24"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-50 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No chapters at this time
              </h3>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">
                Our chapters will appear here once they are added. Check back
                soon.
              </p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {chapters.map((chapter, i) => (
                <motion.div
                  key={chapter.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <ChapterCard chapter={chapter} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
