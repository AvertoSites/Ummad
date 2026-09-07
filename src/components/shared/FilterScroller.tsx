import type { ReactNode } from "react";

/**
 * Horizontal, scrollable row of filter pills. Edge mask fades the ends so it's
 * obvious there's more to scroll on narrow screens.
 */
export function FilterScroller({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,#000_1.25rem,#000_calc(100%_-_1.25rem),transparent)]"
    >
      {children}
    </div>
  );
}
