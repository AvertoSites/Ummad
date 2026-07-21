import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import type { NewsArticle } from "../../data/news";
import { formatDate } from "../../utils/format-date";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { t } = useTranslation();

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
          <Link
            to={`/news/${article.slug}`}
            className="text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
          >
            {t("news.readMore")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
