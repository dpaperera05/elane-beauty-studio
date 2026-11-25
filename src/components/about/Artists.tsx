"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artists, type Artist } from "@/content/about";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * The team: a centred heading, then the first artist featured large beside
 * the rest in a two-by-two grid, all with arch-topped portraits (siblings of
 * the gallery's capsules). Below lg the featured portrait comes first and the
 * others follow two across. Hover zooms the photo and slides a hairline arch
 * out from behind it; portraits unmask upward as they arrive.
 */
export function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
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

  const [lead, ...others] = artists.members;

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

        <div className="mx-auto mt-12 flex max-w-[76rem] flex-col gap-12 md:mt-16 lg:mt-20 lg:flex-row lg:items-start lg:gap-[clamp(2rem,4vw,4rem)]">
          <div className="lg:w-[44%] lg:shrink-0">
            <Portrait artist={lead} featured />
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:flex-1 lg:gap-y-12">
            {others.map((artist) => (
              <li key={artist.id}>
                <Portrait artist={artist} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Portrait({ artist, featured = false }: { artist: Artist; featured?: boolean }) {
  return (
    <article id={artist.id} data-card className="group">
      <div className="relative isolate">
        {/* Hover: a hairline arch slides out from behind the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-t-full border border-burgundy/40 opacity-0 transition duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-hover:opacity-100 motion-reduce:transition-none"
        />
        <div
          data-card-media
          className="relative aspect-4/5 overflow-hidden rounded-t-full bg-beige"
        >
          <Image
            src={artist.image.src}
            alt={artist.image.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 34rem, 92vw" : "(min-width: 1024px) 19rem, 46vw"}
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
          />
        </div>
      </div>

      {featured ? (
        <div
          data-card-caption
          className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
        >
          <div>
            <h3 className="font-serif text-[clamp(1.875rem,1.6rem+1vw,2.375rem)] leading-none font-medium text-ink transition-colors duration-500 group-hover:text-burgundy">
              {artist.name}
            </h3>
            <p className="type-small mt-2 text-ink/80">{artist.role}</p>
          </div>
          <p className="type-label text-burgundy">{artist.specialties}</p>
        </div>
      ) : (
        <div data-card-caption className="mt-4 sm:mt-5">
          <h3 className="type-h4 text-ink transition-colors duration-500 group-hover:text-burgundy">
            {artist.name}
          </h3>
          <p className="type-small mt-0.5 text-ink/80">{artist.role}</p>
          <p className="type-label mt-2.5 text-burgundy">{artist.specialties}</p>
        </div>
      )}
    </article>
  );
}
