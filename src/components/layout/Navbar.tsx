import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, ChevronDown, MapPin, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChapters } from "../../features/chapters/hooks/useChapters";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "so", label: "Soomaali" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive
      ? "text-sky-700 bg-sky-50"
      : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
  }`;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { chapters } = useChapters();

  const chaptersRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("nav.home"), href: "/", end: true },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.events"), href: "/events" },
  ];

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  // Solidify the bar once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setChaptersOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    if (!chaptersOpen && !langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (
        chaptersOpen &&
        chaptersRef.current &&
        !chaptersRef.current.contains(e.target as Node)
      )
        setChaptersOpen(false);
      if (
        langOpen &&
        langRef.current &&
        !langRef.current.contains(e.target as Node)
      )
        setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChaptersOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [chaptersOpen, langOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition duration-200 ${
        scrolled
          ? "bg-white shadow-md border-slate-200"
          : "bg-white/90 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 rounded-md"
          >
            <img
              src="/images/logo.png"
              alt="UMAD logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            <div className="leading-tight">
              <p className="font-bold text-slate-900 text-base">UMAD</p>
              <p className="text-xs text-sky-700 hidden sm:block">
                Ururka Midnimada Adal
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.end}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Chapters dropdown */}
            <div
              ref={chaptersRef}
              className="relative"
              onMouseEnter={() => setChaptersOpen(true)}
              onMouseLeave={() => setChaptersOpen(false)}
            >
              <div className="flex items-center">
                <NavLink to="/chapters" className={linkClass}>
                  {t("nav.chapters")}
                </NavLink>
                <button
                  type="button"
                  aria-label={t("nav.chapters")}
                  aria-expanded={chaptersOpen}
                  aria-haspopup="true"
                  onClick={() => setChaptersOpen((v) => !v)}
                  className="p-1.5 -ml-1 rounded-md text-slate-500 hover:text-sky-700 hover:bg-slate-50"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      chaptersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
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
                      <Link
                        to="/chapters"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 border-b border-slate-100 transition-colors"
                      >
                        {t("nav.chapters")}
                        <span className="ml-auto text-xs text-slate-400">
                          All →
                        </span>
                      </Link>
                      {chapters.length === 0 ? (
                        <p className="px-4 py-3 text-xs text-slate-400 italic">
                          No chapters yet
                        </p>
                      ) : (
                        chapters.map((chapter) => (
                          <Link
                            key={chapter.id}
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
                              <p className="text-xs text-slate-500">
                                {chapter.location}
                              </p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-sky-700 rounded-md hover:bg-slate-50 transition-colors"
                aria-label="Switch language"
                aria-expanded={langOpen}
                aria-haspopup="true"
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
              className="px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors inline-flex items-center gap-1.5 shadow-sm"
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
            aria-expanded={mobileOpen}
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
                {chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
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
              <div className="pt-2">
                <Link
                  to="/article"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors"
                >
                  <PenLine size={14} />
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
