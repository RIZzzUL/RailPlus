// lib/mock-data.js
// Deep, realistic railway-domain mock dataset for the AI Block Planning system.

import { DEPARTMENTS, PRIORITY_LEVELS, BLOCK_STATUSES } from "./constants";

// Minimal date helper to anchor mock "now" at a stable reference.
const NOW = new Date("2026-08-28T06:00:00");

function hoursAgo(h) {
  return new Date(NOW.getTime() - h * 3600 * 1000);
}

export const defects = [
  {
    id: "TMS-24081",
    assetId: "TRC-14-612",
    department: "Engineering (TMS)",
    assetClass: "Track & Geometry",
    location: "NDLS–CNB MAIN • UP line",
    corridor: "NDLS–CNB MAINLINE",
    km: "km 1398/4-1400/2",
    description: "TRC rail fracture detected at 53 mm/hr track geometry. Severe transverse fissure on outer rail, 8.9 mm wheel-drop potential.",
    priority: "P1 - Critical",
    urgencyScore: 96,
    overdueHours: 9,
    estimatedWorkHours: 6,
    status: "Open",
    riskFactor: "Critical",
    downtimeImpactHours: 0.6,
    detectedAt: hoursAgo(5),
    recommendedWindow: "06:10 - 10:10 low-density passenger window",
    gang: "ENG-2 / Bhiwani Track Gang",
    action: "Immediate joint engineering + S&T occupying both UP & DN."
  },
  {
    id: "SMMS-31420",
    assetId: "PM-204A",
    department: "S&T (SMMS)",
    assetClass: "Signalling & Interlocking",
    location: "CNB–ALH SECTION • Station Aigawan",
    corridor: "CNB–ALH SECTION",
    km: "Panel No. 3 / Loop 2",
    description: "Point Machine 204A throwing fault; highest point resistance 14.7 Ω. Intermittent 4FR (foul route) detection drops.",
    priority: "P1 - Critical",
    urgencyScore: 91,
    overdueHours: 6,
    estimatedWorkHours: 3,
    status: "Open",
    riskFactor: "High",
    downtimeImpactHours: 0.45,
    detectedAt: hoursAgo(4),
    recommendedWindow: "09:40 - 12:40 yard occupancy",
    gang: "S&T Relay Room Squad",
    action: "Replace point machine detection circuit + re-gauge switch 204A."
  },
  {
    id: "TDMS-88210",
    assetId: "OHE-112/14",
    department: "Electrical (TDMS)",
    assetClass: "OHE & Traction",
    location: "ALH–NRTL TRUNK • Catenary span 112/14",
    corridor: "ALH–NRTL TRUNK",
    km: "km 1541/6",
    description: "OHE cantilever 112/14 sagging below minimum contact wire height (5.27 m measured). Pantograph strike risk on electric loco class WAP-7",
    priority: "P1 - Critical",
    urgencyScore: 88,
    overdueHours: 3,
    estimatedWorkHours: 5,
    status: "Open",
    riskFactor: "Critical",
    downtimeImpactHours: 0.5,
    detectedAt: hoursAgo(3),
    recommendedWindow: "Couple with CNB–ALH SMMS outage in one TDMS block",
    gang: "TDMS Traction Maintenance Crew-7",
    action: "Re-tension and rebuild cantilever assembly 112/14."
  },
  {
    id: "TMS-24221",
    assetId: "TRC-17-911",
    department: "Engineering (TMS)",
    assetClass: "Track & Geometry",
    location: "NRTL–AMH SPUR LINE • DN line",
    corridor: "NRTL–AMH SPUR LINE",
    km: "km 1571-1573",
    description: "Formation washout shoulder erosion after heavy monsoon run-off. Ballast fouling and cess depression 40 mm.",
    priority: "P2 - Urgent",
    urgencyScore: 74,
    overdueHours: 0,
    estimatedWorkHours: 12,
    status: "In Progress",
    riskFactor: "High",
    downtimeImpactHours: 1.2,
    detectedAt: hoursAgo(18),
    recommendedWindow: "12-hour combined ballast + OHE washout rectification",
    gang: "ENG-9 / Spur Section Gang",
    action: "Ballast re-plug, shoulder rebuild, ultrasonic rail-flaw re-scan."
  },
  {
    id: "SMMS-31855",
    assetId: "AXC-771B",
    department: "S&T (SMMS)",
    assetClass: "Signalling & Interlocking",
    location: "CNB–ALH SECTION • Block axle counter 771B",
    corridor: "CNB–ALH SECTION",
    km: "km 1441",
    description: "Axle counter double-reset transient causing false occupancy. Intermittently flags occupied sector despite clear track circuit.",
    priority: "P2 - Urgent",
    urgencyScore: 71,
    overdueHours: 0,
    estimatedWorkHours: 4,
    status: "Open",
    riskFactor: "High",
    downtimeImpactHours: 0.9,
    detectedAt: hoursAgo(22),
    recommendedWindow: "08:00 - 12:00 coupled with point-machine window",
    gang: "S&T Protection & SWNW",
    action: "Replace axle counter evaluator card and re-certify section."
  },
  {
    id: "TDMS-88904",
    assetId: "TSS-304",
    department: "Electrical (TDMS)",
    assetClass: "OHE & Traction",
    location: "ALH–NRTL TRUNK • TSS 304 bus",
    corridor: "ALH–NRTL TRUNK",
    km: "TSS 304 / 25 kV bus",
    description: "25 kV traction substation breaker 2084 nuisance-trip during load fluctuation; tracking on lightning arrestor post.",
    priority: "P2 - Urgent",
    urgencyScore: 68,
    overdueHours: 0,
    estimatedWorkHours: 8,
    status: "Open",
    riskFactor: "Medium",
    downtimeImpactHours: 1.5,
    detectedAt: hoursAgo(10),
    recommendedWindow: "Night bench block 22:00 - 06:00",
    gang: "TDMS Substation Team-B",
    action: "Replace lightning arrestor and overhaul breaker 2084."
  }
];

