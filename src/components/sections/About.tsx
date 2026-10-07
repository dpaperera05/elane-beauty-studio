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
 * three-photo collage on the right (hair ritual, skin treatment, nail detail)
 * with a small "full-service" tag hanging off the main photo. Stacks
 * text-first below lg.
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

      // Photos unmask upward one after another, each settling from a slight
      // zoom; the tag follows.
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
        .from("[data-reveal='badge']", { opacity: 0, y: 16, duration: 0.9, ease: "power3.out" }, 1.1);

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

        <div className="mt-12 grid grid-cols-1 gap-y-16 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-10">
          {/* Copy */}
          <div data-reveal="text" className="max-w-[36rem] lg:col-span-5 lg:max-w-none">
            <p data-reveal="item" className="type-lead text-ink">
              {about.body}
            </p>

            {/* Highlights: a soft ivory panel, each stat with its icon. */}
            <ul data-reveal="item" className="mt-9 grid grid-cols-2 bg-ivory">
              {about.highlights.map((item) => {
                const HighlightIcon = highlightIcons[item.icon];
                return (
                  <li
                    key={item.value}
                    className="flex flex-col gap-3 px-4 py-5 not-first:border-l not-first:border-line sm:flex-row sm:items-center sm:gap-4 sm:px-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-burgundy">
                      <HighlightIcon aria-hidden="true" strokeWidth={1.4} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-serif text-[2.25rem] leading-none font-medium text-burgundy lining-nums">
                        {item.value}
                      </span>
                      <span className="type-small mt-1.5 block text-ink">{item.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div
              data-reveal="item"
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <Button href={about.cta.href}>{about.cta.label}</Button>
              <p className="type-small flex items-center gap-2.5 text-ink">
                <Icon name="pin" className="size-4 shrink-0 text-burgundy" />
                {about.location}
              </p>
            </div>
          </div>

          {/* Collage */}
          <div data-reveal="collage" className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-12 sm:gap-4">
              <div className="relative col-span-2 sm:col-span-8">
                <div data-reveal="photo" className="relative aspect-4/5 overflow-hidden bg-beige">
                  <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
                    <Image
                      src={images.main.src}
                      alt={images.main.alt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 64vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  data-reveal="badge"
                  className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 bg-white py-3 pr-4 pl-3 shadow-[0_18px_40px_-22px_rgb(27_25_24/0.45)] sm:bottom-6 sm:left-6 sm:gap-3.5 sm:py-3.5 sm:pr-5 sm:pl-3.5 lg:bottom-10 lg:-left-10 lg:max-w-none lg:whitespace-nowrap"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-burgundy text-ivory sm:size-10">
                    <Icon name="sparkle" className="size-4.5" />
                  </span>
                  <span>
                    <span className="type-ui block text-ink">{about.badge.title}</span>
                    {/* Phones: the body copy already lists these, so the tag stays compact. */}
                    <span className="type-small hidden text-muted sm:block">
                      {about.badge.services.join(" · ")}
                    </span>
                  </span>
                </div>
              </div>

              {/* Second column sits lower so the collage reads as staggered. */}
              <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-4 sm:grid-cols-1 sm:gap-4 sm:pt-16 lg:pt-20">
                <div
                  data-reveal="photo"
                  className="relative aspect-square overflow-hidden bg-beige sm:aspect-3/4"
                >
                  <Image
                    src={images.secondary.src}
                    alt={images.secondary.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div data-reveal="photo" className="relative aspect-square overflow-hidden bg-beige">
                  <Image
                    src={images.detail.src}
                    alt={images.detail.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
