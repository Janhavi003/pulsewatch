export const APP_NAME = "PulseWatch";

export const API_PREFIX = "/api";
export const API_VERSION = "v1";

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: "Too many requests from this IP, please try again later.",
};

export const CORS_OPTIONS = {
  credentials: true,

  // IMPORTANT: no `as const` here
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],
};

export const PROMETHEUS_QUERIES = {
  cpuUsage:
    `100 - (avg by (instance) (irate(windows_cpu_time_total{mode="idle"}[5m])) * 100)`,

  memoryUsage:
    `100 - ((windows_memory_available_bytes / windows_memory_physical_total) * 100)`,

  diskUsage:
    `100 - ((windows_logical_disk_free_bytes{volume!="HarddiskVolume"} / windows_logical_disk_size_bytes{volume!="HarddiskVolume"}) * 100)`,

  networkIn:
    `irate(windows_net_bytes_received_total[5m])`,

  networkOut:
    `irate(windows_net_bytes_sent_total[5m])`,

  uptime:
    `windows_system_system_up_time`,
};