import type { ReactNode } from "react";

interface Option<T extends string> {
  value: T;
  label: ReactNode;
}

interface SegmentedToggleProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label"?: string;
  className?: string;
}

/** Small joined-segment control — e.g. "URL / Upload". */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  className = "",
  ...rest
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={rest["aria-label"]}
      className={`inline-flex text-xs rounded-lg border border-slate-200 overflow-hidden ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors ${
              active
                ? "bg-sky-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
