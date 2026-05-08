"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  RefreshCw,
  Bell,
  ChevronRight,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_ITEMS, TIME_RANGES, REFRESH_INTERVALS } from "@/constants";

interface TopbarProps {
  onMenuClick: () => void;
  className?:  string;
}

// Build breadcrumb from pathname
function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href  = "/" + segments.slice(0, index + 1).join("/");
    const match = NAV_ITEMS.find((item) => item.href === href);
    const label = match?.title ?? segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href, isLast: index === segments.length - 1 };
  });
}

export function Topbar({ onMenuClick, className }: TopbarProps) {
  const breadcrumbs        = useBreadcrumbs();
  const [isLive, setIsLive] = React.useState(true);
  const [refreshInterval, setRefreshInterval] = React.useState(30000);
  const [timeRange, setTimeRange] = React.useState("1h");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastRefreshed, setLastRefreshed] = React.useState(new Date());

  // Simulate refresh animation
  const handleRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setLastRefreshed(new Date());
    setTimeout(() => setIsRefreshing(false), 600);
  }, []);

  // Auto-refresh timer display
  const [countdown, setCountdown] = React.useState(refreshInterval / 1000);

  React.useEffect(() => {
    if (!isLive) return;
    setCountdown(refreshInterval / 1000);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return refreshInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive, refreshInterval, handleRefresh]);

  return (
    <header
      className={cn(
        "h-16 flex items-center gap-3 px-4",
        "bg-background/80 backdrop-blur-sm",
        "border-b border-border",
        "sticky top-0 z-30",
        className
      )}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── Breadcrumbs ───────────────────────────────── */}
      <nav className="flex items-center gap-1.5 flex-1 min-w-0">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm truncate",
                crumb.isLast
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground cursor-pointer"
              )}
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* ── Controls ──────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Time range selector */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={cn(
            "h-8 px-2 rounded-md text-xs font-medium",
            "bg-muted border border-border",
            "text-foreground cursor-pointer",
            "focus:outline-none focus:ring-1 focus:ring-primary/50",
            "hidden sm:block"
          )}
          aria-label="Time range"
        >
          {TIME_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>

        {/* Refresh interval + live toggle */}
        <div className="hidden sm:flex items-center gap-1 h-8 rounded-md border border-border bg-muted px-2">
          <button
            onClick={() => setIsLive((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium transition-colors",
              isLive ? "text-status-healthy" : "text-muted-foreground"
            )}
            aria-label={isLive ? "Pause live updates" : "Resume live updates"}
          >
            {isLive ? (
              <Wifi className="w-3.5 h-3.5" />
            ) : (
              <WifiOff className="w-3.5 h-3.5" />
            )}
            <span>{isLive ? `${countdown}s` : "Paused"}</span>
          </button>

          <div className="w-px h-4 bg-border mx-1" />

          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="bg-transparent text-xs text-muted-foreground focus:outline-none cursor-pointer"
            aria-label="Refresh interval"
          >
            {REFRESH_INTERVALS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Manual refresh button */}
        <button
          onClick={handleRefresh}
          className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center",
            "bg-muted border border-border",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent transition-colors duration-150"
          )}
          aria-label="Refresh now"
        >
          <RefreshCw
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-500",
              isRefreshing && "animate-spin"
            )}
          />
        </button>

        {/* Alerts bell */}
        <button
          className={cn(
            "relative w-8 h-8 rounded-md flex items-center justify-center",
            "bg-muted border border-border",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent transition-colors duration-150"
          )}
          aria-label="View alerts"
        >
          <Bell className="w-3.5 h-3.5" />
          {/* Alert badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[9px] text-white font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Theme toggle */}
        <ThemeToggle className="border border-border" />

        {/* User avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pulse-400 to-pulse-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer flex-shrink-0">
          U
        </div>
      </div>
    </header>
  );
}