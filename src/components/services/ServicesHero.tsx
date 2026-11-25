"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceCategories, servicesHero } from "@/content/services";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page opener over a full-bleed photograph, in one of two layouts (set by
 * `servicesHero.layout`):
 *
 * - "base": the photo left almost clear at the top, an ink wash deepening
 *   towards the bottom; a large two-line title anchored low on the left, the
 *   intro and "Book Now" beside it, and the category links (with their service
 *   counts) along a hairline at the base.
 * - "side": an ink wash from the left that fades out so the right of the
 *   photo stays bright; the copy and two buttons on the left, and the
 *   numbered category links in a frosted bar along the bottom edge.
 *
 * The header floats transparent over it. On load the photo settles from a
 * slight zoom and the copy rises in; the photo then drifts slowly with scroll.
 */
export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const side = servicesHero.layout === "side";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-zoom]", { scale: 1.1, duration: 2.4, ease: "power2.out" });

      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out",
      });

      // The photo drifts a little slower than the page.
      gsap.fromTo(
        "[data-parallax]",
        { yPercent: 0 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const eyebrow = (
    <p data-reveal="item" className="type-label flex items-center gap-4 text-white/85">
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      {servicesHero.eyebrow}
    </p>
  );

  const title = (
    <h1
      id="services-hero-title"
      data-reveal="item"
      className={`mt-5 font-serif leading-[0.88] font-medium sm:mt-6 short:mt-4 short:text-[3rem] ${
        side
          ? "text-[clamp(2.75rem,1.2rem+5.6vw,6.25rem)] tracking-[-0.035em] lg:text-[min(clamp(2.75rem,1.2rem+5.6vw,6.25rem),11svh)]"
          : "text-[clamp(2.75rem,1rem+7.4vw,7.75rem)] tracking-[-0.04em] lg:text-[min(clamp(2.75rem,1rem+7.4vw,7.75rem),13svh)]"
      }`}
    >
      {servicesHero.titleLines.map((line, i) => {
        const [start, end] = line.split(servicesHero.titleEmphasis);
        return (
          <span key={line} className="block">
            {end === undefined ? (
              line
            ) : (
              <>
                {start}
                <em className="font-normal">{servicesHero.titleEmphasis}</em>
                {end}
              </>
            )}
            {/* Keeps words separated for screen readers and copy-paste. */}
            {i < servicesHero.titleLines.length - 1 && " "}
          </span>
        );
      })}
    </h1>
  );

  return (
    <section
      ref={sectionRef}
      data-menu-section=""
      aria-labelledby="services-hero-title"
      className="relative isolate flex min-h-[clamp(38rem,90svh,58rem)] flex-col short:min-h-svh overflow-hidden bg-ink text-white"
    >
      {/* Photo, oversized at the top so the drift never shows an edge. */}
      <div data-parallax aria-hidden="true" className="absolute inset-x-0 -top-[8%] bottom-0 -z-10">
        <div data-zoom className="absolute inset-0">
          <Image
            src={servicesHero.image.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className={`object-cover ${side ? "object-[66%_40%]" : "object-[60%_30%]"}`}
          />
        </div>
      </div>

      {side ? (
        // Veil: on narrow screens, where the copy spans the width, an even
        // wash that deepens towards the bottom; from lg, a wash from the left
        // that clears by the right third, plus light bands at top and bottom.
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_25_24/0.55)_0%,rgb(27_25_24/0.4)_30%,rgb(27_25_24/0.7)_70%,rgb(27_25_24/0.85)_100%)] lg:bg-[linear-gradient(90deg,rgb(27_25_24/0.85)_0%,rgb(27_25_24/0.6)_38%,rgb(27_25_24/0.12)_72%,rgb(27_25_24/0)_100%),linear-gradient(to_bottom,rgb(27_25_24/0.55)_0%,rgb(27_25_24/0)_24%,rgb(27_25_24/0)_70%,rgb(27_25_24/0.55)_100%)]"
        />
      ) : (
        // Veil: a light wash behind the header, the middle left almost clear,
        // then deepening under the copy. It starts lower on wide screens,
        // where the copy takes less of the height.
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_25_24/0.5)_0%,rgb(27_25_24/0.1)_20%,rgb(27_25_24/0.25)_38%,rgb(27_25_24/0.82)_68%,rgb(27_25_24/0.94)_100%)] sm:bg-[linear-gradient(to_bottom,rgb(27_25_24/0.5)_0%,rgb(27_25_24/0.08)_22%,rgb(27_25_24/0.1)_40%,rgb(27_25_24/0.78)_82%,rgb(27_25_24/0.92)_100%)]"
        />
      )}

      {side ? (
        <>
          {/* The top padding clears the floating header. */}
          <div className="container-site flex flex-1 items-center pt-32 pb-12 sm:pb-16 short:pt-28 short:pb-10">
            {/* Wide enough for "Services designed" on one line at full size. */}
            <div className="max-w-[47rem]">
              {eyebrow}
              {title}
              <p data-reveal="item" className="type-lead mt-6 max-w-[28rem] text-white/88 sm:mt-7">
                {servicesHero.body}
              </p>
              <div data-reveal="item" className="mt-8 flex flex-wrap gap-3.5 sm:mt-9">
                <Button href={servicesHero.cta.href} className="min-w-44">
                  {servicesHero.cta.label}
                </Button>
                <Button href={servicesHero.secondaryCta.href} variant="light">
                  {servicesHero.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>

          {/* Category links in a frosted bar along the bottom edge. */}
          <nav
            data-reveal="item"
            aria-label={servicesHero.navLabel}
            className="border-t border-white/18 bg-ink/30 backdrop-blur-md"
          >
            <ul className="container-site flex gap-8 overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:gap-6 [&::-webkit-scrollbar]:hidden">
              {serviceCategories.map((category, i) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    className="type-ui flex min-h-11 items-baseline gap-3 py-5 whitespace-nowrap text-white/88 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-6"
                  >
                    <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        // The top padding clears the floating header; the copy sits at the base.
        <div className="container-site flex flex-1 flex-col justify-end pt-32 pb-6 sm:pb-8 lg:pb-10">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
            <div className="min-w-0 flex-[1_1_35rem]">
              {eyebrow}
              {title}
            </div>

            <div data-reveal="item" className="flex-[0_1_22.5rem] lg:pb-2.5">
              <p className="type-lead text-white/88">{servicesHero.body}</p>
              <div className="mt-6">
                <Button href={servicesHero.cta.href} className="min-w-44">
                  {servicesHero.cta.label}
                </Button>
              </div>
            </div>
          </div>

          {/* Category links: jump to each section of the menu. */}
          <nav
            data-reveal="item"
            aria-label={servicesHero.navLabel}
            className="mt-10 border-t border-white/20 sm:mt-12"
          >
            <ul className="-mx-4 flex gap-8 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:justify-between [&::-webkit-scrollbar]:hidden">
              {serviceCategories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    className="type-ui flex min-h-11 items-center gap-2 pt-5 pb-1 whitespace-nowrap text-white/82 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {category.name}
                    <span className="text-xs text-white/55 tabular-nums">
                      {String(category.services.length).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
}
