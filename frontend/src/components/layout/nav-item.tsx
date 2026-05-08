"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  Activity,
  ScrollText,
  Bell,
  Settings,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Server,
  Activity,
  ScrollText,
  Bell,
  Settings,
};

interface NavItemProps {
  title:     string;
  href:      string;
  icon:      string;
  badge?:    number;
  collapsed?: boolean;
  onClick?:  () => void;
}

export function NavItem({
  title,
  href,
  icon,
  badge,
  collapsed = false,
  onClick,
}: NavItemProps) {
  const pathname  = usePathname();
  const Icon      = ICON_MAP[icon] ?? LayoutDashboard;
  const isActive  = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5",
        "text-sm font-medium transition-all duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/50",
        isActive
          ? "bg-primary/10 text-primary shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
      )}

      {/* Icon */}
      <Icon
        className={cn(
          "flex-shrink-0 transition-all duration-200",
          collapsed ? "w-5 h-5" : "w-4 h-4",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 truncate">{title}</span>
      )}

      {/* Badge */}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span
          className={cn(
            "flex items-center justify-center",
            "min-w-[18px] h-[18px] px-1 rounded-full",
            "text-[10px] font-bold",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      {/* Collapsed tooltip */}
      {collapsed && (
        <div
          className={cn(
            "absolute left-full ml-3 px-2.5 py-1.5 rounded-md",
            "bg-popover text-popover-foreground text-xs font-medium",
            "border border-border shadow-lg",
            "opacity-0 pointer-events-none",
            "group-hover:opacity-100 group-hover:pointer-events-auto",
            "transition-opacity duration-150 whitespace-nowrap z-50"
          )}
        >
          {title}
          {badge !== undefined && badge > 0 && (
            <span className="ml-1.5 text-destructive">({badge})</span>
          )}
        </div>
      )}
    </Link>
  );
}