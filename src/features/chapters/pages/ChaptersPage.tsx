import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useChapters } from "../hooks/useChapters";
import { ChapterCard } from "../../../components/shared/ChapterCard";
import { PageHeader } from "../../../components/shared/PageHeader";
import { CardSkeletonGrid } from "../../../components/shared/CardSkeleton";
import { fadeUp, inViewOnce } from "../../../lib/motion";

export function ChaptersPage() {
  const { t } = useTranslation();
  const { chapters, loading } = useChapters();

  return (
    <div className="min-h-screen bg-white pt-16">
      <PageHeader
        eyebrow={t("chapters.eyebrow")}
        title={t("chapters.title")}
        description={t("chapters.description")}
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <CardSkeletonGrid count={3} />
          ) : chapters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-24"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-50 mb-5">
                <Building2 size={30} className="text-sky-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">
                No chapters at this time
              </h2>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">
                Our chapters will appear here once they are added. Check back
                soon.
              </p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {chapters.map((chapter, i) => (
                <motion.div
                  key={chapter.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={inViewOnce}
                  variants={fadeUp}
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
