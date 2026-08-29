"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEPT_META } from "@/lib/constants";
import { formatHours } from "@/lib/utils";

const PRIORITY_ORDER = { "P1 - Critical": 0, "P2 - Urgent": 1, "P3 - Routine": 2 };

function StatusBadge({ status }) {
  const tone =
    status === "Open" ? "rose" : status === "In Progress" ? "amber" : "cyan";
  return (
    <Badge variant={tone} className="capitalize">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

export default function DefectTable({ defects, onSelect }) {
  const [sort, setSort] = useState({ id: null, dir: "asc" });

  const sorted = useMemo(() => {
    if (!sort.id) return defects;
    const arr = [...defects];
    const dir = sort.dir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let va = a[sort.id];
      let vb = b[sort.id];
      if (sort.id === "priority") {
        va = PRIORITY_ORDER[a.priority];
        vb = PRIORITY_ORDER[b.priority];
      }
      if (typeof va === "string") return va.localeCompare(vb) * dir;
      return (va - vb) * dir;
    });
    return arr;
  }, [defects, sort]);

  const toggleSort = (id) => {
    setSort((s) =>
      s.id === id ? { id, dir: s.dir === "asc" ? "desc" : "asc" } : { id, dir: "asc" }
    );
  };

  const SortIcon = ({ id }) => {
    if (sort.id !== id) return <ArrowUpDown className="h-3 w-3 opacity-60" />;
    return sort.dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  const HeaderCell = ({ id, children, className }) => (
    <th className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", className)}>
      <button onClick={() => toggleSort(id)} className="inline-flex items-center gap-1 hover:text-slate-200">
        {children}
        <SortIcon id={id} />
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/60">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">ID / Asset</th>
            <HeaderCell id="department">Department</HeaderCell>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Asset & Location</th>
            <HeaderCell id="priority">Priority</HeaderCell>
            <HeaderCell id="urgencyScore" className="text-right">Urgency</HeaderCell>
            <HeaderCell id="overdueHours" className="text-right">Overdue</HeaderCell>
            <HeaderCell id="estimatedWorkHours" className="text-right">Effort</HeaderCell>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((d) => {
            const meta = DEPT_META[d.department] || { system: "NA" };
            const tone =
              d.priority === "P1 - Critical"
                ? "rose"
                : d.priority === "P2 - Urgent"
                  ? "amber"
                  : "cyan";
            return (
              <tr
                key={d.id}
                onClick={() => onSelect && onSelect(d)}
                className="cursor-pointer border-b border-slate-800/70 transition-colors hover:bg-slate-800/40"
              >
                <td className="px-4 py-3">
                  <p className="font-mono text-xs font-semibold text-emerald-300">{d.id}</p>
                  <p className="text-[11px] text-slate-500">{d.assetId}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
                      meta.color === "emerald" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                      meta.color === "cyan" && "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
                      meta.color === "amber" && "border-amber-500/30 bg-amber-500/10 text-amber-300",
                      meta.color === "rose" && "border-rose-500/30 bg-rose-500/10 text-rose-300"
                    )}
                  >
                    {meta.system}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-100">{d.assetClass}</p>
                  <p className="text-[11px] text-slate-500">
                    {d.corridor.replace("–", "-")} · {d.km}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={tone}>{d.priority}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={cn("font-mono text-xs font-bold", d.urgencyScore >= 85 ? "text-rose-300" : d.urgencyScore >= 60 ? "text-amber-300" : "text-emerald-300")}>
                    {d.urgencyScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                  {formatHours(d.overdueHours)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                  {formatHours(d.estimatedWorkHours)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-600" />
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
        {sorted.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-500">
          No defects match the current filters.
        </div>
      )}
    </div>
  );
}