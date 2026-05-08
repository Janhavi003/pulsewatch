"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { NavItem } from "./nav-item";
import { NAV_ITEMS } from "@/constants";

interface MobileDrawerProps {
  open:     boolean;
  onClose:  () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px]",
          "bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))]",
          "flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[hsl(var(--sidebar-border))]">
          <Logo href="/" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Main
          </p>
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <NavItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              onClick={onClose}
            />
          ))}

          <div className="my-3 border-t border-[hsl(var(--sidebar-border))] mx-3" />

          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            System
          </p>
          {NAV_ITEMS.slice(5).map((item) => (
            <NavItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              onClick={onClose}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[hsl(var(--sidebar-border))] p-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-status-healthy" />
              <div className="absolute inset-0 rounded-full bg-status-healthy animate-ping opacity-50" />
            </div>
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </>
  );
}