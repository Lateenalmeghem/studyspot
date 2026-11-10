import { cn } from "@/lib/utils";

export function AvailabilityRing({
  available,
  capacity,
  status,
  size = 92,
  className,
}: {
  available: number;
  capacity: number;
  status: "available" | "limited" | "full" | "offline";
  size?: number;
  className?: string;
}) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const rate = capacity > 0 ? available / capacity : 0;
  const dash = circumference * Math.max(0, Math.min(1, rate));

  const color =
    status === "available"
      ? "#10b981"
      : status === "limited"
        ? "#f59e0b"
        : status === "full"
          ? "#f43f5e"
          : "#94a3b8";

  const glow =
    status === "available"
      ? "rgba(16,185,129,0.35)"
      : status === "limited"
        ? "rgba(245,158,11,0.35)"
        : status === "full"
          ? "rgba(244,63,94,0.35)"
          : "rgba(148,163,184,0.25)";

  const innerSize = size - 22;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center ring-3d",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted/50"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center rounded-full"
        style={{
          width: innerSize,
          height: innerSize,
          background:
            "radial-gradient(circle at 50% 30%, color-mix(in oklch, var(--card) 100%, transparent), color-mix(in oklch, var(--muted) 60%, transparent))",
          boxShadow:
            "inset 0 2px 6px rgba(255,255,255,0.6), inset 0 -3px 8px rgba(15,23,42,0.12)",
        }}
      >
        <span className="text-2xl font-bold leading-none" style={{ color }}>
          {status === "offline" ? "—" : available}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          free
        </span>
      </div>
    </div>
  );
}
