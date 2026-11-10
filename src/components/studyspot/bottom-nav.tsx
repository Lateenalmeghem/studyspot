"use client";

import { Home, Map, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewKey = "home" | "map" | "settings";

const ITEMS: { key: ViewKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "map", label: "Map", icon: Map },
  { key: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: ViewKey;
  onChange: (v: ViewKey) => void;
}) {
  return (
    <nav className="glass z-30 border-t border-border bg-background/85">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                  isActive && "bg-primary/10"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
