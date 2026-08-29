"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  CalendarClock,
  TrainFront,
  AlertTriangle,
  Users,
  CheckCircle2,
  Percent,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { explainableFactors, scheduleReasons } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const FACTOR_ICONS = {
  timetable: CalendarClock,
  freight: TrainFront,
  urgency: AlertTriangle,
  resource: Users
};

const FACTOR_BARS = {
  timetable: "from-emerald-500 to-teal-400",
  freight: "from-cyan-500 to-sky-400",
  urgency: "from-amber-500 to-orange-400",
  resource: "from-indigo-500 to-violet-400"
};

const PRESETS = [
  { id: "A1", label: "NDLS–CNB", headline: "3 departments → 1 occupation" },
  { id: "A2", label: "CNB–ALH Yard", headline: "Signal + traction joint" },
  { id: "A3", label: "ALH–NRTL", headline: "Traction + cantilever" },
  { id: "A4", label: "NRTL–AMH", headline: "Night mega-block" }
];

export default function ExplainableAiCard() {
  const [selectedPreset, setSelectedPreset] = useState("A1");
  const [activeFactor, setActiveFactor] = useState("timetable");

  const reason = scheduleReasons[selectedPreset] || scheduleReasons.A1;
  const totalWeight = useMemo(
    () => explainableFactors.reduce((s, f) => s + f.weight, 0),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Explainable AI — Why this schedule?
          </CardTitle>
          <CardDescription>
            Transparent decision rationale across timetable, freight, urgency and resources.
          </CardDescription>
        </div>
        <Badge variant="cyan" className="shrink-0">
          {reason.confidence}% confidence
        </Badge>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Preset selector */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p.id);
                setActiveFactor("timetable");
              }}
              className={cn(
                "rounded-lg border p-2 text-left transition-colors",
                selectedPreset === p.id
                  ? "border-cyan-500/50 bg-cyan-500/10"
                  : "border-slate-800 hover:border-slate-700"
              )}
            >
              <p className="text-xs font-bold text-slate-100">{p.id}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-slate-400">{p.headline}</p>
            </button>
          ))}
        </div>

        {/* Decision summary */}
        <div className="rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 to-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-semibold text-slate-100">{reason.headline}</p>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Net block-hours saved: <span className="font-mono font-bold text-emerald-300">{reason.savings}</span> · {reason.caveat}
          </p>
        </div>

        {/* Factor weight distribution */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              Decision Factor Weights
            </span>
            <Percent className="h-3.5 w-3.5 text-slate-500" />
          </div>
          {explainableFactors.map((f) => {
            const Icon = FACTOR_ICONS[f.key] || Sparkles;
            const active = activeFactor === f.key;
            const share = (f.weight / totalWeight) * 100;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFactor(f.key)}
                className={cn(
                  "w-full rounded-lg border p-3 text-left transition-colors",
                  active
                    ? "border-slate-600 bg-slate-800/40"
                    : "border-slate-800 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", active ? "bg-slate-800" : "bg-slate-900")}>
                    <Icon className="h-4 w-4 text-slate-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{f.name}</span>
                  <span className="ml-auto font-mono text-sm font-bold text-slate-100">
                    {Math.round(share)}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={cn("h-full rounded-full bg-gradient-to-r transition-all", FACTOR_BARS[f.key])}
                    style={{ width: `${share}%` }}
                  />
                </div>
                {active && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{f.detail}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Flow summary */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <CalendarClock className="h-3.5 w-3.5 text-emerald-400" /> Timetable
          </span>
          <ArrowRight className="h-3 w-3 text-slate-600" />
          <span className="inline-flex items-center gap-1">
            <TrainFront className="h-3.5 w-3.5 text-cyan-400" /> Freight Forecast
          </span>
          <ArrowRight className="h-3 w-3 text-slate-600" />
          <span className="inline-flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Defect Urgency
          </span>
          <ArrowRight className="h-3 w-3 text-slate-600" />
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-indigo-400" /> Gang Collocation
          </span>
        </div>
      </CardContent>
    </Card>
  );
}