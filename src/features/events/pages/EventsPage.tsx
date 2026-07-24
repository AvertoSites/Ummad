import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, CalendarDays } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { useChapters } from "../../chapters/hooks/useChapters";
import { EventCard } from "../../../components/shared/EventCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

export function EventsPage() {
  const { t } = useTranslation();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { events, loading: eventsLoading } = useEvents();
  const [activeChapter, setActiveChapter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: t("events.allChapters") },
    ...chapters.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered = events
    .filter((e) => activeChapter === "all" || e.chapterId === activeChapter)
    .filter(
      (e) =>
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3">
            {t("events.eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            {t("events.title")}
          </h1>
          <p className="text-sky-200 max-w-xl mx-auto">
            {t("events.description")}
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("events.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-0"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {chaptersLoading
            ? [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex-shrink-0 h-9 w-24 bg-slate-100 rounded-full animate-pulse"
                />
              ))
            : filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveChapter(f.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeChapter === f.id
                      ? "bg-sky-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
        </div>
      </div>

      {/* Events grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {eventsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-slate-100 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">
                {searchQuery || activeChapter !== "all"
                  ? "No events found matching your search."
                  : "No events scheduled yet."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
