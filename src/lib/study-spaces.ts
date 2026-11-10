export type StudyType = "quiet" | "group" | "general";

export type AvailabilityStatus = "available" | "limited" | "full" | "offline";

export interface StudySpace {
  id: string;
  name: string;
  building: string;
  floor: string;
  type: StudyType;
  capacity: number;
  baseOccupied: number;
  amenities: string[];
  hours: string;
  description: string;
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
  online: boolean;
}

export const CAMPUS_CENTER: [number, number] = [24.7244, 46.649];
export const CAMPUS_NAME = "Prince Sultan University";

export interface StudySpaceLive extends StudySpace {
  occupied: number;
  available: number;
  status: AvailabilityStatus;
  occupancyRate: number;
  lastUpdated: string;
}

const SPACES: StudySpace[] = [
  {
    id: "main-library",
    name: "Main Library (IRC)",
    building: "Information Resources Center",
    floor: "Floors 1–2",
    type: "quiet",
    capacity: 240,
    baseOccupied: 168,
    amenities: ["Wi-Fi", "Power Outlets", "Silent Zone", "Printing"],
    hours: "7:30 AM – 11:00 PM",
    description:
      "Prince Sultan University's main Information Resources Center, with silent reading rooms, individual carrels, and discussion pods across two floors.",
    mapX: 32,
    mapY: 38,
    lat: 24.7248,
    lng: 46.6486,
    online: true,
  },
  {
    id: "engineering-study-hall",
    name: "Engineering Study Hall",
    building: "College of Engineering",
    floor: "Floor 3",
    type: "group",
    capacity: 80,
    baseOccupied: 71,
    amenities: ["Wi-Fi", "Whiteboards", "Group Tables", "Power Outlets"],
    hours: "8:00 AM – 9:00 PM",
    description:
      "Open-plan hall in the College of Engineering for collaborative coursework, lab partners, and senior-project teams, with large whiteboards.",
    mapX: 58,
    mapY: 28,
    lat: 24.7252,
    lng: 46.6498,
    online: true,
  },
  {
    id: "student-center-lounge",
    name: "Student Center Lounge",
    building: "Student Activities Building",
    floor: "Floor 1",
    type: "general",
    capacity: 120,
    baseOccupied: 44,
    amenities: ["Wi-Fi", "Café Nearby", "Power Outlets", "Lounge Seating"],
    hours: "7:00 AM – 10:00 PM",
    description:
      "A relaxed lounge near the campus café in the Student Activities Building, ideal for casual study between classes at PSU.",
    mapX: 48,
    mapY: 55,
    lat: 24.724,
    lng: 46.6494,
    online: true,
  },
  {
    id: "cs-lounge",
    name: "CS & IT Study Lounge",
    building: "College of Computer & Information Sciences",
    floor: "Floor 2",
    type: "general",
    capacity: 60,
    baseOccupied: 60,
    amenities: ["Wi-Fi", "Power Outlets", "Lab Access", "Reference Books"],
    hours: "8:00 AM – 8:00 PM",
    description:
      "A focused study lounge in the College of Computer & Information Sciences for coding, project work, and quiet individual study.",
    mapX: 76,
    mapY: 46,
    lat: 24.7246,
    lng: 46.6496,
    online: true,
  },
  {
    id: "business-atrium",
    name: "Business Atrium",
    building: "College of Business Administration",
    floor: "Floor 1",
    type: "group",
    capacity: 90,
    baseOccupied: 22,
    amenities: ["Wi-Fi", "Group Tables", "Power Outlets", "Presentation Screens"],
    hours: "7:30 AM – 9:30 PM",
    description:
      "A bright atrium in the College of Business Administration with group tables and presentation screens, ideal for case-study work and team meetings.",
    mapX: 22,
    mapY: 62,
    lat: 24.7238,
    lng: 46.6482,
    online: true,
  },
  {
    id: "architecture-studio",
    name: "Architecture Quiet Studio",
    building: "College of Architecture & Interior Design",
    floor: "Floor 4",
    type: "quiet",
    capacity: 30,
    baseOccupied: 12,
    amenities: ["Wi-Fi", "Silent Zone", "Power Outlets", "Natural Light"],
    hours: "9:00 AM – 7:00 PM",
    description:
      "A small, dedicated silent studio in the College of Architecture & Interior Design for focused individual work and drafting.",
    mapX: 64,
    mapY: 68,
    lat: 24.725,
    lng: 46.6484,
    online: true,
  },
  {
    id: "law-reading-room",
    name: "Law Reading Room",
    building: "College of Law",
    floor: "Floor 2",
    type: "quiet",
    capacity: 45,
    baseOccupied: 9,
    amenities: ["Wi-Fi", "Silent Zone", "Reading Lamps", "Reference Books"],
    hours: "8:30 AM – 8:00 PM",
    description:
      "A quiet reading room in the College of Law with comfortable seating and reading lamps, suited for case reading and essay work.",
    mapX: 34,
    mapY: 74,
    lat: 24.7236,
    lng: 46.649,
    online: true,
  },
  {
    id: "group-study-hub",
    name: "Campus Group Study Hub",
    building: "Student Activities Building",
    floor: "Floor 2",
    type: "group",
    capacity: 50,
    baseOccupied: 38,
    amenities: ["Wi-Fi", "Whiteboards", "Group Rooms", "AV Equipment"],
    hours: "8:00 AM – 10:00 PM",
    description:
      "Bookable and walk-in group study rooms with whiteboards and AV equipment for presentations and team sessions at PSU.",
    mapX: 50,
    mapY: 44,
    lat: 24.7242,
    lng: 46.6488,
    online: false,
  },
  {
    id: "sciences-humanities-room",
    name: "Sciences & Humanities Study Room",
    building: "College of Sciences & Humanities",
    floor: "Floor 3",
    type: "quiet",
    capacity: 55,
    baseOccupied: 21,
    amenities: ["Wi-Fi", "Silent Zone", "Power Outlets", "Reference Books"],
    hours: "8:00 AM – 8:00 PM",
    description:
      "A calm study room in the College of Sciences & Humanities for reading, note-taking, and focused individual revision between lectures.",
    mapX: 28,
    mapY: 30,
    lat: 24.7254,
    lng: 46.6478,
    online: true,
  },
  {
    id: "convention-center",
    name: "Convention Center Lobby",
    building: "PSU Convention Center",
    floor: "Ground Floor",
    type: "general",
    capacity: 150,
    baseOccupied: 47,
    amenities: ["Wi-Fi", "Lounge Seating", "Power Outlets", "Event Space"],
    hours: "8:00 AM – 9:00 PM",
    description:
      "The spacious lobby of the PSU Convention Center, used as an open study and breakout area outside event hours, with ample seating and power outlets.",
    mapX: 70,
    mapY: 78,
    lat: 24.7232,
    lng: 46.6502,
    online: true,
  },
  {
    id: "sports-study-lounge",
    name: "Sports Complex Lounge",
    building: "Sports & Recreation Complex",
    floor: "Floor 1",
    type: "general",
    capacity: 40,
    baseOccupied: 14,
    amenities: ["Wi-Fi", "Lounge Seating", "Power Outlets", "Café Nearby"],
    hours: "9:00 AM – 9:00 PM",
    description:
      "A relaxed lounge inside the Sports & Recreation Complex, handy for quick study sessions between classes and workouts.",
    mapX: 82,
    mapY: 60,
    lat: 24.7256,
    lng: 46.6504,
    online: true,
  },
  {
    id: "main-cafeteria",
    name: "Main Cafeteria Study Area",
    building: "Central Dining Hall",
    floor: "Floor 1",
    type: "general",
    capacity: 110,
    baseOccupied: 58,
    amenities: ["Wi-Fi", "Food Court", "Power Outlets", "Group Tables"],
    hours: "7:00 AM – 10:00 PM",
    description:
      "A busy open study area inside the Central Dining Hall with large group tables, ideal for casual study and group discussions near the food court.",
    mapX: 40,
    mapY: 50,
    lat: 24.7244,
    lng: 46.6478,
    online: true,
  },
  {
    id: "elearning-center",
    name: "E-Learning Center",
    building: "E-Learning & IT Center",
    floor: "Floor 2",
    type: "group",
    capacity: 65,
    baseOccupied: 50,
    amenities: ["Wi-Fi", "Computer Labs", "Power Outlets", "AV Equipment"],
    hours: "8:00 AM – 9:00 PM",
    description:
      "The E-Learning & IT Center with computer workstations and AV-equipped group pods, designed for online coursework, coding, and collaborative projects.",
    mapX: 60,
    mapY: 86,
    lat: 24.7234,
    lng: 46.6486,
    online: true,
  },
];

