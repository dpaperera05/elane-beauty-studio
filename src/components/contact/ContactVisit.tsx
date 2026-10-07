"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { quickActions, studio } from "@/content/contact";
import { Icon } from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

const actionIcons: Record<(typeof quickActions.items)[number]["icon"], LucideIcon> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

const linkClass =
  "link-underline text-ink hover:text-burgundy focus-visible:text-burgundy focus-visible:outline-none";

/** One line of the studio's details: icon, small label, value. */
function Detail({ icon: DetailIcon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div data-reveal="detail" className="flex gap-5 border-t border-line py-5">
      <DetailIcon aria-hidden="true" strokeWidth={1.25} className="mt-0.5 size-5 shrink-0 text-burgundy" />
      <div className="min-w-0">
        <dt className="type-label text-muted">{label}</dt>
        <dd className="type-lead mt-2 text-ink">{children}</dd>
      </div>
    </div>
  );
}

/**
 * The practical part of the page, in two columns: where and when to find the
 * studio (address, phone, email and hours, each with a small icon, plus the
 * walk-in note), and three direct ways to reach it as tall, tappable rows.
 * One column on phones, details first.
 */
export function ContactVisit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Each column's heading, then its rows one after another.
      gsap.utils.toArray<HTMLElement>("[data-reveal='column']").forEach((column) => {
        gsap.from(column.querySelectorAll("[data-reveal='item'], [data-reveal='detail']"), {
          opacity: 0,
          y: 18,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: column, start: "clamp(top 85%)", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit"
      aria-labelledby="visit-title"
      className="container-site border-t border-line py-[clamp(3.5rem,2.5rem+4vw,6rem)]"
    >
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        {/* Studio details */}
        <div data-reveal="column" className="lg:col-span-6">
          <p data-reveal="item" className="type-label text-burgundy">
            {studio.eyebrow}
          </p>
          <h2 id="visit-title" data-reveal="item" className="type-h3 mt-4 text-ink">
            {studio.name}
          </h2>

          <dl className="mt-8 border-b border-line">
            <Detail icon={MapPin} label={studio.labels.address}>
              <address className="not-italic">
                {studio.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </Detail>
            <Detail icon={Phone} label={studio.labels.phone}>
              <a href={studio.phone.href} className={linkClass}>
                {studio.phone.label}
              </a>
            </Detail>
            <Detail icon={Mail} label={studio.labels.email}>
              <a href={studio.email.href} className={`${linkClass} break-all`}>
                {studio.email.label}
              </a>
            </Detail>
            <Detail icon={Clock} label={studio.labels.hours}>
              <span className="grid max-w-[22rem] grid-cols-[auto_1fr] gap-x-6 gap-y-1 tabular-nums">
                {studio.hours.map((row) => (
                  <span key={row.days} className="contents">
                    <span>{row.days}</span>
                    <span className="text-right sm:text-left">{row.time}</span>
                  </span>
                ))}
              </span>
            </Detail>
          </dl>

          <p data-reveal="item" className="type-small mt-6 max-w-[34rem] text-muted">
            {studio.note}
          </p>
        </div>

        {/* Quick actions */}
        <div data-reveal="column" className="lg:col-span-5 lg:col-start-8">
          <p data-reveal="item" className="type-label text-burgundy">
            {quickActions.eyebrow}
          </p>
          <h2 data-reveal="item" className="type-h3 mt-4 text-ink">
            {quickActions.title}
          </h2>

          <ul className="mt-8 border-b border-line">
            {quickActions.items.map((action) => {
              const ActionIcon = actionIcons[action.icon];
              const external = "external" in action && action.external;
              return (
                <li key={action.label} data-reveal="detail" className="border-t border-line">
                  <a
                    href={action.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-20 items-center gap-5 py-4 outline-none"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-burgundy transition-colors duration-500 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-ivory group-focus-visible:border-burgundy group-focus-visible:bg-burgundy group-focus-visible:text-ivory">
                      <ActionIcon aria-hidden="true" strokeWidth={1.25} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="type-h4 block text-ink transition-colors duration-500 group-hover:text-burgundy group-focus-visible:text-burgundy group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-6">
                        {action.label}
                      </span>
                      <span className="type-small block break-all text-muted">{action.detail}</span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                    <Icon
                      name="arrow"
                      className="size-4 shrink-0 text-burgundy transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
