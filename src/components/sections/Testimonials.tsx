"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/content/home";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Client stories on a warm ivory band. A centred heading with the guest
 * rating, then one large featured quote; desktop switches it from a row of
 * selectable previews (hover, focus or click), tablet/mobile use
 * previous/next controls. All quotes share one grid cell, so switching never
 * changes the section's height.
 */
export function Testimonials() {
  const { items } = testimonials;
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const quoteRefs = useRef<(HTMLElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Hand over in sequence: the old quote lifts away before the new one rises
  // in, so the two never overlap.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = (s: number) => (instant ? 0 : s);

    quoteRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: t(0.7), delay: t(0.3), ease: "power2.out", overwrite: true },
        );
      } else {
        gsap.to(el, { autoAlpha: 0, y: -10, duration: t(0.3), ease: "power1.in", overwrite: true });
      }
    });
  }, [active]);

  // Scroll entrance.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "clamp(top 75%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  const go = (step: number) => setActive((i) => (i + step + items.length) % items.length);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-space bg-ivory"
    >
      <div className="container-site">
        <SectionHeading
          id="testimonials-title"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          intro={testimonials.body}
        >
          <div className="flex items-center gap-4">
            <p className="font-serif text-4xl leading-none text-ink lining-nums">
              {testimonials.rating.value}
              <span className="text-xl text-muted"> / {testimonials.rating.outOf}</span>
            </p>
            <div className="text-left">
              <div className="flex gap-0.5 text-burgundy" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="type-small mt-1 text-muted">{testimonials.rating.label}</p>
            </div>
          </div>
        </SectionHeading>

        {/* Featured quote */}
        <div className="mx-auto mt-14 max-w-[56rem] md:mt-16 lg:mt-20">
          <span
            data-reveal="item"
            aria-hidden="true"
            className="block font-serif text-7xl leading-[0.6] text-burgundy/70 md:text-8xl"
          >
            &ldquo;
          </span>

          <div data-reveal="item" className="mt-6 grid">
            {items.map((item, i) => (
              <figure
                key={item.name}
                ref={(el) => {
                  quoteRefs.current[i] = el;
                }}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 ${i === 0 ? "" : "invisible opacity-0"}`}
              >
                <blockquote className="font-serif text-[clamp(1.625rem,1.2rem+1.6vw,2.625rem)] leading-[1.22] tracking-[-0.01em] text-ink">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="h-px w-8 bg-burgundy/60" aria-hidden="true" />
                  <span className="type-ui text-ink">{item.name}</span>
                  <span className="type-small text-muted">{item.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Desktop: selectable previews */}
          <ul data-reveal="item" className="mt-12 hidden grid-cols-3 gap-6 lg:grid">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Show ${item.name}'s story`}
                    className="group relative w-full pt-5 text-left outline-none"
                  >
                    {/* Track + burgundy fill for the active story. */}
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px origin-left bg-burgundy transition-transform duration-700 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <span
                      className={`type-label block transition-colors duration-500 ${
                        isActive ? "text-burgundy" : "text-muted"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`type-ui mt-3 block transition-colors duration-500 group-focus-visible:underline group-focus-visible:underline-offset-4 ${
                        isActive ? "text-ink" : "text-ink/60"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="type-small block text-muted">{item.service}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Tablet/mobile: previous / next */}
          <div data-reveal="item" className="mt-10 flex items-center justify-between border-t border-line pt-6 lg:hidden">
            <p className="type-label text-muted" aria-live="polite">
              <span className="text-burgundy">{pad(active + 1)}</span> / {pad(items.length)}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous story"
                className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next story"
                className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
