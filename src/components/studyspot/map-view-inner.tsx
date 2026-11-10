"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";
import { MapPin, Crosshair, Layers as LayersIcon } from "lucide-react";
import {
  CAMPUS_CENTER,
  CAMPUS_NAME,
  STATUS_META,
  type StudySpaceLive,
  type AvailabilityStatus,
} from "@/lib/study-spaces";
import { LoadingState, ErrorState, OfflineState } from "@/components/studyspot/state-views";

const PIN_COLOR: Record<AvailabilityStatus, string> = {
  available: "#10b981",
  limited: "#f59e0b",
  full: "#f43f5e",
  offline: "#94a3b8",
};

function buildIcon(space: StudySpaceLive): L.DivIcon {
  const color = PIN_COLOR[space.status];
  const label = space.status === "offline" ? "—" : String(space.available);
  const html = `
    <div class="pin-3d" style="position:relative;display:flex;flex-direction:column;align-items:center;transform:translateY(-2px);">
      <div style="
        display:flex;align-items:center;justify-content:center;
        min-width:30px;height:30px;padding:0 6px;
        border-radius:9999px;background:${color};color:#fff;
        font-size:12px;font-weight:800;
        border:3px solid #fff;
        box-shadow:0 4px 10px rgba(15,23,42,0.35);
      ">${label}</div>
      <div style="width:2px;height:8px;background:rgba(15,23,42,0.45);margin-top:-2px;border-radius:0 0 2px 2px;"></div>
      <div style="width:10px;height:10px;border-radius:9999px;background:radial-gradient(circle, rgba(15,23,42,0.4), rgba(15,23,42,0));margin-top:-2px;filter:blur(1px);"></div>
    </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [30, 44],
    iconAnchor: [15, 44],
    popupAnchor: [0, -42],
    tooltipAnchor: [0, -40],
  });
}

export function MapViewInner({
  spaces,
  loading,
  error,
  onRetry,
  onOpen,
}: {
  spaces: StudySpaceLive[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onOpen: (id: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const layerRef = React.useRef<L.LayerGroup | null>(null);
  const tileRef = React.useRef<L.TileLayer | null>(null);
  const [ready, setReady] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: CAMPUS_CENTER,
      zoom: 16,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true,
    });
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      tileRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tile = L.tileLayer(url, {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    });
    tile.addTo(map);
    tile.bringToBack();
    tileRef.current = tile;
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tilePane = container.querySelector<HTMLElement>(".leaflet-tile-pane");
    if (!tilePane) return;
    tilePane.style.filter = isDark
      ? "invert(1) hue-rotate(180deg) brightness(0.92) contrast(0.92) saturate(0.8)"
      : "none";
  }, [isDark, ready]);

  React.useEffect(() => {
    const layer = layerRef.current;
    const map = mapRef.current;
    if (!layer || !map || !ready) return;
    layer.clearLayers();
    if (spaces.length === 0) return;

    const bounds: L.LatLngExpression[] = [];
    spaces.forEach((s) => {
      const marker = L.marker([s.lat, s.lng], {
        icon: buildIcon(s),
        title: s.name,
        zIndexOffset:
          s.status === "full" ? 400 : s.status === "limited" ? 300 : 200,
      });
      marker.bindTooltip(
        `<div style="font-weight:600;">${s.name}</div>
         <div style="color:#64748b;font-size:11px;">${s.building} · ${s.floor}</div>
         <div style="margin-top:2px;font-weight:600;color:${PIN_COLOR[s.status]};">${
          s.status === "offline"
            ? "No live data"
            : `${s.available}/${s.capacity} free`
        }</div>`,
        { direction: "top", offset: [0, -40], opacity: 1 }
      );
      marker.on("click", () => onOpen(s.id));
      marker.addTo(layer);
      bounds.push([s.lat, s.lng]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 17 });
    }
  }, [spaces, ready, onOpen]);

  const recenter = () => {
    const map = mapRef.current;
    if (!map) return;
    if (spaces.length > 0) {
      const bounds = spaces.map((s) => [s.lat, s.lng]) as L.LatLngExpression[];
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 17 });
    } else {
      map.setView(CAMPUS_CENTER, 16);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2 px-1">
        <div>
          <h2 className="flex items-center gap-1.5 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            Campus Map
          </h2>
          <p className="text-sm text-muted-foreground">
            Real map · tap a pin to view live availability.
          </p>
        </div>
        <button
          type="button"
          onClick={recenter}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-3d transition-colors hover:bg-muted"
        >
          <Crosshair className="h-3.5 w-3.5" />
          Recenter
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-72 w-full animate-pulse rounded-2xl bg-muted" />
          <LoadingState />
        </div>
      ) : error ? (
        <ErrorState onRetry={onRetry} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-3d">
          <div className="relative h-80 w-full sm:h-[440px]">
            <div ref={containerRef} className="absolute inset-0" />

            <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-xl border border-border bg-background/90 px-3 py-2 text-xs shadow-3d glass">
              <p className="font-semibold">{CAMPUS_NAME}</p>
              <p className="text-muted-foreground">Riyadh, Saudi Arabia · sample occupancy</p>
            </div>

            <div className="pointer-events-none absolute bottom-3 right-3 z-[500] flex items-center gap-1 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] font-medium text-muted-foreground shadow-3d glass">
              <LayersIcon className="h-3 w-3" />
              OpenStreetMap
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border px-4 py-3 text-xs">
            {(
              ["available", "limited", "full", "offline"] as AvailabilityStatus[]
            ).map((st) => (
              <span key={st} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: PIN_COLOR[st] }}
                />
                <span className="text-muted-foreground">
                  {STATUS_META[st].label}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          All locations
        </h3>
        {spaces.length === 0 ? (
          <OfflineState />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {spaces.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onOpen(s.id)}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-left shadow-3d transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.building} · {s.floor}
                  </p>
                </div>
                <span
                  className="flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white shadow-3d"
                  style={{ backgroundColor: PIN_COLOR[s.status] }}
                >
                  {s.status === "offline" ? "—" : s.available}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
