import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Building2,
  Users,
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
} from "lucide-react";
import { newsArticles } from "../../../data/news";
import { events } from "../../../data/events";
import { chapters } from "../../../data/chapters";
import { formatDate } from "../../../utils/format-date";
import {
  useSubmissions,
  type Submission,
} from "../../submit/SubmissionsContext";

type AdminSection =
  | "dashboard"
  | "news"
  | "events"
  | "chapters"
  | "users"
  | "submissions";

const mockUsers = [
  {
    id: "u1",
    name: "Amina Hassan",
    email: "amina@umad.org",
    role: "Chapter Admin",
    chapter: "Ottawa",
    status: "Active",
  },
  {
    id: "u2",
    name: "Abdirahman Shire",
    email: "abdirahman@umad.org",
    role: "Chapter Admin",
    chapter: "Washington",
    status: "Active",
  },
  {
    id: "u3",
    name: "Dahabo Mohamud",
    email: "dahabo@umad.org",
    role: "Chapter Admin",
    chapter: "Somalia",
    status: "Active",
  },
  {
    id: "u4",
    name: "Mohamed Ali",
    email: "m.ali@umad.org",
    role: "Contributor",
    chapter: "Ottawa",
    status: "Active",
  },
  {
    id: "u5",
    name: "Hodan Ibrahim",
    email: "hodan.i@umad.org",
    role: "Contributor",
    chapter: "Washington",
    status: "Pending",
  },
];

const statCards = [
  {
    labelKey: "admin.totalPosts",
    value: newsArticles.length,
    icon: Newspaper,
    color: "bg-sky-100 text-sky-700",
  },
  {
    labelKey: "admin.pendingApprovals",
    value: 2,
    icon: Bell,
    color: "bg-amber-100 text-amber-700",
  },
  {
    labelKey: "admin.upcomingEvents",
    value: events.length,
    icon: CalendarDays,
    color: "bg-green-100 text-green-700",
  },
  {
    labelKey: "admin.users",
    value: mockUsers.length,
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
];

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
  { key: "users", icon: Users, labelKey: "admin.userManagement" },
];

export function AdminPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { submissions, updateStatus } = useSubmissions();
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-slate-100 pt-16 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform pt-16 lg:pt-0 ${
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
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
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeSection === "dashboard" && (
            <DashboardView
              t={t}
              pendingCount={pendingCount}
              onGoToSubmissions={() => setActiveSection("submissions")}
            />
          )}
          {activeSection === "submissions" && (
            <SubmissionsQueue
              submissions={submissions}
              updateStatus={updateStatus}
            />
          )}
          {activeSection === "news" && <NewsManagement t={t} />}
          {activeSection === "events" && <EventManagement t={t} />}
          {activeSection === "chapters" && <ChapterManagement t={t} />}
          {activeSection === "users" && (
            <UserManagement t={t} users={mockUsers} />
          )}
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
}: {
  t: (k: string) => string;
  pendingCount: number;
  onGoToSubmissions: () => void;
}) {
  const dynamicStatCards = statCards.map((c) =>
    c.labelKey === "admin.pendingApprovals" ? { ...c, value: pendingCount } : c,
  );
  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStatCards.map((card, i) => {
          const Icon = card.icon;
          const isPending = card.labelKey === "admin.pendingApprovals";
          return (
            <motion.div
              key={card.labelKey}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={isPending ? onGoToSubmissions : undefined}
              className={`bg-white rounded-xl p-5 border shadow-sm ${isPending && pendingCount > 0 ? "border-amber-300 cursor-pointer hover:bg-amber-50 transition-colors" : "border-slate-100"}`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}
              >
                <Icon size={20} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {card.value}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {t(card.labelKey)}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent news */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">
            Recent News Posts
          </h2>
          <span className="text-xs text-slate-400">
            {newsArticles.length} total
          </span>
        </div>
        <div className="divide-y divide-slate-50">
          {newsArticles.slice(0, 4).map((a) => (
            <div key={a.id} className="px-5 py-3.5 flex items-center gap-4">
              <img
                src={a.image}
                alt=""
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {a.title}
                </p>
                <p className="text-xs text-slate-400">
                  {a.chapterName} · {formatDate(a.publishedAt)}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium flex-shrink-0">
                Published
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">Upcoming Events</h2>
          <span className="text-xs text-slate-400">{events.length} total</span>
        </div>
        <div className="divide-y divide-slate-50">
          {events.slice(0, 4).map((e) => (
            <div key={e.id} className="px-5 py-3.5 flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarDays size={18} className="text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {e.title}
                </p>
                <p className="text-xs text-slate-400">
                  {e.chapterName} · {formatDate(e.date)}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${e.isFree ? "bg-green-100 text-green-700" : "bg-sky-100 text-sky-700"}`}
              >
                {e.isFree ? "Free" : "Paid"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── News Management ─── */
function NewsManagement({ t }: { t: (k: string) => string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {newsArticles.length} articles total
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors">
          <Plus size={15} /> {t("admin.createPost")}
        </button>
      </div>
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
              {newsArticles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
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
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Pending example rows */}
              {["New Youth Program Update", "Fundraiser Results 2026"].map(
                (title) => (
                  <tr
                    key={title}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900 line-clamp-1">
                        {title}
                      </p>
                      <p className="text-xs text-slate-400">Contributor</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                      Ottawa Chapter
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">
                      Pending
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <XCircle size={14} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Event Management ─── */
function EventManagement({ t }: { t: (k: string) => string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{events.length} events total</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors">
          <Plus size={15} /> {t("admin.createEvent")}
        </button>
      </div>
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
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
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
                      <button className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
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
    </div>
  );
}

/* ─── Chapter Management ─── */
function ChapterManagement({ t }: { t: (k: string) => string }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <img
              src={chapter.coverImage}
              alt={chapter.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <p className="font-bold text-slate-900 mb-1">{chapter.name}</p>
              <p className="text-xs text-slate-500 mb-3">{chapter.location}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-semibold bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors">
                  {t("admin.editChapter")}
                </button>
                <button className="flex-1 py-1.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── User Management ─── */
function UserManagement({
  t,
  users,
}: {
  t: (k: string) => string;
  users: typeof mockUsers;
}) {
  const roleColors: Record<string, string> = {
    "Super Admin": "bg-purple-100 text-purple-700",
    "Chapter Admin": "bg-sky-100 text-sky-700",
    Contributor: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{users.length} users total</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-lg hover:bg-sky-800 transition-colors">
          <Plus size={15} /> Add User
        </button>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-3">
        {[
          { role: "Super Admin", key: "admin.superAdmin" },
          { role: "Chapter Admin", key: "admin.chapterAdmin" },
          { role: "Contributor", key: "admin.contributor" },
        ].map((r) => (
          <span
            key={r.role}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[r.role]}`}
          >
            {t(r.key)}
          </span>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  User
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                  Chapter
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Role
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                    {user.chapter}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
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
    </div>
  );
}

/* ─── Submissions Queue ─── */
function SubmissionsQueue({
  submissions,
  updateStatus,
}: {
  submissions: Submission[];
  updateStatus: (id: string, status: Submission["status"]) => void;
}) {
  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  return (
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
                      <h3 className="font-bold text-slate-900">{sub.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        by {sub.authorName} · {formatDate(sub.submittedAt)}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateStatus(sub.id, "approved")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle size={13} /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(sub.id, "rejected")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
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
                      {sub.authorName} · {sub.chapterName} ·{" "}
                      {formatDate(sub.submittedAt)}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${sub.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
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
  );
}
