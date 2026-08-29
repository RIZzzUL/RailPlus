import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-700 text-slate-100",
        emerald:
          "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
        cyan: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300",
        amber: "border-amber-500/30 bg-amber-500/15 text-amber-300",
        rose: "border-rose-500/30 bg-rose-500/15 text-rose-300",
        indigo: "border-indigo-500/30 bg-indigo-500/15 text-indigo-300",
        outline: "border-slate-700 bg-transparent text-slate-300"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };