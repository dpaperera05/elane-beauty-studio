"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesHero } from "@/content/services";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page opener, in the About hero's treatment: a full-width photograph under a
 * deep ink veil, about three-quarters of the screen tall, with the display
 * title, intro and "Book Now" centred over it. The header floats transparent
 * over it. On load the photo settles from a slight zoom and the copy rises
 * in; the photo then drifts slowly with scroll.
 */
export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      data-menu-section=""
      aria-labelledby="services-hero-title"
      className="relative isolate flex min-h-[clamp(34rem,76svh,54rem)] flex-col overflow-hidden bg-ink text-white"
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
            className="object-cover object-[60%_40%]"
          />
        </div>
      </div>
      {/* Veil: an ink wash, deepest at the top (behind the header) and the
          bottom, so the copy reads over the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_25_24/0.78),rgb(27_25_24/0.6)_35%,rgb(27_25_24/0.62)_65%,rgb(27_25_24/0.8))]"
      />

      {/* The top padding clears the floating header. On desktop the title
          also eases down on short screens so the hero never outgrows the
          window. */}
      <div className="container-site flex flex-1 flex-col items-center justify-center pt-28 pb-16 text-center sm:pt-32 sm:pb-20 lg:pt-28">
        <h1
          id="services-hero-title"
          data-reveal="item"
          className="type-display max-w-[13ch] lg:text-[min(clamp(3.25rem,1.9rem+3.8vw,6.25rem),10.5svh)]"
        >
          {servicesHero.title}
        </h1>
        <p
          data-reveal="item"
          className="type-lead mt-6 max-w-[21rem] text-balance text-white/85 sm:mt-7 sm:max-w-[36rem]"
        >
          {servicesHero.body}
        </p>
        <div data-reveal="item" className="mt-8 sm:mt-9">
          <Button href={servicesHero.cta.href} className="min-w-44">
            {servicesHero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
