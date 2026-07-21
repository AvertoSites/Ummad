import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  BookOpen,
  Image,
  Video,
  UploadCloud,
  Link2,
  X,
} from "lucide-react";
import { useSubmissions } from "../SubmissionsContext";
import { chapters } from "../../../data/chapters";

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

interface FormState {
  title: string;
  authorName: string;
  authorEmail: string;
  chapterId: string;
  category: string;
  excerpt: string;
  content: string;
  mediaType: "image" | "video" | "";
  mediaUrl: string;
}

const empty: FormState = {
  title: "",
  authorName: "",
  authorEmail: "",
  chapterId: "",
  category: "",
  excerpt: "",
  content: "",
  mediaType: "",
  mediaUrl: "",
};

export function SubmitArticlePage() {
  const { t } = useTranslation();
  const { addSubmission } = useSubmissions();

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mediaSource, setMediaSource] = useState<"upload" | "url" | "">("");
  const [mediaFile, setMediaFile] = useState<{
    file: File;
    previewUrl: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (mediaFile) URL.revokeObjectURL(mediaFile.previewUrl);
    };
  }, [mediaFile]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (mediaFile) URL.revokeObjectURL(mediaFile.previewUrl);
    setMediaFile({ file, previewUrl: URL.createObjectURL(file) });
  }

  function clearMedia() {
    if (mediaFile) URL.revokeObjectURL(mediaFile.previewUrl);
    setMediaFile(null);
    setMediaSource("");
    set("mediaType", "");
    set("mediaUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.authorName.trim())
      newErrors.authorName = "Your name is required.";
    if (
      !form.authorEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.authorEmail)
    )
      newErrors.authorEmail = "A valid email is required.";
    if (!form.chapterId) newErrors.chapterId = "Please select a chapter.";
    if (!form.category) newErrors.category = "Please select a category.";
    if (!form.excerpt.trim() || form.excerpt.trim().length < 30)
      newErrors.excerpt = "Excerpt must be at least 30 characters.";
    if (!form.content.trim() || form.content.trim().length < 100)
      newErrors.content = "Article content must be at least 100 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const chapter = chapters.find((c) => c.id === form.chapterId);
    const resolvedImageUrl =
      form.mediaType === "image"
        ? mediaSource === "upload"
          ? mediaFile?.previewUrl
          : form.mediaUrl.trim() || undefined
        : undefined;
    const resolvedVideoUrl =
      form.mediaType === "video"
        ? mediaSource === "upload"
          ? mediaFile?.previewUrl
          : form.mediaUrl.trim() || undefined
        : undefined;
    addSubmission({
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      authorName: form.authorName.trim(),
      authorEmail: form.authorEmail.trim(),
      chapterId: form.chapterId,
      chapterName: chapter?.name ?? form.chapterId,
      category: form.category,
      imageUrl: resolvedImageUrl,
      videoUrl: resolvedVideoUrl,
    });
    setSubmitted(true);
    setForm(empty);
    setMediaFile(null);
    setMediaSource("");
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-5"
          >
            <FileText size={14} />
            {t("submitArticle.eyebrow")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            {t("submitArticle.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sky-200 text-lg max-w-xl mx-auto"
          >
            {t("submitArticle.heroDesc")}
          </motion.p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                icon: FileText,
                title: t("submitArticle.step1Title"),
                desc: t("submitArticle.step1Desc"),
              },
              {
                step: "2",
                icon: AlertCircle,
                title: t("submitArticle.step2Title"),
                desc: t("submitArticle.step2Desc"),
              },
              {
                step: "3",
                icon: CheckCircle,
                title: t("submitArticle.step3Title"),
                desc: t("submitArticle.step3Desc"),
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step}
                </div>
                <Icon size={18} className="text-sky-600" />
                <p className="font-semibold text-slate-900 text-sm">{title}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form / Success */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              {t("submitArticle.successTitle")}
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              {t("submitArticle.successDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMediaFile(null);
                  setMediaSource("");
                }}
                className="px-6 py-3 bg-sky-700 text-white font-semibold rounded-xl hover:bg-sky-800 transition-colors"
              >
                {t("submitArticle.submitAnother")}
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Author info */}
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <User size={18} className="text-sky-600" />
                {t("submitArticle.yourInfo")}
              </legend>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t("submitArticle.fullName")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.authorName}
                    onChange={(e) => set("authorName", e.target.value)}
                    placeholder="e.g. Amina Hassan"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.authorName
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  {errors.authorName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.authorName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t("submitArticle.emailAddress")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.authorEmail}
                    onChange={(e) => set("authorEmail", e.target.value)}
                    placeholder="you@email.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.authorEmail
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  {errors.authorEmail && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.authorEmail}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t("submitArticle.relatedChapter")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.chapterId}
                    onChange={(e) => set("chapterId", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.chapterId
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <option value="">{t("submitArticle.selectChapter")}</option>
                    {chapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.chapterId && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.chapterId}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t("submitArticle.category")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.category
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <option value="">
                      {t("submitArticle.selectCategory")}
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <div className="border-t border-slate-100" />

            {/* Media — optional */}
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Image size={18} className="text-sky-600" />
                {t("submitArticle.mediaLabel")}{" "}
                <span className="text-sm font-normal text-slate-400 ml-1">
                  {t("submitArticle.mediaOptional")}
                </span>
              </legend>
              <p className="text-sm text-slate-500 -mt-2">
                {t("submitArticle.mediaDesc")}
              </p>

              {/* Image / Video type */}
              <div className="flex gap-3">
                {(["image", "video"] as const).map((type) => {
                  const Icon = type === "image" ? Image : Video;
                  const active = form.mediaType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        const next = form.mediaType === type ? "" : type;
                        set("mediaType", next);
                        set("mediaUrl", "");
                        if (mediaFile)
                          URL.revokeObjectURL(mediaFile.previewUrl);
                        setMediaFile(null);
                        setMediaSource("");
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                        active
                          ? "bg-sky-700 text-white border-sky-700"
                          : "bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:text-sky-700"
                      }`}
                    >
                      <Icon size={15} />
                      {type === "image" ? "Image" : "Video"}
                    </button>
                  );
                })}
              </div>

              {form.mediaType !== "" && (
                <div className="space-y-4">
                  {/* Upload vs URL source */}
                  <div className="flex gap-2">
                    {(["upload", "url"] as const).map((src) => {
                      const Icon = src === "upload" ? UploadCloud : Link2;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => {
                            setMediaSource(src);
                            set("mediaUrl", "");
                            if (mediaFile)
                              URL.revokeObjectURL(mediaFile.previewUrl);
                            setMediaFile(null);
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                            mediaSource === src
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
                          }`}
                        >
                          <Icon size={13} />
                          {src === "upload"
                            ? t("submitArticle.uploadFromDevice")
                            : t("submitArticle.useUrl")}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={form.mediaType === "image" ? "image/*" : "video/*"}
                    className="sr-only"
                    onChange={handleFileSelect}
                  />

                  {/* Upload area */}
                  {mediaSource === "upload" && (
                    <div>
                      {!mediaFile ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex flex-col items-center gap-3 p-10 rounded-xl border-2 border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition-colors text-slate-400 hover:text-sky-600"
                        >
                          <UploadCloud size={36} />
                          <div className="text-center">
                            <p className="text-sm font-semibold">
                              {t("submitArticle.clickToSelect")}{" "}
                              {form.mediaType === "image"
                                ? t("submitArticle.anImage")
                                : t("submitArticle.aVideo")}
                            </p>
                            <p className="text-xs mt-1 text-slate-400">
                              {form.mediaType === "image"
                                ? t("submitArticle.imageFormats")
                                : t("submitArticle.videoFormats")}
                            </p>
                          </div>
                        </button>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                          {form.mediaType === "image" ? (
                            <img
                              src={mediaFile.previewUrl}
                              alt="Preview"
                              className="w-full max-h-60 object-cover"
                            />
                          ) : (
                            <video
                              src={mediaFile.previewUrl}
                              controls
                              className="w-full max-h-60"
                            />
                          )}
                          <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200">
                            <p className="text-xs text-slate-500 truncate max-w-xs">
                              {mediaFile.file.name}
                            </p>
                            <button
                              type="button"
                              onClick={clearMedia}
                              className="ml-3 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL input */}
                  {mediaSource === "url" && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {form.mediaType === "image"
                          ? t("submitArticle.imageUrl")
                          : t("submitArticle.videoUrl")}
                      </label>
                      <input
                        type="url"
                        value={form.mediaUrl}
                        onChange={(e) => set("mediaUrl", e.target.value)}
                        placeholder={
                          form.mediaType === "image"
                            ? "https://example.com/photo.jpg"
                            : "https://www.youtube.com/watch?v=…"
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                      />
                      {form.mediaType === "image" && form.mediaUrl && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 h-44">
                          <img
                            src={form.mediaUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </fieldset>

            <div className="border-t border-slate-100" />

            {/* Article content */}
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <BookOpen size={18} className="text-sky-600" />
                {t("submitArticle.articleContent")}
              </legend>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("submitArticle.articleTitle")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder={t("submitArticle.titlePlaceholder")}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                    errors.title
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("submitArticle.excerpt")}{" "}
                  <span className="text-red-500">*</span>
                  <span className="text-slate-400 font-normal ml-2">
                    {t("submitArticle.excerptHint")}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  placeholder={t("submitArticle.excerptPlaceholder")}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none transition-colors ${
                    errors.excerpt
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.excerpt ? (
                    <p className="text-xs text-red-600">{errors.excerpt}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-slate-400">
                    {form.excerpt.length} {t("submitArticle.chars")}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("submitArticle.fullArticle")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={12}
                  value={form.content}
                  onChange={(e) => set("content", e.target.value)}
                  placeholder={t("submitArticle.fullArticlePlaceholder")}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y transition-colors font-mono leading-relaxed ${
                    errors.content
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.content ? (
                    <p className="text-xs text-red-600">{errors.content}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-slate-400">
                    {form.content.length} {t("submitArticle.chars")}
                  </span>
                </div>
              </div>
            </fieldset>

            {/* Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                <AlertCircle size={15} /> {t("submitArticle.guidelinesTitle")}
              </p>
              <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                <li>{t("submitArticle.guideline1")}</li>
                <li>{t("submitArticle.guideline2")}</li>
                <li>{t("submitArticle.guideline3")}</li>
                <li>{t("submitArticle.guideline4")}</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-xl transition-colors text-base"
            >
              <Send size={18} />
              {t("submitArticle.submitBtn")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
