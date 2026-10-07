"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  bookingHref,
  formatLkr,
  formatMinutes,
  serviceCategories,
  serviceMenu,
  type ServiceCategory,
} from "@/content/services";
import { Icon } from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One category of the menu: its number, name and intro over a list of service
 * rows, beside one photo with a hairline frame offset behind it. The photo
 * swaps sides from one category to the next and, on desktop, stays in view
 * while the rows scroll past. Below lg the photo comes first, as a banner.
 *
 * A row is a small two-by-two grid from sm: name and duration/price on the
 * first line, description and the booking link on the second. On phones the
 * four stack, so the price can never run into the name.
 */
export function ServiceCategorySection({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  // Odd categories carry their photo on the right.
  const flipped = index % 2 === 1;
  const titleId = `${category.id}-title`;

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
        scrollTrigger: { trigger: "[data-reveal='header']", start: "clamp(top 85%)", once: true },
      });

      // The photo unmasks upward, settling from a slight zoom; its frame
      // follows.
      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 85%)", once: true } })
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2, ease: "power2.out" }, 0.1)
        .from("[data-reveal='frame']", { opacity: 0, duration: 1, ease: "power1.out" }, 0.9);

      // Rows rise in as they arrive, those arriving together one after another.
      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>("[data-reveal='row']"), {
        start: "clamp(top 92%)",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, { opacity: 0, y: 16, duration: 0.8, stagger: 0.07, ease: "power3.out" }),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={category.id}
      data-menu-section={category.id}
      aria-labelledby={titleId}
      // The extra scroll margin clears the sticky category bar on a jump.
      className="scroll-mt-16 py-[clamp(3.5rem,2.5rem+4vw,6.5rem)] not-first-of-type:border-t not-first-of-type:border-line"
    >
      <div className="container-site grid grid-cols-1 gap-y-10 md:gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-10">
        {/* Photo. The padding leaves room for the frame's offset. `top` keeps
            it below the header and category bar while it sticks. */}
        <div
          className={`pb-4 lg:sticky lg:top-40 lg:col-span-5 lg:row-start-1 lg:pb-5 ${
            flipped ? "pl-4 lg:col-start-8 lg:pl-5" : "pr-4 lg:pr-5"
          }`}
        >
          <div className="relative isolate">
            <div
              data-reveal="frame"
              aria-hidden="true"
              className={`absolute inset-0 -z-10 translate-y-4 border border-burgundy/35 lg:translate-y-5 ${
                flipped ? "-translate-x-4 lg:-translate-x-5" : "translate-x-4 lg:translate-x-5"
              }`}
            />
            <div
              data-reveal="image"
              className="relative aspect-4/3 overflow-hidden bg-beige sm:aspect-16/10 lg:aspect-4/5 lg:max-h-[calc(100svh-13rem)] lg:w-full"
            >
              <Image
                src={category.image.src}
                alt={category.image.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className={`lg:col-span-6 lg:row-start-1 ${flipped ? "lg:col-start-1" : "lg:col-start-7"}`}>
          <header data-reveal="header">
            <p data-reveal="item" className="type-label text-burgundy">
              {pad(index + 1)} <span className="text-muted">/ {pad(serviceCategories.length)}</span>
            </p>
            <h2
              id={titleId}
              data-reveal="item"
              className="type-h2 mt-4 leading-[0.94] tracking-[-0.035em] text-burgundy"
            >
              {category.name}
            </h2>
            <p data-reveal="item" className="type-lead mt-5 max-w-[30rem] text-ink">
              {category.intro}
            </p>
          </header>

          <ul className="mt-8 border-b border-line md:mt-10">
            {category.services.map((service) => (
              <li
                key={service.id}
                data-reveal="row"
                className="group grid grid-cols-1 gap-y-1.5 border-t border-line pt-5 pb-3 sm:grid-cols-[1fr_auto] sm:gap-x-8 sm:gap-y-1 sm:pb-2.5"
              >
                <h3 className="type-h4 text-ink transition-colors duration-500 group-hover:text-burgundy">
                  {service.name}
                </h3>
                <p className="type-ui flex items-baseline gap-2.5 whitespace-nowrap tabular-nums sm:justify-end sm:pt-1">
                  <span className="font-normal text-muted">{formatMinutes(service.duration)}</span>
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                  <span className="font-semibold text-ink">{formatLkr(service.price)}</span>
                </p>
                <p className="type-small max-w-[34rem] text-muted sm:pt-1">{service.description}</p>
                {/* 44px tall, so it stays an easy target on touch screens. */}
                <a
                  href={bookingHref(category.id, service.id)}
                  aria-label={`${serviceMenu.bookLabel}: ${service.name}`}
                  className="type-ui group/link inline-flex h-11 items-center gap-2 justify-self-start text-burgundy transition-colors hover:text-burgundy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:justify-self-end"
                >
                  <span className="underline decoration-burgundy/30 decoration-1 underline-offset-[6px] transition-colors group-hover/link:decoration-burgundy">
                    {serviceMenu.bookLabel}
                  </span>
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
