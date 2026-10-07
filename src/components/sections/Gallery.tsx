"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/content/home";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Drift speed in px per second.
const SPEED = 40;

/**
 * Gallery preview: two full-bleed rows of capsule-shaped portraits that drift
 * endlessly, the first to the left and the second to the right. Each row's
 * photos are rendered twice, so sliding the track by half its width loops
 * seamlessly. Rows keep moving under the cursor and pause only while off
 * screen. With reduced motion the rows stay still.
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='row']", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='rows']", start: "clamp(top 85%)", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((row) => {
        const track = row.querySelector<HTMLElement>("[data-track]")!;
        const toRight = row.dataset.marquee === "right";
        const loop = gsap.fromTo(
          track,
          { xPercent: toRight ? -50 : 0 },
          {
            xPercent: toRight ? 0 : -50,
            duration: track.scrollWidth / 2 / SPEED,
            ease: "none",
            repeat: -1,
          },
        );

        ScrollTrigger.create({
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" aria-labelledby="gallery-title" className="section-space overflow-x-clip">
      <div className="container-site">
        <SectionHeading
          id="gallery-title"
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          intro={gallery.body}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        >
          <Button href={gallery.cta.href} variant="secondary">
            {gallery.cta.label}
          </Button>
        </SectionHeading>
      </div>

      {/* Full-bleed rows; the edges fade out so photos glide in and out. */}
      <div
        data-reveal="rows"
        className="mt-12 flex flex-col gap-3 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:gap-4 md:mt-16 lg:mt-20 lg:gap-5"
      >
        {gallery.rows.map((photos, r) => (
          <div
            key={r}
            data-reveal="row"
            data-marquee={r % 2 === 0 ? "left" : "right"}
            className="overflow-hidden"
          >
            {/* Each photo carries its own right padding (not a flex gap), so
                the two copies are exactly half the track each. */}
            <ul data-track className="flex w-max">
              {[...photos, ...photos].map((photo, i) => {
                const isCopy = i >= photos.length;
                return (
                  <li
                    key={`${photo.src}-${i}`}
                    aria-hidden={isCopy || undefined}
                    className="pr-3 sm:pr-4 lg:pr-5"
                  >
                    <div className="group relative aspect-2/3 w-[clamp(9rem,5.5rem+11vw,16rem)] overflow-hidden rounded-full bg-beige">
                      <Image
                        src={photo.src}
                        alt={isCopy ? "" : photo.alt}
                        fill
                        sizes="(min-width: 1024px) 16rem, (min-width: 640px) 12rem, 9rem"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
