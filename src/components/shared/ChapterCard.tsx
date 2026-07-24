import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight } from "lucide-react";
import type { ChapterData } from "../../features/chapters/services/chapters";

interface ChapterCardProps {
  chapter: ChapterData;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Cover image */}
      <div className="aspect-video overflow-hidden bg-slate-100 flex-shrink-0">
        {chapter.coverImage ? (
          <img
            src={chapter.coverImage}
            alt={chapter.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-50 to-slate-100">
            <MapPin size={32} className="text-slate-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin size={13} className="text-sky-600 flex-shrink-0" />
          <span className="truncate">{chapter.location}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors leading-snug">
          {chapter.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1 line-clamp-3">
          {chapter.description}
        </p>
        <Link
          to={`/chapters/${chapter.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 group/link mt-auto"
        >
          {t("chapters.viewChapter")}
          <ArrowRight
            size={15}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
