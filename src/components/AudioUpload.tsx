import { useId, useState } from "react";
import { Headphones, Loader2, X } from "lucide-react";
import { uploadFile } from "../lib/storage";

interface AudioUploadProps {
  label: string;
  currentUrl?: string;
  /** Firebase Storage folder path, e.g. "audio/news" */
  storagePath: string;
  onChange: (url: string) => void;
  optional?: boolean;
}

export function AudioUpload({
  label,
  currentUrl,
  storagePath,
  onChange,
  optional = false,
}: AudioUploadProps) {
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
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp3";
      const url = await uploadFile(
        file,
        `${storagePath}/${crypto.randomUUID()}.${ext}`,
      );
      setPreview(url);
      onChange(url);
    } catch {
      setUploadError("Upload failed. Check file size (max 50 MB) and try again.");
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
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
          <audio
            src={preview}
            controls
            controlsList="nodownload"
            className="flex-1 min-w-0 h-10"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 rounded-full text-slate-500 hover:text-red-600 hover:bg-white transition-colors flex-shrink-0"
            aria-label="Remove audio"
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
              <Headphones size={22} className="text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                Click to upload audio
              </span>
              <span className="text-xs text-slate-400">
                MP3, M4A, WAV, OGG — max 50 MB
              </span>
            </>
          )}
          <input
            id={inputId}
            type="file"
            accept="audio/*"
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
