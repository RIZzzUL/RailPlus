// lib/constants.js
// Enterprise enums and domain constants for the AI Railway Block Planning system.

export const DEPARTMENTS = [
  "Engineering (TMS)",
  "S&T (SMMS)",
  "Electrical (TDMS)",
  "Traffic (COA)"
];

export const PRIORITY_LEVELS = ["P1 - Critical", "P2 - Urgent", "P3 - Routine"];

export const BLOCK_STATUSES = ["Uncoordinated", "AI Optimized", "Pushed to BDMS"];

// Short system-keyed aliases used across the UI (chips, sync panel, feeds).
export const DEPT_META = {
  "Engineering (TMS)": {
    system: "TMS",
    short: "TMS",
    full: "Track Management System",
    color: "emerald",
    hex: "#34d399"
  },
  "S&T (SMMS)": {
    system: "SMMS",
    short: "SMMS",
    full: "Signalling & Telecom Maintenance",
    color: "cyan",
    hex: "#22d3ee"
  },
  "Electrical (TDMS)": {
    system: "TDMS",
    short: "TDMS",
    full: "Traction Distribution Management",
    color: "amber",
    hex: "#fbbf24"
  },
  "Traffic (COA)": {
    system: "COA",
    short: "COA",
    full: "Chief Operating (Train Ops)",
    color: "rose",
    hex: "#fb7185"
  }
};

export const ASSET_CLASSES = {
  TRACK: "Track & Geometry",
  SIGNALLING: "Signalling & Interlocking",
  TELECOM: "Telecom & Network",
  OHE: "OHE & Traction",
  BRIDGE: "Bridges & Structures",
  OTHERS: "Associated Works"
};

export const CORRIDORS = [
  { id: "NDLS-CNB", name: "NDLS–CNB MAINLINE", kmFrom: 1384, kmTo: 1437 },
  { id: "CNB-ALH", name: "CNB–ALH SECTION", kmFrom: 1437, kmTo: 1492 },
  { id: "ALH-NRTL", name: "ALH–NRTL TRUNK", kmFrom: 1492, kmTo: 1562 },
  { id: "NRTL-AMH", name: "NRTL–AMH SPUR LINE", kmFrom: 1562, kmTo: 1601 }
];

export const ZONE = "Northern Railway";

export const DIVISIONS = [
  "Delhi Division",
  "Lucknow Division",
  "Allahabad Division",
  "Moradabad Division"
];