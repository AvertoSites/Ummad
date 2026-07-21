import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, ChevronDown, MapPin, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "so", label: "Soomaali" },
];

const CHAPTERS = [
  { slug: "ottawa", name: "Ottawa Chapter", location: "Ottawa, Canada" },
  {
    slug: "washington",
    name: "Washington Chapter",
    location: "Washington D.C., USA",
  },
  { slug: "somalia", name: "Somalia Chapter", location: "Somalia" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.events"), href: "/events" },
  ];

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="UMAD logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            <div>
              <p className="font-bold text-slate-900 text-base leading-tight">
                UMAD
              </p>
              <p className="text-xs text-sky-700 leading-tight hidden sm:block">
                Ururka Midnimada Adal
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home + About */}
            {navLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive && link.href === "/"
                      ? "text-sky-700 bg-sky-50"
                      : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Chapters dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setChaptersOpen(true)}
              onMouseLeave={() => setChaptersOpen(false)}
            >
              <NavLink
                to="/chapters"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-sky-700 bg-sky-50"
                      : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
                  }`
                }
              >
                {t("nav.chapters")}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    chaptersOpen ? "rotate-180" : ""
                  }`}
                />
              </NavLink>
              <AnimatePresence>
                {chaptersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-1 w-56"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                      {/* All chapters link */}
                      <Link
                        to="/chapters"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 border-b border-slate-100 transition-colors"
                      >
                        {t("nav.chapters")}
                        <span className="ml-auto text-xs text-slate-400">
                          All →
                        </span>
                      </Link>
                      {CHAPTERS.map((chapter) => (
                        <Link
                          key={chapter.slug}
                          to={`/chapters/${chapter.slug}`}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                        >
                          <MapPin
                            size={13}
                            className="text-sky-500 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {chapter.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {chapter.location}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining links */}
            {navLinks.slice(2).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive &&
                    link.href !== "/#programs" &&
                    link.href !== "/#contact"
                      ? "text-sky-700 bg-sky-50"
                      : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-sky-700 rounded-md hover:bg-slate-50 transition-colors"
                aria-label="Switch language"
              >
                <Globe size={16} />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          i18n.language === lang.code
                            ? "text-sky-700 font-semibold bg-sky-50"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/article"
              className="px-4 py-2 border border-sky-700 text-sky-700 text-sm font-semibold rounded-lg hover:bg-sky-50 transition-colors inline-flex items-center gap-1.5"
            >
              <PenLine size={14} />
              {t("nav.shareArticle")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-sky-700 hover:bg-slate-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-sky-700 hover:bg-slate-50 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {/* Chapters group in mobile */}
              <div className="pt-1">
                <p className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {t("nav.chapters")}
                </p>
                <Link
                  to="/chapters"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 rounded-md transition-colors"
                >
                  All Chapters →
                </Link>
                {CHAPTERS.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    to={`/chapters/${chapter.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:text-sky-700 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <MapPin size={12} className="text-sky-500 flex-shrink-0" />
                    {chapter.name}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100">
                <p className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {t("footer.language")}
                </p>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setMobileOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors ${
                      i18n.language === lang.code
                        ? "text-sky-700 font-semibold bg-sky-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/article"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2.5 border border-sky-700 text-sky-700 text-sm font-semibold rounded-lg hover:bg-sky-50 transition-colors"
                >
                  {t("nav.shareArticle")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
