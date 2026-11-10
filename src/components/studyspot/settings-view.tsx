"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Monitor,
  RefreshCw,
  Info,
  GraduationCap,
  Database,
  Github,
  Check,
  MapPin,
  LogOut,
  UserCircle,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/studyspot/tilt-card";
import { useAuth } from "@/components/studyspot/auth-context";

type RefreshInterval = 0 | 15 | 30 | 60;

export function SettingsView({
  refreshInterval,
  onRefreshIntervalChange,
}: {
  refreshInterval: RefreshInterval;
  onRefreshIntervalChange: (v: RefreshInterval) => void;
}) {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const intervals: { key: RefreshInterval; label: string }[] = [
    { key: 0, label: "Off" },
    { key: 15, label: "15s" },
    { key: 30, label: "30s" },
    { key: 60, label: "60s" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize how StudySpot looks and refreshes.
        </p>
      </div>

      {user && (
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-3d">
          <div className="orb -right-6 -top-6 h-24 w-24 bg-primary/30" />
          <div className="relative flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-lg font-bold text-primary-foreground shadow-3d">
              {user.name.charAt(0).toUpperCase()}
              <span className="pulse-ring absolute inset-0 rounded-2xl" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                {user.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="shine-sweep mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card p-4 shadow-3d">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {mounted && theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Appearance</h3>
            <p className="text-xs text-muted-foreground">
              Choose your theme — previews update live
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          <ThemePreviewCard
            active={mounted && theme === "light"}
            onClick={() => setTheme("light")}
            label="Light"
            variant="light"
          />
          <ThemePreviewCard
            active={mounted && theme === "dark"}
            onClick={() => setTheme("dark")}
            label="Dark"
            variant="dark"
          />
          <ThemePreviewCard
            active={mounted && theme === "system"}
            onClick={() => setTheme("system")}
            label="System"
            variant="system"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-3d">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <RefreshCw className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Auto-refresh</h3>
            <p className="text-xs text-muted-foreground">
              How often availability updates
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {intervals.map((i) => (
            <button
              key={i.key}
              type="button"
              onClick={() => onRefreshIntervalChange(i.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                refreshInterval === i.key
                  ? "border-primary bg-primary text-primary-foreground shadow-3d"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {i.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-3d">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Map &amp; data</h3>
            <p className="text-xs text-muted-foreground">
              Real GPS maps · sample occupancy
            </p>
          </div>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Campus</dt>
            <dd className="font-medium">Prince Sultan University</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">City</dt>
            <dd className="font-medium">Riyadh, Saudi Arabia</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Map provider</dt>
            <dd className="font-medium">OpenStreetMap / Esri</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">GPS coordinates</dt>
            <dd className="font-medium">Real lat / lng</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Live occupancy</dt>
            <dd className="font-medium">Sample estimates</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-3d">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">About</h3>
            <p className="text-xs text-muted-foreground">Project information</p>
          </div>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4" /> App
            </dt>
            <dd className="font-medium">StudySpot MVP</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Database className="h-4 w-4" /> Data source
            </dt>
            <dd className="font-medium">PSU buildings · sample occupancy</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Github className="h-4 w-4" /> Version
            </dt>
            <dd className="font-medium">Phase 3 · 1.0.0</dd>
          </div>
        </dl>
        <Separator className="my-3" />
        <div className="flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            StudySpot helps students find available study spaces on campus.
            Occupancy figures are generated from a labelled demo dataset and are
            not connected to a live university sensor system.
          </span>
        </div>
      </section>

      <p className="px-1 text-center text-xs text-muted-foreground">
        Built with Next.js · Phase 3 Development &amp; Build
      </p>
    </div>
  );
}

function ThemePreviewCard({
  active,
  onClick,
  label,
  variant,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  variant: "light" | "dark" | "system";
}) {
  return (
    <TiltCard max={10} scale={1.03} className="h-full">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "relative block w-full overflow-hidden rounded-xl border-2 p-0 text-left transition-all",
          active
            ? "border-primary shadow-3d-lg -translate-y-0.5"
            : "border-border hover:border-primary/40"
        )}
      >
        <ThemePreview variant={variant} />

        <div
          className={cn(
            "flex items-center justify-between gap-1 px-2.5 py-2",
            variant === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-800"
          )}
        >
          <span className="flex items-center gap-1 text-xs font-semibold">
            {variant === "light" && <Sun className="h-3.5 w-3.5 text-amber-500" />}
            {variant === "dark" && <Moon className="h-3.5 w-3.5 text-indigo-300" />}
            {variant === "system" && (
              <Monitor className="h-3.5 w-3.5 text-sky-500" />
            )}
            {label}
          </span>
          {active && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" />
            </span>
          )}
        </div>
      </button>
    </TiltCard>
  );
}

function ThemePreview({ variant }: { variant: "light" | "dark" | "system" }) {
  const isDark = variant === "dark";
  const isSystem = variant === "system";

  const bg = isDark ? "#0f172a" : isSystem ? "#e2e8f0" : "#f8fafc";
  const cardBg = isDark ? "#1e293b" : isSystem ? "#cbd5e1" : "#ffffff";
  const headerBg = isDark ? "#312e81" : isSystem ? "#6366f1" : "#1e2a78";
  const accent = isDark ? "#34d399" : isSystem ? "#6366f1" : "#10b981";
  const muted = isDark ? "#475569" : isSystem ? "#64748b" : "#cbd5e1";
  const text = isDark ? "#e2e8f0" : isSystem ? "#334155" : "#1e293b";

  return (
    <div
      className="relative h-20 w-full overflow-hidden p-2"
      style={{ background: bg }}
    >
      <div
        className="absolute inset-x-0 top-0 h-5"
        style={{
          background: `linear-gradient(135deg, ${headerBg}, ${accent})`,
          opacity: 0.95,
        }}
      />
      <div className="relative mt-4 space-y-1.5">
        <div
          className="h-1.5 w-2/3 rounded-full"
          style={{ background: text, opacity: 0.85 }}
        />
        <div className="flex gap-1">
          <div
            className="h-5 w-5 rounded-md"
            style={{ background: accent, opacity: 0.9 }}
          />
          <div className="flex-1 space-y-1 pt-0.5">
            <div
              className="h-1.5 w-full rounded-full"
              style={{ background: cardBg }}
            />
            <div className="h-1 w-1/2 rounded-full" style={{ background: muted }} />
          </div>
        </div>
        <div className="flex gap-1">
          <div
            className="h-5 w-5 rounded-md"
            style={{ background: isDark ? "#334155" : "#e2e8f0" }}
          />
          <div className="flex-1 space-y-1 pt-0.5">
            <div className="h-1.5 w-full rounded-full" style={{ background: cardBg }} />
            <div className="h-1 w-2/5 rounded-full" style={{ background: muted }} />
          </div>
        </div>
      </div>
      {isSystem && (
        <div className="absolute bottom-1 right-1.5 flex h-4 w-7 items-center justify-center rounded-full bg-zinc-900 text-[8px] font-bold text-white">
          ½
        </div>
      )}
    </div>
  );
}
