import * as React from "react";
import { cn } from "@/lib/utils";

function Progress({ value = 0, className, indicatorClassName }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-800",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-emerald-500 transition-all",
          indicatorClassName
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };