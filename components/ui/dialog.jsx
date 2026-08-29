import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// Controlled modal/drawer dialog (shadcn-style, dependency-free).
function Dialog({ open, onOpenChange, children }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onOpenChange && onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 max-h-[90vh] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ className, children }) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-slate-800 p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

function DialogClose({ onClick, className }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn("h-8 w-8 text-slate-400", className)}
      aria-label="Close dialog"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}

function DialogContent({ className, children }) {
  return <div className={cn("max-h-[calc(90vh-4.5rem)] overflow-y-auto p-5 scrollbar-thin", className)}>{children}</div>;
}

function DialogFooter({ className, children }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-slate-800 bg-slate-900/40 p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Dialog, DialogHeader, DialogClose, DialogContent, DialogFooter };