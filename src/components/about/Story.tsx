"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { story } from "@/content/about";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * The studio's story, told in words: a centred heading, then the narrative on
 * the left (a serif opening line and three paragraphs) with one portrait photo on the right over a soft ivory
 * block. On desktop the photo stays in view while the text scrolls past.
 * Mobile: the opening line, the photo, then the paragraphs.
 */
export function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Each block of text rises in as it arrives.
      gsap.utils.toArray<HTMLElement>("[data-reveal='item']").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 22,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "clamp(top 88%)", once: true },
        });
      });

      // The ivory block wipes in, then the photo unmasks upward, settling
      // from a slight zoom; the caption follows.
      const media = section.querySelector("[data-reveal='image']")!;
      gsap
        .timeline({ scrollTrigger: { trigger: media, start: "clamp(top 82%)", once: true } })
        .fromTo(
          "[data-reveal='backdrop']",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          0.1,
        )
        .from(media.querySelector("img"), { scale: 1.12, duration: 2, ease: "power2.out" }, 0.2)
        .from("[data-reveal='caption']", { opacity: 0, duration: 0.9, ease: "power1.out" }, 1.1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" aria-labelledby="story-title" className="section-space">
      <div className="container-site">
        <SectionHeading
          id="story-title"
          eyebrow={story.eyebrow}
          title={story.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />

        <div className="mt-12 grid grid-cols-1 gap-y-10 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-10">
          {/* `contents` below lg, so the photo can sit between the opening
              line and the paragraphs on phones and tablets. */}
          <div className="contents lg:col-span-6 lg:block">
            <p data-reveal="item" className="type-h3 max-w-[22ch] text-ink">
              {story.lead}
            </p>

            <div className="order-2 max-w-[36rem] lg:mt-8">
              <div className="space-y-5">
                {story.body.map((paragraph) => (
                  <p key={paragraph} data-reveal="item" className="type-lead text-ink">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Photo. The top and right padding leave room for the ivory block
              to run past it to the container edge. */}
          <figure className="order-1 mx-auto w-full max-w-md lg:sticky lg:top-28 lg:order-none lg:col-span-5 lg:col-start-8 lg:mx-0 lg:max-w-none">
            <div className="relative isolate pt-6 pr-[7%] sm:pt-8 lg:pt-10">
              <div
                data-reveal="backdrop"
                aria-hidden="true"
                className="absolute top-0 right-0 bottom-[38%] left-[38%] -z-10 bg-ivory"
              />
              <div data-reveal="image" className="relative aspect-4/5 overflow-hidden bg-beige">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, (min-width: 448px) 26rem, 93vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption
              data-reveal="caption"
              className="type-small mt-5 flex items-center gap-3 text-muted"
            >
              <span className="h-px w-8 shrink-0 bg-burgundy/60" aria-hidden="true" />
              {story.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
