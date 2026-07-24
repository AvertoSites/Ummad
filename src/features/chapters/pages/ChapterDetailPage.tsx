import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "../../../components/shared/SocialIcons";
import { useChapterBySlug } from "../hooks/useChapters";
import { useNews } from "../../news/hooks/useNews";
import { useEvents } from "../../events/hooks/useEvents";
import { NewsCard } from "../../../components/shared/NewsCard";
import { EventCard } from "../../../components/shared/EventCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

export function ChapterDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const { chapter, loading } = useChapterBySlug(slug ?? "");
  const { articles: allArticles } = useNews();
  const { events: allEvents } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16 grid place-items-center">
        <p className="text-sm text-slate-400 animate-pulse">Loading chapter…</p>
      </div>
    );
  }
  if (!chapter) return <Navigate to="/chapters" replace />;

  const chapterNews = allArticles.filter((a) => a.chapterId === chapter.id);
  const chapterEvents = allEvents.filter((e) => e.chapterId === chapter.id);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Cover Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={chapter.coverImage}
          alt={chapter.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/chapters"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-3 transition-colors"
            >
              <ArrowLeft size={14} /> {t("nav.chapters")}
            </Link>
            <div className="flex items-center gap-2 text-sky-300 text-sm mb-2">
              <MapPin size={14} />
              <span>{chapter.location}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              {chapter.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-sky-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${chapter.email}`}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
          >
            {t("chapterDetail.contactChapter")}
          </a>
          <Link
            to="/#get-involved"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
          >
            {t("chapterDetail.volunteer")}
          </Link>
          <a
            href="#events"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
          >
            {t("chapterDetail.viewEvents")}
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: About, History, Programs */}
          <div className="lg:col-span-2 space-y-14">
            {/* About */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                {t("chapterDetail.aboutChapter")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {chapter.longDescription}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-sky-50 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-2">
                    {t("chapterDetail.purpose")}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {chapter.purpose}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-2">
                    {t("chapterDetail.community")}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {chapter.community}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* History */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                {t("chapterDetail.history")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {chapter.history}
              </p>
            </motion.section>

            {/* Goals */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                {t("chapterDetail.goals")}
              </h2>
              <ul className="space-y-3">
                {chapter.goals.map((goal) => (
                  <li key={goal} className="flex gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Programs */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                {t("chapterDetail.programsInitiatives")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {chapter.programs.map((prog, i) => (
                  <motion.div
                    key={prog.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="rounded-xl overflow-hidden border border-slate-100 shadow-sm"
                  >
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Leadership */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                {t("chapterDetail.leadership")}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {chapter.leadership.map((leader, i) => (
                  <motion.div
                    key={leader.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center"
                  >
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-sky-100"
                    />
                    <p className="font-semibold text-slate-900">
                      {leader.name}
                    </p>
                    <p className="text-xs text-sky-700 font-medium mb-1">
                      {leader.position}
                    </p>
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-xs text-slate-400 hover:text-sky-700 transition-colors"
                      >
                        {leader.email}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Chapter News */}
            {chapterNews.length > 0 && (
              <section id="news">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                  {t("chapterDetail.chapterNews")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {chapterNews.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Chapter Events */}
            {chapterEvents.length > 0 && (
              <section id="events">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                  {t("chapterDetail.chapterEvents")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {chapterEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sidebar - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">
                  {t("chapterDetail.contactInfo")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail
                      size={15}
                      className="text-sky-600 mt-0.5 flex-shrink-0"
                    />
                    <a
                      href={`mailto:${chapter.email}`}
                      className="text-sm text-slate-600 hover:text-sky-700 transition-colors break-all"
                    >
                      {chapter.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      size={15}
                      className="text-sky-600 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-slate-600">
                      {chapter.phone}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-200">
                  {chapter.socialLinks.facebook && (
                    <a
                      href={chapter.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-700 hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={14} />
                    </a>
                  )}
                  {chapter.socialLinks.twitter && (
                    <a
                      href={chapter.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-700 hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <TwitterIcon size={14} />
                    </a>
                  )}
                  {chapter.socialLinks.instagram && (
                    <a
                      href={chapter.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-700 hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Volunteer CTA */}
              <div className="bg-sky-700 rounded-xl p-6 text-white text-center">
                <h3 className="font-bold mb-2">
                  {t("chapterDetail.volunteerSection")}
                </h3>
                <p className="text-sky-200 text-sm mb-4">
                  Make a real difference in your community by volunteering with
                  us.
                </p>
                <a
                  href={`mailto:${chapter.email}`}
                  className="block w-full py-2.5 bg-white text-slate-900 font-semibold rounded-lg text-sm hover:bg-slate-100 transition-colors"
                >
                  {t("chapterDetail.volunteer")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
