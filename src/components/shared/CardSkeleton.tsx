interface CardSkeletonProps {
  ratio?: "video" | "wide";
}

/** Placeholder that matches the <Card> shape while data loads. */
export function CardSkeleton({ ratio = "video" }: CardSkeletonProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
      <div
        className={`bg-slate-200 animate-pulse ${
          ratio === "video" ? "aspect-video" : "aspect-[16/10]"
        }`}
      />
      <div className="p-5 space-y-3">
        <div className="h-2.5 bg-slate-200 rounded-full w-1/3 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

interface CardSkeletonGridProps {
  count?: number;
  ratio?: "video" | "wide";
  className?: string;
}

export function CardSkeletonGrid({
  count = 6,
  ratio = "video",
  className = "grid sm:grid-cols-2 lg:grid-cols-3 gap-8",
}: CardSkeletonGridProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} ratio={ratio} />
      ))}
    </div>
  );
}
