import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../features/news/pages/HomePage";
import { AboutPage } from "../features/about/pages/AboutPage";
import { ChaptersPage } from "../features/chapters/pages/ChaptersPage";
import { ChapterDetailPage } from "../features/chapters/pages/ChapterDetailPage";
import { NewsListPage } from "../features/news/pages/NewsListPage";
import { NewsDetailPage } from "../features/news/pages/NewsDetailPage";
import { EventsPage } from "../features/events/pages/EventsPage";
import { EventDetailPage } from "../features/events/pages/EventDetailPage";
import { SubmitArticlePage } from "../features/submit/pages/SubmitArticlePage";
import { AdminPage } from "../features/admin/pages/AdminPage";
import { AdminLoginPage } from "../features/admin/pages/AdminLoginPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public admin login — accessible without a session */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected admin dashboard — Firebase session required */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="chapters" element={<ChaptersPage />} />
        <Route path="chapters/:slug" element={<ChapterDetailPage />} />
        <Route path="news" element={<NewsListPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:slug" element={<EventDetailPage />} />
        <Route path="article" element={<SubmitArticlePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}
