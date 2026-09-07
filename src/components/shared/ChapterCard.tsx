import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight } from "lucide-react";
import type { ChapterData } from "../../features/chapters/services/chapters";
import { Card, CardMedia } from "./Card";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface ChapterCardProps {
  chapter: ChapterData;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { t } = useTranslation();

  return (
    <Card to={`/chapters/${chapter.slug}`} className="h-full">
      <CardMedia>
        {chapter.coverImage ? (
          <img
            src={chapter.coverImage}
            alt={chapter.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <MediaPlaceholder className="w-full h-full" />
        )}
      </CardMedia>

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
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 mt-auto">
          {t("chapters.viewChapter")}
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </Card>
  );
}
