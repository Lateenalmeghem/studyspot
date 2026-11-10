import { cn } from "@/lib/utils";
import {
  TYPE_META,
  type StudyType,
} from "@/lib/study-spaces";
import { VolumeX, Users, BookOpen, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  VolumeX,
  Users,
  BookOpen,
};

export function TypeBadge({
  type,
  className,
}: {
  type: StudyType;
  className?: string;
}) {
  const meta = TYPE_META[type];
  const Icon = ICONS[meta.icon] ?? BookOpen;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.badge,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
