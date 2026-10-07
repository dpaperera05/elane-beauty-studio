"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/content/home";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Desktop (lg) is the hover/focus explorer; below it the list is an accordion.
const DESKTOP_QUERY = "(min-width: 64rem)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function ExploreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="type-ui group/link inline-flex shrink-0 items-center gap-2 text-ink transition-colors hover:text-burgundy focus-visible:text-burgundy"
    >
      <span className="underline decoration-line decoration-1 underline-offset-[6px] transition-colors group-hover/link:decoration-burgundy">
        {services.linkLabel}
      </span>
      <Icon
        name="arrow"
        className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </a>
  );
}

/**
 * Service explorer under a centred heading. Desktop: a compact numbered list
 * on the left; hovering or focusing a row cross-fades the 4:5 photo on the
 * right, which matches the list's height. The section fills one screen with
 * its content centred. Tablet/mobile: a tap accordion with the photo beneath
 * the open service.
 */
export function Services() {
  const isDesktop = useIsDesktop();
  // `active` drives the desktop panel; `open` drives the accordion.
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Photos cross-fade with a slight rise (the outgoing one fades a beat later
  // so there's no gap).
  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = (s: number) => (instant ? 0 : s);

    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        if (Number(gsap.getProperty(el, "opacity")) === 0) gsap.set(el, { yPercent: 3, scale: 1.03 });
        gsap.set(el, { zIndex: 1 });
        gsap.to(el, {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: t(0.9),
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.set(el, { zIndex: 0 });
        gsap.to(el, { autoAlpha: 0, duration: t(0.5), delay: t(0.3), ease: "power1.out", overwrite: true });
      }
    });
  }, [active]);

  // Scroll entrance.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='row']", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='list']", start: "clamp(top 85%)", once: true },
      });

      const panel = section.querySelector("[data-reveal='panel']")!;
      gsap.fromTo(
        panel,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: panel, start: "clamp(top 85%)", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const { items } = services;

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="max-lg:section-space lg:flex lg:min-h-[min(100svh,64rem)] lg:flex-col lg:justify-center lg:pt-[calc(4.75rem+clamp(1.5rem,5vh,3.5rem))] lg:pb-[calc(6rem+clamp(4.5rem,12vh,7rem))]"
    >
      <div className="container-site">
        <SectionHeading
          id="services-title"
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
        />
      </div>

      <div className="container-site mt-10 grid grid-cols-1 md:mt-12 lg:mt-[clamp(2rem,5vh,3.5rem)] lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <ul data-reveal="list" className="border-b border-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              const isCurrent = isDesktop ? active === i : isOpen;
              const panelId = `service-panel-${item.id}`;

              return (
                <li key={item.id} data-reveal="row" className="border-t border-line">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i);
                      setOpen(isOpen ? null : i);
                    }}
                    aria-controls={isDesktop ? "service-preview" : panelId}
                    aria-expanded={isDesktop ? undefined : isOpen}
                    aria-current={isDesktop && isCurrent ? "true" : undefined}
                    className="group flex w-full items-center gap-5 py-3.5 text-left outline-none sm:gap-7 lg:py-[clamp(0.75rem,2vh,1.2rem)]"
                  >
                    <span
                      className={`type-label w-6 shrink-0 transition-colors duration-500 ${
                        isCurrent ? "text-burgundy" : "text-muted"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`type-h4 min-w-0 flex-1 transition-colors duration-500 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-6 ${
                        isCurrent ? "text-burgundy" : "text-ink/60"
                      }`}
                    >
                      {item.name}
                    </span>
                    {/* Desktop: arrow on the active row only. Mobile/tablet: accordion chevron. */}
                    <Icon
                      name="arrow"
                      className={`hidden size-4 shrink-0 text-burgundy transition duration-500 lg:block ${
                        isCurrent ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    />
                    <Icon
                      name="chevron"
                      className={`size-5 shrink-0 transition duration-500 lg:hidden ${
                        isOpen ? "rotate-180 text-burgundy" : "text-muted"
                      }`}
                    />
                  </button>

                  {/* Accordion panel (below lg). Grid-rows trick animates to content height. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-label={item.name}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none lg:hidden ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-7 sm:pl-13">
                        <div className="relative aspect-4/5 w-full overflow-hidden bg-beige sm:max-w-sm">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            sizes="(min-width: 640px) 24rem, 100vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-6 sm:max-w-sm">
                          <p className="type-small text-muted">{item.descriptor}</p>
                          <ExploreLink href={item.href} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop panel: the photos are stacked; GSAP cross-fades them. The photo
            stretches to the list's height (first to last divider), and its 4:5
            ratio sets the width. */}
        <div
          id="service-preview"
          className="hidden lg:col-span-6 lg:col-start-7 lg:flex lg:justify-center"
        >
          <div
            data-reveal="panel"
            className="relative aspect-4/5 h-full overflow-hidden bg-beige"
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                aria-hidden={i !== active}
                className={`absolute inset-0 ${i === 0 ? "" : "invisible opacity-0"}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