export const moreDefects = [
  {
    id: "TMS-24488",
    assetId: "BGL-04-118",
    department: "Engineering (TMS)",
    assetClass: "Bridges & Structures",
    location: "CNB–ALH SECTION • Bridge No. 118",
    corridor: "CNB–ALH SECTION",
    km: "km 1441/9",
    description: "Bowstring girder bearing seizure; excessive bridge-end deflection and screeching at traffic speed.",
    priority: "P2 - Urgent",
    urgencyScore: 66,
    overdueHours: 0,
    estimatedWorkHours: 16,
    status: "Planned",
    riskFactor: "Medium",
    downtimeImpactHours: 2.0,
    detectedAt: hoursAgo(36),
    recommendedWindow: "Sunday mega-block with bridge specialists",
    gang: "ENG Bridge Special Duty Squad",
    action: "Full-bearing replacement under joint traffic slow order."
  },
  {
    id: "SMMS-32177",
    assetId: "TEL-FIB77",
    department: "S&T (SMMS)",
    assetClass: "Telecom & Network",
    location: "NDLS–CNB MAIN • OFC spur G110",
    corridor: "NDLS–CNB MAINLINE",
    km: "km 1410",
    description: "OFC backbone fibre attenuation on G110 spur; 24 dB loss causing interlocking telemetry degradation on section.",
    priority: "P3 - Routine",
    urgencyScore: 40,
    overdueHours: 0,
    estimatedWorkHours: 6,
    status: "Open",
    riskFactor: "Low",
    downtimeImpactHours: 0.3,
    detectedAt: hoursAgo(28),
    recommendedWindow: "Couple to weekly S&T window",
    gang: "S&T Fibre Team",
    action: "Fusion splice & traffic re-route on redundant link."
  },
  {
    id: "TDMS-89331",
    assetId: "OHE-209/03",
    department: "Electrical (TDMS)",
    assetClass: "OHE & Traction",
    location: "NRTL–AMH SPUR LINE • Span 209/03",
    corridor: "NRTL–AMH SPUR LINE",
    km: "km 1594/2",
    description: "Dropper wire fatigue wear at insulator 209/03; surface arcing observed during evening peak load.",
    priority: "P3 - Routine",
    urgencyScore: 45,
    overdueHours: 0,
    estimatedWorkHours: 3,
    status: "Open",
    riskFactor: "Medium",
    downtimeImpactHours: 0.4,
    detectedAt: hoursAgo(20),
    recommendedWindow: "Fold into fortnightly traction maintenance",
    gang: "TDMS Traction Maintenance Crew-3",
    action: "Replace dropper and re-tension contact wire."
  },
  {
    id: "TMS-24620",
    assetId: "TRC-19-052",
    department: "Engineering (TMS)",
    assetClass: "Track & Geometry",
    location: "NDLS–CNB MAIN • Up fast line",
    corridor: "NDLS–CNB MAINLINE",
    km: "km 1408-1411",
    description: "Excessive rail-corrugation and rolling contact fatigue, gating roughness index 2.1 on 120 km/h section.",
    priority: "P3 - Routine",
    urgencyScore: 52,
    overdueHours: 0,
    estimatedWorkHours: 9,
    status: "Open",
    riskFactor: "Medium",
    downtimeImpactHours: 0.8,
    detectedAt: hoursAgo(14),
    recommendedWindow: "Combine with ballast & SMMS joint window",
    gang: "ENG Grinding Train Coord",
    action: "Rail grinding pass at 6 mm/turn + ultrasonic scan."
  },
  {
    id: "TDMS-89702",
    assetId: "OHE-331/21",
    department: "Electrical (TDMS)",
    assetClass: "OHE & Traction",
    location: "CNB–ALH SECTION • Catenary span 331/21",
    corridor: "CNB–ALH SECTION",
    km: "km 1477/1",
    description: "Neutral section insulator glow discharge with dry band arcing under fog, voltage unbalance logged.",
    priority: "P3 - Routine",
    urgencyScore: 49,
    overdueHours: 0,
    estimatedWorkHours: 7,
    status: "Open",
    riskFactor: "Low",
    downtimeImpactHours: 0.6,
    detectedAt: hoursAgo(11),
    recommendedWindow: "Tide into SMMS weekly alignment block",
    gang: "TDMS Substation Team-C",
    action: "Replace neutral section insulator strings."
  },
  {
    id: "SMMS-32510",
    assetId: "RLC-510",
    department: "S&T (SMMS)",
    assetClass: "Signalling & Interlocking",
    location: "ALH–NRTL TRUNK • Remote level crossing 510",
    corridor: "ALH–NRTL TRUNK",
    km: "km 1528",
    description: "Remote operated level crossing gate circuitry periodic failure; train-borne loop continuity intermittent.",
    priority: "P3 - Routine",
    urgencyScore: 44,
    overdueHours: 0,
    estimatedWorkHours: 5,
    status: "Open",
    riskFactor: "Medium",
    downtimeImpactHours: 0.5,
    detectedAt: hoursAgo(26),
    recommendedWindow: "Schedule into monthly signalling overhaul",
    gang: "S&T Relay Room Squad",
    action: "Replace gate mechanism control relay and loop sensor."
  }
];

