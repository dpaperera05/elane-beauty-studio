"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 16;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

/**
 * Fixed header frame. Transparent over the top of the page, then settles into
 * a translucent ivory bar with a hairline once the page scrolls.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b motion-safe:animate-fade-in",
        "transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial",
        scrolled
          ? "border-line/80 bg-canvas/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
