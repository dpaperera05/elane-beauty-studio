"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tones = {
  light: { eyebrow: "text-burgundy", title: "text-ink", intro: "text-muted" },
  dark: { eyebrow: "text-rose", title: "text-ivory", intro: "text-ivory/70" },
  // Burgundy title with ink label and intro, for a section that leads.
  accent: { eyebrow: "text-ink", title: "text-burgundy", intro: "text-ink" },
};

type SectionHeadingProps = {
  /** Id for the title, referenced by the section's aria-labelledby. */
  id: string;
  /** Heading level: "h1" when this is the page's own title. */
  as?: "h1" | "h2";
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: keyof typeof tones;
  /** Extra centred content under the intro (a CTA, a rating). */
  children?: ReactNode;
  className?: string;
  /** Per-section title adjustments (e.g. tighter leading and tracking). */
  titleClassName?: string;
};

/**
 * The site-wide section header: a centred eyebrow between two hairlines, the
 * serif title and an optional intro. Reveals itself on scroll, so sections
 * don't need to animate it.
 */
export function SectionHeading({
  id,
  as: Title = "h2",
  eyebrow,
  title,
  intro,
  tone = "light",
  children,
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const colors = tones[tone];

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const mm = gsap.matchMedia(header);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // A heading already in view on load (the first thing on a page) plays
      // straight away: its clamped start is scroll 0, which would only fire
      // once the page moves, leaving the heading hidden until then.
      const inView = header.getBoundingClientRect().top < window.innerHeight * 0.85;
      gsap.from("[data-heading-item]", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: inView
          ? undefined
          : { trigger: header, start: "clamp(top 85%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <header
      ref={ref}
      className={`mx-auto flex max-w-[52rem] flex-col items-center text-center ${className}`}
    >
      <p
        data-heading-item
        className={`type-label flex items-center gap-4 sm:gap-5 ${colors.eyebrow}`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
        {eyebrow}
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
      </p>
      <Title
        id={id}
        data-heading-item
        className={`type-h2 mt-5 max-w-[24ch] md:mt-6 ${colors.title} ${titleClassName}`}
      >
        {title}
      </Title>
      {intro && (
        <p data-heading-item className={`type-lead mt-5 max-w-[34rem] md:mt-6 ${colors.intro}`}>
          {intro}
        </p>
      )}
      {children && (
        <div data-heading-item className="mt-8 flex flex-col items-center">
          {children}
        </div>
      )}
    </header>
  );
}
