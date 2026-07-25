import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";
import { useEventBySlug } from "../hooks/useEvents";
import { formatDate } from "../../../utils/format-date";

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { event, loading } = useEventBySlug(slug ?? "");

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!event) return <Navigate to="/events" replace />;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-10"
        >
          <div className="max-w-4xl mx-auto">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-3 transition-colors"
            >
              <ArrowLeft size={14} /> {t("events.eyebrow")}
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                {event.category}
              </span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                {event.chapterName}
              </span>
              {event.isFree && (
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                  Free
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {event.title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              About This Event
            </h2>
            <div className="space-y-4">
              {event.fullDescription.split("\n\n").map((para, i) => {
                if (para.startsWith("- ")) {
                  const items = para
                    .split("\n")
                    .map((item) => item.replace("- ", ""));
                  return (
                    <ul key={i} className="list-disc list-inside space-y-1">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="text-slate-600 text-sm leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-slate-600 leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar
                  size={16}
                  className="text-sky-600 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {t("events.date")}
                  </p>
                  <p className="text-sm text-slate-900 font-semibold">
                    {formatDate(event.date)}
                    {event.endDate && ` – ${formatDate(event.endDate)}`}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-sky-600 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Time</p>
                  <p className="text-sm text-slate-900 font-semibold">
                    {event.time}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-sky-600 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {t("events.location")}
                  </p>
                  <p className="text-sm text-slate-900 font-semibold">
                    {event.location}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {event.address}
                  </p>
                </div>
              </div>
              {event.capacity && (
                <div className="flex items-start gap-3">
                  <Users
                    size={16}
                    className="text-sky-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Capacity
                    </p>
                    <p className="text-sm text-slate-900 font-semibold">
                      {event.capacity} seats
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={`mailto:${event.chapterId}@umad.org`}
                  className="block w-full text-center py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {t("events.register")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
