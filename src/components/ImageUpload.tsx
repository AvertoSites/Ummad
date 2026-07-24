import { useId, useState } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";
import { uploadImage } from "../lib/storage";

interface ImageUploadProps {
  label: string;
  currentUrl?: string;
  /** Firebase Storage folder path, e.g. "images/chapters" */
  storagePath: string;
  onChange: (url: string) => void;
  optional?: boolean;
}

export function ImageUpload({
  label,
  currentUrl,
  storagePath,
  onChange,
  optional = false,
}: ImageUploadProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl ?? "");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local blob preview immediately
    const local = URL.createObjectURL(file);
    setPreview(local);
    setUploading(true);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const url = await uploadImage(
        file,
        `${storagePath}/${crypto.randomUUID()}.${ext}`,
      );
      URL.revokeObjectURL(local);
      setPreview(url);
      onChange(url);
    } catch {
      URL.revokeObjectURL(local);
      setPreview(currentUrl ?? "");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleRemove() {
    setPreview("");
    onChange("");
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
      <div className="flex items-start gap-3">
        {/* Preview box */}
        <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0 flex items-center justify-center">
          {preview ? (
            <>
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              {!uploading && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={10} />
                </button>
              )}
            </>
          ) : (
            <ImageIcon size={22} className="text-slate-300" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin text-sky-600" />
            </div>
          )}
        </div>

        {/* Upload button */}
        <div className="flex flex-col gap-1">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleFile}
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
              : preview
                ? "Change photo"
                : "Upload photo"}
          </label>
          <p className="text-xs text-slate-400">JPG, PNG or WebP</p>
        </div>
      </div>
    </div>
  );
}
