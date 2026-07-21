import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight } from "lucide-react";
import type { Chapter } from "../../data/chapters";

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img
          src={chapter.coverImage}
          alt={chapter.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin size={13} className="text-sky-600" />
          <span>{chapter.location}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
          {chapter.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          {chapter.description}
        </p>
        <Link
          to={`/chapters/${chapter.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 group/link"
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
