import { useState, useEffect, type FormEvent } from "react";
import { useChapters } from "../../chapters/hooks/useChapters";
import { slugify } from "../../news/services/news";
import type { NewsArticleData, NewsInput } from "../../news/services/news";
import { ImageUpload } from "../../../components/ImageUpload";

const CATEGORIES = [
  "Community",
  "Youth",
  "Education",
  "Healthcare",
  "Food Security",
  "Environment",
  "Advocacy",
  "Culture",
  "Other",
];

interface NewsFormProps {
  initial?: NewsArticleData;
  onSubmit: (data: NewsInput) => Promise<void>;
  onCancel: () => void;
  /** If provided, locks the chapter to this ID (chapter editor mode) */
  lockedChapterId?: string;
  lockedChapterName?: string;
}

export function NewsForm({ initial, onSubmit, onCancel, lockedChapterId, lockedChapterName }: NewsFormProps) {
  const { chapters, loading: chaptersLoading } = useChapters();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [authorEmail, setAuthorEmail] = useState(initial?.authorEmail ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [chapterId, setChapterId] = useState(lockedChapterId ?? initial?.chapterId ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [status, setStatus] = useState<"published" | "pending" | "rejected">(
    initial?.status ?? "published",
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title only for new articles
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!initial) setSlug(slugify(title));
  }, [title, initial]);

  const chapterName = lockedChapterName ?? chapters.find((c) => c.id === chapterId)?.name ?? "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Excerpt is required.");
      return;
    }
    if (!content.trim()) {
      setError("Content is required.");
      return;
    }
    if (!author.trim()) {
      setError("Author is required.");
      return;
    }
    if (!category) {
      setError("Category is required.");
      return;
    }
    if (!chapterId) {
      setError("Please select a chapter.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        author: author.trim(),
        authorEmail: authorEmail.trim() || undefined,
        category,
        chapterId,
        chapterName,
        image: image.trim() || undefined,
        videoUrl: videoUrl.trim() || undefined,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  const inp =
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors";
  const lbl =
    "block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Title + Slug */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated"
            className={inp}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className={lbl}>Excerpt *</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary (shown on cards)..."
          className={inp + " resize-y"}
        />
      </div>

      {/* Content */}
      <div>
        <label className={lbl}>Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={9}
          placeholder="Full article content..."
          className={inp + " resize-y font-mono leading-relaxed"}
        />
      </div>

      {/* Author + Category + Chapter */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={lbl}>Author *</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inp}
          >
            <option value="">Select…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>Chapter *</label>
          {lockedChapterId ? (
            <div className={inp + " bg-slate-50 text-slate-500 cursor-not-allowed"}>
              {lockedChapterName ?? lockedChapterId}
            </div>
          ) : (
            <select
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              disabled={chaptersLoading}
              className={inp}
            >
              <option value="">{chaptersLoading ? "Loading…" : "Select…"}</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Author email + Tags */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Author Email</label>
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="author@email.com"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>Tags (comma-separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. youth, community"
            className={inp}
          />
        </div>
      </div>

      {/* Image + Video */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <ImageUpload
            label="Cover Photo"
            currentUrl={image}
            storagePath="images/news"
            onChange={setImage}
            optional
          />
        </div>
        <div>
          <label className={lbl}>Video URL (optional)</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="YouTube or Vimeo URL"
            className={inp}
          />
        </div>
      </div>

      {/* Status */}
      <div className="max-w-xs">
        <label className={lbl}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className={inp}
        >
          <option value="published">Published</option>
          <option value="pending">Pending Review</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : initial ? "Update Article" : "Create Article"}
        </button>
      </div>
    </form>
  );
}
