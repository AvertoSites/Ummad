import { useId, useState } from "react";
import { Upload, Loader2, X, Star } from "lucide-react";
import { uploadImage } from "../lib/storage";

interface MultiImageUploadProps {
  label: string;
  /** Current image URLs, in display order — the first one is the main cover */
  urls: string[];
  /** Firebase Storage folder path, e.g. "images/news" */
  storagePath: string;
  onChange: (urls: string[]) => void;
  optional?: boolean;
}

export function MultiImageUpload({
  label,
  urls,
  storagePath,
  onChange,
  optional = false,
}: MultiImageUploadProps) {
  const inputId = useId();
  // Local blob previews for files still uploading
  const [pending, setPending] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState("");
  const uploading = pending.length > 0;

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setUploadError("");
    const locals = files.map((f) => URL.createObjectURL(f));
    setPending(locals);

    const results = await Promise.allSettled(
      files.map((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        return uploadImage(
          file,
          `${storagePath}/${crypto.randomUUID()}.${ext}`,
        );
      }),
    );
    locals.forEach((l) => URL.revokeObjectURL(l));
    setPending([]);

    const uploaded = results.flatMap((r) =>
      r.status === "fulfilled" ? [r.value] : [],
    );
    if (uploaded.length < files.length) {
      setUploadError(
        `${files.length - uploaded.length} photo(s) failed to upload. Max 5 MB each.`,
      );
    }
    if (uploaded.length) onChange([...urls, ...uploaded]);
  }

  function handleRemove(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  function makeCover(index: number) {
    onChange([urls[index], ...urls.filter((_, i) => i !== index)]);
  }

  return (
    <div>
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
        {label}
        {optional && (
          <span className="ml-1 text-slate-400 font-normal normal-case">
            (optional)
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-2">
        {urls.map((url, i) => (
          <div
            key={url}
            className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0"
          >
            <img src={url} alt="" className="w-full h-full object-cover" />
            {i === 0 ? (
              <span className="absolute bottom-0.5 left-0.5 px-1.5 py-0.5 rounded bg-sky-700 text-white text-[10px] font-semibold">
                Cover
              </span>
            ) : (
              <button
                type="button"
                onClick={() => makeCover(i)}
                title="Make main cover"
                aria-label="Make main cover"
                className="absolute bottom-0.5 left-0.5 w-5 h-5 bg-white/90 hover:bg-white text-slate-600 hover:text-sky-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Star size={10} />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleRemove(i)}
              aria-label="Remove photo"
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {pending.map((local) => (
          <div
            key={local}
            className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0"
          >
            <img src={local} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin text-sky-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-2">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          disabled={uploading}
          className="sr-only"
        />
        <label
          htmlFor={inputId}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors select-none ${
            uploading
              ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-sky-700"
          }`}
        >
          <Upload size={13} />
          {uploading
            ? "Uploading…"
            : urls.length
              ? "Add more photos"
              : "Upload photos"}
        </label>
        <p className="text-xs text-slate-400">
          JPG, PNG or WebP · first photo is the main cover
        </p>
      </div>
      {uploadError && (
        <p className="text-xs text-red-600 mt-1">{uploadError}</p>
      )}
    </div>
  );
}
