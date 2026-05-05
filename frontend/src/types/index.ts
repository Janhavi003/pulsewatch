// =============================================
// PULSEWATCH — Global Type Definitions
// =============================================

export type ServerStatus = "healthy" | "warning" | "critical" | "unknown" | "offline";

export type MetricType = "cpu" | "memory" | "disk" | "network";

export type AlertSeverity = "info" | "warning" | "critical";

export type TimeRange = "5m" | "15m" | "30m" | "1h" | "3h" | "6h" | "12h" | "24h" | "7d";

// --- Server / Host ---
export interface Server {
  id: string;
  name: string;
  host: string;
  port?: number;
  status: ServerStatus;
  os?: string;
  uptime?: number;
  lastSeen?: string;
  tags?: string[];
}

// --- Metrics ---
export interface MetricPoint {
  timestamp: number;
  value: number;
}

export interface CpuMetrics {
  current: number;
  history: MetricPoint[];
  cores?: number;
  model?: string;
}

export interface MemoryMetrics {
  used: number;
  total: number;
  percent: number;
  history: MetricPoint[];
}

export interface DiskMetrics {
  used: number;
  total: number;
  percent: number;
  mount: string;
  history: MetricPoint[];
}

export interface NetworkMetrics {
  bytesIn: number;
  bytesOut: number;
  packetsIn?: number;
  packetsOut?: number;
  history: MetricPoint[];
}

export interface ServerMetrics {
  serverId: string;
  timestamp: string;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics[];
  network: NetworkMetrics;
  uptime: number;
}

// --- Alerts ---
export interface AlertRule {
  id: string;
  name: string;
  metric: MetricType;
  condition: "gt" | "lt" | "gte" | "lte" | "eq";
  threshold: number;
  severity: AlertSeverity;
  serverId?: string;
  enabled: boolean;
  notifyEmail?: string;
  createdAt: string;
}

export interface ActiveAlert {
  id: string;
  ruleId: string;
  ruleName: string;
  severity: AlertSeverity;
  message: string;
  value: number;
  threshold: number;
  serverId: string;
  serverName: string;
  firedAt: string;
  resolvedAt?: string;
  status: "firing" | "resolved";
}

// --- Logs ---
export interface LogEntry {
  id: string;
  timestamp: string;
  level: "trace" | "debug" | "info" | "warn" | "error" | "fatal";
  message: string;
  source: string;
  serverId: string;
  labels?: Record<string, string>;
}

// --- User / Auth ---
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  provider?: "github" | "google" | "email";
  createdAt: string;
}

// --- Dashboard ---
export interface DashboardSettings {
  theme: "dark" | "light" | "system";
  refreshInterval: number;
  defaultTimeRange: TimeRange;
  defaultServerId?: string;
}

// --- API Responses ---
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
  code: string;
  statusCode: number;
  timestamp: string;
}

// --- Navigation ---
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}