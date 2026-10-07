"use client";

import type { ComponentProps } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

/**
 * The bordered, selectable tile every booking choice is built from. When
 * selected it carries a burgundy outline that glides between tiles sharing a
 * `layoutId`. Children must be `relative` to sit above that outline.
 */
export function OptionTile({
  selected,
  layoutId,
  className = "",
  children,
  ...props
}: { selected: boolean; layoutId: string } & ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`relative w-full cursor-pointer rounded-2xl border border-line bg-white text-left transition-colors duration-300 hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy ${className}`}
    >
      {selected && (
        <motion.span
          layoutId={layoutId}
          aria-hidden="true"
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
          className="absolute -inset-px rounded-2xl border border-burgundy bg-burgundy/[0.04] ring-1 ring-burgundy ring-inset"
        />
      )}
      {children}
    </button>
  );
}

/** The round tick that marks the chosen tile. */
export function SelectedMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        selected ? "border-burgundy bg-burgundy text-ivory" : "border-line"
      }`}
    >
      <Check
        strokeWidth={2.5}
        className={`size-3 transition duration-300 ${
          selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
    </span>
  );
}
