"use client";

import { useState as useStateSidebar } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Sparkles,
  CalendarDays,
  BarChart3,
  RailSymbol,
  ChevronsLeft,
  ChevronsRight,
  Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/defects", label: "Defect Ledger", icon: Wrench },
  { href: "/dashboard/optimizer", label: "AI Optimizer", icon: Sparkles },
  { href: "/dashboard/planning", label: "Horizon Planning", icon: CalendarDays },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useStateSidebar();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-60"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/40">
          <RailSymbol className="h-5 w-5 text-emerald-400" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-100">RailPulse</p>
            <p className="truncate text-[10px] uppercase tracking-wider text-slate-500">
              Block Planner AI
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
        <p className={cn("px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600", collapsed && "text-center")}>
          {collapsed ? "—" : "Operations"}
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                collapsed && "justify-center",
                active
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", active ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
              {!collapsed && <span className="truncate text-sm font-medium">{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-500 transition-colors hover:bg-slate-800/60 hover:text-slate-200",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : (
            <>
              <Boxes className="h-4 w-4" />
              <span>Collapse</span>
              <ChevronsLeft className="ml-auto h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}