export function getAllSpaces(): StudySpace[] {
  return SPACES;
}

export function getSpaceById(id: string): StudySpace | undefined {
  return SPACES.find((s) => s.id === id);
}

function clampOccupied(occupied: number, capacity: number): number {
  if (occupied < 0) return 0;
  if (occupied > capacity) return capacity;
  return occupied;
}

function deriveStatus(
  online: boolean,
  available: number,
  capacity: number
): AvailabilityStatus {
  if (!online) return "offline";
  if (available <= 0) return "full";
  const rate = available / capacity;
  if (rate <= 0.2) return "limited";
  return "available";
}

function jitterOccupied(base: number, capacity: number): number {
  const swing = Math.max(2, Math.round(capacity * 0.08));
  const delta = Math.round((Math.random() - 0.5) * 2 * swing);
  return clampOccupied(base + delta, capacity);
}

export function toLive(
  space: StudySpace,
  lastUpdated: string
): StudySpaceLive {
  if (!space.online) {
    return {
      ...space,
      occupied: 0,
      available: 0,
      status: "offline",
      occupancyRate: 0,
      lastUpdated,
    };
  }
  const occupied = jitterOccupied(space.baseOccupied, space.capacity);
  const available = Math.max(0, space.capacity - occupied);
  const status = deriveStatus(space.online, available, space.capacity);
  const occupancyRate =
    space.capacity > 0 ? Math.round((occupied / space.capacity) * 100) : 0;
  return {
    ...space,
    occupied,
    available,
    status,
    occupancyRate,
    lastUpdated,
  };
}

