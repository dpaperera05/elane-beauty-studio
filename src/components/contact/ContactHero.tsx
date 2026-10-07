"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { contactHero } from "@/content/contact";

/**
 * Page opener, a compact split: the label, title and intro on the left; one
 * landscape photo of the studio's reception on the right over a soft ivory
 * block. Deliberately short, so the contact details below are within easy
 * reach. Stacks text-first below lg. Plays once on load.
 */
export function ContactHero() {
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
      });

      // The ivory block wipes in, then the photo unmasks upward and settles
      // from a slight zoom.
      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline()
        .fromTo(
          "[data-reveal='backdrop']",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          0.1,
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2, ease: "power2.out" }, 0.2);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-hero-title"
      className="container-site overflow-x-clip pt-12 pb-14 md:pt-16 md:pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div className="lg:col-span-6">
          <p data-reveal="item" className="type-label flex items-center gap-4 text-ink sm:gap-5">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
            {contactHero.eyebrow}
          </p>
          <h1
            id="contact-hero-title"
            data-reveal="item"
            className="type-h2 mt-5 max-w-[14ch] leading-[0.94] tracking-[-0.035em] text-burgundy md:mt-6"
          >
            {contactHero.title}
          </h1>
          <p data-reveal="item" className="type-lead mt-6 max-w-[31rem] text-ink md:mt-7">
            {contactHero.body}
          </p>
        </div>

        {/* Photo. The top and right padding leave room for the ivory block to
            run past it to the container edge. */}
        <div className="relative isolate pt-6 pr-[6%] sm:pt-8 lg:col-span-6 lg:col-start-7">
          <div
            data-reveal="backdrop"
            aria-hidden="true"
            className="absolute top-0 right-0 bottom-[36%] left-[42%] -z-10 bg-ivory"
          />
          <div data-reveal="image" className="relative aspect-4/3 overflow-hidden bg-beige lg:aspect-5/4">
            <Image
              src={contactHero.image.src}
              alt={contactHero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 44vw, 94vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
