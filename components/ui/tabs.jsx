import * as React from "react";
import { cn } from "@/lib/utils";

// Lightweight tabs built on controlled state (no external a11y dependency).
const TabsContext = React.createContext({ value: "", setValue: () => {} });

function Tabs({ value, onValueChange, defaultValue, children, className }) {
  const [internal, setInternal] = React.useState(defaultValue || value || "");
  const current = value !== undefined ? value : internal;
  const setValue = (v) => {
    if (value === undefined) setInternal(v);
    onValueChange && onValueChange(v);
  };
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-slate-800/70 p-1 text-slate-400",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value, className, children }) {
  const ctx = React.useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60",
        active
          ? "bg-slate-900 text-slate-50 shadow"
          : "text-slate-400 hover:text-slate-200",
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className, children }) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };