"use client";

import { RailSymbol, Signal, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { corridorSections } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATE_CONFIG = {
  free: {
    label: "Line Free",
    segment: "bg-emerald-500/80",
    rail: "text-emerald-300",
    icon: CheckCircle2,
    chip: "text-emerald-300 bg-emerald-500/15",
    desc: "Available for work"
  },
  blocked: {
    label: "Blocked",
    segment: "bg-rose-500/80",
    rail: "text-rose-300",
    icon: Signal,
    chip: "text-rose-300 bg-rose-500/15",
    desc: "Active occupation"
  },
  ai: {
    label: "AI Recommended",
    segment: "bg-amber-400/80",
    rail: "text-amber-300",
    icon: Clock,
    chip: "text-amber-300 bg-amber-500/15",
    desc: "Suggest block window today"
  }
};

export default function LinearCorridorMap() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <RailSymbol className="h-4 w-4 text-emerald-400" />
            Linear Track Corridor — Live Status
          </CardTitle>
          <CardDescription>
            Northern Railway • Delhi Division • Sectional line clear / block occupancy
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live synced with BDMS
        </span>
      </CardHeader>

      <CardContent>
        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-400">
          {Object.entries(STATE_CONFIG).map(([key, cfg]) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2.5 w-2.5 rounded-sm", cfg.segment)} />
              {cfg.label}
            </span>
          ))}
        </div>

        {/* Corridor track */}
        <div className="relative">
          <div className="flex h-16 w-full gap-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-1">
            {corridorSections.map((sec, i) => {
              const cfg = STATE_CONFIG[sec.state] || STATE_CONFIG.free;
              const Icon = cfg.icon;
              return (
                <div
                  key={sec.corridor}
                  className={cn(
                    "group relative flex flex-1 flex-col items-center justify-center rounded-lg px-1 text-center transition-all hover:brightness-110",
                    cfg.segment
                  )}
                >
                  <Icon className="h-4 w-4 text-slate-950/90" />
                  <span className="mt-0.5 hidden max-w-full truncate px-1 text-[10px] font-semibold text-slate-950 lg:block">
                    {sec.corridor.replace("–", "-")}
                  </span>
                  <span className="text-[9px] text-slate-950/80">{sec.km}</span>
                  {/* tooltip */}
                  <div className="pointer-events-none absolute -top-1 left-1/2 z-10 w-48 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-left opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                    <p className="text-[11px] font-semibold text-slate-100">
                      {sec.corridor}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{sec.note}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* running line marker */}
          <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-slate-600">
            <span>km 1384</span>
            <span className="h-px flex-1 bg-slate-800" />
            <span>km 1601 · Towards Mughalsarai</span>
          </div>
        </div>

        {/* Section detail rows */}
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {corridorSections.map((sec) => {
            const cfg = STATE_CONFIG[sec.state] || STATE_CONFIG.free;
            const Icon = cfg.icon;
            return (
              <div
                key={sec.corridor + "-detail"}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-200">
                    {sec.corridor.replace("–", "-")}
                  </span>
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", cfg.chip)}>
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-slate-400">
                  {sec.note}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}