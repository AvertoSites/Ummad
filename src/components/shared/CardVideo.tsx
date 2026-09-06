import { useEffect, useRef } from "react";

interface CardVideoProps {
  src: string;
  poster?: string | null;
  className?: string;
}

/**
 * Silent, looping preview clip for a card. It only plays while it is on screen
 * (so a grid of cards doesn't run a dozen videos at once) and never shows
 * controls — the real, audible player lives on the article detail page.
 */
export function CardVideo({ src, poster, className }: CardVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster ?? undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
