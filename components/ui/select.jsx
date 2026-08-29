import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Native-backed styled select (keeps interaction robust without extra deps).
const Select = React.forwardRef(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <div className={cn("relative inline-flex w-full", className)}>
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full appearance-none rounded-lg border border-slate-700 bg-slate-900/80 px-3 pr-9 text-sm text-slate-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
});
Select.displayName = "Select";

const SelectItem = React.forwardRef(function SelectItem(
  { children, ...props },
  ref
) {
  return (
    <option ref={ref} className="bg-slate-900" {...props}>
      {children}
    </option>
  );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };