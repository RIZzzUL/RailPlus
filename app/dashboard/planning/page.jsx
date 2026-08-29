"use client";

import { useState, useMemo } from "react";
import { CalendarDays, CalendarRange, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import HorizonToggle from "@/components/planning/horizon-toggle";
import { resourceHeatmap } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function HeatColor(v) {
  if (v >= 5) return "bg-emerald-400 text-slate-950";
  if (v === 4) return "bg-emerald-500/80 text-emerald-50";
  if (v === 3) return "bg-cyan-500/70 text-slate-950";
  if (v === 2) return "bg-amber-500/60 text-slate-950";
  if (v === 1) return "bg-slate-700 text-slate-200";
  return "bg-slate-800/70 text-slate-500";
}

export default function PlanningPage() {
  const [horizon, setHorizon] = useState("weekly");
  const [selectedCell, setSelectedCell] = useState(null);

  const matrix = horizon === "weekly" ? resourceHeatmap.weekly : resourceHeatmap.monthly;

  const totalEffort = useMemo(
    () => matrix.flat().reduce((a, b) => a + b, 0),
    [matrix]
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-50">
            {horizon === "weekly" ? (
              <CalendarDays className="h-5 w-5 text-amber-400" />
            ) : (
              <CalendarRange className="h-5 w-5 text-cyan-400" />
            )}
            {horizon === "weekly" ? "Weekly Operational Plan" : "Monthly Strategic Plan"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {horizon === "weekly"
              ? "28 Aug – 03 Sep 2026 · operational blocks & gangs"
              : "September 2026 · strategic maintenance campaign"}
          </p>
        </div>
        <HorizonToggle value={horizon} onChange={setHorizon} />
      </div>

      {/* Resource heatmap */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              Resource & Labor Gang Allocation
            </CardTitle>
            <CardDescription>
              Gang-effort intensity per corridor section per day. 0 = idle, 5 = full deployment.
            </CardDescription>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            {totalEffort} crew-days planned
          </span>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="py-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Corridor Section
                  </th>
                  {resourceHeatmap.days.map((d) => (
                    <th key={d} className="px-2 py-2 text-center text-xs font-semibold text-slate-400">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, ri) => (
                  <tr key={resourceHeatmap.sections[ri]}>
                    <td className="py-2 pr-3 text-xs font-medium text-slate-200">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400/70" />
                      {resourceHeatmap.sections[ri].replace("–", "-")}
                    </td>
                    {row.map((v, di) => (
                      <td key={`${ri}-${di}`} className="p-1 text-center">
                        <button
                          className={cn("h-12 w-full rounded-lg text-sm font-bold transition-transform hover:scale-105", HeatColor(v))}
                          onClick={() => setSelectedCell({ section: resourceHeatmap.sections[ri], day: resourceHeatmap.days[di], value: v })}
                        >
                          {v}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span className="mr-1 font-semibold uppercase tracking-wider">Intensity:</span>
            {[0, 1, 2, 3, 4, 5].map((v) => (
              <span key={v} className="inline-flex items-center gap-1">
                <span className={cn("h-4 w-4 rounded", HeatColor(v))} />
                {v}
              </span>
            ))}
          </div>

          {selectedCell && (
            <div className="mt-4 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3 text-xs text-slate-300">
              <span className="font-semibold text-emerald-300">
                {selectedCell.section.replace("–", "-")} · {selectedCell.day}:
              </span>{" "}
              intensity {selectedCell.value}/5 —{" "}
              {selectedCell.value >= 4
                ? "full gang deployment, joint-discipline resources required."
                : selectedCell.value >= 2
                  ? "partial allocation, safe window planning advised."
                  : "light / reserved for overflow work."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan highlights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-amber-400" />
              Weekly Priorities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            {[
              ["Sun mega-block", "Bridge No. 118 bearing replacement across 3 corridors."],
              ["Weekday night windows", "TDMS TSS-304 + OHE cantilever, 22:00–06:00."],
              ["P1 forced fixes", "TRC fracture & point machine 204A cleared same-day."]
            ].map(([t, s]) => (
              <div key={t} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <p><span className="font-semibold text-slate-100">{t}.</span> {s}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-cyan-400" />
              Monthly Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            {[
              ["Rail-grinding tour", "NDLS–CNB UP fast line roughness RCF pass."],
              ["Fibre backbone upgrade", "OFC G110 splice & redundant-link re-route."],
              ["Availability target", "Hold 98.5% aggregate across all 4 corridors."]
            ].map(([t, s]) => (
              <div key={t} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <p><span className="font-semibold text-slate-100">{t}.</span> {s}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}