export const allDefects = [...defects, ...moreDefects];

// ---------------- Block corridor schedules ----------------
// Times are encoded as a decimal hour-of-day (0-24) for the Gantt visualiser.

export const manualBlocks = [
  { id: "M1", corridor: "CNB–ALH SECTION", section: "Aigawan loop", department: "S&T (SMMS)", task: "Point machine 204A overhaul", startH: 8, endH: 11, status: "Uncoordinated" },
  { id: "M2", corridor: "NRTL–AMH SPUR LINE", section: "Spur DN line", department: "Engineering (TMS)", task: "Ballast washout rectification", startH: 10, endH: 18, status: "Uncoordinated" },
  { id: "M3", corridor: "ALH–NRTL TRUNK", section: "Catenary 112/14", department: "Electrical (TDMS)", task: "Cantilever rebuild", startH: 14, endH: 17, status: "Uncoordinated" },
  { id: "M4", corridor: "NDLS–CNB MAINLINE", section: "UP fast line", department: "Engineering (TMS)", task: "Rail-flaw ultrasonic scan", startH: 4, endH: 7, status: "Uncoordinated" },
  { id: "M5", corridor: "CNB–ALH SECTION", section: "Block 771B", department: "S&T (SMMS)", task: "Axle counter evaluator card", startH: 19, endH: 23, status: "Uncoordinated" },
  { id: "M6", corridor: "ALH–NRTL TRUNK", section: "TSS 304 bus", department: "Electrical (TDMS)", task: "Breaker 2084 overhaul", startH: 22, endH: 8, status: "Uncoordinated" }
];

export const aiBlocks = [
  {
    id: "A1",
    corridor: "NDLS–CNB MAINLINE",
    section: "km 1398-1411 UP line",
    departments: ["Engineering (TMS)", "S&T (SMMS)"],
    task: "TRC fracture + OFC fibre joint occupancy",
    startH: 6.1,
    endH: 10.1,
    status: "AI Optimized"
  },
  {
    id: "A2",
    corridor: "CNB–ALH SECTION",
    section: "Aigawan yard",
    departments: ["S&T (SMMS)", "Electrical (TDMS)"],
    task: "Point machine + neutral section joint block",
    startH: 9.7,
    endH: 12.7,
    status: "AI Optimized"
  },
  {
    id: "A3",
    corridor: "ALH–NRTL TRUNK",
    section: "Catenary 112/14 & TSS 304",
    departments: ["Electrical (TDMS)", "Engineering (TMS)"],
    task: "Cantilever + substation joint window",
    startH: 14,
    endH: 17,
    status: "AI Optimized"
  },
  {
    id: "A4",
    corridor: "NRTL–AMH SPUR LINE",
    section: "Spur DN + formation",
    departments: ["Engineering (TMS)", "Electrical (TDMS)"],
    task: "Ballast washout tied into night mega-block",
    startH: 22,
    endH: 6,
    status: "Pushed to BDMS"
  },
  {
    id: "A5",
    corridor: "CNB–ALH SECTION",
    section: "Block 771B",
    departments: ["S&T (SMMS)"],
    task: "Axle counter re-cert window",
    startH: 19,
    endH: 23,
    status: "AI Optimized"
  },
  {
    id: "A6",
    corridor: "NDLS–CNB MAINLINE",
    section: "UP fast line",
    departments: ["Engineering (TMS)"],
    task: "Deep rail-grinding pass",
    startH: 0.5,
    endH: 4.5,
    status: "AI Optimized"
  }
];

