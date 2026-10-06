"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/home";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio introduction: copy on the left, a three-photo collage on the right
 * (hair ritual, skin treatment, nail detail) over a soft ivory panel, with a
 * small "full-service" tag hanging off the main photo. Stacks text-first
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

      // Photos unmask upward one after another, each settling from a slight
      // zoom; the panel and tag follow.
      gsap
        .timeline({ scrollTrigger: { trigger: collage, start: "clamp(top 80%)", once: true } })
        .from("[data-reveal='panel']", { opacity: 0, x: 40, duration: 1.4, ease: "power3.out" }, 0)
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
      <div className="container-site grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* Copy */}
        <div data-reveal="text" className="max-w-[36rem] lg:col-span-5 lg:max-w-none">
          <p data-reveal="item" className="type-label text-burgundy/80">
            {about.eyebrow}
          </p>
          <h2 id="about-title" data-reveal="item" className="type-h2 mt-6 text-ink md:mt-7">
            {about.title}
          </h2>
          <p data-reveal="item" className="type-lead mt-6 text-muted md:mt-7">
            {about.body}
          </p>

          <dl
            data-reveal="item"
            className="mt-9 grid grid-cols-2 divide-x divide-line border-y border-line"
          >
            {about.highlights.map((item) => (
              <div key={item.value} className="flex flex-col py-5 pr-4 not-first:pl-5 sm:not-first:pl-6">
                <dt className="type-small order-2 mt-1.5 text-muted">{item.label}</dt>
                <dd className="type-h3 order-1 text-ink lining-nums">{item.value}</dd>
              </div>
            ))}
          </dl>

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
          {/* Warm panel behind the photos, peeking out top-right. */}
          <div
            data-reveal="panel"
            aria-hidden="true"
            className="absolute -top-6 -right-4 h-[62%] w-[58%] bg-ivory sm:-right-6 lg:-top-10"
          />

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
    </section>
  );
}
