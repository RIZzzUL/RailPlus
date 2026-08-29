"use client";

import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Gauge,
  Timer,
  Clock,
  MapPin,
  Hash,
  ShieldAlert,
  Users,
  Target,
  CheckCircle2
} from "lucide-react";
import { DEPT_META } from "@/lib/constants";
import { formatDateTime, formatHours } from "@/lib/utils";

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 text-slate-300">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DefectDetailModal({ defect, open, onOpenChange }) {
  if (!defect) return null;
  const meta = DEPT_META[defect.department] || { system: "NA", short: "NA", color: "slate" };

  const priorityTone = defect.priority.startsWith("P1")
    ? "rose"
    : defect.priority.startsWith("P2")
      ? "amber"
      : "cyan";

  const riskTone =
    defect.riskFactor === "Critical"
      ? "rose"
      : defect.riskFactor === "High"
        ? "amber"
        : "emerald";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-50">{defect.id}</h2>
            <Badge variant={priorityTone}>{defect.priority}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-400">{defect.description}</p>
        </div>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>

      <DialogContent>
        {/* Header meta */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Row icon={MapPin} label="Location" value={`${defect.location} • ${defect.km}`} />
          <Row icon={Hash} label="Asset ID" value={`${defect.assetId} • ${defect.assetClass}`} />
          <Row icon={Users} label="Department / System" value={`${defect.department} (${meta.system})`} />
          <Row icon={Clock} label="Detected" value={formatDateTime(defect.detectedAt)} />
        </div>

        {/* Criticality analysis */}
        <div className="mt-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Gauge className="h-4 w-4 text-emerald-400" />
            Criticality Analysis
          </h3>
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">Urgency Score</span>
              <span className="font-bold text-emerald-400">{defect.urgencyScore}/100</span>
            </div>
            <Progress
              value={defect.urgencyScore}
              className="mt-2 h-2"
              indicatorClassName={
                defect.urgencyScore >= 85
                  ? "bg-gradient-to-r from-rose-500 to-pink-400"
                  : defect.urgencyScore >= 60
                    ? "bg-gradient-to-r from-amber-500 to-orange-400"
                    : "bg-gradient-to-r from-emerald-500 to-teal-400"
              }
            />
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                <Timer className="h-3 w-3 text-amber-400" />
                Overdue: {formatHours(defect.overdueHours)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                <Target className="h-3 w-3 text-cyan-400" />
                Effort: {formatHours(defect.estimatedWorkHours)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              {defect.recommendedWindow}
            </p>
          </div>
        </div>

        {/* Asset risk + downtime impact */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              Asset Risk Factor
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant={riskTone}>{defect.riskFactor}</Badge>
              <span className="text-xs text-slate-400">{defect.assetClass}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Failure mode severity with operational exposure on the {defect.corridor}.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              Est. Downtime Impact
            </div>
            <p className="mt-2 text-xl font-bold text-rose-300">
              {defect.downtimeImpactHours.toFixed(1)} hrs
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Projected line-clear disruption if not clustered into a joint block.
            </p>
          </div>
        </div>

        {/* Recommended action */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-emerald-300">AI Recommended Action</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{defect.action}</p>
            <p className="mt-1 text-xs text-slate-400">Assigned gang: {defect.gang}</p>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        <Button variant="default">
          <CheckCircle2 className="h-4 w-4" />
          Route to AI Optimizer
        </Button>
      </DialogFooter>
    </Dialog>
  );
}