/** Standard pill styling for a filter row item. */
export function filterPillClass(active: boolean) {
  return `flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    active
      ? "bg-sky-700 text-white"
      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
  }`;
}
