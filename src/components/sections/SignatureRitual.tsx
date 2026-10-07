"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signature } from "@/content/home";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature experience on a deep burgundy band. Desktop: a tall photo on the
 * left that rises above the band into the white section before it, with a
 * thin offset frame behind; copy, details and CTA on the right. Tablet: a
 * side-by-side split. Mobile: copy first, photo below.
 */
export function SignatureRitual() {
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
        .from(media.querySelector("img"), { scale: 1.12, duration: 2.2, ease: "power2.out" }, 0.1)
        .from("[data-reveal='frame']", { opacity: 0, duration: 1, ease: "power1.out" }, 0.9);

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

  const { titleLines } = signature;

  return (
    <section
      ref={sectionRef}
      id="signature"
      aria-labelledby="signature-title"
      className="section-space bg-burgundy text-ivory lg:pt-0"
    >
      <div className="container-site grid grid-cols-1 gap-y-14 md:grid-cols-2 md:items-center md:gap-x-10 lg:grid-cols-12">
        {/* Copy */}
        <div
          data-reveal="text"
          className="lg:col-span-6 lg:col-start-7 lg:pt-[clamp(4rem,3rem+4vw,7rem)]"
        >
          <p data-reveal="item" className="type-label text-ivory/70">
            {signature.eyebrow}
          </p>
          <h2 id="signature-title" data-reveal="item" className="type-display mt-6 text-ivory md:mt-8">
            {titleLines.map((line, i) => (
              <span key={line} className={`block ${i > 0 ? "italic" : ""}`}>
                {line}
                {/* Keeps words separated for screen readers and copy-paste. */}
                {i < titleLines.length - 1 && " "}
              </span>
            ))}
          </h2>
          <p data-reveal="item" className="type-lead mt-7 max-w-[32rem] text-ivory/80 md:mt-8">
            {signature.body}
          </p>

          <dl
            data-reveal="item"
            className="mt-9 grid max-w-[32rem] grid-cols-2 border-t border-ivory/20"
          >
            {signature.details.map((detail, i) => (
              <div
                key={detail.label}
                className={`flex flex-col border-b border-ivory/20 py-4 ${
                  i % 2 === 1 ? "border-l pl-5 sm:pl-6" : "pr-4"
                }`}
              >
                <dt className="type-label order-2 mt-1.5 text-ivory/55">{detail.label}</dt>
                {/* Wraps between items, never inside one. */}
                <dd className="type-ui order-1 text-ivory">
                  {detail.value.split(" · ").map((part, p) => (
                    <span key={part}>
                      {p > 0 && " · "}
                      <span className="whitespace-nowrap">{part}</span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal="item" className="mt-10">
            <Button href={signature.cta.href} variant="ivory">
              {signature.cta.label}
            </Button>
          </div>
        </div>

        {/* Photo. Desktop: rises above the band; the thin frame sits offset behind it. */}
        <div className="relative md:order-first lg:col-span-5 lg:row-start-1 lg:-mt-24 lg:self-start">
          <div
            data-reveal="frame"
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 border border-ivory/25 sm:translate-x-5 sm:translate-y-5"
          />
          <div data-reveal="image" className="relative aspect-4/5 overflow-hidden bg-burgundy-deep">
            <div data-parallax className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
              <Image
                src={signature.image.src}
                alt={signature.image.alt}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
