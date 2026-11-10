"use client";

import * as React from "react";
import { ChevronRight, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatLastUpdated,
  STATUS_META,
  type StudySpaceLive,
} from "@/lib/study-spaces";
import { StatusPill } from "@/components/studyspot/status-pill";
import { TypeBadge } from "@/components/studyspot/type-badge";
import { BuildingIcon } from "@/components/studyspot/building-icon";

export function StudySpaceCard({
  space,
  onOpen,
  index = 0,
}: {
  space: StudySpaceLive;
  onOpen: (id: string) => void;
  index?: number;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [fine, setFine] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = () => setFine(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!fine || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-3px)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };

  const rate = space.occupancyRate;
  const barColor =
    space.status === "available"
      ? "bg-emerald-500"
      : space.status === "limited"
        ? "bg-amber-500"
        : space.status === "full"
          ? "bg-rose-500"
          : "bg-zinc-400";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(space.id)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out, border-color 0.18s",
        animationDelay: `${index * 40}ms`,
      }}
      className="group flex w-full animate-pop-in items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-3d hover:border-primary/40 hover:shadow-3d-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <BuildingIcon type={space.type} status={space.status} />
      </div>

      <div className="min-w-0 flex-1" style={{ transform: "translateZ(12px)" }}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-semibold leading-tight">
            {space.name}
          </h3>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {space.building} · {space.floor}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusPill status={space.status} />
          <TypeBadge type={space.type} />
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-medium text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {space.status === "offline"
                ? "No live data"
                : `${space.available} of ${space.capacity} free`}
            </span>
            <span
              className={cn("font-semibold", STATUS_META[space.status].text)}
            >
              {space.status === "offline" ? "—" : `${rate}% occupied`}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all", barColor)}
              style={{ width: `${space.status === "offline" ? 0 : rate}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            Updated {formatLastUpdated(space.lastUpdated)}
          </div>
        </div>
      </div>
    </button>
  );
}
