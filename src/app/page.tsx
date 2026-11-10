"use client";

import * as React from "react";
import { Header } from "@/components/studyspot/header";
import { Footer } from "@/components/studyspot/footer";
import { BottomNav, type ViewKey } from "@/components/studyspot/bottom-nav";
import { HomeView } from "@/components/studyspot/home-view";
import { MapView } from "@/components/studyspot/map-view";
import { DetailView } from "@/components/studyspot/detail-view";
import { SettingsView } from "@/components/studyspot/settings-view";
import { AuthView } from "@/components/studyspot/auth-view";
import { useAuth } from "@/components/studyspot/auth-context";
import { CursorGlow, GrainOverlay } from "@/components/studyspot/effects";
import type { StudySpaceLive, StudyType } from "@/lib/study-spaces";

type TypeFilter = "all" | StudyType;
type RefreshInterval = 0 | 15 | 30 | 60;

interface ApiResponse {
  spaces: StudySpaceLive[];
  lastUpdated: string;
  sample: boolean;
}

export default function Page() {
  const { user, ready } = useAuth();

  const [view, setView] = React.useState<ViewKey>("home");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const [spaces, setSpaces] = React.useState<StudySpaceLive[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>("all");
  const [availableOnly, setAvailableOnly] = React.useState(false);
  const [refreshInterval, setRefreshInterval] = React.useState<RefreshInterval>(30);

  const fetchSpaces = React.useCallback(async (soft = false) => {
    if (soft) setRefreshing(true);
    else setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/study-spaces", { cache: "no-store" });
      if (!res.ok) throw new Error("request failed");
      const data: ApiResponse = await res.json();
      setSpaces(data.spaces);
      setLastUpdated(data.lastUpdated);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  React.useEffect(() => {
    if (refreshInterval === 0) return;
    const id = setInterval(() => fetchSpaces(true), refreshInterval * 1000);
    return () => clearInterval(id);
  }, [refreshInterval, fetchSpaces]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return spaces.filter((s) => {
      if (q) {
        const hay = `${s.name} ${s.building} ${s.floor}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (availableOnly && s.status !== "available" && s.status !== "limited")
        return false;
      return true;
    });
  }, [spaces, query, typeFilter, availableOnly]);

  const selected = React.useMemo(
    () => spaces.find((s) => s.id === selectedId) ?? null,
    [spaces, selectedId]
  );

  const openDetail = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const closeDetail = () => setSelectedId(null);

  const changeView = (v: ViewKey) => {
    setSelectedId(null);
    setView(v);
  };

  if (!ready || !user) {
    return (
      <>
        <AuthView />
        <GrainOverlay />
      </>
    );
  }

  return (
    <div className="mesh-bg relative flex h-[100dvh] flex-col">
      <CursorGlow />
      <GrainOverlay />
      <Header />
      <main className="scroll-thin relative flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
          <div className="flex-1">
            {selected ? (
              <DetailView space={selected} onBack={closeDetail} />
            ) : view === "home" ? (
              <HomeView
                spaces={filtered}
                loading={loading}
                error={error}
                query={query}
                setQuery={setQuery}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                availableOnly={availableOnly}
                setAvailableOnly={setAvailableOnly}
                onRetry={() => fetchSpaces()}
                onRefresh={() => fetchSpaces(true)}
                refreshing={refreshing}
                lastUpdated={lastUpdated}
                onOpen={openDetail}
              />
            ) : view === "map" ? (
              <MapView
                spaces={spaces}
                loading={loading}
                error={error}
                onRetry={() => fetchSpaces()}
                onOpen={openDetail}
              />
            ) : (
              <SettingsView
                refreshInterval={refreshInterval}
                onRefreshIntervalChange={setRefreshInterval}
              />
            )}
          </div>
          <Footer />
        </div>
      </main>
      {!selected && <BottomNav active={view} onChange={changeView} />}
    </div>
  );
}
