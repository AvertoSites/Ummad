import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarDays, X } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { useChapters } from "../../chapters/hooks/useChapters";
import { EventCard } from "../../../components/shared/EventCard";
import { PageHeader } from "../../../components/shared/PageHeader";
import { FilterScroller } from "../../../components/shared/FilterScroller";
import { CardSkeletonGrid } from "../../../components/shared/CardSkeleton";
import { fadeUp } from "../../../lib/motion";
import { filterPillClass } from "../../../lib/ui";
import { getEventTiming } from "../../../utils/event-date";

export function EventsPage() {
  const { t } = useTranslation();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { events, loading: eventsLoading } = useEvents();
  const [activeChapter, setActiveChapter] = useState("all");
  const [when, setWhen] = useState<"upcoming" | "past" | "all">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: t("events.allChapters") },
    ...chapters.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return events
      .filter((e) => activeChapter === "all" || e.chapterId === activeChapter)
      .filter((e) => {
        if (when === "all") return true;
        const past = getEventTiming(e.date, e.endDate).isPast;
        return when === "past" ? past : !past;
      })
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      );
  }, [events, activeChapter, when, searchQuery]);

  const hasFilters =
    activeChapter !== "all" || searchQuery.trim() !== "" || when !== "upcoming";

  return (
    <div className="min-h-screen bg-white pt-16">
      <PageHeader
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        description={t("events.description")}
      >
        <div className="max-w-md mx-auto relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("events.searchPlaceholder")}
            aria-label={t("events.searchPlaceholder")}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t("general.close")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 rounded-md p-1"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {chaptersLoading ? (
            <div className="flex items-center gap-2 py-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex-shrink-0 h-9 w-24 bg-slate-100 rounded-full animate-pulse"
                />
              ))}
            </div>
          ) : (
            <FilterScroller>
              {(["upcoming", "past", "all"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWhen(w)}
                  className={filterPillClass(when === w)}
                >
                  {t(`events.${w}`)}
                </button>
              ))}
              <span className="flex-shrink-0 w-px h-6 bg-slate-200 mx-1" />
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveChapter(f.id)}
                  className={filterPillClass(activeChapter === f.id)}
                >
                  {f.label}
                </button>
              ))}
            </FilterScroller>
          )}
        </div>
      </div>

      {/* Events grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!eventsLoading && (
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-sm text-slate-500">
                {t("general.results", { count: filtered.length })}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveChapter("all");
                    setSearchQuery("");
                    setWhen("upcoming");
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
                >
                  <X size={14} /> {t("general.clearFilters")}
                </button>
              )}
            </div>
          )}

          {eventsLoading ? (
            <CardSkeletonGrid count={6} />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 text-slate-400"
            >
              <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">
                {hasFilters
                  ? "No events found matching your search."
                  : "No events scheduled yet."}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter + searchQuery + when}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
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
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
