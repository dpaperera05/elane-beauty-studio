"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Armchair, Droplets, MessageCircleHeart, Scissors, type LucideIcon } from "lucide-react";
import { whyElane } from "@/content/home";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<(typeof whyElane.points)[number]["icon"], LucideIcon> = {
  consultation: MessageCircleHeart,
  artists: Scissors,
  products: Droplets,
  space: Armchair,
};

/**
 * What sets the studio apart: a centred heading, then a portrait image on the
 * left and four points on the right. Phones read heading → image → points;
 * tablet and up put the image and points side by side.
 */
export function WhyElane() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 82%)", once: true } })
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2, ease: "power2.out" }, 0.1)
        .from("[data-reveal='caption']", { opacity: 0, duration: 0.9, ease: "power1.out" }, 1);

      gsap.from("[data-reveal='point']", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='points']", start: "clamp(top 85%)", once: true },
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

  return (
    <section
      ref={sectionRef}
      id="why-elane"
      aria-labelledby="why-elane-title"
      className="section-space"
    >
      <div className="container-site">
        <SectionHeading id="why-elane-title" eyebrow={whyElane.eyebrow} title={whyElane.title} />
      </div>

      <div className="container-site mt-12 grid grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-10 lg:mt-20 lg:grid-cols-12">
        {/* Image */}
        <figure className="lg:col-span-5">
          <div data-reveal="image" className="relative aspect-4/5 overflow-hidden bg-beige">
            <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
              <Image
                src={whyElane.image.src}
                alt={whyElane.image.alt}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption
            data-reveal="caption"
            className="type-small mt-5 flex items-center gap-3 text-muted"
          >
            <span className="h-px w-8 shrink-0 bg-burgundy/60" aria-hidden="true" />
            {whyElane.tagline}
          </figcaption>
        </figure>

        {/* Points */}
        <ul
          data-reveal="points"
          className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 md:grid-cols-1 md:self-center lg:col-span-7 lg:col-start-6 lg:grid-cols-2 lg:gap-x-8 lg:pl-6 xl:col-span-6 xl:pl-0 xl:col-start-7 xl:gap-x-10"
        >
          {whyElane.points.map((point) => {
            const PointIcon = icons[point.icon];
            return (
              <li
                key={point.title}
                data-reveal="point"
                className="border-t border-line py-6 sm:py-7 md:py-6 lg:py-7"
              >
                <PointIcon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-6 text-burgundy"
                />
                <h3 className="type-h4 mt-4 text-ink">{point.title}</h3>
                <p className="type-small mt-2 max-w-[19rem] text-muted">{point.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
