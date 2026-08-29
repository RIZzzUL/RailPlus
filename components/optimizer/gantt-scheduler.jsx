"use client";

import {
  Boxes,
  Sparkles,
  Clock,
  Printer,
  Layers,
  GitCompareArrows
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { manualBlocks, aiBlocks } from "@/lib/mock-data";
import { DEPT_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HOUR_TICKS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

function toHhmm(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function deptColor(dept) {
  const meta = DEPT_META[dept] || { color: "slate" };
  const map = {
    emerald: "border-emerald-400 bg-emerald-500 text-slate-950",
    cyan: "border-cyan-400 bg-cyan-500 text-slate-950",
    amber: "border-amber-400 bg-amber-500 text-slate-950",
    rose: "border-rose-400 bg-rose-500 text-slate-950"
  };
  return map[meta.color] || "border-slate-400 bg-slate-500 text-slate-950";
}

function TimelineTrack({ title, icon: Icon, accent, blocks, kind, summary }) {
  const totalHours = blocks.reduce((s, b) => {
    const dur = b.endH > b.startH ? b.endH - b.startH : b.endH + 24 - b.startH;
    return s + dur;
  }, 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", accent)} />
            {title}
          </CardTitle>
          <CardDescription>
            {kind === "manual"
              ? "Decentralized single-department BDMS requests"
              : "Automatically clustered multi-department joint blocks"}
          </CardDescription>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={kind === "manual" ? "rose" : "emerald"}>
            {blocks.length} blocks · {totalHours.toFixed(1)}h
          </Badge>
          {summary}
        </div>
      </CardHeader>

      <CardContent>
        {/* Hour ruler */}
        <div className="flex border-b border-slate-800 pb-1">
          {HOUR_TICKS.map((t) => (
            <div key={t} className="flex-1 text-center text-[9px] text-slate-500">
              {t === 24 ? "24:00" : String(t).padStart(2, "0") + ":00"}
            </div>
          ))}
        </div>

        {/* Track */}
        <div className="relative mt-2 h-40 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40">
          {HOUR_TICKS.map((t) => (
            <div
              key={"g" + t}
              className="absolute top-0 h-full w-px bg-slate-800/50"
              style={{ left: `${(t / 24) * 100}%` }}
            />
          ))}

          <div className="absolute top-0 h-full w-px bg-slate-200/30" style={{ left: `${(6 / 24) * 100}%` }}>
            <span className="absolute -top-1 left-1 text-[9px] font-semibold text-slate-300">NOW</span>
          </div>

          {blocks.map((b, idx) => {
            const start = b.startH;
            const dur = b.endH > b.startH ? b.endH - b.startH : b.endH + 24 - b.startH;
            const left = (start / 24) * 100;
            const width = (dur / 24) * 100;
            const isJoint = kind === "ai" && (b.departments || []).length > 1;
            const isOvernight = b.endH <= b.startH;
            return (
              <div
                key={b.id}
                className={cn(
                  "absolute top-3 flex items-center overflow-hidden rounded-md px-2 text-[10px] font-semibold",
                  kind === "manual"
                    ? deptColor(b.department)
                    : isJoint
                      ? "border-2 border-emerald-300 bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-slate-950"
                      : deptColor(b.departments[0])
                )}
                style={{
                  left: `${left}%`,
                  width: `${Math.min(width, 100 - left)}%`,
                  height: 32,
                  top: `${(idx % 3) * 38 + 6}px`
                }}
              >
                <span className="truncate">
                  {b.task} · {toHhmm(b.startH)}
                </span>
                {isJoint && (
                  <span className="ml-1 hidden shrink-0 rounded-sm bg-slate-950/80 px-1 text-[8px] font-bold text-emerald-300 sm:inline">
                    JOINT
                  </span>
                )}
                {isOvernight && (
                  <span className="ml-1 hidden shrink-0 rounded-sm bg-slate-950/80 px-1 text-[8px] font-bold text-amber-300 sm:inline">
                    ⤾ NEXT DAY
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* legend */}
        <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Engineering (TMS)</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" /> S&T (SMMS)</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Electrical (TDMS)</span>
          {kind === "ai" && (
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm border-2 border-emerald-300 bg-emerald-500/60" /> Joint multi-dept block
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function GanttScheduler() {
  const manualHours = manualBlocks.reduce((s, b) => s + (b.endH > b.startH ? b.endH - b.startH : b.endH + 24 - b.startH), 0);
  const aiHours = aiBlocks.reduce((s, b) => s + (b.endH > b.startH ? b.endH - b.startH : b.endH + 24 - b.startH), 0);
  const freed = manualHours - aiHours;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <GitCompareArrows className="h-4 w-4 text-emerald-400" />
            AI Gantt Corridor Scheduler
          </CardTitle>
          <CardDescription>
            Manual decentralized requests vs AI-optimized multi-department joint blocks · 28 Aug 2026
          </CardDescription>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-rose-300">
            <Layers className="h-3.5 w-3.5" /> Manual {manualHours.toFixed(1)}h
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <Boxes className="h-3.5 w-3.5" /> AI {aiHours.toFixed(1)}h
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300">
            <Clock className="h-3.5 w-3.5" /> {freed.toFixed(1)}h freed
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-2">
          <TimelineTrack
            title="Manual Decentralized Requests"
            icon={Printer}
            accent="text-rose-400"
            kind="manual"
            blocks={manualBlocks}
          />
          <TimelineTrack
            title="AI-Optimized Joint Blocks"
            icon={Sparkles}
            accent="text-emerald-400"
            kind="ai"
            blocks={aiBlocks}
          />
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3 text-xs text-slate-300">
          <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <span>
            Joint occupancy collapses three separate single-line emergency blocks into one coordinated window — e.g.{" "}
            <span className="font-semibold text-emerald-300">A1</span> merges TRC rail-fracture, OFC fibre and rail-grinding into a single 06:10–10:10 occupation.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}