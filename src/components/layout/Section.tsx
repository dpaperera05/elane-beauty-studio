import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  muted: "bg-surface-muted",
} as const;

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "aside";
  tone?: keyof typeof tones;
};

/** Applies the vertical section rhythm (`--section-space`) and background tone. */
export function Section({
  as: Tag = "section",
  tone = "canvas",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("py-(--section-space)", tones[tone], className)}
      {...props}
    />
  );
}
