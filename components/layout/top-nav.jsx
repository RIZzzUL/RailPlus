"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Zap,
  Radio,
  Bot,
  Search,
  Bell,
  Menu,
  ChevronDown,
  Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { apiSync } from "@/lib/mock-data";
import { DIVISIONS, ZONE, DEPARTMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEPT_COLORS = {
  "Engineering (TMS)": "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  "S&T (SMMS)": "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
  "Electrical (TDMS)": "text-amber-400 border-amber-500/40 bg-amber-500/10",
  "Traffic (COA)": "text-rose-400 border-rose-500/40 bg-rose-500/10"
};

export default function TopNav() {
  const router = useRouter();
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [activeDept, setActiveDept] = useState("All Departments");
  const [mobileOpen, setMobileOpen] = useState(false);

  const liveSystems = apiSync.filter(
    (s) => s.status === "Connected" || s.status === "Live"
  );
  const coa = apiSync.find((s) => s.system === "COA");
  const tms = apiSync.find((s) => s.system === "TMS");

  const handleGenerate = () => router.push("/dashboard/optimizer");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      {/* Top row */}
      <div className="flex h-14 items-center gap-3 px-4">
        {/* Division selector */}
        <div className="w-36 sm:w-44">
          <Select value={division} onChange={(e) => setDivision(e.target.value)}>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>

        {/* Breadcrumb / zone position */}
        <div className="hidden min-w-0 items-center gap-2 xl:flex">
          <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="truncate text-sm text-slate-300">{ZONE}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
        </div>

        {/* Department filter switcher */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {["All Departments", ...DEPARTMENTS].map((dept) => {
            const active = activeDept === dept;
            const isDept = dept !== "All Departments";
            return (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                title={dept}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? isDept
                      ? DEPT_COLORS[dept]
                      : "border-slate-600 bg-slate-800 text-slate-100"
                    : "border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                )}
              >
                {isDept ? dept.split(" (")[0] : dept}
              </button>
            );
          })}
        </nav>

        {/* Live sync status */}
        <div className="hidden items-center gap-2 xl:flex">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            COA: {coa.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            TMS: {tms.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-800/60 sm:block">
            <Search className="h-4 w-4" />
          </button>
          <button className="relative rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-800/60">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
          </button>
          <Button onClick={handleGenerate} className="hidden sm:inline-flex">
            <Bot className="h-4 w-4" />
            Generate AI Plan
          </Button>
          <button
            className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-800/60 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile disclosure */}
      {mobileOpen && (
        <div className="border-t border-slate-800 px-4 py-3 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {["All Departments", ...DEPARTMENTS].map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  activeDept === dept
                    ? dept === "All Departments"
                      ? "border-slate-600 bg-slate-800 text-slate-100"
                      : DEPT_COLORS[dept]
                    : "border-slate-800 text-slate-400"
                )}
              >
                {dept.split(" (")[0]}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
            {liveSystems.map((s) => (
              <span key={s.system} className="inline-flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                {s.system}: {s.status}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Radio className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-slate-300">
              {liveSystems.length}/5 subsystems synchronized
            </span>
            <Zap className="ml-auto h-4 w-4 text-emerald-400" />
          </div>
        </div>
      )}
    </header>
  );
}