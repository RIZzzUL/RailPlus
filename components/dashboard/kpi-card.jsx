import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ACCENT = {
  emerald: {
    chip: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    bar: "from-emerald-500 to-teal-400"
  },
  cyan: {
    chip: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    bar: "from-cyan-500 to-sky-400"
  },
  rose: {
    chip: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
    bar: "from-rose-500 to-pink-400"
  },
  amber: {
    chip: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    bar: "from-amber-500 to-orange-400"
  },
  indigo: {
    chip: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30",
    bar: "from-indigo-500 to-violet-400"
  }
};

export default function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  sub,
  delta,
  deltaGood = true,
  progress,
  accent = "emerald",
  className
}) {
  const a = ACCENT[accent] || ACCENT.emerald;
  return (
    <Card className={cn("group relative overflow-hidden p-5 transition-colors hover:border-slate-700", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-slate-50">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-semibold text-slate-400">{unit}</span>
            )}
          </div>
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1", a.chip)}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>

      {(sub || delta) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {delta != null && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-semibold",
                deltaGood
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-rose-500/15 text-rose-300"
              )}
            >
              {delta > 0 ? "+" : ""}
              {delta}%
            </span>
          )}
          {sub && <span className="truncate text-slate-400">{sub}</span>}
        </div>
      )}

      {progress != null && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={cn("h-full rounded-full bg-gradient-to-r transition-all", a.bar)}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {/* subtle glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-24 h-24 bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-20",
          a.bar
        )}
      />
    </Card>
  );
}