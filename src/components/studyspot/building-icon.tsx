import { cn } from "@/lib/utils";
import type { StudyType, AvailabilityStatus } from "@/lib/study-spaces";
import { Building2 } from "lucide-react";

const TINT: Record<StudyType, string> = {
  quiet: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  group:
    "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  general:
    "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300",
};

export function BuildingIcon({
  type,
  status,
  className,
}: {
  type: StudyType;
  status: AvailabilityStatus;
  className?: string;
}) {
  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-xl",
          TINT[type],
          className
        )}
      >
        <Building2 className="h-8 w-8" />
      </div>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card",
          status === "available" && "bg-emerald-500",
          status === "limited" && "bg-amber-500",
          status === "full" && "bg-rose-500",
          status === "offline" && "bg-zinc-400"
        )}
      />
    </div>
  );
}
