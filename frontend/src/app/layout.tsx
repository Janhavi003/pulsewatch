"use client";

import React from "react";
import { Sidebar }      from "@/components/layout/sidebar";
import { Topbar }       from "@/components/layout/topbar";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { cn }           from "@/lib/utils";

// Persist collapsed state in localStorage
function useSidebarState() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mounted,   setMounted]   = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("pulsewatch-sidebar-collapsed");
    if (stored !== null) setCollapsed(stored === "true");
  }, []);

  const toggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("pulsewatch-sidebar-collapsed", String(next));
      return next;
    });
  }, []);

  return { collapsed: mounted ? collapsed : false, toggle };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed, toggle } = useSidebarState();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Desktop Sidebar ──────────────────────────── */}
      <Sidebar
        collapsed={collapsed}
        onToggle={toggle}
        className="hidden md:flex flex-shrink-0"
      />

      {/* ── Mobile Drawer ────────────────────────────── */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* ── Main Content Area ────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <Topbar onMenuClick={() => setDrawerOpen(true)} />

        {/* Page content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden",
            "bg-background"
          )}
        >
          {/* Inner padding container */}
          <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        {/* ── Status Bar ──────────────────────────────── */}
        <footer className="flex-shrink-0 h-6 flex items-center px-4 gap-4 border-t border-border bg-background/80">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-status-healthy" />
            <span className="text-[10px] text-muted-foreground">Connected</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <span className="text-[10px] text-muted-foreground">
            Prometheus · Loki · Alertmanager
          </span>
          <div className="ml-auto text-[10px] text-muted-foreground">
            PulseWatch v1.0.0
          </div>
        </footer>
      </div>
    </div>
  );
}