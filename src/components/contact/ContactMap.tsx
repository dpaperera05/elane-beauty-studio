"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { location } from "@/content/contact";
import { Icon } from "../ui/Icon";
import { GlassLayers } from "../ui/LiquidGlass";

gsap.registerPlugin(ScrollTrigger);

/**
 * Where the studio is, on a soft ivory band: the heading, a line of context
 * and "Get Directions" on the left; a live Google Map on the right, set in a
 * hairline frame like the site's photographs. The map is a plain embed (no
 * API key) and loads only as it nears the screen. Stacks on phones, copy
 * first.
 */
export function ContactMap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='text']", start: "clamp(top 82%)", once: true },
      });

      // The map fades and rises rather than unmasking: a clip-path on an
      // iframe can leave it blank in some browsers until it is interacted with.
      gsap.from("[data-reveal='map']", {
        opacity: 0,
        y: 28,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='map']", start: "clamp(top 85%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      aria-labelledby="location-title"
      className="section-space bg-ivory"
    >
      <div className="container-site grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div data-reveal="text" className="lg:col-span-4">
          <p data-reveal="item" className="type-label flex items-center gap-4 text-ink sm:gap-5">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
            {location.eyebrow}
          </p>
          <h2
            id="location-title"
            data-reveal="item"
            className="type-h2 mt-5 max-w-[10ch] leading-[0.94] tracking-[-0.035em] text-burgundy md:mt-6"
          >
            {location.title}
          </h2>
          <p data-reveal="item" className="type-lead mt-6 max-w-[24rem] text-ink">
            {location.body}
          </p>
          <div data-reveal="item" className="mt-8">
            {/* The site's outline pill (see Button), written out because it
                has to open Google Maps in a new tab. */}
            <a
              href={location.directions.href}
              target="_blank"
              rel="noopener noreferrer"
              className="type-ui liquid-glass liquid-glass--burgundy inline-flex h-12 items-center gap-3 rounded-full border border-ink/20 py-1.5 pr-1.5 pl-5 whitespace-nowrap text-ink transition-[color,transform] duration-300 hover:text-ivory"
            >
              <GlassLayers />
              <span className="relative block flex-1 text-center leading-6">
                {location.directions.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span className="relative flex size-9 items-center justify-center rounded-full border border-dotted border-burgundy/40 bg-ivory text-burgundy backdrop-blur-sm">
                <Icon name="arrow" className="size-4" />
              </span>
            </a>
          </div>
        </div>

        {/* Map. The padding leaves room for the frame's offset. */}
        <div data-reveal="map" className="pr-4 pb-4 lg:col-span-8 lg:pr-5 lg:pb-5">
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-x-4 translate-y-4 border border-burgundy/35 lg:translate-x-5 lg:translate-y-5"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-beige sm:aspect-4/3 lg:aspect-16/10">
              <iframe
                src={location.embedSrc}
                title={location.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