export const blockSummary = {
  totalCorridors: 4,
  activeBlocksToday: 6,
  jointMultiDeptBlocks: 4,
  hoursGranted: 42,
  hoursUtilized: 38.6,
  utilizationIndex: 0.92,
  freedConflictHours: 17.5,
  clusteringGainPct: 42
};

// ---------------- Real-time API sync health ----------------
export const apiSync = [
  { system: "TMS", name: "Track Management System", status: "Connected", latencyMs: 84, messagesPerMin: 142, lastSync: hoursAgo(0.02), uptime: 99.98, latencyTrend: [-2, 0, 1, -1, 0, -2] },
  { system: "SMMS", name: "Signalling & Telecom", status: "Connected", latencyMs: 112, messagesPerMin: 96, lastSync: hoursAgo(0.03), uptime: 99.92, latencyTrend: [1, 2, -1, 0, 1, 0] },
  { system: "TDMS", name: "Traction Distribution", status: "Connected", latencyMs: 61, messagesPerMin: 78, lastSync: hoursAgo(0.01), uptime: 99.99, latencyTrend: [0, -1, 0, 0, -1, 0] },
  { system: "COA", name: "Chief Operating (Ops)", status: "Live", latencyMs: 28, messagesPerMin: 214, lastSync: hoursAgo(0.0), uptime: 100, latencyTrend: [0, 0, 0, 0, 0, 0] },
  { system: "BDMS", name: "Block Data Mgmt System", status: "Awaiting Push", latencyMs: 0, messagesPerMin: 0, lastSync: null, uptime: 99.85, latencyTrend: [0, 0, 0, 0, 0, 0] }
];

// ---------------- Recent maintenance stream ----------------
export const maintenanceFeed = [
  { id: "TMS-24081", system: "TMS", asset: "TRC-14-612", title: "TRC rail fracture indexed", at: hoursAgo(0.1), urgency: 96, department: "Engineering (TMS)" },
  { id: "SMMS-31420", system: "SMMS", asset: "PM-204A", title: "Point machine throwing fault", at: hoursAgo(0.3), urgency: 91, department: "S&T (SMMS)" },
  { id: "TDMS-88210", system: "TDMS", asset: "OHE-112/14", title: "Cantilever height alert", at: hoursAgo(0.5), urgency: 88, department: "Electrical (TDMS)" },
  { id: "TMS-24620", system: "TMS", asset: "TRC-19-052", title: "RCF roughness rating logged", at: hoursAgo(0.9), urgency: 52, department: "Engineering (TMS)" },
  { id: "SMMS-31855", system: "SMMS", asset: "AXC-771B", title: "Axle counter transient", at: hoursAgo(1.4), urgency: 71, department: "S&T (SMMS)" }
];

// ---------------- Analytics: block hours granted vs utilized ----------------
export const blockHoursSeries = [
  { label: "Wk 30", granted: 41, utilized: 34.5 },
  { label: "Wk 31", granted: 38, utilized: 33.6 },
  { label: "Wk 32", granted: 44, utilized: 39.2 },
  { label: "Wk 33", granted: 40, utilized: 36.1 },
  { label: "Wk 34", granted: 36, utilized: 33.2 },
  { label: "Wk 35", granted: 43, utilized: 39.7 },
  { label: "Wk 36", granted: 42, utilized: 39.3 },
  { label: "Wk 37", granted: 42, utilized: 38.6 }
];

// ---------------- Downtime reduction trend (train-hours affected) ----------------
export const downtimeTrend = [
  { label: "Apr", delayHours: 148, logis: 222 },
  { label: "May", delayHours: 126, logis: 198 },
  { label: "Jun", delayHours: 138, logis: 176 },
  { label: "Jul", delayHours: 112, logis: 151 },
  { label: "Aug", delayHours: 91, logis: 122 }
];

