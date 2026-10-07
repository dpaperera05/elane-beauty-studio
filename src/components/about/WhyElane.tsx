"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Armchair, Droplets, MessageCircleHeart, Scissors, type LucideIcon } from "lucide-react";
import { why } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<(typeof why.points)[number]["icon"], LucideIcon> = {
  consultation: MessageCircleHeart,
  artists: Scissors,
  products: Droplets,
  space: Armchair,
};

/**
 * What sets the studio apart, on the same wine band as the homepage's
 * Signature Ritual (its glow mirrored to the top left). Desktop: a portrait
 * photo on the left with a hairline frame offset behind it, and the title
 * over the four points (between hairlines, two by two from xl) on the right.
 * Mobile: photo first, then the title and the points in one column.
 */
export function WhyElane() {
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
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='text']", start: "clamp(top 80%)", once: true },
      });

      // The photo unmasks upward, then its frame fades in.
      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 85%)", once: true } })
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2.2, ease: "power2.out" }, 0.1)
        .from("[data-reveal='frame']", { opacity: 0, duration: 1, ease: "power1.out" }, 1);

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
      className="relative isolate overflow-hidden bg-burgundy bg-[radial-gradient(ellipse_75%_65%_at_12%_8%,rgb(150_72_82/0.55),transparent_70%),linear-gradient(200deg,var(--color-burgundy)_15%,var(--color-burgundy-deep)_100%)] py-[clamp(3.5rem,2.5rem+3.5vw,6rem)] text-ivory"
    >
      <div className="container-site grid grid-cols-1 gap-y-12 md:gap-y-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* Photo. The padding leaves room for the frame's offset. */}
        <div className="mx-auto w-full max-w-md pr-4 pb-4 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-5 lg:pb-5">
          <div className="relative isolate">
            <div
              data-reveal="frame"
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-x-4 translate-y-4 border border-rose/45 lg:translate-x-5 lg:translate-y-5"
            />
            <div data-reveal="image" className="relative aspect-4/5 overflow-hidden bg-burgundy-deep">
              <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
                <Image
                  src={why.image.src}
                  alt={why.image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 448px) 28rem, 100vw"
                  className="object-cover object-[58%_50%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div
          data-reveal="text"
          className="mx-auto w-full max-w-md lg:col-span-6 lg:col-start-7 lg:mx-0 lg:max-w-none"
        >
          <p data-reveal="item" className="type-label text-rose">
            {why.eyebrow}
          </p>
          <h2
            id="why-elane-title"
            data-reveal="item"
            className="type-h2 mt-5 max-w-[14ch] leading-[0.94] tracking-[-0.035em] text-ivory md:mt-6"
          >
            {why.title}
          </h2>

          <ul className="mt-9 grid grid-cols-1 border-b border-ivory/20 md:mt-10 xl:grid-cols-2 xl:gap-x-10">
            {why.points.map((point) => {
              const PointIcon = icons[point.icon];
              return (
                <li
                  key={point.title}
                  data-reveal="item"
                  className="flex items-start gap-4 border-t border-ivory/20 py-6"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-rose">
                    <PointIcon aria-hidden="true" strokeWidth={1.25} className="size-[1.125rem]" />
                  </span>
                  <div>
                    <h3 className="type-h4 text-ivory">{point.title}</h3>
                    <p className="type-small mt-1.5 text-ivory/75">{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
