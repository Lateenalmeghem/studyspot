"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="aurora-blob aurora-a"
        style={{
          width: "55vw",
          height: "55vw",
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--primary) 65%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora-blob aurora-b"
        style={{
          width: "50vw",
          height: "50vw",
          top: "20%",
          right: "-15%",
          background:
            "radial-gradient(circle at 60% 40%, color-mix(in oklch, var(--accent) 70%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora-blob aurora-c"
        style={{
          width: "45vw",
          height: "45vw",
          bottom: "-20%",
          left: "25%",
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--chart-2) 55%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora-blob aurora-a"
        style={{
          width: "38vw",
          height: "38vw",
          bottom: "5%",
          right: "10%",
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--chart-4) 45%, transparent), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}

export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}

export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!ref.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.left = `${x}px`;
          ref.current.style.top = `${y}px`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

export function AnimatedGradientText({
  children,
  className,
  from = "var(--primary)",
  via = "var(--accent)",
  to = "var(--chart-2)",
}: {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}) {
  return (
    <span
      className={cn("gradient-text font-bold", className)}
      style={{
        backgroundImage: `linear-gradient(120deg, ${from}, ${via}, ${to}, ${from})`,
      }}
    >
      {children}
    </span>
  );
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      className={cn("transition-transform duration-200 ease-out", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </button>
  );
}

export function SpotlightCard({
  children,
  className,
  radius = 280,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spot-o", "1");
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--spot-o", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("group/spot relative", className)}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-o": "0",
          "--spot-r": `${radius}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--spot-o)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(var(--spot-r) circle at var(--spot-x) var(--spot-y), color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

export function FloatingParticles({ count = 18 }: { count?: number }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const items = Array.from({ length: count }).map((_, i) => {
    const size = 4 + Math.round(Math.random() * 10);
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 8 + Math.random() * 10;
    const opacity = 0.2 + Math.random() * 0.4;
    return { i, size, left, top, delay, duration, opacity };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.i}
          className="absolute rounded-full animate-float-slow"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 70%, transparent), transparent)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
