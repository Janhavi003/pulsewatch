import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME, APP_TAGLINE } from "@/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        {/* Logo placeholder */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold gradient-text">{APP_NAME}</span>
        </div>

        <h1 className="text-4xl font-bold text-foreground">
          Foundation Ready ✅
        </h1>
        <p className="text-muted-foreground text-lg max-w-md">
          {APP_TAGLINE}
        </p>

        {/* Theme toggle test */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-sm text-muted-foreground">Theme switcher:</p>
          <ThemeToggle variant="full" />
        </div>

        {/* Design system preview */}
        <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
          {(
            [
              { label: "Healthy",  color: "bg-status-healthy"  },
              { label: "Warning",  color: "bg-status-warning"  },
              { label: "Critical", color: "bg-status-critical" },
              { label: "Unknown",  color: "bg-status-unknown"  },
            ] as const
          ).map(({ label, color }) => (
            <div key={label} className="metric-card flex items-center gap-2">
              <span className={`status-dot ${color}`} />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Phase 2 — Landing page coming next
        </p>
      </div>
    </main>
  );
}