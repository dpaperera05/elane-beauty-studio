"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2, MessageCircleHeart, type LucideIcon } from "lucide-react";
import { about } from "@/content/home";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const highlightIcons: Record<(typeof about.highlights)[number]["icon"], LucideIcon> = {
  disciplines: Flower2,
  consultation: MessageCircleHeart,
};

/**
 * Studio introduction: a centred heading, then copy on the left and a
 * three-photo collage of the studio interior on the right. Stacks text-first
 * below lg.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const collage = section.querySelector("[data-reveal='collage']")!;

      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='text']", start: "clamp(top 80%)", once: true },
      });

      // The backdrop wipes in, then the photos unmask upward one after
      // another, each settling from a slight zoom.
      gsap
        .timeline({ scrollTrigger: { trigger: collage, start: "clamp(top 80%)", once: true } })
        .fromTo(
          "[data-reveal='photo']",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.18, ease: "expo.inOut" },
          0.1,
        )
        .from(
          "[data-reveal='photo'] img",
          { scale: 1.12, duration: 1.8, stagger: 0.18, ease: "power2.out" },
          0.2,
        )
        .fromTo(
          "[data-reveal='backdrop']",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          0,
        );

      // The backdrop drifts slightly against the scroll so it reads as a
      // layer behind the photos.
      gsap.fromTo(
        "[data-reveal='backdrop']",
        { y: 24 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: { trigger: collage, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // Gentle drift on the main photo; its wrapper is oversized so no edge shows.
      gsap.fromTo(
        "[data-parallax]",
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: collage, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const { images } = about;

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="section-space overflow-x-clip pb-10 lg:pb-12"
    >
      <div className="container-site">
        <SectionHeading
          id="about-title"
          eyebrow={about.eyebrow}
          title={about.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />

        <div className="mt-12 grid grid-cols-1 gap-y-16 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-10">
          {/* Copy */}
          <div data-reveal="text" className="max-w-[36rem] lg:col-span-6">
            {/* Desktop: pulled up by its half-leading so the first line sits
                level with the photo top. */}
            <div data-reveal="item" className="space-y-5 lg:-mt-[0.5em]">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="type-lead text-ink">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights: a compact ivory strip, each stat with its icon. */}
            <ul data-reveal="item" className="mt-8 grid max-w-[30rem] grid-cols-2 bg-ivory">
              {about.highlights.map((item) => {
                const HighlightIcon = highlightIcons[item.icon];
                return (
                  <li
                    key={item.value}
                    className="flex flex-col gap-2.5 px-4 py-3.5 not-first:border-l not-first:border-line sm:flex-row sm:items-center sm:gap-3.5 sm:px-5"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-burgundy">
                      <HighlightIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                    </span>
                    <span>
                      <span className="block font-serif text-[1.625rem] leading-none font-medium text-burgundy lining-nums">
                        {item.value}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-ink">{item.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div
              data-reveal="item"
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <Button href={about.cta.href}>{about.cta.label}</Button>
              <p className="type-small flex items-center gap-2.5 text-ink">
                <Icon name="pin" className="size-4 shrink-0 text-burgundy" />
                {about.location}
              </p>
            </div>
          </div>

          {/* Collage: a large photo on the left and a narrower column set
              lower on the right (portrait over square), with a soft ivory
              block behind the top right. The right padding leaves room for the
              block to run past the photos to the container edge. */}
          <div
            data-reveal="collage"
            className="relative isolate pr-[3.5%] lg:col-span-6 lg:col-start-7"
          >
            <div
              data-reveal="backdrop"
              aria-hidden="true"
              className="absolute -top-6 right-0 bottom-[45%] left-[44%] -z-10 bg-ivory sm:-top-8 lg:-top-10"
            />

            <div className="grid grid-cols-[64fr_31fr] gap-x-[2.3%]">
              <div
                data-reveal="photo"
                className="relative aspect-4/5 overflow-hidden bg-beige"
              >
                <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
                  <Image
                    src={images.main.src}
                    alt={images.main.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 64vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Set lower so the collage reads as staggered. */}
              <div className="flex flex-col gap-3 pt-[38%] sm:gap-4">
                {[
                  { ...images.secondary, aspect: "aspect-3/4" },
                  { ...images.detail, aspect: "aspect-square" },
                ].map((image) => (
                  <div
                    key={image.src}
                    data-reveal="photo"
                    className={`relative overflow-hidden bg-beige ${image.aspect}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 15vw, 31vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
