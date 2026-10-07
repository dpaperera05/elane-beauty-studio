import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "chevron"
  | "pin"
  | "sparkle"
  | "instagram"
  | "tiktok"
  | "pinterest";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14 3.5v11.2a3.3 3.3 0 11-3.3-3.3M14 3.5c.4 2.6 2.2 4.4 5 4.6" />,
  pinterest: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.7 20.2l1.9-7.6M11.3 15.3c.5.5 1.2.8 2 .8 2 0 3.4-1.8 3.4-4.2 0-2.4-2-4.1-4.6-4.1-2.8 0-4.6 2-4.6 4.2 0 .9.3 1.7.9 2.2" />
    </>
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
