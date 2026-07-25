import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Globe,
  Heart,
  CheckCircle,
  Users,
  Lightbulb,
  TreePine,
  BookOpen,
  Stethoscope,
  Wheat,
  ShoppingBag,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const values = [
  {
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    titleKey: "aboutPage.value1Title",
    descKey: "aboutPage.value1Desc",
  },
  {
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
    titleKey: "aboutPage.value2Title",
    descKey: "aboutPage.value2Desc",
  },
  {
    icon: Globe,
    color: "bg-sky-100 text-sky-700",
    titleKey: "aboutPage.value3Title",
    descKey: "aboutPage.value3Desc",
  },
  {
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-700",
    titleKey: "aboutPage.value4Title",
    descKey: "aboutPage.value4Desc",
  },
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
    icon: Users,
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

const timeline = [
  {
    year: "2026",
    titleKey: "aboutPage.tl2026Title",
    descKey: "aboutPage.tl2026Desc",
  },
];

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-700 to-sky-900 text-white py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-300 text-sm font-semibold uppercase tracking-wider mb-3"
          >
            {t("about.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold mb-6 max-w-3xl mx-auto"
          >
            {t("aboutPage.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sky-200 text-lg max-w-2xl mx-auto"
          >
            {t("aboutPage.heroDesc")}
          </motion.p>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-sky-50 rounded-2xl p-8 border border-sky-100"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-5">
                <Globe size={24} className="text-sky-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                {t("about.vision")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t("about.visionText")}
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-green-50 rounded-2xl p-8 border border-green-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <Heart size={24} className="text-green-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                {t("about.mission")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t("about.missionText")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
              {t("aboutPage.valuesEyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t("aboutPage.valuesTitle")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.titleKey}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${val.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {t(val.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {t(val.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
                {t("aboutPage.objectivesEyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                {t("aboutPage.objectivesTitle")}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t("aboutPage.objectivesDesc")}
              </p>
              <ul className="space-y-4">
                {(["obj1", "obj2", "obj3", "obj4", "obj5"] as const).map(
                  (k) => (
                    <li key={k} className="flex gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-600 text-sm leading-relaxed">
                        {t(`aboutPage.${k}`)}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                alt="Community"
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
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
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
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

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-3">
              {t("aboutPage.timelineEyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t("aboutPage.timelineTitle")}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-6 pl-0"
                >
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-sky-700 flex items-center justify-center z-10">
                    <span className="text-white text-xs font-bold">
                      {item.year.slice(2)}
                    </span>
                  </div>
                  <div className="pt-2 pb-2">
                    <p className="text-xs font-semibold text-sky-700 mb-0.5">
                      {item.year}
                    </p>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sky-700 to-sky-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-extrabold mb-4">
              {t("aboutPage.ctaTitle")}
            </h2>
            <p className="text-sky-200 mb-8">{t("aboutPage.ctaDesc")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/news"
                className="px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                {t("aboutPage.ctaNews")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
