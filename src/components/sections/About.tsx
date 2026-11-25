"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/home";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio introduction: a centred heading over an ivory panel. Inside it, a
 * tall photo rises out of the panel's top edge with a small detail photo
 * overlapping its corner; beside it, the studio's founding belief as a pull
 * quote, a short paragraph and the CTA. Stacks photo-first
 * below lg.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const panel = section.querySelector("[data-reveal='panel']")!;

      // The ivory wipes up from the bottom, then the photos unmask upward
      // one after another, each settling from a slight zoom.
      gsap
        .timeline({ scrollTrigger: { trigger: panel, start: "clamp(top 85%)", once: true } })
        .fromTo(
          "[data-reveal='backdrop']",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          "[data-reveal='photo']",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.25, ease: "expo.inOut" },
          0.25,
        )
        .from(
          "[data-reveal='photo'] img",
          { scale: 1.12, duration: 1.8, stagger: 0.25, ease: "power2.out" },
          0.35,
        );

      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='text']", start: "clamp(top 80%)", once: true },
      });

      // Depth: the main photo drifts inside its oversized wrapper, and the
      // detail photo moves a little against it.
      const scrub = { trigger: panel, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-parallax]", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: scrub });
      gsap.fromTo("[data-float]", { y: 28 }, { y: -28, ease: "none", scrollTrigger: scrub });
    });

    return () => mm.revert();
  }, []);

  const { images } = about;

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="section-space overflow-x-clip"
    >
      <div className="container-site">
        <SectionHeading
          id="about-title"
          eyebrow={about.eyebrow}
          title={about.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />

        {/* The ivory is its own layer so its wipe-in doesn't clip the photo
            rising above the panel. */}
        <div
          data-reveal="panel"
          className="relative isolate mt-24 flex flex-col gap-16 px-5 pb-14 sm:mt-28 sm:px-10 sm:pb-16 lg:mt-34 lg:flex-row lg:items-start lg:gap-[clamp(3rem,6vw,6rem)] lg:px-[clamp(2.5rem,5.5vw,5rem)] lg:pb-22"
        >
          <div data-reveal="backdrop" aria-hidden="true" className="absolute inset-0 -z-10 bg-ivory" />

          {/* Photos: pulled up so the main one breaks the panel's top edge. */}
          <div className="relative -mt-12 w-full max-w-[32.5rem] self-center sm:-mt-16 lg:-mt-18 lg:w-[44%] lg:shrink-0 lg:self-start">
            <div data-reveal="photo" className="relative aspect-4/5 overflow-hidden bg-beige">
              <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
                <Image
                  src={images.main.src}
                  alt={images.main.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 520px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div
              data-float
              className="absolute -right-3 -bottom-8 w-[38%] sm:-right-9 sm:-bottom-9"
            >
              <div
                data-reveal="photo"
                className="relative aspect-4/5 overflow-hidden border-6 border-ivory bg-beige sm:border-8"
              >
                <Image
                  src={images.detail.src}
                  alt={images.detail.alt}
                  fill
                  sizes="(min-width: 1024px) 200px, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div data-reveal="text" className="max-w-[38.75rem] lg:pt-22">
            <figure data-reveal="item">
              <p
                aria-hidden="true"
                className="h-11 font-serif text-[7rem] leading-[0.5] text-rose select-none"
              >
                &ldquo;
              </p>
              <blockquote>
                <p className="font-serif text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] leading-[1.14] font-medium tracking-[-0.015em] text-ink">
                  {about.quote}
                </p>
              </blockquote>
              <figcaption className="type-label mt-5 text-burgundy">{about.attribution}</figcaption>
            </figure>

            <p data-reveal="item" className="type-lead mt-9 border-t border-line pt-8 text-ink">
              {about.body}
            </p>

            <div data-reveal="item" className="mt-10">
              <Button href={about.cta.href}>{about.cta.label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
