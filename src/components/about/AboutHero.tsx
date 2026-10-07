"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutHero } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page opener: a photograph of the salon floor under a deep ink veil, about
 * three-quarters of the screen tall, with the display title and intro
 * centred over it (as on the homepage hero). The header floats transparent
 * over it. On load the photo settles from a slight zoom and the title rises
 * line by line; the photo then drifts slowly with scroll.
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
        delay: 0.45,
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

  const { titleLines } = aboutHero;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-title"
      className="relative isolate flex min-h-[clamp(34rem,76svh,54rem)] flex-col overflow-hidden bg-ink text-white"
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
            className="object-cover object-[62%_center]"
          />
        </div>
      </div>
      {/* Veil: the photo is bright, so it sits under an ink wash, deepest at
          the top (behind the header) and the bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_25_24/0.78),rgb(27_25_24/0.58)_35%,rgb(27_25_24/0.6)_65%,rgb(27_25_24/0.8))]"
      />

      {/* The top padding clears the floating header. On desktop the title
          also eases down on short screens so the hero never outgrows the
          window. */}
      <div className="container-site flex flex-1 flex-col items-center justify-center pt-28 pb-16 text-center sm:pt-32 sm:pb-20 lg:pt-28">
        <h1 id="about-hero-title" className="type-display lg:text-[min(clamp(3.25rem,1.9rem+3.8vw,6.25rem),10.5svh)]">
          {titleLines.map((line, i) => (
            // Each line is its own mask; the padding keeps accents and
            // descenders inside it.
            <span key={line} className="-my-[0.1em] block overflow-hidden px-[0.08em] py-[0.1em]">
              <span
                data-reveal="line"
                className={`block ${i === titleLines.length - 1 ? "italic" : ""}`}
              >
                {line}
                {/* Keeps words separated for screen readers and copy-paste. */}
                {i < titleLines.length - 1 && " "}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-reveal="item"
          className="type-lead mt-6 max-w-[21rem] text-balance text-white/85 sm:mt-7 sm:max-w-[36rem]"
        >
          {aboutHero.body}
        </p>
      </div>
    </section>
  );
}
