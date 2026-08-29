"use client";

import { useMemo, useState } from "react";
import {
  LineChart as LineChartIcon,
  Activity,
  TrendingDown,
  Gauge,
  Boxes
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { blockHoursSeries, downtimeTrend, availabilityByAsset, blockSummary } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PIE_COLORS = ["#34d399", "#22d3ee", "#fbbf24", "#818cf8", "#fb7185"];
const RANGE = ["6W", "8W", "10W", "12W"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs shadow-xl">
      <p className="mb-1 font-semibold text-slate-200">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-slate-300">
          <span style={{ color: p.color }}>●</span> {p.name}:{" "}
          <span className="font-semibold text-slate-100">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState("8W");

  const hoursData = useMemo(() => {
    const take = parseInt(range, 10) / 2 || 4;
    return blockHoursSeries.slice(-take);
  }, [range]);

  const utilizationPct = Math.round(blockSummary.utilizationIndex * 100);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-50">
            <LineChartIcon className="h-5 w-5 text-emerald-400" />
            Performance Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Asset availability, block-hour utilization & downtime reduction trends.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 p-1">
          {RANGE.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                range === r ? "bg-slate-700 text-slate-100" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Block Hours Granted</span>
            <Boxes className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-50">{blockSummary.hoursGranted}h</p>
          <p className="text-[11px] text-emerald-300">+2.4% vs prior</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Block Hours Utilized</span>
            <Gauge className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-50">{blockSummary.hoursUtilized}h</p>
          <p className="text-[11px] text-emerald-300">utilization {utilizationPct}%</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Avg Availability</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-emerald-300">98.5%</p>
          <p className="text-[11px] text-slate-400">across 5 asset classes</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Delay Reduction</span>
            <TrendingDown className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-300">-35%</p>
          <p className="text-[11px] text-emerald-300">train-hours / month</p>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-cyan-400" />
            Block Hours: Granted vs Utilized
          </CardTitle>
          <CardDescription>Effective occupation usage after AI clustering across the selected range.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={hoursData} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="granted" name="Granted" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              <Bar dataKey="utilized" name="Utilized" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="utilized" name="Util. Trend" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-rose-400" />
              Downtime Reduction Trend
            </CardTitle>
            <CardDescription>Train-hours lost to unscheduled outages, per month this FY.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeTrend} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                <Bar dataKey="delayHours" name="Delay Hours" fill="#fb7185" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logis" name="Logistics Hrs" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              Availability by Asset Class
            </CardTitle>
            <CardDescription>Fixed-asset availability % across tracked infrastructure classes.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={availabilityByAsset}
                  dataKey="availability"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={48}
                  label={(entry) => `${entry.availability}%`}
                >
                  {availabilityByAsset.map((_, i) => (
                    <Cell key={_} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#0f172a" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}