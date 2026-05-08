"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { NavItem } from "./nav-item";
import { NAV_ITEMS } from "@/constants";

interface SidebarProps {
  collapsed:    boolean;
  onToggle:     () => void;
  onNavClick?:  () => void;
  className?:   string;
}

// Mock alert badge count — will be dynamic in Phase 6
const ALERT_BADGE: Record<string, number> = {
  "/dashboard/alerts": 3,
};

export function Sidebar({
  collapsed,
  onToggle,
  onNavClick,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex flex-col h-full",
        "bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))]",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]",
        className
      )}
    >
      {/* ── Logo ──────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-[hsl(var(--sidebar-border))]",
          "flex-shrink-0",
          collapsed ? "justify-center px-2" : "px-4"
        )}
      >
        <Logo collapsed={collapsed} href="/" />
      </div>

      {/* ── Navigation ────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5 scrollbar-hide">
        {/* Main nav label */}
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Main
          </p>
        )}

        {NAV_ITEMS.slice(0, 5).map((item) => (
          <NavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            badge={ALERT_BADGE[item.href]}
            collapsed={collapsed}
            onClick={onNavClick}
          />
        ))}

        {/* Divider */}
        <div className={cn(
          "my-3 border-t border-[hsl(var(--sidebar-border))]",
          collapsed ? "mx-2" : "mx-3"
        )} />

        {/* System label */}
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            System
          </p>
        )}

        {NAV_ITEMS.slice(5).map((item) => (
          <NavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            collapsed={collapsed}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* ── Status Footer ─────────────────────────────── */}
      <div className={cn(
        "flex-shrink-0 border-t border-[hsl(var(--sidebar-border))] p-3",
        collapsed ? "flex justify-center" : ""
      )}>
        {collapsed ? (
          <div className="w-2 h-2 rounded-full bg-status-healthy" title="System healthy" />
        ) : (
          <div className="flex items-center gap-2 px-1">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-status-healthy" />
              <div className="absolute inset-0 rounded-full bg-status-healthy animate-ping opacity-50" />
            </div>
            <span className="text-xs text-muted-foreground">All systems operational</span>
            <Zap className="w-3 h-3 text-pulse-400 ml-auto" />
          </div>
        )}
      </div>

      {/* ── Collapse Toggle ───────────────────────────── */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-3 top-20",
          "w-6 h-6 rounded-full",
          "bg-background border border-border shadow-md",
          "flex items-center justify-center",
          "text-muted-foreground hover:text-foreground",
          "hover:bg-muted transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "z-10"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}