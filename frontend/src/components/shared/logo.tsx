import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ collapsed = false, className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 select-none group",
        className
      )}
    >
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            "flex items-center justify-center rounded-xl",
            "bg-gradient-to-br from-pulse-400 to-pulse-600",
            "shadow-lg shadow-pulse-500/25 group-hover:shadow-pulse-500/40",
            "transition-all duration-300",
            collapsed ? "w-8 h-8" : "w-9 h-9"
          )}
        >
          {/* Pulse icon — two arcs suggesting a heartbeat/signal */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,12 6,12 8,6 10,18 12,10 14,14 16,12 22,12" />
          </svg>
        </div>
        {/* Live indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-status-healthy border-2 border-background">
          <span className="absolute inset-0 rounded-full bg-status-healthy animate-ping opacity-75" />
        </span>
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold text-foreground tracking-tight">
            Pulse
            <span className="text-pulse-400">Watch</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
            Observability
          </span>
        </div>
      )}
    </Link>
  );
}