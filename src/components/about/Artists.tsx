"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artists } from "@/content/about";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Per-portrait placement. Desktop: three across, then two centred beneath;
// the middle of the first row and the last of the second sit lower. Tablet:
// two columns, the right one set lower, the fifth centred on its own.
const layout = [
  "lg:col-span-2",
  "md:mt-14 lg:col-span-2",
  "lg:col-span-2",
  "md:mt-14 lg:col-span-2 lg:col-start-2 lg:mt-0",
  "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)] lg:col-span-2 lg:mx-0 lg:mt-14 lg:w-auto",
];

/**
 * The team: a centred heading over five arch-topped portraits (a sibling of
 * the gallery's capsules), each with its name, role and specialties centred
 * beneath. Hover zooms the photo and slides a hairline arch out from behind
 * it.
 */
export function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Portraits unmask upward as they arrive (a row at a time), each photo
      // settling from a slight zoom; the caption follows.
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      ScrollTrigger.batch(cards, {
        start: "clamp(top 88%)",
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, i) => {
            gsap
              .timeline({ delay: i * 0.15 })
              .fromTo(
                card.querySelector("[data-card-media]"),
                { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)",
                  duration: 1.4,
                  ease: "expo.inOut",
                },
              )
              .from(card.querySelector("img"), { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0.1)
              .from(
                card.querySelector("[data-card-caption]"),
                { opacity: 0, y: 14, duration: 0.9, ease: "power3.out" },
                0.7,
              );
          });
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" aria-labelledby="team-title" className="section-space">
      <div className="container-site">
        <SectionHeading
          id="team-title"
          eyebrow={artists.eyebrow}
          title={artists.title}
          intro={artists.body}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />

        <ul className="mx-auto mt-12 grid max-w-[66rem] grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:mt-20 lg:grid-cols-6 lg:gap-x-12 lg:gap-y-16">
          {artists.members.map((member, i) => (
            <li key={member.id} id={member.id} data-card className={`group ${layout[i]}`}>
              {/* Capped on phones so the five stay quick to scan. */}
              <div className="relative isolate mx-auto w-full max-w-[17rem] sm:max-w-[20rem] md:max-w-none">
                {/* Hover: a hairline arch slides out from behind the photo. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-t-full border border-burgundy/40 opacity-0 transition duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-hover:opacity-100 motion-reduce:transition-none"
                />
                <div
                  data-card-media
                  className="relative aspect-3/4 overflow-hidden rounded-t-full bg-beige"
                >
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 768px) 46vw, 20rem"
                    className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                  />
                </div>
              </div>

              <div data-card-caption className="mt-6 text-center">
                <h3 className="type-h4 text-ink transition-colors duration-500 group-hover:text-burgundy">
                  {member.name}
                </h3>
                <p className="type-small mt-0.5 text-ink/80">{member.role}</p>
                <p className="type-label mt-3 text-burgundy">{member.specialties}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
