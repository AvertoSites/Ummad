import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, PlayCircle, ArrowRight } from "lucide-react";
import type { NewsArticleData as NewsArticle } from "../../features/news/services/news";
import { formatDate } from "../../utils/format-date";
import { isDirectVideoFile } from "../../utils/video";
import { CardVideo } from "./CardVideo";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { t } = useTranslation();
  const previewVideo =
    article.videoUrl && isDirectVideoFile(article.videoUrl)
      ? article.videoUrl
      : null;

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-sky-50 to-slate-100">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : previewVideo ? (
          <>
            <MediaPlaceholder className="absolute inset-0" />
            <CardVideo
              src={previewVideo}
              className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </>
        ) : (
          <MediaPlaceholder className="w-full h-full" />
        )}
        {article.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 group-hover:bg-slate-900/35 transition-colors pointer-events-none">
            <PlayCircle size={44} className="text-white drop-shadow-lg" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">{article.chapterName}</span>
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={13} />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700">
            {t("news.readMore")}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
