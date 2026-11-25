"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { why } from "@/content/about";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * What sets the studio apart, on the same wine band as the homepage's
 * Signature Ritual (its glow mirrored to the top left): a centred heading
 * over four numbered points, divided by hairlines. Four across from lg, two
 * by two from sm, one column on phones. The points rise in one after another.
 */
export function WhyElane() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='point']", {
        opacity: 0,
        y: 26,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='points']", start: "clamp(top 85%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-elane"
      aria-labelledby="why-elane-title"
      className="relative isolate overflow-hidden bg-burgundy bg-[radial-gradient(ellipse_75%_65%_at_12%_8%,rgb(150_72_82/0.55),transparent_70%),linear-gradient(200deg,var(--color-burgundy)_15%,var(--color-burgundy-deep)_100%)] py-[clamp(4rem,3rem+4vw,7rem)] text-ivory"
    >
      <div className="container-site">
        <SectionHeading
          id="why-elane-title"
          eyebrow={why.eyebrow}
          title={why.title}
          tone="dark"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />

        <ol
          data-reveal="points"
          className="mt-12 grid grid-cols-1 border-b border-ivory/20 sm:grid-cols-2 sm:border-b-0 md:mt-16 lg:grid-cols-4"
        >
          {why.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal="point"
              className="border-t border-ivory/20 py-8 sm:border-t-0 sm:border-l sm:px-7 sm:py-9 lg:px-8"
            >
              <span
                aria-hidden="true"
                className="block font-serif text-[3.5rem] leading-none text-ivory/55 lining-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h4 mt-6 text-ivory">{point.title}</h3>
              <p className="type-small mt-2.5 text-ivory/80">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
