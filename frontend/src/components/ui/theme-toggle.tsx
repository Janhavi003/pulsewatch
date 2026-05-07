"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "full";
}

export function ThemeToggle({
  className,
  variant = "icon",
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-md bg-muted animate-pulse",
          className
        )}
      />
    );
  }

  if (variant === "full") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 rounded-lg p-1 bg-muted",
          className
        )}
      >
        {(
          [
            { value: "light",  icon: Sun,     label: "Light"  },
            { value: "system", icon: Monitor,  label: "System" },
            { value: "dark",   icon: Moon,    label: "Dark"   },
          ] as const
        ).map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm",
              "transition-all duration-200",
              theme === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={`Set ${label} theme`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className={cn(
        "w-9 h-9 rounded-md flex items-center justify-center",
        "bg-muted hover:bg-accent transition-colors duration-200",
        "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun  className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}