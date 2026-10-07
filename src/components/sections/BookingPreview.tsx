"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { booking } from "@/content/home";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Booking preview on deep charcoal, under a centred heading. Choosing a
 * service (a radio group of pills) updates the summary on the right: the old
 * details fade away, then the new ones slide in. "Start Booking" carries the
 * choice to /book.
 */
export function BookingPreview() {
  const { options } = booking;
  // `selected` follows the pills at once; `shown` swaps the summary only
  // after the outgoing details have faded.
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstShow = useRef(true);

  const instant = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (selected === shown) return;
    const fields = summaryRef.current?.querySelectorAll("[data-field]");
    if (!fields) return;
    gsap.to(fields, {
      autoAlpha: 0,
      y: -8,
      duration: instant() ? 0 : 0.22,
      ease: "power1.in",
      overwrite: true,
      onComplete: () => setShown(selected),
    });
  }, [selected, shown]);

  useEffect(() => {
    if (isFirstShow.current) {
      isFirstShow.current = false;
      return;
    }
    const fields = summaryRef.current?.querySelectorAll("[data-field]");
    if (!fields) return;
    gsap.fromTo(
      fields,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: instant() ? 0 : 0.55,
        stagger: instant() ? 0 : 0.06,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [shown]);

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
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "clamp(top 75%)", once: true },
      });

      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 85%)", once: true } })
        .fromTo(
          media,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0.1);
    });

    return () => mm.revert();
  }, []);

  // Radio-group keyboard support: arrow keys move and select.
  const onPillKey = (e: React.KeyboardEvent, i: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (i + step + options.length) % options.length;
    setSelected(next);
    pillRefs.current[next]?.focus();
  };

  const current = options[shown];

  return (
    <section
      ref={sectionRef}
      id="book"
      aria-labelledby="book-title"
      className="section-space bg-ink text-ivory"
    >
      <div className="container-site">
        <SectionHeading id="book-title" eyebrow={booking.eyebrow} title={booking.title} tone="dark" />
      </div>

      <div className="container-site mt-12 grid grid-cols-1 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-x-10 lg:mt-20 lg:grid-cols-12">
        {/* Intro + service choice */}
        <div className="lg:col-span-6">
          <p data-reveal="item" className="type-lead max-w-[28rem] text-ivory/70">
            {booking.body}
          </p>

          <div
            role="radiogroup"
            aria-label="Choose a service"
            className="mt-10 grid grid-cols-2 gap-3 sm:gap-3.5 lg:grid-cols-3"
          >
            {options.map((option, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={option.id}
                  ref={(el) => {
                    pillRefs.current[i] = el;
                  }}
                  data-reveal="item"
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => onPillKey(e, i)}
                  className={`type-ui flex h-14 items-center justify-between gap-2 rounded-full border pr-3.5 pl-4 text-left sm:gap-3 sm:pr-4 sm:pl-5 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                    isSelected
                      ? "border-ivory bg-ivory text-ink"
                      : "border-ivory/20 text-ivory/85 hover:border-ivory/50 hover:text-ivory"
                  }`}
                >
                  <span className="min-w-0 leading-tight">{option.name}</span>
                  {/* Radio mark: hollow ring, filled burgundy when chosen. */}
                  <span
                    aria-hidden="true"
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isSelected ? "border-burgundy" : "border-ivory/35"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full bg-burgundy transition-transform duration-300 ${
                        isSelected ? "scale-100" : "scale-0"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal="image" className="relative aspect-16/9 overflow-hidden bg-burgundy-deep">
            <Image
              src={booking.image.src}
              alt={booking.image.alt}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 100vw"
              className="object-cover object-[70%_center] opacity-85"
            />
          </div>

          <div ref={summaryRef} data-reveal="item" className="mt-8" aria-live="polite">
            <p className="type-label text-ivory/55">{booking.summaryLabel}</p>
            <h3 data-field className="type-h3 mt-3 text-ivory">
              {current.name}
            </h3>

            <dl data-field className="mt-6 grid grid-cols-2 border-y border-ivory/15">
              <div className="flex flex-col py-4 pr-4">
                <dt className="type-label order-2 mt-1.5 text-ivory/50">Duration</dt>
                <dd className="type-ui order-1 text-ivory">{current.duration}</dd>
              </div>
              <div className="flex flex-col border-l border-ivory/15 py-4 pl-5">
                <dt className="type-label order-2 mt-1.5 text-ivory/50">Price</dt>
                <dd className="type-ui order-1 text-ivory">{current.price}</dd>
              </div>
            </dl>

            <p data-field className="type-small mt-5 max-w-[26rem] text-ivory/70">
              {current.description}
            </p>
          </div>

          <div
            data-reveal="item"
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Button href={`${booking.primary.href}?service=${options[selected].id}`} variant="ivory">
              {booking.primary.label}
            </Button>
            <a
              href={booking.secondary.href}
              className="type-ui group inline-flex items-center gap-2 text-ivory/85 transition-colors hover:text-ivory"
            >
              <span className="underline decoration-ivory/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-ivory">
                {booking.secondary.label}
              </span>
              <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
