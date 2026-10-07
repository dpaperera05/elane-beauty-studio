"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/content/home";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Per-portrait shape and offset (desktop), so the row reads as staggered.
const layout = [
  { aspect: "lg:aspect-4/5", offset: "" },
  { aspect: "lg:aspect-3/4", offset: "md:mt-16 lg:mt-20" },
  { aspect: "lg:aspect-4/5", offset: "lg:mt-8" },
];

/**
 * A centred heading over three large portraits. Desktop: one staggered row
 * with varied heights. Tablet: two side by side with the third centred below.
 * Mobile: one column.
 * Each portrait is a link; hover zooms the photo and slides up "View profile".
 */
export function Team() {
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
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
              )
              .from(card.querySelector("[data-card-media] img"), { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0.1)
              .from(card.querySelector("[data-card-caption]"), { opacity: 0, y: 14, duration: 0.9, ease: "power3.out" }, 0.7);
          });
        },
      });

      gsap.from("[data-reveal='cta']", {
        opacity: 0,
        y: 16,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='cta']", start: "clamp(top 92%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" aria-labelledby="team-title" className="section-space">
      <div className="container-site">
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} intro={team.body} />

        <ul className="mt-12 grid grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {team.members.map((member, i) => {
            const isLast = i === team.members.length - 1;
            return (
              <li
                key={member.id}
                data-card
                className={`${layout[i].offset} ${
                  isLast ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto" : ""
                }`}
              >
                <a href={member.href} className="group block outline-none">
                  <div
                    data-card-media
                    className={`relative aspect-4/5 overflow-hidden bg-beige md:aspect-3/4 ${layout[i].aspect}`}
                  >
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05] motion-reduce:transition-none"
                    />
                    {/* Hover: soft shade and a "View profile" line rising from the bottom. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                    <span
                      aria-hidden="true"
                      className="type-ui absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:bottom-6 sm:left-6"
                    >
                      {team.profileLabel}
                      <Icon name="arrow" className="size-4" />
                    </span>
                  </div>

                  <div data-card-caption className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="type-h4 text-ink transition-colors duration-500 group-hover:text-burgundy group-focus-visible:text-burgundy">
                        {member.name}
                      </h3>
                      <p className="type-small mt-1 text-ink/80">
                        {member.role}
                        <span className="text-muted"> · {member.specialties}</span>
                      </p>
                    </div>
                    <span className="type-label shrink-0 pt-2 text-burgundy/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div data-reveal="cta" className="mt-14 flex justify-center md:mt-16 lg:mt-20">
          <Button href={team.cta.href} variant="secondary">
            {team.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
