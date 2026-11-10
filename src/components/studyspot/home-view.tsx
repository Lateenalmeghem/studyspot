"use client";

import * as React from "react";
import { Search, X, SlidersHorizontal, RefreshCw, Armchair } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { StudySpaceLive, StudyType } from "@/lib/study-spaces";
import { StudySpaceCard } from "@/components/studyspot/study-space-card";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/studyspot/state-views";

type TypeFilter = "all" | StudyType;

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "quiet", label: "Quiet" },
  { key: "group", label: "Group" },
  { key: "general", label: "General" },
];

export function HomeView({
  spaces,
  loading,
  error,
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  availableOnly,
  setAvailableOnly,
  onRetry,
  onRefresh,
  refreshing,
  lastUpdated,
  onOpen,
}: {
  spaces: StudySpaceLive[];
  loading: boolean;
  error: boolean;
  query: string;
  setQuery: (v: string) => void;
  typeFilter: TypeFilter;
  setTypeFilter: (v: TypeFilter) => void;
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  onRetry: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  lastUpdated: string | null;
  onOpen: (id: string) => void;
}) {
  const totalAvailable = spaces
    .filter((s) => s.status !== "offline")
    .reduce((sum, s) => sum + s.available, 0);
  const totalCapacity = spaces
    .filter((s) => s.status !== "offline")
    .reduce((sum, s) => sum + s.capacity, 0);
  const openNow = spaces.filter((s) => s.status !== "offline").length;

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setAvailableOnly(false);
  };

  const hasFilters =
    query.trim() !== "" || typeFilter !== "all" || availableOnly;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-3d">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search study areas..."
              className="pl-9 pr-9"
              aria-label="Search study areas"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Filters">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Study type</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TYPE_FILTERS.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setTypeFilter(f.key)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          typeFilter === f.key
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <Label htmlFor="avail-only" className="text-sm">
                    Available only
                  </Label>
                  <Switch
                    id="avail-only"
                    checked={availableOnly}
                    onCheckedChange={setAvailableOnly}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto scroll-thin pb-1">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setTypeFilter(f.key)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                typeFilter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <SummaryStat
          icon={<Armchair className="h-4 w-4" />}
          value={totalAvailable}
          label="Seats free"
          accent="text-emerald-600 dark:text-emerald-400"
        />
        <SummaryStat
          value={openNow}
          label="Areas open"
          accent="text-primary"
        />
        <SummaryStat
          value={totalCapacity}
          label="Total seats"
          accent="text-muted-foreground"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Campus Study Areas
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing}
          className="text-muted-foreground"
        >
          <RefreshCw
            className={cn("mr-1.5 h-3.5 w-3.5", refreshing && "animate-spin")}
          />
          Refresh
        </Button>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState onRetry={onRetry} />
      ) : spaces.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <div className="space-y-3">
          {spaces.map((s, i) => (
            <StudySpaceCard key={s.id} space={s} onOpen={onOpen} index={i} />
          ))}
        </div>
      )}

      {lastUpdated && !loading && !error && (
        <p className="px-1 text-center text-xs text-muted-foreground">
          Prince Sultan University · sample occupancy · last sync{" "}
          {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}

function SummaryStat({
  icon,
  value,
  label,
  accent,
}: {
  icon?: React.ReactNode;
  value: number;
  label: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center shadow-3d transition-transform hover:-translate-y-0.5">
      <div
        className={cn(
          "flex items-center justify-center gap-1 text-xl font-bold tabular-nums",
          accent
        )}
      >
        {icon}
        {value}
      </div>
      <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
