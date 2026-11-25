"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutHero } from "@/content/about";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page opener, in the Services hero's "base" treatment: a full-bleed photo of
 * the salon floor left almost clear at the top, an ink wash deepening towards
 * the bottom, and the copy anchored low: a large two-line title on the left,
 * the intro and "Book a Visit" beside it, and the studio's quick facts along a
 * hairline at the base. The header floats transparent over it. On load the
 * photo settles from a slight zoom and the title rises line by line; the
 * photo then drifts slowly with scroll.
 */
export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-zoom]", { scale: 1.1, duration: 2.4, ease: "power2.out" });

      // The title rises line by line out of its masks; the rest follows.
      gsap.from("[data-reveal='line']", {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.12,
        delay: 0.15,
        ease: "power4.out",
      });
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.4,
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

  const { titleLines, titleEmphasis } = aboutHero;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-title"
      className="relative isolate flex min-h-[clamp(38rem,90svh,58rem)] flex-col overflow-hidden bg-ink text-white"
    >
      {/* Photo, oversized at the top so the drift never shows an edge. */}
      <div data-parallax aria-hidden="true" className="absolute inset-x-0 -top-[8%] bottom-0 -z-10">
        <div data-zoom className="absolute inset-0">
          <Image
            src={aboutHero.image.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[60%_40%]"
          />
        </div>
      </div>
      {/* Veil: a light wash behind the header, the middle left almost clear,
          then deepening under the copy. It starts lower on wide screens,
          where the copy takes less of the height. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_25_24/0.5)_0%,rgb(27_25_24/0.12)_20%,rgb(27_25_24/0.3)_38%,rgb(27_25_24/0.84)_68%,rgb(27_25_24/0.94)_100%)] sm:bg-[linear-gradient(to_bottom,rgb(27_25_24/0.5)_0%,rgb(27_25_24/0.1)_22%,rgb(27_25_24/0.15)_40%,rgb(27_25_24/0.8)_80%,rgb(27_25_24/0.92)_100%)]"
      />

      {/* The top padding clears the floating header; the copy sits at the base. */}
      <div className="container-site flex flex-1 flex-col justify-end pt-32 pb-6 sm:pb-8 lg:pb-10">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
          <div className="min-w-0 flex-[1_1_37.5rem]">
            <p data-reveal="item" className="type-label flex items-center gap-4 text-white/85">
              <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
              {aboutHero.eyebrow}
            </p>
            <h1
              id="about-hero-title"
              className="mt-4 font-serif text-[clamp(2.5rem,0.9rem+6.2vw,6rem)] leading-[0.92] font-medium tracking-[-0.04em] sm:mt-5 lg:text-[min(clamp(2.5rem,0.9rem+6.2vw,6rem),12svh)]"
            >
              {titleLines.map((line, i) => (
                // Each line is its own mask; the padding keeps accents and
                // descenders inside it.
                <span key={line} className="-my-[0.1em] block overflow-hidden py-[0.1em] pr-[0.08em]">
                  <span data-reveal="line" className="block">
                    {line === titleEmphasis ? <em className="font-normal">{line}</em> : line}
                    {/* Keeps words separated for screen readers and copy-paste. */}
                    {i < titleLines.length - 1 && " "}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div data-reveal="item" className="flex-[0_1_22.5rem] lg:pb-2.5">
            <p className="type-lead text-white/88">{aboutHero.body}</p>
            <div className="mt-6">
              <Button href={aboutHero.cta.href} className="min-w-44">
                {aboutHero.cta.label}
              </Button>
            </div>
          </div>
        </div>

        <ul
          data-reveal="item"
          aria-label="At a glance"
          className="type-ui mt-10 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-white/20 pt-5 text-white/82 sm:mt-12"
        >
          {aboutHero.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
