import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "chevron"
  | "close"
  | "play"
  | "star"
  | "quote"
  | "scissors"
  | "drop"
  | "hand"
  | "sparkle"
  | "chat"
  | "calendar"
  | "heart"
  | "clock"
  | "facebook"
  | "instagram"
  | "tiktok";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  star: (
    <path
      d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  quote: (
    <path
      d="M9.5 6C6.4 7.3 4.5 9.9 4.5 13.4V18h5.2v-5.2H7.2c0-2 1-3.6 3-4.6zm9 0c-3.1 1.3-5 3.9-5 7.4V18h5.2v-5.2h-2.5c0-2 1-3.6 3-4.6z"
      fill="currentColor"
      stroke="none"
    />
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 7.5L20 18M8 16.5L20 6" />
    </>
  ),
  drop: <path d="M12 3.5s6 6.6 6 11a6 6 0 01-12 0c0-4.4 6-11 6-11z" />,
  hand: (
    <path d="M8 13V6.5a1.5 1.5 0 013 0V12m0-6.5a1.5 1.5 0 013 0V12m0-5a1.5 1.5 0 013 0v7a6 6 0 01-6 6h-.6a6 6 0 01-4.6-2.2L4.5 15a1.5 1.5 0 012.3-2l1.2 1.3" />
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  ),
  chat: (
    <path d="M20 12a7.5 7.5 0 01-10.9 6.7L4 20l1.3-4.4A7.5 7.5 0 1120 12z" />
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  heart: (
    <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0112 7a4.2 4.2 0 017.5 2.5c0 5.6-7.5 10-7.5 10z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 00-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path d="M14 3.5v11.2a3.3 3.3 0 11-3.3-3.3M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
  ),
};

export function Icon({
  name,
  className = "size-5",
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
