import { cn } from "@/lib/utils";
import { STATUS_META, type AvailabilityStatus } from "@/lib/study-spaces";

export function StatusPill({
  status,
  className,
  size = "sm",
}: {
  status: AvailabilityStatus;
  className?: string;
  size?: "sm" | "md";
}) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        meta.badge,
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          meta.dot,
          status !== "offline" && "animate-pulse"
        )}
      />
      {meta.label}
    </span>
  );
}
