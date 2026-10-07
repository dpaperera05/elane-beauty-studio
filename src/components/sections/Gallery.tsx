"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/content/home";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Tile = { mobile: string; desktop: string; sizes: string };

// Below lg: a compact two-column grid (landscapes span both columns).
// lg+: explicit placement on a 12-column grid with a fixed row unit, so the
// tiles form an asymmetric, magazine-style spread with deliberate gaps.
const tiles: Record<string, Tile> = {
  hair: {
    mobile: "aspect-3/4",
    desktop: "lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-8",
    sizes: "(min-width: 1024px) 30vw, 50vw",
  },
  nails: {
    mobile: "aspect-3/4",
    desktop: "lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-6",
    sizes: "(min-width: 1024px) 22vw, 50vw",
  },
  stylist: {
    mobile: "col-span-2 aspect-16/10",
    desktop: "lg:col-start-5 lg:col-span-5 lg:row-start-2 lg:row-span-5",
    sizes: "(min-width: 1024px) 37vw, 100vw",
  },
  bridal: {
    mobile: "aspect-4/5",
    desktop: "lg:col-start-10 lg:col-span-3 lg:row-start-8 lg:row-span-6",
    sizes: "(min-width: 1024px) 22vw, 50vw",
  },
  skin: {
    mobile: "aspect-4/5",
    desktop: "lg:col-start-1 lg:col-span-4 lg:row-start-10 lg:row-span-4",
    sizes: "(min-width: 1024px) 30vw, 50vw",
  },
  interior: {
    mobile: "col-span-2 aspect-16/10",
    desktop: "lg:col-start-5 lg:col-span-5 lg:row-start-8 lg:row-span-6",
    sizes: "(min-width: 1024px) 37vw, 100vw",
  },
};

/**
 * Gallery preview: an editorial mixed-size grid of the studio's work. Each
 * tile links into the gallery; hover zooms the photo and shows its category
 * (always shown on touch screens, which have no hover).
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Tiles unmask upward as they arrive, each photo settling from a slight zoom.
      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>("[data-tile]"), {
        start: "clamp(top 90%)",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.12, ease: "expo.inOut" },
          );
          gsap.from(
            batch.map((tile) => tile.querySelector("img")),
            { scale: 1.14, duration: 1.8, stagger: 0.12, ease: "power2.out" },
          );
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" aria-labelledby="gallery-title" className="section-space">
      <div className="container-site">
        <SectionHeading
          id="gallery-title"
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          intro={gallery.body}
        >
          <Button href={gallery.cta.href} variant="secondary">
            {gallery.cta.label}
          </Button>
        </SectionHeading>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:auto-rows-[clamp(2.75rem,4.4vw,4.25rem)] lg:gap-6">
          {gallery.items.map((item) => {
            const tile = tiles[item.id];
            return (
              <li
                key={item.id}
                data-tile
                className={`relative overflow-hidden bg-beige lg:aspect-auto ${tile.mobile} ${tile.desktop}`}
              >
                <a href={`${gallery.cta.href}#${item.id}`} className="group absolute inset-0 block outline-none">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={tile.sizes}
                    style={{ objectPosition: item.position }}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05] motion-reduce:transition-none"
                  />
                  {/* Category: revealed on hover/focus; always shown where there's no hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                  />
                  <span className="type-label absolute bottom-3 left-3 translate-y-2 text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:bottom-5 sm:left-5 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    {item.category}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
