"use client";

import {
  ArrowLeft,
  Building2,
  Clock,
  Layers,
  Users,
  Armchair,
  CheckCircle2,
  Info,
  Navigation,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  formatLastUpdated,
  STATUS_META,
  type StudySpaceLive,
} from "@/lib/study-spaces";
import { StatusPill } from "@/components/studyspot/status-pill";
import { TypeBadge } from "@/components/studyspot/type-badge";
import { AvailabilityRing } from "@/components/studyspot/availability-ring";

export function DetailView({
  space,
  onBack,
}: {
  space: StudySpaceLive;
  onBack: () => void;
}) {
  const meta = STATUS_META[space.status];

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="-ml-2 text-muted-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back
      </Button>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-3d-lg">
        <div className="brand-gradient relative px-5 py-5 text-white">
          <div className="orb animate-float-slow -right-6 -top-6 h-32 w-32 bg-sky-400/40" />
          <div className="orb animate-float-slower -bottom-8 left-6 h-28 w-28 bg-indigo-400/30" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-bold leading-tight sm:text-2xl">
                {space.name}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                <Building2 className="h-4 w-4" />
                {space.building} · {space.floor}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <TypeBadge type={space.type} className="border-white/25 bg-white/15 text-white" />
                <StatusPill status={space.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted/40 p-4">
            <AvailabilityRing
              available={space.available}
              capacity={space.capacity}
              status={space.status}
              size={120}
            />
            <p className="text-center text-xs text-muted-foreground">
              {space.status === "offline"
                ? "No live data"
                : `${space.available} of ${space.capacity} seats free`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatBox
              icon={<Armchair className="h-4 w-4" />}
              label="Available"
              value={space.status === "offline" ? "—" : space.available}
              accent="text-emerald-600 dark:text-emerald-400"
            />
            <StatBox
              icon={<Users className="h-4 w-4" />}
              label="Occupied"
              value={space.status === "offline" ? "—" : space.occupied}
              accent="text-amber-600 dark:text-amber-400"
            />
            <StatBox
              icon={<Layers className="h-4 w-4" />}
              label="Capacity"
              value={space.capacity}
              accent="text-foreground"
            />
            <StatBox
              icon={<span className="text-sm font-bold">%</span>}
              label="Occupied"
              value={space.status === "offline" ? "—" : `${space.occupancyRate}%`}
              accent={meta.text}
            />
          </div>
        </div>

        <div className="px-5 pb-2">
          <Separator />
        </div>

        <div className="space-y-4 px-5 pb-5 pt-3">
          <div>
            <h3 className="text-sm font-semibold">About this space</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {space.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow icon={<Clock className="h-4 w-4" />} label="Hours" value={space.hours} />
            <InfoRow
              icon={<Building2 className="h-4 w-4" />}
              label="Building"
              value={`${space.building}, ${space.floor}`}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Amenities</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {space.amenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {a}
                </span>
              ))}
            </div>
          </div>

          {space.status === "offline" ? (
            <div className="flex items-start gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-3 text-xs text-muted-foreground dark:border-zinc-700 dark:bg-zinc-900/40">
              <PowerOff className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Live occupancy data is unavailable for this area right now. The
                figure shown is not real-time.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Last updated {formatLastUpdated(space.lastUpdated)}
              </span>
              <span className={cn("font-semibold", meta.text)}>
                {meta.label}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="flex-1" disabled={space.status === "offline"}>
          <Navigation className="mr-2 h-4 w-4" />
          {space.status === "full"
            ? "Join waitlist"
            : space.status === "offline"
              ? "Directions only"
              : "Get directions"}
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Save space
        </Button>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Location and building data reflect Prince Sultan University, Riyadh.
          Occupancy figures are sample estimates for demonstration and are not
          connected to a live PSU sensor system.
        </span>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className={cn("mt-1 text-xl font-bold tabular-nums", accent)}>
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
