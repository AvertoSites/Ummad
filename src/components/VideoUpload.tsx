import { useId, useState } from "react";
import { Video, Loader2, X } from "lucide-react";
import { uploadFile } from "../lib/storage";

interface VideoUploadProps {
  label: string;
  currentUrl?: string;
  /** Firebase Storage folder path, e.g. "videos/news" */
  storagePath: string;
  onChange: (url: string) => void;
  optional?: boolean;
}

export function VideoUpload({
  label,
  currentUrl,
  storagePath,
  onChange,
  optional = false,
}: VideoUploadProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl ?? "");
  const [uploadError, setUploadError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
      const url = await uploadFile(
        file,
        `${storagePath}/${crypto.randomUUID()}.${ext}`,
      );
      setPreview(url);
      onChange(url);
    } catch {
      setUploadError(
        "Upload failed. Check file size (max 100 MB) and try again.",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleRemove() {
    setPreview("");
    onChange("");
    setUploadError("");
  }

  return (
    <div>
      {label && (
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
          {label}
          {optional && (
            <span className="ml-1 font-normal text-slate-400 normal-case">
              (optional)
            </span>
          )}
        </p>
      )}

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
          <video
            src={preview}
            controls
            controlsList="nodownload"
            className="w-full max-h-48 object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-slate-600 hover:text-red-600 hover:bg-white transition-colors"
            aria-label="Remove video"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`flex flex-col items-center justify-center gap-2 h-28 rounded-lg border-2 border-dashed transition-colors ${
            uploading
              ? "border-sky-300 bg-sky-50 cursor-default"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="text-sky-600 animate-spin" />
              <span className="text-xs text-sky-600 font-medium">
                Uploading…
              </span>
            </>
          ) : (
            <>
              <Video size={22} className="text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                Click to upload video
              </span>
              <span className="text-xs text-slate-400">
                MP4, WebM, MOV — max 100 MB
              </span>
            </>
          )}
          <input
            id={inputId}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="sr-only"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
      )}

      {uploadError && (
        <p className="mt-1.5 text-xs text-red-600">{uploadError}</p>
      )}
    </div>
  );
}
