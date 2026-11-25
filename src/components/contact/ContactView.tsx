"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { MotionConfig } from "motion/react";
import { contactIntro, quickActions, studioDetails } from "@/content/contact";
import { GlassLayers } from "../ui/LiquidGlass";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactForm } from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const actionIcons: Record<(typeof quickActions)[number]["icon"], LucideIcon> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

/** A text link with a sliding arrow, for the details row. */
function DetailLink({ href, external = false, children }: { href: string; external?: boolean; children: string }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="type-ui group mt-1 inline-flex h-11 items-center gap-2 text-burgundy transition-colors hover:text-burgundy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
    >
      <span className="underline decoration-burgundy/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-burgundy">
        {children}
      </span>
      <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/** One column of the details row: a small burgundy label over its content. */
function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-reveal="detail" className="flex flex-col items-center">
      <h2 className="type-label text-burgundy">{label}</h2>
      <div className="mt-3 text-ink">{children}</div>
    </div>
  );
}

/**
 * The /contact page body, laid out like the gallery: a centred title with
 * three direct-contact pills where the gallery has its filters, the enquiry
 * form as a centred card, and a short row of studio details under it.
 */
export function ContactView() {
  const sectionRef = useRef<HTMLElement>(null);
  const { visit, hours, booking } = studioDetails;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // The heading animates itself; this brings in the card, then the details.
    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='card']", {
        opacity: 0,
        y: 28,
        duration: 1.1,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from("[data-reveal='detail']", {
        opacity: 0,
        y: 18,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='details']", start: "clamp(top 90%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="contact-page-title"
        className="container-site pt-12 pb-16 md:pt-16 md:pb-24"
      >
        <SectionHeading
          as="h1"
          id="contact-page-title"
          eyebrow={contactIntro.eyebrow}
          title={contactIntro.title}
          intro={contactIntro.body}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        >
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {quickActions.map((action) => {
              const ActionIcon = actionIcons[action.icon];
              const external = "external" in action && action.external;
              return (
                <li key={action.icon}>
                  <a
                    href={action.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="type-ui liquid-glass liquid-glass--burgundy group flex h-11 items-center gap-2.5 rounded-full border border-ink/20 px-5 text-ink transition-colors duration-300 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                  >
                    <GlassLayers />
                    <ActionIcon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="relative size-4 text-burgundy transition-colors duration-300 group-hover:text-ivory"
                    />
                    <span className="relative">
                      <span className="sr-only">{action.srLabel} </span>
                      {action.text}
                    </span>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </SectionHeading>

        <div data-reveal="card" className="mt-12 md:mt-14">
          <ContactForm />
        </div>

        <div
          data-reveal="details"
          className="mx-auto mt-14 grid max-w-240 gap-10 text-center sm:grid-cols-3 sm:gap-8 md:mt-16"
        >
          <Detail label={visit.label}>
            <address className="not-italic">{visit.lines.join(", ")}</address>
            <DetailLink href={visit.link.href} external>
              {visit.link.label}
            </DetailLink>
          </Detail>

          <Detail label={hours.label}>
            <p className="tabular-nums">
              {hours.rows.map((row) => (
                <span key={row.days} className="block">
                  {row.days} · {row.time}
                </span>
              ))}
            </p>
          </Detail>

          <Detail label={booking.label}>
            <p>{booking.text}</p>
            <DetailLink href={booking.link.href}>{booking.link.label}</DetailLink>
          </Detail>
        </div>
      </section>
    </MotionConfig>
  );
}
