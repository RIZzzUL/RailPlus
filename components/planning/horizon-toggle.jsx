"use client";

import { CalendarDays, CalendarRange, LayoutGrid } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Weekly (operational) vs Monthly (strategic) view controller.
export default function HorizonToggle({ value = "weekly", onChange }) {
  const isMonthly = value === "monthly";

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
          !isMonthly ? "text-amber-300" : "text-slate-500"
        )}
      >
        <CalendarDays className="h-4 w-4" />
        Weekly
      </span>

      <div className="flex items-center gap-2">
        <Switch
          checked={isMonthly}
          onCheckedChange={(checked) => onChange && onChange(checked ? "monthly" : "weekly")}
          aria-label="Toggle planning horizon"
        />
        <LayoutGrid className="h-4 w-4 text-slate-500" />
      </div>

      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
          isMonthly ? "text-cyan-300" : "text-slate-500"
        )}
      >
        <CalendarRange className="h-4 w-4" />
        Monthly
      </span>
    </div>
  );
}