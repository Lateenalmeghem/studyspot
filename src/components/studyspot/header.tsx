"use client";

import { ThemeToggle } from "@/components/studyspot/theme-toggle";
import { Logo } from "@/components/studyspot/logo";
import { Wifi, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="brand-gradient relative overflow-hidden text-white shadow-3d-lg">
      <div className="orb animate-float-slow -right-8 -top-10 h-40 w-40 bg-sky-400/40" />
      <div className="orb animate-float-slower -bottom-12 left-10 h-44 w-44 bg-indigo-400/30" />
      <div className="orb right-24 top-8 h-24 w-24 bg-emerald-300/30" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <div className="preserve-3d">
          <Logo size={46} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold leading-tight tracking-tight drop-shadow-sm sm:text-2xl">
              StudySpot
            </h1>
            <span className="hidden rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/20 sm:inline">
              MVP
            </span>
          </div>
          <p className="truncate text-xs font-medium text-white/85 sm:text-sm">
            Find. Study. Focus.
          </p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20 sm:inline-flex">
          <Wifi className="h-3.5 w-3.5" />
          Sample occupancy
        </span>
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-emerald-300/30 md:inline-flex">
          <MapPin className="h-3.5 w-3.5" />
          PSU Riyadh
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
