import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Heart,
  Users,
  Globe,
  CheckCircle,
  BookOpen,
  Stethoscope,
  Wheat,
  TreePine,
  Lightbulb,
  ShoppingBag,
} from "lucide-react";
import { useChapters } from "../../chapters/hooks/useChapters";
import { useNews } from "../hooks/useNews";
import { useEvents } from "../../events/hooks/useEvents";
import { NewsCard } from "../../../components/shared/NewsCard";
import { EventCard } from "../../../components/shared/EventCard";
import { ChapterCard } from "../../../components/shared/ChapterCard";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Hero slideshow slides
// Single = one high-res image fills the full background
// Double = two lower-res images placed side-by-side (each only fills half the width)
const heroSlides = [
  { type: "single", images: ["/images/Picture8.jpg"] },
  { type: "single", images: ["/images/Picture7.jpg"] },
  { type: "single", images: ["/images/Picture1.png"] },
  { type: "double", images: ["/images/Picture4.jpg", "/images/Picture5.jpg"] },
  { type: "single", images: ["/images/Picture3.jpg"] },
  { type: "double", images: ["/images/Picture6.jpg", "/images/Picture9.jpg"] },
] as const;


const programs = [
  {
    icon: BookOpen,
    color: "bg-sky-100 text-sky-700",
    titleKey: "programs.education.title",
    descKey: "programs.education.description",
  },
  {
    icon: Stethoscope,
    color: "bg-red-100 text-red-700",
    titleKey: "programs.healthcare.title",
    descKey: "programs.healthcare.description",
  },
  {
    icon: Wheat,
    color: "bg-amber-100 text-amber-700",
    titleKey: "programs.foodSecurity.title",
    descKey: "programs.foodSecurity.description",
  },
  {
    icon: TreePine,
    color: "bg-green-100 text-green-700",
    titleKey: "programs.environment.title",
    descKey: "programs.environment.description",
  },
  {
    icon: Lightbulb,
    color: "bg-purple-100 text-purple-700",
    titleKey: "programs.youth.title",
    descKey: "programs.youth.description",
  },
  {
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-700",
    titleKey: "programs.smallBusiness.title",
    descKey: "programs.smallBusiness.description",
  },
];

export function HomePage() {
  const { t } = useTranslation();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { articles, loading: newsLoading } = useNews();
  const { events, loading: eventsLoading } = useEvents();
  const latestNews = articles.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  // Hero slideshow
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const currentSlide = heroSlides[slideIndex];

  const impactStats = [
    { value: "500+",  labelKey: "impact.volunteers", icon: Users,       color: "text-sky-600" },
    { value: String(chapters.length), labelKey: "impact.chapters", icon: Globe, color: "text-green-600" },
    { value: "40+",   labelKey: "impact.projects",   icon: CheckCircle, color: "text-amber-600" },
    { value: "50k+",  labelKey: "impact.people",     icon: Heart,       color: "text-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Crossfading background slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 flex"
            >
              {currentSlide.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-full object-cover"
                  style={{ width: `${100 / currentSlide.images.length}%` }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          {/* Permanent dark overlay so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-sky-400 font-semibold tracking-widest text-sm uppercase mb-4"
            >
              {t("hero.tagline")}
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              {t("hero.headline")}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-slate-300 leading-relaxed mb-10"
            >
              {t("hero.subheadline")}
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/about"
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors"
              >
                {t("hero.ctaLearnMore")}
              </Link>
              <Link
                to="/news"
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-colors"
              >
                {t("news.viewAll")}
              </Link>
              <Link
                to="/chapters"
                className="px-6 py-3 border-2 border-white/40 hover:border-white text-white font-semibold rounded-xl transition-colors"
              >
                {t("hero.ctaChapters")}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="bg-sky-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.labelKey}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-white" />
                  </div>
                  <p className="text-3xl font-extrabold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-sky-200 mt-1">
                    {t(stat.labelKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
                {t("about.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-5">
                {t("about.title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {t("about.description")}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe size={20} className="text-sky-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {t("about.vision")}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t("about.visionText")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart size={20} className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {t("about.mission")}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t("about.missionText")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="/images/Picture8.jpg"
                alt="Community development"
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-4 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Est. 2026</p>
                  <p className="text-xs text-slate-500">
                    Serving communities globally
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
              {t("programs.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("programs.title")}
            </h2>
            <p className="text-slate-500 leading-relaxed">
              {t("programs.description")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.titleKey}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${prog.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {t(prog.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {t(prog.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ── */}
      <section id="chapters" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
              {t("chapters.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("chapters.title")}
            </h2>
            <p className="text-slate-500 leading-relaxed">
              {t("chapters.description")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {chaptersLoading ? (
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                  </div>
                </div>
              ))
            ) : chapters.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-slate-400 font-medium">
                  No chapters at this time — check back soon.
                </p>
              </div>
            ) : (
              chapters.map((chapter, i) => (
                <motion.div
                  key={chapter.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <ChapterCard chapter={chapter} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section id="latest-news" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-2">
                {t("news.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t("news.title")}
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              {t("news.viewAll")} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsLoading ? (
              [1, 2, 3].map((n) => (
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
              ))
            ) : latestNews.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400">
                <p className="font-medium">
                  No articles published yet — check back soon.
                </p>
              </div>
            ) : (
              latestNews.map((article, i) => (
                <motion.div
                  key={article.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-2">
                {t("events.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t("events.title")}
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              {t("events.viewAll")} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {eventsLoading ? (
              [1, 2, 3].map((n) => (
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
              ))
            ) : upcomingEvents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400">
                <p className="font-medium">
                  No upcoming events — check back soon.
                </p>
              </div>
            ) : (
              upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── GET INVOLVED ── */}
      <section
        id="get-involved"
        className="py-20 bg-gradient-to-br from-sky-700 to-sky-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3">
              {t("involved.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
              {t("involved.title")}
            </h2>
            <p className="text-sky-200 text-lg max-w-xl mx-auto mb-10">
              {t("involved.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:info.ummad26@gmail.com"
                className="px-7 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                {t("involved.contact")}
              </a>
              <Link
                to="/#contact"
                className="px-7 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
              >
                {t("involved.donate")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
