"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/content/about";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inside the studio: a centred heading over three tall capsule photos of the
 * space (siblings of the homepage gallery's capsules), the middle one set
 * lower, each captioned in the serif. Phones get a swipeable row instead of
 * three stacked capsules. The capsules unmask upward on entry, each photo
 * settling from a slight zoom.
 */
export function Studio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-reveal='row']", start: "clamp(top 85%)", once: true },
        })
        .fromTo(
          "[data-reveal='capsule']",
          { clipPath: "inset(100% 0% 0% 0% round 999px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 999px)",
            duration: 1.4,
            stagger: 0.18,
            ease: "expo.inOut",
          },
        )
        .from(
          "[data-reveal='capsule'] img",
          { scale: 1.12, duration: 1.8, stagger: 0.18, ease: "power2.out" },
          0.1,
        )
        .from(
          "[data-reveal='caption']",
          { opacity: 0, y: 14, duration: 0.9, stagger: 0.18, ease: "power3.out" },
          0.8,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      aria-labelledby="studio-title"
      className="pb-[clamp(4rem,3rem+4vw,7rem)]"
    >
      <div className="container-site">
        <SectionHeading
          id="studio-title"
          eyebrow={studio.eyebrow}
          title={studio.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />
      </div>

      {/* Phones: a swipeable row that bleeds to the screen edges. From md:
          three across, the middle one lower. */}
      <ul
        data-reveal="row"
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1rem,0.7rem+1.5vw,3rem)] pb-2 [scrollbar-width:none] md:mx-auto md:mt-16 md:grid md:max-w-[72rem] md:grid-cols-3 md:items-start md:gap-8 md:overflow-visible md:px-8 lg:mt-20 [&::-webkit-scrollbar]:hidden"
      >
        {studio.spaces.map((space, i) => (
          <li
            key={space.label}
            className={`w-[62vw] max-w-[17rem] shrink-0 snap-center md:w-auto md:max-w-none ${
              i === 1 ? "md:mt-18" : ""
            }`}
          >
            <div data-reveal="capsule" className="relative aspect-5/8 overflow-hidden rounded-full bg-beige">
              <Image
                src={space.image.src}
                alt={space.image.alt}
                fill
                sizes="(min-width: 768px) 30vw, 62vw"
                style={{ objectPosition: space.image.position }}
                className="object-cover"
              />
            </div>
            <p data-reveal="caption" className="type-h4 mt-5 text-center text-ink">
              {space.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
