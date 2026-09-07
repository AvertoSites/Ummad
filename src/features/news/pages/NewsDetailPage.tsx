import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { useNewsArticle, useNews } from "../hooks/useNews";
import { NewsCard } from "../../../components/shared/NewsCard";
import { MediaPlaceholder } from "../../../components/shared/MediaPlaceholder";
import { ShareButtons } from "../../../components/shared/ShareButtons";
import { ArticleBody } from "../components/ArticleBody";
import { readingTimeMinutes } from "../../../utils/reading-time";
import { formatDate } from "../../../utils/format-date";
import { getVideoEmbedUrl } from "../../../utils/video";
import { trackArticleView } from "../../../lib/analytics";

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { article, loading } = useNewsArticle(slug ?? "");
  const { articles } = useNews();

  useEffect(() => {
    if (article) {
      trackArticleView({
        slug: article.slug ?? slug ?? "",
        title: article.title,
        category: article.category,
      });
    }
  }, [article, slug]);

  // Related: same chapter first, then same category, then most recent — max 3.
  const related = useMemo(() => {
    if (!article) return [];
    const pool = articles.filter((a) => a.id !== article.id);
    const seen = new Set<string>();
    const pick: typeof pool = [];
    for (const group of [
      pool.filter((a) => a.chapterId === article.chapterId),
      pool.filter((a) => a.category === article.category),
      pool,
    ]) {
      for (const a of group) {
        if (pick.length >= 3) break;
        if (!seen.has(a.id)) {
          seen.add(a.id);
          pick.push(a);
        }
      }
    }
    return pick;
  }, [article, articles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!article) return <Navigate to="/news" replace />;

  const embedUrl = article.videoUrl
    ? getVideoEmbedUrl(article.videoUrl, { autoplay: false })
    : null;
  const embedSrc = embedUrl
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`
    : null;
  const minutes = readingTimeMinutes(article.content);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero: embedded video, direct video file, or image */}
      {article.videoUrl && embedSrc ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-900"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            src={embedSrc}
            title={article.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      ) : article.videoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 flex items-center justify-center"
        >
          <video
            src={article.videoUrl}
            controls
            autoPlay
            controlsList="nodownload"
            playsInline
            className="w-full max-h-[75vh] object-contain"
          />
        </motion.div>
      ) : article.image ? (
        <div className="relative h-64 sm:h-96 overflow-hidden">
          <motion.img
            src={article.image}
            alt={article.title}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
      ) : (
        <MediaPlaceholder className="h-64 sm:h-96" size="lg" />
      )}

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-700 mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> {t("news.eyebrow")}
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
              {article.chapterName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-sky-600" />
              {t("news.by")} {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-sky-600" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-sky-600" />
              {t("general.minRead", { count: minutes })}
            </span>
          </div>

          <div className="pb-8 mb-8 border-b border-slate-100">
            <ShareButtons title={article.title} />
          </div>

          {/* Content */}
          <ArticleBody text={article.content} />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-slate-100">
              <Tag size={14} className="text-slate-400" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-slate-100">
            <ShareButtons title={article.title} />
          </div>
        </motion.div>
      </div>

      {/* Related News */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-extrabold text-slate-900 mb-8"
            >
              {t("news.relatedNews")}
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <NewsCard article={rel} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
