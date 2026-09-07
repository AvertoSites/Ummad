import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
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
  PlayCircle,
  Star,
} from "lucide-react";
import { useChapters } from "../../chapters/hooks/useChapters";
import { useNews } from "../hooks/useNews";
import { useEvents } from "../../events/hooks/useEvents";
import { EventCard } from "../../../components/shared/EventCard";
import { ChapterCard } from "../../../components/shared/ChapterCard";
import { CardVideo } from "../../../components/shared/CardVideo";
import { MediaPlaceholder } from "../../../components/shared/MediaPlaceholder";
import {
  CardSkeleton,
  CardSkeletonGrid,
} from "../../../components/shared/CardSkeleton";
import { formatDate } from "../../../utils/format-date";
import { getEventTiming } from "../../../utils/event-date";
import { isDirectVideoFile } from "../../../utils/video";
import { siteConfig } from "../../../config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Crossfading background images for the "about" panel
const aboutSlides = [
  "/images/Picture8.jpg",
  "/images/Picture7.jpg",
  "/images/Picture1.png",
  "/images/Picture3.jpg",
  "/images/Picture4.jpg",
  "/images/Picture5.jpg",
  "/images/Picture6.jpg",
  "/images/Picture9.jpg",
];

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
  const featuredArticle = articles[0];
  const featuredPreviewVideo =
    featuredArticle?.videoUrl && isDirectVideoFile(featuredArticle.videoUrl)
      ? featuredArticle.videoUrl
      : null;
  const secondaryNews = articles.slice(1, 7);
  const upcomingEvents = events
    .filter((e) => !getEventTiming(e.date, e.endDate).isPast)
    .slice(0, 3);

  const [aboutSlideIndex, setAboutSlideIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setAboutSlideIndex((prev) => (prev + 1) % aboutSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const impactStats = [
    { value: "500+",  labelKey: "impact.volunteers", icon: Users,       color: "text-sky-600" },
    { value: String(chapters.length), labelKey: "impact.chapters", icon: Globe, color: "text-green-600" },
    { value: "40+",   labelKey: "impact.projects",   icon: CheckCircle, color: "text-amber-600" },
    { value: "50k+",  labelKey: "impact.people",     icon: Heart,       color: "text-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <h1 className="sr-only">
        UMAD — {t("hero.headline")}
      </h1>
      {/* ── TOP STORY ── */}
      <section className="bg-slate-50 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Featured story — large box */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="md:col-span-2"
            >
              <Link
                to={featuredArticle ? `/news/${featuredArticle.slug}` : "/news"}
                className="group relative flex flex-col justify-end min-h-[380px] sm:min-h-[460px] h-full rounded-3xl overflow-hidden shadow-lg bg-slate-800"
              >
                {newsLoading ? (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                ) : featuredArticle?.image ? (
                  <img
                    src={featuredArticle.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : featuredPreviewVideo ? (
                  <>
                    <MediaPlaceholder className="absolute inset-0" size="lg" />
                    <CardVideo
                      src={featuredPreviewVideo}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </>
                ) : (
                  <MediaPlaceholder className="absolute inset-0" size="lg" />
                )}
                {!newsLoading && featuredArticle?.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/15 group-hover:bg-slate-900/25 transition-colors pointer-events-none">
                    <PlayCircle size={64} className="text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
                <div className="relative z-10 p-6 sm:p-10">
                  {newsLoading ? (
                    <div className="space-y-3">
                      <div className="h-4 w-24 bg-white/20 rounded-full" />
                      <div className="h-8 w-3/4 bg-white/20 rounded" />
                      <div className="h-4 w-full bg-white/10 rounded" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-amber-400 text-slate-900 rounded-full uppercase tracking-wider">
                          <Star size={12} className="fill-slate-900" />
                          {t("news.topStory")}
                        </span>
                        {featuredArticle?.category && (
                          <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-white/15 text-white rounded-full uppercase tracking-wide backdrop-blur-sm">
                            {featuredArticle.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3 max-w-2xl">
                        {featuredArticle?.title ?? t("hero.headline")}
                      </h2>
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2 max-w-2xl">
                        {featuredArticle?.excerpt ?? t("hero.subheadline")}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        {featuredArticle ? (
                          <>
                            <span className="font-medium">{featuredArticle.chapterName}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={12} />
                              {formatDate(featuredArticle.publishedAt)}
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-sky-300">
                            {t("news.viewAll")} <ArrowRight size={13} />
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* About the site — small box */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="md:col-span-1"
            >
              <div className="relative flex flex-col h-full min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={aboutSlideIndex}
                      src={aboutSlides[aboutSlideIndex]}
                      alt=""
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-900/85 via-sky-900/80 to-slate-950/90" />
                </div>
                <div className="relative z-10 flex flex-col h-full p-8">
                  <p className="text-sky-300 font-semibold tracking-widest text-xs uppercase mb-4">
                    {t("hero.tagline")}
                  </p>
                  <h3 className="text-2xl font-extrabold text-white leading-snug mb-4">
                    {t("hero.headline")}
                  </h3>
                  <p className="text-sky-100/80 text-sm leading-relaxed mb-8">
                    {t("hero.subheadline")}
                  </p>
                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      to="/about"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-sky-800 font-semibold rounded-xl hover:bg-sky-50 transition-colors text-sm"
                    >
                      {t("hero.ctaLearnMore")} <ArrowRight size={15} />
                    </Link>
                    <Link
                      to="/chapters"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
                    >
                      {t("hero.ctaChapters")}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* More headlines — small news boxes */}
          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-5"
            >
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                More Headlines
              </h3>
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                {t("news.viewAll")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {newsLoading ? (
                Array.from({ length: 6 }).map((_, n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse"
                  >
                    <div className="aspect-[16/10] bg-slate-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-2.5 bg-slate-200 rounded w-1/3" />
                      <div className="h-4 bg-slate-200 rounded w-full" />
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                ))
              ) : secondaryNews.length === 0 ? (
                <div className="col-span-full text-center py-10 text-slate-500">
                  <p className="font-medium">
                    No more articles yet — check back soon.
                  </p>
                </div>
              ) : (
                secondaryNews.map((article, i) => {
                  const previewVideo =
                    article.videoUrl && isDirectVideoFile(article.videoUrl)
                      ? article.videoUrl
                      : null;
                  return (
                    <motion.div
                      key={article.id}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="h-full"
                    >
                      <Link
                        to={`/news/${article.slug}`}
                        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative bg-gradient-to-br from-sky-50 to-slate-100">
                          {article.image ? (
                            <img
                              src={article.image}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : previewVideo ? (
                            <>
                              <MediaPlaceholder className="absolute inset-0" size="sm" />
                              <CardVideo
                                src={previewVideo}
                                className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </>
                          ) : (
                            <MediaPlaceholder className="w-full h-full" size="sm" />
                          )}
                          {previewVideo ? (
                            <span className="absolute bottom-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-900/70 text-white backdrop-blur-sm pointer-events-none">
                              <PlayCircle size={13} />
                            </span>
                          ) : article.videoUrl ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 group-hover:bg-slate-900/35 transition-colors pointer-events-none">
                              <PlayCircle size={36} className="text-white drop-shadow-lg" />
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                          <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wide mb-1.5">
                            {article.category}
                          </span>
                          <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors mb-3">
                            {article.title}
                          </h3>
                          <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-xs text-slate-500">
                              {formatDate(article.publishedAt)}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                              {t("news.readMore")}
                              <ArrowRight
                                size={12}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
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

      {/* ── OBJECTIVES ── */}
      <section id="objectives" className="py-20 bg-gradient-to-br from-slate-900 to-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sky-400 font-semibold tracking-widest text-sm uppercase mb-4">
              {t("aboutPage.objectivesEyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              {t("aboutPage.objectivesTitle")}
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {t("aboutPage.objectivesDesc")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {([
              { icon: Wheat,        color: "bg-amber-500",  title: t("aboutPage.obj1") },
              { icon: Stethoscope,  color: "bg-rose-500",   title: t("aboutPage.obj2") },
              { icon: ShoppingBag, color: "bg-violet-500", title: t("aboutPage.obj3") },
              { icon: TreePine,    color: "bg-green-500",  title: t("aboutPage.obj4") },
            ] as const).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stakeholder note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-sky-600/20 border border-sky-500/30 rounded-2xl p-6 flex gap-4 items-start max-w-4xl mx-auto"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users size={20} className="text-sky-300" />
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {t("aboutPage.obj5")}
            </p>
          </motion.div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {chaptersLoading ? (
              [1, 2, 3].map((n) => (
                <CardSkeleton key={n} />
              ))
            ) : chapters.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-slate-500 font-medium">
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

          {eventsLoading ? (
            <CardSkeletonGrid count={3} className="grid md:grid-cols-3 gap-8" />
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="font-medium">
                No upcoming events — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, i) => (
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
              ))}
            </div>
          )}
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
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                  "Donation enquiry — UMAD",
                )}`}
                className="px-7 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                {t("involved.donate")}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                  "Volunteering with UMAD",
                )}`}
                className="px-7 py-3 bg-white text-sky-800 font-semibold rounded-xl hover:bg-sky-50 transition-colors"
              >
                {t("involved.volunteer")}
              </a>
              <Link
                to="/#contact"
                className="px-7 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                {t("involved.contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