// ---------------- Availability by asset class ----------------
export const availabilityByAsset = [
  { name: "Track & Geometry", availability: 99.1 },
  { name: "Signalling & Interlocking", availability: 98.7 },
  { name: "OHE & Traction", availability: 98.9 },
  { name: "Telecom & Network", availability: 99.4 },
  { name: "Bridges & Structures", availability: 99.6 }
];

// ---------------- Resource / gang allocation heatmap ----------------
// Rows = corridor sections, columns = days Mon..Sun. Values = gang-effort units (0-5).
export const resourceHeatmap = {
  sections: [
    "NDLS–CNB MAINLINE",
    "CNB–ALH SECTION",
    "ALH–NRTL TRUNK",
    "NRTL–AMH SPUR LINE"
  ],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  monthly: [
    [2, 1, 0, 3, 1, 0, 4],
    [1, 0, 2, 1, 3, 0, 5],
    [0, 3, 1, 0, 2, 4, 1],
    [3, 0, 4, 2, 0, 1, 2]
  ],
  weekly: [
    [4, 2, 1, 3, 2, 0, 5],
    [2, 1, 3, 2, 4, 1, 4],
    [1, 4, 2, 1, 3, 5, 2],
    [3, 2, 5, 3, 1, 4, 3]
  ]
};

// ---------------- Explainable-AI factor weights ----------------
export const explainableFactors = [
  {
    key: "timetable",
    name: "Passenger Timetable Gap",
    weight: 42,
    detail: "Longest clear gap on NDLS–CNB is 09:40–12:40 (No. 12564 & 12912 dispatched). AI anchors clusters inside this 3h window."
  },
  {
    key: "freight",
    name: "Freight Slot Forecast",
    weight: 27,
    detail: "Freight advisory predicts low WAG-9 intensity after 22:00; night mega-block collates 3 departments into a single 8h occupation."
  },
  {
    key: "urgency",
    name: "Defect Urgency Score",
    weight: 18,
    detail: "Weighted sum of P1 urgency (96 TMS, 91 SMMS, 88 TDMS) forces critical assets first, preventing 3 separate emergency single-line blocks."
  },
  {
    key: "resource",
    name: "Gang & Resource Collocation",
    weight: 13,
    detail: "ENG-9 and TDMS Crew-3 are co-depotted; sharing one occupation cuts resource dead-transit and supervisory overhead by 31%."
  }
];

// ---------------- Overall KPI defaults ----------------
export const defaultKpis = {
  availabilityPct: 98.5,
  blockUtilizationIndex: 0.92,
  openP1Count: 3,
  jointBlocksCount: 4,
  delayReductionPct: 35
};

// ---------------- Corridor track-section status (for linear map) ----------------
export const corridorSections = [
  { corridor: "NDLS–CNB MAINLINE", km: "1384–1437", state: "blocked", aiRecommended: false, note: "TRC fracture joint occupancy 06:10–10:10" },
  { corridor: "CNB–ALH SECTION", km: "1437–1492", state: "ai", aiRecommended: true, note: "Point machine + neutral section | recommended 09:40" },
  { corridor: "ALH–NRTL TRUNK", km: "1492–1562", state: "free", aiRecommended: false, note: "Line clear after 17:00 window" },
  { corridor: "NRTL–AMH SPUR LINE", km: "1562–1601", state: "free", aiRecommended: false, note: "Idle spur — ideal for overflow work" }
];

export const scheduleReasons = {
  A1: { headline: "3 departments → 1 occupation", savings: "-5.5 block hours", caveat: "TTSA rationale: 09:40 gap", confidence: 94 },
  A2: { headline: "Yard block absorbs signal + traction", savings: "-3.0 block hours", caveat: "Multi-discipline remote supervision", confidence: 89 },
  A3: { headline: "Traction window reused for cantilever", savings: "-2.5 block hours", caveat: "TDMS + ENG tandem gang", confidence: 92 },
  A4: { headline: "Night mega-block merges washout work", savings: "-6.5 block hours", caveat: "Freight lull 22:00–06:00", confidence: 96 }
};

// Default exported aggregate for convenience.
export default {
  defects,
  allDefects,
  manualBlocks,
  aiBlocks,
  blockSummary,
  apiSync,
  maintenanceFeed,
  blockHoursSeries,
  downtimeTrend,
  availabilityByAsset,
  resourceHeatmap,
  explainableFactors,
  corridorSections,
  defaultKpis,
  scheduleReasons
};