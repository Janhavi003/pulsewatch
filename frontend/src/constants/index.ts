// =============================================
// PULSEWATCH — App Constants
// =============================================

export const APP_NAME = "PulseWatch";
export const APP_TAGLINE = "Monitor everything. Miss nothing.";
export const APP_VERSION = "1.0.0";

export const REFRESH_INTERVALS = [
  { label: "10s", value: 10000 },
  { label: "30s", value: 30000 },
  { label: "1m",  value: 60000 },
  { label: "5m",  value: 300000 },
] as const;

export const DEFAULT_REFRESH_INTERVAL = 30000;

export const TIME_RANGES = [
  { label: "Last 5 min",  value: "5m"  },
  { label: "Last 15 min", value: "15m" },
  { label: "Last 30 min", value: "30m" },
  { label: "Last 1 hour", value: "1h"  },
  { label: "Last 3 hours",value: "3h"  },
  { label: "Last 6 hours",value: "6h"  },
  { label: "Last 12 hours",value: "12h"},
  { label: "Last 24 hours",value: "24h"},
  { label: "Last 7 days", value: "7d"  },
] as const;

export const STATUS_COLORS = {
  healthy:  "text-green-500",
  warning:  "text-yellow-500",
  critical: "text-red-500",
  unknown:  "text-gray-500",
  offline:  "text-gray-400",
  info:     "text-blue-500",
} as const;

export const STATUS_BG_COLORS = {
  healthy:  "bg-green-500/10 text-green-500 border-green-500/20",
  warning:  "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  unknown:  "bg-gray-500/10 text-gray-500 border-gray-500/20",
  offline:  "bg-gray-500/10 text-gray-400 border-gray-500/20",
  info:     "bg-blue-500/10 text-blue-500 border-blue-500/20",
} as const;

export const METRIC_THRESHOLDS = {
  cpu:    { warning: 70, critical: 90 },
  memory: { warning: 75, critical: 90 },
  disk:   { warning: 80, critical: 95 },
} as const;

export const NAV_ITEMS = [
  { title: "Overview",    href: "/dashboard",           icon: "LayoutDashboard" },
  { title: "Servers",     href: "/dashboard/servers",   icon: "Server" },
  { title: "Metrics",     href: "/dashboard/metrics",   icon: "Activity" },
  { title: "Logs",        href: "/dashboard/logs",      icon: "ScrollText" },
  { title: "Alerts",      href: "/dashboard/alerts",    icon: "Bell" },
  { title: "Settings",    href: "/dashboard/settings",  icon: "Settings" },
] as const;