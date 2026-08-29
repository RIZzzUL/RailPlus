"use client";

import { useMemo } from "react";
import {
  Gauge,
  Boxes,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Radio,
  Activity,
  Wifi,
  ArrowUpRight,
  Server,
  RefreshCw
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KpiCard from "@/components/dashboard/kpi-card";
import LinearCorridorMap from "@/components/dashboard/linear-corridor-map";
import { allDefects, apiSync, maintenanceFeed, blockSummary } from "@/lib/mock-data";
import { DEPT_META } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

function SyncPulse({ status }) {
  const live = status === "Connected" || status === "Live";
  const color = status === "Awaiting Push" ? "bg-slate-500" : live ? "bg-emerald-500" : "bg-rose-500";
  return (
    <span className="relative flex h-2.5 w-2.5">
      {live && (
        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", color)} />
      )}
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}

export default function DashboardPage() {
  const p1Open = useMemo(
    () => allDefects.filter((d) => d.priority === "P1 - Critical" && d.status !== "Planned").length,
    []
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-50">
            <Layers className="h-5 w-5 text-emerald-400" />
            Operational Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Northern Railway · Delhi Division · Live sectional status, 28 Aug 2026
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="emerald" className="gap-1.5">
            <Wifi className="h-3 w-3" />
            4/5 subsystems synced
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <RefreshCw className="h-3 w-3" />
            Auto-refresh 30s
          </Badge>
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={ShieldCheck}
          label="Fixed Asset Availability"
          value="98.5"
          unit="%"
          delta={0.4}
          deltaGood
          sub="+0.4 pts vs last month"
          progress={98.5}
          accent="emerald"
        />
        <KpiCard
          icon={Gauge}
          label="Block Utilization Index"
          value={(blockSummary.utilizationIndex * 100).toFixed(0)}
          unit="%"
          delta={18}
          deltaGood
          sub="up from 74% · AI clustering"
          progress={blockSummary.utilizationIndex * 100}
          accent="cyan"
        />
        <KpiCard
          icon={AlertTriangle}
          label="Active Unresolved P1"
          value={p1Open}
          unit="defects"
          sub="critical, awaiting joint block"
          progress={p1Open * 20}
          accent="rose"
        />
        <KpiCard
          icon={Boxes}
          label="Joint Coordinated Blocks"
          value={blockSummary.jointMultiDeptBlocks}
          unit="today"
          delta={42}
          deltaGood
          sub="multi-department fusion"
          progress={75}
          accent="amber"
        />
      </div>

      {/* Linear corridor map */}
      <LinearCorridorMap />

      {/* Bottom row: sync health + maintenance stream */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* API sync health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-cyan-400" />
              Real-Time API Sync Health
            </CardTitle>
            <CardDescription>Cross-system telemetry ingestion latency & throughput.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {apiSync.map((s) => (
              <div
                key={s.system}
                className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2.5"
              >
                <SyncPulse status={s.status} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-100">{s.system}</p>
                  <p className="text-[11px] text-slate-500">{s.name}</p>
                </div>
                <div className="ml-auto text-right">
                  {s.status === "Awaiting Push" ? (
                    <Badge variant="outline">{s.status}</Badge>
                  ) : (
                    <>
                      <p className="font-mono text-xs font-bold text-emerald-300">
                        {s.latencyMs}ms
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {s.messagesPerMin}/min · {s.uptime}%
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
            <p className="pt-1 text-[11px] text-slate-500">
              Last sync {formatDateTime(apiSync[0].lastSync)}
            </p>
          </CardContent>
        </Card>

        {/* Recent maintenance stream */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              Recent Maintenance Stream
            </CardTitle>
            <CardDescription>Newly ingested defects from TMS, SMMS & TDMS.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {maintenanceFeed.map((item) => {
              const meta = DEPT_META[item.department] || { system: item.system };
              return (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2.5">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                      meta.color === "emerald" && "bg-emerald-500/15 text-emerald-300",
                      meta.color === "cyan" && "bg-cyan-500/15 text-cyan-300",
                      meta.color === "amber" && "bg-amber-500/15 text-amber-300",
                      meta.color === "rose" && "bg-rose-500/15 text-rose-300"
                    )}
                  >
                    {meta.system}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.id} · {item.asset}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <Badge
                      variant={item.urgency >= 85 ? "rose" : item.urgency >= 60 ? "amber" : "cyan"}
                      className="gap-1"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                      {item.urgency}
                    </Badge>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {formatDateTime(item.at)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
              <Server className="h-3.5 w-3.5" />
              {maintenanceFeed.length} events · P1s auto-promoted to optimizer queue
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}