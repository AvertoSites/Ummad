import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getArticleBySlug, newsArticles } from "../../../data/news";
import { NewsCard } from "../../../components/shared/NewsCard";
import { formatDate } from "../../../utils/format-date";

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const article = getArticleBySlug(slug ?? "");
  if (!article) return <Navigate to="/news" replace />;

  const related = newsArticles
    .filter((a) => a.id !== article.id && a.chapterId === article.chapterId)
    .slice(0, 3);

  function getEmbedUrl(url: string): string {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vi = url.match(/vimeo\.com\/(\d+)/);
    if (vi) return `https://player.vimeo.com/video/${vi[1]}`;
    return url;
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero: video or image */}
      {article.videoUrl ? (
        <div className="relative bg-slate-900" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={getEmbedUrl(article.videoUrl)}
            title={article.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      ) : (
        <div className="relative h-64 sm:h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
      )}

      {/* Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-sky-600" />
              <span>
                {t("news.by")} {article.author}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-sky-600" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}
          </div>

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
        </motion.div>
      </div>

      {/* Related News */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              {t("news.relatedNews")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => (
                <NewsCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
