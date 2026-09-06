interface MediaPlaceholderProps {
  /** Extra classes for the outer wrapper (positioning, etc). */
  className?: string;
  /** Logo size relative to the box. Defaults to a comfortable third. */
  size?: "sm" | "md" | "lg";
}

const sizeClass: Record<NonNullable<MediaPlaceholderProps["size"]>, string> = {
  sm: "w-1/3 max-w-[80px]",
  md: "w-2/5 max-w-[120px]",
  lg: "w-1/2 max-w-[180px]",
};

/**
 * Fallback shown wherever an article or event has no image (and no playable
 * preview): the Ummad logo centred on a soft branded wash.
 */
export function MediaPlaceholder({
  className = "",
  size = "md",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-slate-100 ${className}`}
    >
      <img
        src="/images/logo.png"
        alt="Ummad"
        className={`${sizeClass[size]} object-contain opacity-80`}
      />
    </div>
  );
}
