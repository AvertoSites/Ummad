import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function MainLayout() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="skip-link">
        {t("general.skipToContent")}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
