"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ritualFeature } from "@/content/services";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * The signature experience, in the homepage Ritual's own treatment: a deep
 * wine band with a warm glow, a large faint É, the two-line display title and
 * its details between hairlines. Here the copy sits on the left and the photo
 * on the right, and the button books the Ritual directly. Mobile: photo first.
 */
export function RitualFeature() {
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
        scrollTrigger: { trigger: "[data-reveal='text']", start: "clamp(top 80%)", once: true },
      });

      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 85%)", once: true } })
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2.2, ease: "power2.out" }, 0.1);

      gsap.from("[data-reveal='monogram']", {
        opacity: 0,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: { trigger: section, start: "clamp(top 70%)", once: true },
      });

      // Gentle drift on the photo; its wrapper is oversized so no edge shows.
      gsap.fromTo(
        "[data-parallax]",
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const { titleLines } = ritualFeature;

  return (
    <section
      ref={sectionRef}
      id={ritualFeature.id}
      data-menu-section=""
      aria-labelledby="ritual-title"
      className="relative isolate scroll-mt-16 overflow-hidden bg-burgundy bg-[radial-gradient(ellipse_75%_65%_at_12%_8%,rgb(150_72_82/0.55),transparent_70%),linear-gradient(200deg,var(--color-burgundy)_15%,var(--color-burgundy-deep)_100%)] py-[clamp(3.5rem,2.5rem+3.5vw,6rem)] text-ivory"
    >
      {/* The one decorative detail: an oversized, faint É in the corner. */}
      <span
        data-reveal="monogram"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.24em] left-[-0.06em] -z-10 font-serif text-[clamp(18rem,10rem+24vw,38rem)] leading-none text-ivory/4.5 select-none"
      >
        É
      </span>

      <div className="container-site grid grid-cols-1 gap-y-12 md:gap-y-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* Photo */}
        <div className="mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:col-start-8 lg:mx-0 lg:max-w-none xl:col-span-4 xl:col-start-9">
          <div data-reveal="image" className="relative aspect-4/5 overflow-hidden bg-burgundy-deep">
            <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
              <Image
                src={ritualFeature.image.src}
                alt={ritualFeature.image.alt}
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 38vw, (min-width: 448px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div
          data-reveal="text"
          className="mx-auto w-full max-w-md lg:col-span-6 lg:row-start-1 lg:mx-0 lg:max-w-[34rem] xl:col-start-2"
        >
          <p data-reveal="item" className="type-label text-rose">
            {ritualFeature.eyebrow}
          </p>
          <h2 id="ritual-title" data-reveal="item" className="type-display mt-5 text-ivory md:mt-6">
            {titleLines.map((line, i) => (
              <span key={line} className={`block ${i > 0 ? "italic" : ""}`}>
                {line}
                {/* Keeps words separated for screen readers and copy-paste. */}
                {i < titleLines.length - 1 && " "}
              </span>
            ))}
          </h2>
          <p data-reveal="item" className="type-lead mt-6 text-ivory/80 md:mt-7">
            {ritualFeature.body}
          </p>

          <dl
            data-reveal="item"
            className="mt-9 flex border-y border-ivory/20 py-5 md:mt-10"
          >
            {ritualFeature.details.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col gap-1.5 px-6 not-first:border-l not-first:border-ivory/20 first:pl-0"
              >
                <dt className="type-label text-ivory/55">{detail.label}</dt>
                <dd className="type-ui whitespace-nowrap text-ivory tabular-nums">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal="item" className="mt-10">
            <Button href={ritualFeature.cta.href} variant="ivory">
              {ritualFeature.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
