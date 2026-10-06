"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/home";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const { items } = testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [go, paused, index]);

  return (
    <section className="section-space bg-beige">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <h2 className="type-h2">{testimonials.title}</h2>
          <p className="mt-6 max-w-md text-ink/80">{testimonials.body}</p>
        </Reveal>

        <Reveal delay={150}>
          <div
            className="flex flex-col gap-5"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div
              className="overflow-hidden"
              onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStart.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                touchStart.current = null;
              }}
            >
              <ul
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {items.map((t, i) => (
                  <li
                    key={t.name}
                    className="w-full shrink-0 px-px"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${items.length}`}
                    aria-hidden={i !== index}
                  >
                    <figure className="flex h-full min-h-80 flex-col justify-between gap-8 rounded-2xl bg-ivory-light p-7 shadow-[0_2px_20px_-12px_rgb(0_0_0/0.25)] md:p-10">
                      <div>
                        <div className="flex items-center justify-between text-burgundy">
                          <div className="flex gap-1" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }, (_, s) => (
                              <Icon key={s} name="star" className="size-4" />
                            ))}
                          </div>
                          <Icon name="quote" className="size-9 text-rose" />
                        </div>
                        <blockquote className="type-quote mt-6">
                          “{t.quote}”
                        </blockquote>
                      </div>
                      <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                        <span className="flex size-10 items-center justify-center rounded-full bg-rose/25 font-serif text-xl text-burgundy">
                          {t.name.charAt(0)}
                        </span>
                        <span>
                          <span className="block font-medium">{t.name}</span>
                          <span className="type-small block text-muted">{t.service}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-1.5">
                {items.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-burgundy" : "w-1.5 bg-rose hover:bg-burgundy/60"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:border-burgundy hover:bg-burgundy hover:text-ivory"
                >
                  <Icon name="arrow" className="size-4 rotate-180" />
                  <span className="sr-only">Previous testimonial</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:border-burgundy hover:bg-burgundy hover:text-ivory"
                >
                  <Icon name="arrow" className="size-4" />
                  <span className="sr-only">Next testimonial</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
