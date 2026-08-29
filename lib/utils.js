import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind-aware className combiner (shadcn/ui standard helper).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format an ISO or Date into a compact "HH:mm" 24h time string.
export function formatTime(date) {
  if (!date) return "--:--";
  const d = date instanceof Date ? date : new Date(date);
  return d
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
    .replace("24:", "00:");
}

// Format Date into "dd MMM, HH:mm".
export function formatDateTime(date) {
  if (!date) return "--";
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

// Humanise a number of hours into "Xh YYm" or "Xd Xh".
export function formatHours(hours) {
  const h = Math.max(0, Math.round(hours));
  if (h === 0) return "0h";
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  const rem = h % 24;
  return rem ? `${d}d ${rem}h` : `${d}d`;
}

// Round any number to a fixed number of decimals without trailing zeros.
export function round(value, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}