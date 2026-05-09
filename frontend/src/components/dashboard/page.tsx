import React from "react";
import {
  Activity,
  Server,
  Bell,
  ScrollText,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Quick stat card — will be replaced with real data in Phase 6
interface StatCardProps {
  title:  string;
  value:  string;
  sub:    string;
  trend?: "up" | "down" | "flat";
  status: "healthy" | "warning" | "critical" | "info";
  icon:   React.ReactNode;
}

function StatCard({ title, value, sub, trend, status, icon }: StatCardProps) {
  const statusStyles = {
    healthy:  "border-green-500/20  bg-green-500/5",
    warning:  "border-yellow-500/20 bg-yellow-500/5",
    critical: "border-red-500/20    bg-red-500/5",
    info:     "border-blue-500/20   bg-blue-500/5",
  };

  const trendIcon =
    trend === "up"   ? <TrendingUp   className="w-3.5 h-3.5 text-status-critical" /> :
    trend === "down" ? <TrendingDown className="w-3.5 h-3.5 text-status-healthy"  /> :
                       <Minus        className="w-3.5 h-3.5 text-muted-foreground" />;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5",
        statusStyles[status]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-background/60">
          {icon}
        </div>
        {trend && trendIcon}
      </div>
      <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
      <div className="text-sm font-medium text-foreground/80">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            System health at a glance — last updated just now
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border">
          <div className="w-2 h-2 rounded-full bg-status-healthy animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Live monitoring
          </span>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Servers Online"
          value="4 / 4"
          sub="All servers reporting"
          status="healthy"
          trend="flat"
          icon={<Server className="w-4 h-4 text-green-500" />}
        />
        <StatCard
          title="Avg CPU Usage"
          value="34%"
          sub="Across all servers"
          status="healthy"
          trend="up"
          icon={<Activity className="w-4 h-4 text-pulse-400" />}
        />
        <StatCard
          title="Active Alerts"
          value="3"
          sub="2 warnings · 1 critical"
          status="warning"
          trend="up"
          icon={<Bell className="w-4 h-4 text-yellow-500" />}
        />
        <StatCard
          title="Log Events"
          value="1,284"
          sub="Last hour · 12 errors"
          status="info"
          trend="flat"
          icon={<ScrollText className="w-4 h-4 text-blue-500" />}
        />
      </div>

      {/* ── Chart Placeholder Grid ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {["CPU Usage", "Memory Usage", "Network I/O", "Disk Usage"].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-md bg-muted">
                Last 1h
              </span>
            </div>
            {/* Chart placeholder — replaced with ECharts in Phase 6 */}
            <div className="h-[160px] rounded-lg bg-muted/40 flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground/50">
                  Charts coming in Phase 6
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Server List Placeholder ───────────────────── */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Server Status
        </h3>
        <div className="space-y-2">
          {[
            { name: "WIN-PROD-01", ip: "192.168.1.10", cpu: 34, status: "healthy"  },
            { name: "WIN-PROD-02", ip: "192.168.1.11", cpu: 78, status: "warning"  },
            { name: "WIN-PROD-03", ip: "192.168.1.12", cpu: 12, status: "healthy"  },
            { name: "WIN-PROD-04", ip: "192.168.1.13", cpu: 91, status: "critical" },
          ].map((server) => (
            <div
              key={server.name}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  server.status === "healthy"  && "bg-status-healthy",
                  server.status === "warning"  && "bg-status-warning",
                  server.status === "critical" && "bg-status-critical"
                )}
              />
              <span className="text-sm font-medium text-foreground flex-1">
                {server.name}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {server.ip}
              </span>
              <div className="flex items-center gap-2 w-32">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      server.cpu < 70 ? "bg-status-healthy"  :
                      server.cpu < 90 ? "bg-status-warning"  :
                                        "bg-status-critical"
                    )}
                    style={{ width: `${server.cpu}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                  {server.cpu}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}