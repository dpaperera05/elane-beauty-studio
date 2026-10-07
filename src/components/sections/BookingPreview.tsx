"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { booking } from "@/content/home";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

/**
 * The homepage's closing invitation: a full-bleed, low-lit photograph under
 * a soft charcoal veil, with the copy set left in the photo's dark space.
 * It only starts the journey; "Book Your Visit" continues to /book. The photo
 * settles in and drifts slowly with scroll; the copy rises in on entry.
 */
export function BookingPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 24,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "clamp(top 65%)", once: true },
      });

      // The photo eases out of a slight zoom on entry…
      gsap.from("[data-zoom]", {
        scale: 1.1,
        duration: 2.4,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "clamp(top 85%)", once: true },
      });

      // …and drifts a little slower than the page.
      gsap.fromTo(
        "[data-parallax]",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      aria-labelledby="book-title"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      {/* Photo, oversized so the drift never shows an edge. */}
      <div data-parallax aria-hidden="true" className="absolute inset-x-0 -top-[8%] -bottom-[8%] -z-10">
        <div data-zoom className="absolute inset-0">
          <Image
            src={booking.image.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>
      </div>
      {/* Veil: light on wide screens, where the copy sits in the photo's dark
          space; deeper on narrow ones, where it crosses the hands. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60 md:bg-ink/45 lg:bg-ink/35" />

      <div className="container-site flex min-h-[clamp(34rem,85svh,48rem)] flex-col justify-center py-24 md:py-28">
        <div className="max-w-[40rem]">
          <p data-reveal="item" className="type-label flex items-center gap-4 text-rose">
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
            {booking.eyebrow}
          </p>
          <h2
            id="book-title"
            data-reveal="item"
            className="type-h2 mt-6 max-w-[14ch] leading-[0.94] tracking-[-0.035em] text-ivory"
          >
            {booking.title}
          </h2>
          <p data-reveal="item" className="type-lead mt-6 max-w-[25rem] text-ivory/80">
            {booking.body}
          </p>

          <div data-reveal="item" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href={booking.primary.href} variant="ivory">
              {booking.primary.label}
            </Button>
            <a
              href={booking.secondary.href}
              className="type-ui group inline-flex items-center gap-2 text-ivory/85 transition-colors hover:text-ivory"
            >
              <span className="underline decoration-ivory/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-ivory">
                {booking.secondary.label}
              </span>
              <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <p
        data-reveal="item"
        className="container-site type-label absolute inset-x-0 bottom-0 pb-7 text-ivory/55 md:pb-9 md:text-right"
      >
        {booking.note}
      </p>
    </section>
  );
}
