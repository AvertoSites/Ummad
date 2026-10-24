import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  /** Milliseconds each slide stays on screen */
  interval?: number;
  className?: string;
  /** Small-tile layout: no caption, smaller always-visible controls */
  compact?: boolean;
  /** "contain" shows each whole photo over a blurred copy instead of cropping */
  fit?: "cover" | "contain";
}

export function ImageCarousel({
  slides,
  interval = 5000,
  className = "",
  compact = false,
  fit = "cover",
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );
  // Carousels sit inside card links — keep control clicks from navigating
  const control = (next: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    go(next);
  };

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [paused, count, interval]);

  // Warm the cache for the next slide so the crossfade never shows a blank frame
  useEffect(() => {
    if (count < 2) return;
    const img = new Image();
    img.src = slides[(index + 1) % count].src;
  }, [index, count, slides]);

  if (count === 0) return null;
  const slide = slides[index];

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        {fit === "contain" && (
          <motion.div
            key={`backdrop-${slide.src}`}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-60"
            style={{ backgroundImage: `url("${slide.src}")` }}
          />
        )}
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute inset-0 w-full h-full ${
            fit === "contain" ? "object-contain" : "object-cover"
          }`}
          draggable={false}
        />
      </AnimatePresence>

      {/* Caption over a soft gradient so it stays legible on bright photos */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      {slide.caption && !compact && (
        <p
          key={`caption-${index}`}
          className="absolute bottom-14 sm:bottom-10 right-5 left-5 sm:left-auto sm:max-w-[70%] text-right text-white text-sm font-medium drop-shadow"
          aria-live="polite"
        >
          {slide.caption}
        </p>
      )}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={control(index - 1)}
            aria-label="Previous photo"
            className={`absolute left-${compact ? "1.5" : "3"} top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-opacity ${
              compact
                ? "w-6 h-6 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                : "w-9 h-9 opacity-0 group-hover:opacity-100 focus:opacity-100"
            }`}
          >
            <ChevronLeft size={compact ? 14 : 18} />
          </button>
          <button
            type="button"
            onClick={control(index + 1)}
            aria-label="Next photo"
            className={`absolute right-${compact ? "1.5" : "3"} top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-opacity ${
              compact
                ? "w-6 h-6 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                : "w-9 h-9 opacity-0 group-hover:opacity-100 focus:opacity-100"
            }`}
          >
            <ChevronRight size={compact ? 14 : 18} />
          </button>

          <div
            className={`absolute flex ${
              compact ? "bottom-1.5 inset-x-0 justify-center gap-1" : "bottom-4 right-5 gap-1.5"
            }`}
          >
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={control(i)}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index}
                className={`rounded-full transition-all duration-300 ${
                  compact ? "h-1" : "h-1.5"
                } ${
                  i === index
                    ? `${compact ? "w-3" : "w-6"} bg-white`
                    : `${compact ? "w-1" : "w-1.5"} bg-white/50 hover:bg-white/80`
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
