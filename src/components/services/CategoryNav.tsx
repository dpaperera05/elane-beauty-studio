"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { serviceCategories, serviceMenu } from "@/content/services";

/**
 * The category bar: sticks under the header once the hero has scrolled away.
 * Each link jumps to its section (the page scrolls smoothly; see globals.css)
 * and the category being read is highlighted, the highlight sliding from one
 * pill to the next. Centred on desktop; a horizontally scrollable strip on
 * narrower screens, which keeps the active pill in view.
 *
 * The page marks what it is showing with `data-menu-section`: a category id on
 * the category sections, empty on everything else.
 */
export function CategoryNav() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Whichever marked section crosses a thin band a third of the way down the
  // screen is the one being read.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive((entry.target as HTMLElement).dataset.menuSection || null);
      },
      { rootMargin: "-32% 0px -66% 0px" },
    );
    document
      .querySelectorAll<HTMLElement>("[data-menu-section]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Keep the active pill centred in the strip. This scrolls the strip itself
  // (never the page), so it can't interrupt a jump that is under way.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>("[aria-current='true']");
    if (!list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      // With nothing active (hero, Ritual, the closing sections) it rewinds.
      left: link ? link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2 : 0,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <MotionConfig reducedMotion="user">
      {/* `top` is the solid header's height at each breakpoint. */}
      <nav
        aria-label={serviceMenu.navLabel}
        className="sticky top-[4.25rem] z-30 border-y border-line bg-white/90 backdrop-blur-md sm:top-[4.5rem] lg:top-[4.75rem]"
      >
        <ul
          ref={listRef}
          className="container-site relative flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] lg:justify-center lg:gap-2 [&::-webkit-scrollbar]:hidden"
        >
          {serviceCategories.map((category) => {
            const isActive = category.id === active;
            return (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#${category.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`type-ui relative flex h-11 items-center rounded-full px-5 whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
                    isActive ? "text-ivory" : "text-ink hover:text-burgundy"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-nav-active"
                      aria-hidden="true"
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-0 rounded-full bg-burgundy"
                    />
                  )}
                  <span className="relative">{category.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
}
