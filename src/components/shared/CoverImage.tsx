import { useState } from "react";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface CoverImageProps {
  /** Candidate URLs, tried in order — the next one is used if one fails to load */
  srcs: (string | null | undefined)[];
  alt: string;
  className?: string;
  placeholderSize?: "sm" | "md" | "lg";
}

/**
 * Cover photo that never shows a broken-image icon: falls through each
 * candidate URL on load error and ends on the branded placeholder.
 */
export function CoverImage({
  srcs,
  alt,
  className = "",
  placeholderSize,
}: CoverImageProps) {
  const [failed, setFailed] = useState<string[]>([]);
  const src = srcs.find((s): s is string => !!s && !failed.includes(s));

  if (!src) {
    return (
      <MediaPlaceholder className="w-full h-full" size={placeholderSize} />
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      onError={() => setFailed((prev) => [...prev, src])}
      className={className}
    />
  );
}
