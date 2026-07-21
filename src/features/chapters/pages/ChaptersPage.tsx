import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { chapters } from "../../../data/chapters";
import { ChapterCard } from "../../../components/shared/ChapterCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

export function ChaptersPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3"
          >
            {t("chapters.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            {t("chapters.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sky-200 max-w-2xl mx-auto text-lg"
          >
            {t("chapters.description")}
          </motion.p>
        </div>
      </div>

      {/* Chapters Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {chapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <ChapterCard chapter={chapter} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
