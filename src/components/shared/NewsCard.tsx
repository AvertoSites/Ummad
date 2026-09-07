import { useTranslation } from "react-i18next";
import { Calendar, PlayCircle, ArrowRight } from "lucide-react";
import type { NewsArticleData as NewsArticle } from "../../features/news/services/news";
import { formatDate } from "../../utils/format-date";
import { isDirectVideoFile } from "../../utils/video";
import { Card, CardMedia } from "./Card";
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
  const embedVideo = Boolean(article.videoUrl) && !previewVideo;

  return (
    <Card to={`/news/${article.slug}`} className="h-full">
      <CardMedia>
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

        {previewVideo && (
          <span className="absolute bottom-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/70 text-white backdrop-blur-sm pointer-events-none">
            <PlayCircle size={16} />
          </span>
        )}
        {embedVideo && (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/25 group-hover:bg-slate-900/35 transition-colors pointer-events-none">
            <PlayCircle size={44} className="text-white drop-shadow-lg" />
          </span>
        )}
      </CardMedia>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-500">{article.chapterName}</span>
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
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
    </Card>
  );
}
