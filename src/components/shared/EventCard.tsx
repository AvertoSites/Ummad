import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import type { EventData as Event } from "../../features/events/services/events";
import { formatDate } from "../../utils/format-date";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/events/${event.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-amber-50 to-slate-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <MediaPlaceholder className="w-full h-full" />
        )}
        {event.isFree && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
            Free
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
            {event.category}
          </span>
          <span className="text-xs text-slate-400">{event.chapterName}</span>
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={13} className="text-sky-600 flex-shrink-0" />
            <span>
              {formatDate(event.date)}
              {event.endDate && ` – ${formatDate(event.endDate)}`}
              {event.time && ` · ${event.time}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={13} className="text-sky-600 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users size={13} className="text-sky-600 flex-shrink-0" />
              <span>Capacity: {event.capacity}</span>
            </div>
          )}
        </div>
        <span className="flex items-center justify-center gap-1.5 text-center px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg group-hover:bg-sky-800 transition-colors">
          {t("events.learnMore")}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </Link>
  );
}
