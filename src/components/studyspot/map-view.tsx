"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { StudySpaceLive } from "@/lib/study-spaces";

const MapViewInner = dynamic(
  () => import("./map-view-inner").then((m) => m.MapViewInner),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <div className="h-72 w-full animate-pulse rounded-2xl bg-muted" />
      </div>
    ),
  }
);

export function MapView(props: {
  spaces: StudySpaceLive[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onOpen: (id: string) => void;
}) {
  return <MapViewInner {...props} />;
}
