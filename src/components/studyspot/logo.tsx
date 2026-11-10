import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" className="fill-white/15" />
      <circle cx="24" cy="24" r="19" className="fill-white" />
      <path
        d="M24 12.5L13 17.5L24 22.5L33.5 18.25V26"
        stroke="#1e2a78"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 20.4V26.5C16.5 26.5 19.2 29 24 29C28.8 29 31.5 26.5 31.5 26.5V20.4"
        stroke="#1e2a78"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 18.25V26"
        stroke="#1e2a78"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M33.5 26V26.01"
        stroke="#1e2a78"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M24 29C24 33 24 33 24 33"
        stroke="#1e2a78"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 33.2c1.5 0 2.7-1.1 2.7-2.5 0-1.4-2.7-4.2-2.7-4.2s-2.7 2.8-2.7 4.2c0 1.4 1.2 2.5 2.7 2.5z"
        fill="#16a34a"
      />
    </svg>
  );
}
