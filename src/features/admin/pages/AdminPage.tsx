import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Building2,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Bell,
  LogOut,
  Menu,
  X,
  FileText,
  House,
  ArrowLeft,
  BarChart2,
} from "lucide-react";
import { formatDate } from "../../../utils/format-date";
import {
  useSubmissions,
  type Submission,
} from "../../submit/SubmissionsContext";
import { signOut } from "../services/auth";
import {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  type ChapterData,
  type ChapterInput,
} from "../../chapters/services/chapters";
import {
  getNewsArticles,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  type NewsArticleData,
  type NewsInput,
} from "../../news/services/news";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type EventData,
  type EventInput,
} from "../../events/services/events";
import { ChapterForm } from "../components/ChapterForm";
import { NewsForm } from "../components/NewsForm";
import { EventForm } from "../components/EventForm";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import {
  getSiteStats,
  updateSiteStats,
  type SiteStats,
} from "../services/siteStats";

type AdminSection =
  | "dashboard"
  | "news"
  | "events"
  | "chapters"
  | "submissions"
  | "siteStats";

const navItems: {
  key: AdminSection;
  icon: typeof LayoutDashboard;
  labelKey: string;
}[] = [
  { key: "dashboard", icon: LayoutDashboard, labelKey: "admin.dashboard" },
  { key: "submissions", icon: FileText, labelKey: "Submissions" },
  { key: "news", icon: Newspaper, labelKey: "admin.newsManagement" },
  { key: "events", icon: CalendarDays, labelKey: "admin.eventManagement" },
  { key: "chapters", icon: Building2, labelKey: "admin.chapterManagement" },
  { key: "siteStats", icon: BarChart2, labelKey: "Site Stats" },
];

