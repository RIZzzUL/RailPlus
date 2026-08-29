"use client";

import { useMemo, useState } from "react";
import { Search, Wrench, SlidersHorizontal, Layers, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefectTable from "@/components/defects/defect-table";
import DefectDetailModal from "@/components/defects/defect-detail-modal";
import { allDefects } from "@/lib/mock-data";
import { DEPARTMENTS, PRIORITY_LEVELS, DEPT_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "P1 - Critical", "P2 - Urgent", "P3 - Routine"];

export default function DefectsPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allDefects.filter((d) => {
      if (dept !== "All" && d.department !== dept) return false;
      if (priority !== "All" && d.priority !== priority) return false;
      if (status !== "All" && d.status !== status) return false;
      if (!q) return true;
      const hay = [d.id, d.assetId, d.assetClass, d.location, d.corridor, d.description, d.department]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [search, dept, priority, status]);

  const p1Count = useMemo(
    () => allDefects.filter((d) => d.priority === "P1 - Critical").length,
    []
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-50">
            <Wrench className="h-5 w-5 text-emerald-400" />
            Integrated Defect Ledger
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            TMS · SMMS · TDMS fusion — {allDefects.length} defects ingested,{" "}
            <span className="font-semibold text-rose-300">{p1Count} P1 critical</span>
          </p>
        </div>
        <Button variant="outline" onClick={() => window.alert("Schedule exported (mock)")}>
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            Filter Catalogue
          </CardTitle>
          <CardDescription>Search assets, refine by source, priority and status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search defect ID, asset, location, corridor…"
                className="pl-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[420px]">
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">Status: All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
              </Select>
              <div className="col-span-2 sm:col-span-1">
                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="All">Priority: All</option>
                  {PRIORITY_LEVELS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Department tabs */}
          <Tabs value={dept} onValueChange={setDept}>
            <TabsList className="flex h-auto flex-wrap justify-start gap-1">
              {["All", ...DEPARTMENTS].map((d) => {
                const count =
                  d === "All"
                    ? allDefects.length
                    : allDefects.filter((x) => x.department === d).length;
                return (
                  <TabsTrigger key={d} value={d} className="relative">
                    {d === "All" ? "All Departments" : DEPT_META[d].system}
                    <Badge className="ml-1 bg-slate-800 px-1.5 py-0 text-[10px] text-slate-300">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Quick priority chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Layers className="h-3.5 w-3.5" />
            Priority shortcut:
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setPriority(f)}
                className={cn(
                  "rounded-full border px-2.5 py-1 transition-colors",
                  priority === f
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto font-medium text-slate-300">
              {filtered.length} shown
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <DefectTable defects={filtered} onSelect={setSelected} />
      </Card>

      <DefectDetailModal
        defect={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  );
}