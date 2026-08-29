"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GanttScheduler from "@/components/optimizer/gantt-scheduler";
import ExplainableAiCard from "@/components/optimizer/explainable-ai-card";
import { blockSummary } from "@/lib/mock-data";

export default function OptimizerPage() {
  const [approved, setApproved] = useState(false);
  const [toast, setToast] = useState(null);

  const handleApprove = () => {
    setApproved(true);
    setToast({
      title: "Schedule Pushed to BDMS/COA",
      message:
        "6 AI-optimized joint blocks (4 multi-department) transmitted to Block Data Management & Chief Operating. Work orders dispatched to gangs."
    });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed right-4 top-16 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-emerald-500/40 bg-slate-900 p-4 shadow-2xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-slate-100">{toast.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-50">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            AI Block Optimizer & Scheduler
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Corridor-wise joint-block generation with transparent, explainable decisions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setApproved(false)}>
            <RefreshCw className="h-4 w-4" />
            Re-run Optimization
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleApprove}
            disabled={approved}
            className="disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {approved ? "Pushed to BDMS/COA" : "Approve & Push Schedule to BDMS/COA"}
          </Button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active Blocks", value: blockSummary.activeBlocksToday, sub: "today", accent: "text-emerald-300" },
          { label: "Joint Multi-Dept Blocks", value: blockSummary.jointMultiDeptBlocks, sub: "clustered", accent: "text-cyan-300" },
          { label: "Block Utilization Index", value: `${(blockSummary.utilizationIndex * 100).toFixed(0)}%`, sub: "up +18pts", accent: "text-amber-300" },
          { label: "Conflict Hours Freed", value: `${blockSummary.freedConflictHours}h`, sub: "vs last week", accent: "text-rose-300" }
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Gantt */}
      <GanttScheduler />

      {/* Explainable AI */}
      <ExplainableAiCard />

      {/* Approval card */}
      <Card className="border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Final Approval Workflow
          </CardTitle>
          <CardDescription>
            Review the explainable decisions, then push the coordinated schedule to BDMS and COA.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm text-slate-300">
            {approved ? (
              <Badge variant="emerald" className="text-sm">Approved & pushed to BDMS/COA ✓</Badge>
            ) : (
              <span>
                6 blocks pending. Push will transmit timetable & freight-backed windows to{" "}
                <span className="font-semibold text-slate-100">BDMS</span> and notify{" "}
                <span className="font-semibold text-slate-100">COA</span>.
              </span>
            )}
          </div>
          <Button
            variant={approved ? "outline" : "default"}
            onClick={approved ? () => setApproved(false) : handleApprove}
          >
            <Send className="h-4 w-4" />
            {approved ? "Undo Push" : "Approve & Push to BDMS/COA"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}