export function toLiveStatic(space: StudySpace): StudySpaceLive {
  return toLive(space, new Date().toISOString());
}

export function getSpaceLiveById(id: string): StudySpaceLive | undefined {
  const space = getSpaceById(id);
  if (!space) return undefined;
  return toLiveStatic(space);
}

export const STATUS_META: Record<
  AvailabilityStatus,
  { label: string; dot: string; badge: string; text: string }
> = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  limited: {
    label: "Limited",
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900",
    text: "text-amber-600 dark:text-amber-400",
  },
  full: {
    label: "Full",
    dot: "bg-rose-500",
    badge:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900",
    text: "text-rose-600 dark:text-rose-400",
  },
  offline: {
    label: "Offline",
    dot: "bg-zinc-400",
    badge:
      "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700",
    text: "text-zinc-500 dark:text-zinc-400",
  },
};

export const TYPE_META: Record<
  StudyType,
  { label: string; badge: string; icon: string }
> = {
  quiet: {
    label: "Quiet Zone",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-900",
    icon: "VolumeX",
  },
  group: {
    label: "Group Study",
    badge:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900",
    icon: "Users",
  },
  general: {
    label: "General",
    badge:
      "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900",
    icon: "BookOpen",
  },
};

export function formatLastUpdated(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  return `${diffHr}h ago`;
}
