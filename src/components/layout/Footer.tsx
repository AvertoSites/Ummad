import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "../shared/SocialIcons";
import { useChapters } from "../../features/chapters/hooks/useChapters";

export function Footer() {
  const { t } = useTranslation();
  const { chapters } = useChapters();

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("news.viewAll"), href: "/news" },
    { label: t("events.viewAll"), href: "/events" },
  ];

  const featuredChapters = chapters.slice(0, 3);

  return (
    <footer className="bg-slate-900 text-slate-300" id="contact">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-sky-600 via-green-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="UMAD logo"
                className="w-10 h-10 object-contain rounded-full"
              />
              <div>
                <p className="font-bold text-white text-base leading-tight">
                  UMAD
                </p>
                <p className="text-xs text-sky-400 leading-tight">
                  Ururka Midnimada Adal
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              {t("footer.description")}
            </p>
            <p className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chapters — only rendered when at least one exists */}
          {featuredChapters.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t("footer.chapters")}
              </h3>
              <ul className="space-y-2.5">
                {featuredChapters.map((chapter) => (
                  <li key={chapter.id}>
                    <Link
                      to={`/chapters/${chapter.slug}`}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {chapter.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-sky-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@umad.org"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  info@umad.org
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  size={15}
                  className="text-sky-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-slate-400">
                  +1 (613) 555-0199
                </span>
              </li>
              {chapters.length > 0 && (
                <li className="flex items-start gap-2.5">
                  <MapPin
                    size={15}
                    className="text-sky-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-400 break-words">
                    {chapters
                      .slice(0, 3)
                      .map((c) => c.location)
                      .join(" · ")}
                  </span>
                </li>
              )}
            </ul>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-700 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-700 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-700 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} UMAD — Ururka Midnimada Adal.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
