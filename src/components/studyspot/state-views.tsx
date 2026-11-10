"use client";

import { AlertTriangle, SearchX, RefreshCw, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function StudySpaceCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <StudySpaceCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-rose-300 bg-rose-50/60 p-10 text-center dark:border-rose-900 dark:bg-rose-950/30">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <div>
        <h3 className="text-base font-semibold">Couldn’t load study spaces</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching availability. Please try again.
        </p>
      </div>
      <Button onClick={onRetry} variant="default" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
  );
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="h-7 w-7" />
      </div>
      <div>
        <h3 className="text-base font-semibold">No study spaces found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters to find a place to study.
        </p>
      </div>
      <Button onClick={onClear} variant="outline" size="sm">
        Clear filters
      </Button>
    </div>
  );
}

export function OfflineState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MapPinOff className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-sm font-semibold">Live data unavailable</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          This area is currently offline. Availability will return once the
          sensor reconnects.
        </p>
      </div>
    </div>
  );
}
