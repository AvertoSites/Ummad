export interface EventTiming {
  isPast: boolean;
  isOngoing: boolean;
  /** Whole days from today until the start date (0 = today, negative = past). */
  daysUntil: number;
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Works out where an event sits relative to today. */
export function getEventTiming(date: string, endDate?: string): EventTiming {
  const today = startOfDay(new Date());
  const start = startOfDay(new Date(date));
  const end = endDate ? startOfDay(new Date(endDate)) : start;
  const dayMs = 86_400_000;
  const daysUntil = Math.round((start - today) / dayMs);

  return {
    isOngoing: today >= start && today <= end,
    isPast: today > end,
    daysUntil,
  };
}

/**
 * Turns timing into a short human label via the i18n `t` function.
 * `t` is passed in so this stays free of React context.
 */
export function eventTimingLabel(
  timing: EventTiming,
  t: (key: string, opts?: Record<string, unknown>) => string,
): string {
  if (timing.isOngoing) return t("events.ongoing");
  if (timing.isPast) return t("events.ended");
  if (timing.daysUntil === 0) return t("events.today");
  if (timing.daysUntil === 1) return t("events.tomorrow");
  if (timing.daysUntil <= 14) return t("events.inDays", { count: timing.daysUntil });
  return t("events.upcoming");
}