export function AdminPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    submissions,
    loading: submissionsLoading,
    updateStatus,
  } = useSubmissions();
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  const handleSignOut = async () => {
    await signOut();
    setSidebarOpen(false);
    setActiveSection("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="px-6 py-5 border-b border-slate-800">
            <p className="text-sm font-bold text-white">UMAD Admin</p>
            <p className="text-xs text-slate-400">Management Dashboard</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSub = item.key === "submissions";
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.key
                      ? "bg-sky-700 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon size={17} />
                  {isSub ? "Submissions" : t(item.labelKey)}
                  {isSub && pendingCount > 0 && (
                    <span className="ml-auto text-xs bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                  {activeSection === item.key && !isSub && (
                    <ChevronRight size={14} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-slate-800">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-bold text-slate-900">
            {t(
              navItems.find((n) => n.key === activeSection)?.labelKey ??
                "admin.dashboard",
            )}
          </h1>
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <House size={16} />
            Home Page
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeSection === "dashboard" && (
            <DashboardView
              t={t}
              pendingCount={pendingCount}
              onGoToSubmissions={() => setActiveSection("submissions")}
              onNav={(s) => setActiveSection(s)}
            />
          )}
          {activeSection === "submissions" && (
            <SubmissionsQueue
              submissions={submissions}
              loading={submissionsLoading}
              updateStatus={updateStatus}
              createNews={createNewsArticle}
            />
          )}
          {activeSection === "news" && <NewsManagement t={t} />}
          {activeSection === "events" && <EventManagement t={t} />}
          {activeSection === "chapters" && <ChapterManagement t={t} />}
          {activeSection === "siteStats" && <SiteStatsManagement />}
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */
function DashboardView({
  t,
  pendingCount,
  onGoToSubmissions,
  onNav,
}: {
  t: (k: string) => string;
  pendingCount: number;
  onGoToSubmissions: () => void;
  onNav: (section: AdminSection) => void;
}) {
  const quickLinks: {
    section: AdminSection;
    icon: typeof Newspaper;
    label: string;
    color: string;
    bgColor: string;
  }[] = [
    {
      section: "submissions",
      icon: FileText,
      label: "Submissions",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
    {
      section: "news",
      icon: Newspaper,
      label: t("admin.newsManagement"),
      color: "text-sky-700",
      bgColor: "bg-sky-100",
    },
    {
      section: "events",
      icon: CalendarDays,
      label: t("admin.eventManagement"),
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    {
      section: "chapters",
      icon: Building2,
      label: t("admin.chapterManagement"),
      color: "text-purple-700",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Pending banner */}
      {pendingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onGoToSubmissions}
          className="flex items-center gap-4 bg-amber-50 border border-amber-300 rounded-xl px-5 py-4 cursor-pointer hover:bg-amber-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="text-amber-700" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-amber-900">
              {pendingCount} submission{pendingCount !== 1 ? "s" : ""} awaiting
              review
            </p>
            <p className="text-xs text-amber-700">
              Click to review and approve or reject
            </p>
          </div>
          <ChevronRight size={18} className="text-amber-600 flex-shrink-0" />
        </motion.div>
      )}

      {/* Quick access cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item, i) => {
          const Icon = item.icon;
          const isPending = item.section === "submissions";
          return (
            <motion.button
              key={item.section}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() =>
                item.section === "submissions"
                  ? onGoToSubmissions()
                  : onNav(item.section)
              }
              className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm text-left hover:border-sky-200 hover:shadow-md transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.bgColor}`}
              >
                <Icon size={20} className={item.color} />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {item.label}
              </p>
              {isPending && pendingCount > 0 && (
                <p className="text-xs text-amber-600 mt-1 font-semibold">
                  {pendingCount} pending
                </p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info panel */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <p className="text-sm font-bold text-slate-900 mb-1">
          Welcome to the UMAD Admin Panel
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          Use the sidebar to manage news articles, events, chapters, and review
          community submissions. All data is stored in Firestore and updates
          live on the public site.
        </p>
      </div>
    </div>
  );
}

/* ─── News Management ─── */
function NewsManagement({ t: _t }: { t: (k: string) => string }) {
  const [newsList, setNewsList] = useState<NewsArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "pending" | "rejected"
  >("all");
  const [view, setView] = useState<"list" | "form">("list");
  const [editTarget, setEditTarget] = useState<NewsArticleData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NewsArticleData | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setEditTarget(null);
    setView("form");
  }
  function openEdit(a: NewsArticleData) {
    setEditTarget(a);
    setView("form");
  }
  function closeForm() {
    setView("list");
    setEditTarget(null);
  }

  const load = async () => {
    setLoading(true);
    setFetchError("");
    try {
      setNewsList(await getNewsArticles());
    } catch {
      setFetchError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const filtered =
    statusFilter === "all"
      ? newsList
      : newsList.filter((a) => a.status === statusFilter);

  const handleCreate = async (input: NewsInput) => {
    await createNewsArticle(input);
    closeForm();
    load();
  };

  const handleUpdate = async (input: NewsInput) => {
    if (!editTarget) return;
    await updateNewsArticle(editTarget.id, input);
    closeForm();
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteNewsArticle(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  const handleQuickStatus = async (
    id: string,
    status: NewsArticleData["status"],
  ) => {
    await updateNewsArticle(id, { status });
    setNewsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
  };

  const statusColors: Record<string, string> = {
    published: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-600",
  };

  if (view === "form") {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={closeForm}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Articles
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6">
            {editTarget
              ? `Edit: ${editTarget.title.slice(0, 40)}…`
              : "New Article"}
          </h2>
          <NewsForm
            initial={editTarget ?? undefined}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Status filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "published", "pending", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  statusFilter === s
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                {s !== "all" &&
                  ` (${newsList.filter((a) => a.status === s).length})`}
              </button>
            ))}
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors"
          >
            <Plus size={15} /> New Article
          </button>
        </div>

        {fetchError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {fetchError}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-14 bg-slate-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-10 text-center text-slate-400">
            <Newspaper size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No articles yet. Create your first one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Title
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                      Chapter
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-900 line-clamp-1">
                          {a.title}
                        </p>
                        <p className="text-xs text-slate-400">{a.author}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                        {a.chapterName}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">
                        {formatDate(a.publishedAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[a.status] ?? "bg-slate-100 text-slate-600"}`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {a.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleQuickStatus(a.id, "published")
                                }
                                className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Approve"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  handleQuickStatus(a.id, "rejected")
                                }
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Reject"
                              >
                                <XCircle size={14} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => openEdit(a)}
                            className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(a)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteConfirmModal
          title={`Delete "${deleteTarget.title}"?`}
          description="This will permanently remove the article from Firestore."
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

/* ─── Event Management ─── */
function EventManagement({ t: _t }: { t: (k: string) => string }) {
  const [eventList, setEventList] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [view, setView] = useState<"list" | "form">("list");
  const [editTarget, setEditTarget] = useState<EventData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventData | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setEditTarget(null);
    setView("form");
  }
  function openEdit(e: EventData) {
    setEditTarget(e);
    setView("form");
  }
  function closeForm() {
    setView("list");
    setEditTarget(null);
  }

  const load = async () => {
    setLoading(true);
    setFetchError("");
    try {
      setEventList(await getEvents());
    } catch {
      setFetchError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleCreate = async (input: EventInput) => {
    await createEvent(input);
    closeForm();
    load();
  };

  const handleUpdate = async (input: EventInput) => {
    if (!editTarget) return;
    await updateEvent(editTarget.id, input);
    closeForm();
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteEvent(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  if (view === "form") {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={closeForm}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Events
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6">
            {editTarget
              ? `Edit: ${editTarget.title.slice(0, 40)}…`
              : "New Event"}
          </h2>
          <EventForm
            initial={editTarget ?? undefined}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading…"
              : `${eventList.length} event${eventList.length !== 1 ? "s" : ""}`}
          </p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors"
          >
            <Plus size={15} /> New Event
          </button>
        </div>

        {fetchError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {fetchError}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-14 bg-slate-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : eventList.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-10 text-center text-slate-400">
            <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No events yet. Create your first one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Event
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                      Chapter
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Type
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {eventList.map((e) => (
                    <tr
                      key={e.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-900 line-clamp-1">
                          {e.title}
                        </p>
                        <p className="text-xs text-slate-400">{e.location}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                        {e.chapterName}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">
                        {formatDate(e.date)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${e.isFree ? "bg-green-100 text-green-700" : "bg-sky-100 text-sky-700"}`}
                        >
                          {e.isFree ? "Free" : "Paid"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(e)}
                            className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(e)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteConfirmModal
          title={`Delete "${deleteTarget.title}"?`}
          description="This will permanently remove the event from Firestore."
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

/* ─── Chapter Management ─── */
function ChapterManagement({ t: _t }: { t: (k: string) => string }) {
  const [chapterList, setChapterList] = useState<ChapterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [view, setView] = useState<"list" | "form">("list");
  const [editTarget, setEditTarget] = useState<ChapterData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChapterData | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setEditTarget(null);
    setView("form");
  }
  function openEdit(c: ChapterData) {
    setEditTarget(c);
    setView("form");
  }
  function closeForm() {
    setView("list");
    setEditTarget(null);
  }

  const load = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const data = await getChapters();
      setChapterList(data);
    } catch {
      setFetchError("Failed to load chapters from Firestore.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleCreate = async (input: ChapterInput) => {
    await createChapter(input);
    closeForm();
    load();
  };

  const handleUpdate = async (input: ChapterInput) => {
    if (!editTarget) return;
    await updateChapter(editTarget.id, input);
    closeForm();
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteChapter(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      // deletion error handled silently
    } finally {
      setDeleting(false);
    }
  };

  if (view === "form") {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={closeForm}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Chapters
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6">
            {editTarget ? `Edit: ${editTarget.name}` : "Create New Chapter"}
          </h2>
          <ChapterForm
            initial={editTarget ?? undefined}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* List view */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading…"
              : `${chapterList.length} chapter${chapterList.length !== 1 ? "s" : ""}`}
          </p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors"
          >
            <Plus size={15} /> New Chapter
          </button>
        </div>

        {fetchError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {fetchError}
          </p>
        )}

        {!loading && chapterList.length === 0 && !fetchError && (
          <div className="bg-white rounded-xl border border-slate-100 p-10 text-center text-slate-400">
            <Building2 size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No chapters yet. Create your first one.</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapterList.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
            >
              {chapter.coverImage ? (
                <img
                  src={chapter.coverImage}
                  alt={chapter.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 bg-slate-100 flex items-center justify-center">
                  <Building2 size={28} className="text-slate-300" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <p className="font-bold text-slate-900 mb-0.5">
                  {chapter.name}
                </p>
                <p className="text-xs text-slate-500 mb-1">
                  {chapter.location}
                </p>
                <p className="text-xs text-slate-400 mb-3 font-mono">
                  /chapters/{chapter.slug}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => openEdit(chapter)}
                    className="flex-1 py-1.5 text-xs font-semibold bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(chapter)}
                    className="flex-1 py-1.5 text-xs font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          title={`Delete "${deleteTarget.name}"?`}
          description="This will permanently remove the chapter from Firestore. This action cannot be undone."
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

/* ─── Submissions Queue ─── */
function SubmissionsQueue({
  submissions,
  loading,
  updateStatus,
  createNews,
}: {
  submissions: Submission[];
  loading: boolean;
  updateStatus: (id: string, status: Submission["status"]) => Promise<void>;
  createNews: (input: NewsInput) => Promise<string>;
}) {
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(
    null,
  );

  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  async function handleDirectApprove(sub: Submission) {
    setApprovingId(sub.id);
    try {
      await createNews({
        title: sub.title,
        excerpt: sub.excerpt,
        content: sub.content,
        author: sub.authorName,
        authorEmail: sub.authorEmail,
        chapterId: sub.chapterId,
        chapterName: sub.chapterName,
        category: sub.category,
        image: sub.imageUrl,
        videoUrl: sub.videoUrl,
        status: "published",
      });
      await updateStatus(sub.id, "approved");
    } finally {
      setApprovingId(null);
    }
  }

  async function handleEditApprove(input: NewsInput) {
    if (!editingSubmission) return;
    setApprovingId(editingSubmission.id);
    try {
      await createNews({ ...input, status: "published" });
      await updateStatus(editingSubmission.id, "approved");
      setEditingSubmission(null);
    } finally {
      setApprovingId(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-28 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Pending Review
            {pending.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                {pending.length}
              </span>
            )}
          </h2>
          {pending.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-100 p-10 text-center text-slate-400">
              <CheckCircle size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No pending submissions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl border border-amber-200 shadow-sm"
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full">
                            {sub.category}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                            {sub.chapterName}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900">
                          {sub.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          by {sub.authorName} · {formatDate(sub.submittedAt)}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0 flex-wrap">
                        <button
                          onClick={() => handleDirectApprove(sub)}
                          disabled={!!approvingId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
                        >
                          <CheckCircle size={13} />
                          {approvingId === sub.id ? "Approving…" : "Approve"}
                        </button>
                        <button
                          onClick={() => setEditingSubmission(sub)}
                          disabled={!!approvingId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-700 text-white text-xs font-semibold rounded-lg hover:bg-sky-800 disabled:opacity-60 transition-colors"
                        >
                          <Pencil size={13} /> Edit &amp; Approve
                        </button>
                        <button
                          onClick={() => updateStatus(sub.id, "rejected")}
                          disabled={!!approvingId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors"
                        >
                          <XCircle size={13} /> Reject
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 italic mb-3 border-l-2 border-slate-200 pl-3">
                      {sub.excerpt}
                    </p>
                    <details>
                      <summary className="text-xs font-semibold text-sky-700 cursor-pointer hover:text-sky-800 select-none">
                        Read full article ▾
                      </summary>
                      <div className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
                        {sub.content}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {reviewed.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Reviewed
            </h2>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {reviewed.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-5 py-3.5 flex items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {sub.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        by {sub.authorName} · {sub.chapterName} ·{" "}
                        {formatDate(sub.submittedAt)}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${
                        sub.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit & Approve modal */}
      {editingSubmission && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setEditingSubmission(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                Edit &amp; Approve Submission
              </h2>
              <button
                onClick={() => setEditingSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Review and edit the content before publishing as a news article.
            </p>
            <NewsForm
              initial={{
                id: editingSubmission.id,
                slug: "",
                title: editingSubmission.title,
                excerpt: editingSubmission.excerpt,
                content: editingSubmission.content,
                image: editingSubmission.imageUrl,
                videoUrl: editingSubmission.videoUrl,
                author: editingSubmission.authorName,
                authorEmail: editingSubmission.authorEmail,
                category: editingSubmission.category,
                chapterId: editingSubmission.chapterId,
                chapterName: editingSubmission.chapterName,
                tags: [],
                status: "published",
                publishedAt: "",
                createdAt: "",
                updatedAt: "",
              }}
              onSubmit={handleEditApprove}
              onCancel={() => setEditingSubmission(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Site Stats Management ─── */
function SiteStatsManagement() {
  const [form, setForm] = useState<SiteStats>({
    volunteers: "",
    projects: "",
    people: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteStats()
      .then((data) => {
        if (data) setForm(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateSiteStats(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Site Stats</h2>
        <p className="text-sm text-slate-500 mt-1">
          These values appear in the impact stats bar on the home page.
          Countries Served is auto-calculated from your chapters.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl border border-slate-200 p-6 space-y-5"
      >
        {[
          {
            key: "volunteers" as keyof SiteStats,
            label: "Volunteers",
            placeholder: "e.g. 500+",
          },
          {
            key: "projects" as keyof SiteStats,
            label: "Projects Completed",
            placeholder: "e.g. 40+",
          },
          {
            key: "people" as keyof SiteStats,
            label: "People Impacted",
            placeholder: "e.g. 50k+",
          },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {label}
            </label>
            <input
              type="text"
              value={form[key]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [key]: e.target.value }))
              }
              placeholder={placeholder}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Stats"}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <CheckCircle size={15} /> Saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
