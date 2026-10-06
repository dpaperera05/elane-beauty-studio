import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: ReactNode;
  tone?: "accent" | "muted";
  className?: string;
};

/** Small uppercase eyebrow that introduces a section, preceded by a hairline rule. */
export function SectionLabel({
  children,
  tone = "accent",
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-label font-semibold uppercase",
        tone === "accent" ? "text-accent" : "text-ink-soft",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      {children}
    </p>
  );
}
