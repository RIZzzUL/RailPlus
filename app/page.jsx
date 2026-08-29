"use client";

import Link from "next/link";
import {
  RailSymbol,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Boxes,
  Bot,
  Workflow,
  Target,
  ArrowRight,
  AlertOctagon,
  CheckCircle2,
  Network,
  Zap,
  CalendarClock,
  LineChart,
  Search,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const METRIC_BADGES = [
  { value: "98.5%", label: "Infrastructure Availability", icon: ShieldCheck, accent: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/30" },
  { value: "+42%", label: "Multi-Dept Block Clustering", icon: Boxes, accent: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/30" },
  { value: "-35%", label: "Train Delay Hours", icon: TrendingDown, accent: "text-amber-400 bg-amber-500/10 ring-amber-500/30" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* decorative grid + glows */}
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none fixed -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Nav */}
      <header className="relative z-10 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/40">
            <RailSymbol className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100">RailPulse</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Block Planning AI
            </p>
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#features" className="hover:text-slate-100">Platform</a>
            <a href="#problem" className="hover:text-slate-100">Why RailPulse</a>
            <a href="#integrations" className="hover:text-slate-100">Integrations</a>
          </nav>
          <Link href="/dashboard">
            <Button variant="outline" className="ml-2">
              Launch Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 text-center md:pt-24">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live on Northern Railway · Delhi Division
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-50 md:text-6xl">
            Data-Driven{" "}
            <span className="rail-text-gradient">Railway Block Planning</span>{" "}
            &amp; Zero-Conflict Infrastructure Maintenance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            One AI control plane that ingests defects from TMS, SMMS and TDMS,
            reason over live train timetables and freight forecasts, and emits
            automatically clustered multi-department joint blocks — eliminating
            conflicting emergency single-line occupations for good.
          </p>

          {/* Metric badges */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {METRIC_BADGES.map(({ value, label, icon: Icon, accent }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-50">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard">
              <Button size="lg">
                <Bot className="h-5 w-5" />
                Launch Operational Dashboard
              </Button>
            </Link>
            <a href="#problem">
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </a>
          </div>
        </section>

        {/* Problem vs Solution */}
        <section id="problem" className="border-y border-slate-800/60 bg-slate-900/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-2xl font-bold text-slate-50 md:text-3xl">
              From <span className="text-rose-400">manual chaos</span> to{" "}
              <span className="text-emerald-400">automatic coordination</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400">
              Today every department files its own BDMS request. Tomorrow one AI
              plan is generated once, reviewed once, and pushed once.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* Problem card */}
              <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-b from-rose-500/5 to-slate-900/40 p-6">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertOctagon className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Before — Decentralized</span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {[
                    ["3 conflicting single-line emergency blocks on the same section", "TRC fracture 06:00 + point machine 08:00 + cantilever 14:00"],
                    ["Uses 42 block hours but 17 are wasted on travel & re-occupancy", "Overlapping occupations, idle gangs"],
                    ["Manual BDMS form filling & telephone confirmations", "Week-long planning cycles that miss the best gaps"],
                    ["Delay hours keep climbing with late emergency approvals", "Traffic caught between uncoordinated outages"]
                  ].map(([title, sub]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20">
                        <Trash2 className="h-3 w-3 text-rose-400" />
                      </span>
                      <div>
                        <p className="font-medium text-slate-100">{title}</p>
                        <p className="text-xs text-slate-400">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution card */}
              <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-500/5 to-slate-900/40 p-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">After — Automatic</span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {[
                    ["Engine, Signalling & Traction fused into 1 joint occupation", "TRC + point machine + neutral section in a 3h window"],
                    ["−42% block hours via clustering; reuse of every gang", "42h requested → 24.5h truly needed"],
                    ["AI reads timetable gaps & freight forecasts instantly", "Plan generated in seconds, not weeks"],
                    ["One approval pushes straight to BDMS/COA", "Zero conflicts, transparent rationale for every window"]
                  ].map(([title, sub]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      </span>
                      <div>
                        <p className="font-medium text-slate-100">{title}</p>
                        <p className="text-xs text-slate-400">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-2xl font-bold text-slate-50 md:text-3xl">
              One control plane, four capabilities
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Search, title: "Unified Defect Ledger", desc: "TMS, SMMS & TDMS defects fused into one searchable, priority-ranked ledger.", accent: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/30" },
                { icon: Boxes, title: "AI Gantt Scheduler", desc: "Cluster multi-department works into zero-conflict joint blocks with explainable reasons.", accent: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/30" },
                { icon: CalendarClock, title: "Horizon Planning", desc: "Weekly operational and monthly strategic views with gang-allocation heatmaps.", accent: "text-amber-400 bg-amber-500/10 ring-amber-500/30" },
                { icon: LineChart, title: "Performance Analytics", desc: "Track block-hours granted vs utilized and downtime-reduction trends over time.", accent: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/30" }
              ].map(({ icon: Icon, title, desc, accent }) => (
                <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-100">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations + CTA */}
        <section id="integrations" className="border-t border-slate-800/60 bg-slate-900/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-2xl font-bold text-slate-50">
              Connected to every department system
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { s: "TMS", n: "Track Mgmt", c: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/30" },
                { s: "SMMS", n: "Signalling", c: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/30" },
                { s: "TDMS", n: "Traction", c: "text-amber-400 bg-amber-500/10 ring-amber-500/30" },
                { s: "COA", n: "Train Ops", c: "text-rose-400 bg-rose-500/10 ring-rose-500/30" },
                { s: "BDMS", n: "Block Data Mgmt", c: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/30" }
              ].map(({ s, n, c }) => (
                <div key={s} className={`inline-flex items-center gap-3 rounded-xl border border-slate-800 px-4 py-3 ${c}`}>
                  <Network className="h-4 w-4" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-50">{s}</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-80">{n}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-cyan-500/10 p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/40">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="max-w-xl text-xl font-bold text-slate-50 md:text-2xl">
                Generate your first AI-optimized multi-department block plan.
              </h3>
              <p className="max-w-md text-sm text-slate-400">
                Watch six decentralized requests collapse into four conflict-free,
                explainable joint blocks — ready to approve and push to BDMS &amp; COA.
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="default">
                  <Workflow className="h-5 w-5" />
                  Launch Operational Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}