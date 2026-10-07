"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, MotionConfig, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight, Star, UserRound } from "lucide-react";
import { testimonials } from "@/content/home";
import { GlassLayers } from "../ui/LiquidGlass";
import { SectionHeading } from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Resting pose of each card by its place in the deck (front first). Cards
// deeper than the last pose share it.
const poses = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 24, y: 12, rotate: 3.5, scale: 0.95 },
  { x: -20, y: 22, rotate: -3, scale: 0.9 },
];

// Drag distance (px) or flick speed (px/s) that sends the front card away.
const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 500;

/**
 * A card leaving or joining the front of the deck. It first swings out to
 * the side ("out"), then settles into its new place ("in"); its stacking
 * order flips between the two, so it passes behind or in front of the rest.
 */
type Move = { card: number; dir: 1 | -1; toFront: boolean; distance: number; phase: "out" | "in" };

/**
 * Client stories on a warm ivory band, kept to roughly one card's height:
 * the heading and guest rating sit beside a tilted deck of review cards.
 * Drag or swipe the front card (or use the arrows) and it tucks in behind
 * the others. Stacks heading-first below lg.
 */
export function Testimonials() {
  const { items } = testimonials;
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [move, setMove] = useState<Move | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  // Scroll entrance.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "clamp(top 75%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  // Failsafe: never leave the controls locked if an animation is cut short.
  useEffect(() => {
    if (!move) return;
    const id = window.setTimeout(() => setMove(null), 1600);
    return () => window.clearTimeout(id);
  }, [move]);

  const cycle = (step: 1 | -1, dir: 1 | -1 = step) => {
    // Wait out the swing; a card already settling can be interrupted.
    if (move?.phase === "out") return;
    const card = step === 1 ? order[0] : order[order.length - 1];
    setOrder(step === 1 ? [...order.slice(1), card] : [card, ...order.slice(0, -1)]);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const width = deckRef.current?.offsetWidth ?? 400;
    setMove({ card, dir, toFront: step === -1, distance: width * 0.72, phase: "out" });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > SWIPE_DISTANCE || Math.abs(velocity.x) > SWIPE_VELOCITY) {
      cycle(1, offset.x < 0 ? -1 : 1);
    }
  };

  const front = order[0];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="overflow-x-clip bg-ivory py-[clamp(3.5rem,2.5rem+3vw,5.5rem)]"
    >
      <div className="container-site grid grid-cols-1 items-center gap-y-10 lg:max-w-304 lg:grid-cols-12 lg:gap-x-10">
        <SectionHeading
          id="testimonials-title"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          intro={testimonials.body}
          tone="accent"
          className="lg:col-span-5"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        >
          <div className="flex items-center gap-4">
            <p className="font-serif text-4xl leading-none text-ink lining-nums">
              {testimonials.rating.value}
              <span className="text-xl text-muted"> / {testimonials.rating.outOf}</span>
            </p>
            <div className="text-left">
              <Stars className="size-3.5" />
              <p className="type-small mt-1 text-muted">{testimonials.rating.label}</p>
            </div>
          </div>
        </SectionHeading>

        <div
          className="flex flex-col items-center lg:col-span-6 lg:col-start-7"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
        >
          <MotionConfig reducedMotion="user">
            <div ref={deckRef} data-reveal="item" className="grid w-full max-w-[32rem] px-5 pb-6 sm:px-0">
              {items.map((item, i) => {
                const place = order.indexOf(i);
                const pose = poses[Math.min(place, poses.length - 1)];
                const moving = move?.card === i ? move : null;
                const isFront = place === 0 && !moving;

                // Swung out to the side mid-move, otherwise at rest in place.
                const target =
                  moving?.phase === "out"
                    ? { x: moving.dir * moving.distance, y: -6, rotate: moving.dir * 7, scale: 0.97 }
                    : pose;
                const zIndex = moving?.phase === "out" ? (moving.toFront ? 0 : 20) : items.length - place;

                return (
                  <motion.figure
                    key={item.name}
                    aria-hidden={place !== 0}
                    inert={place !== 0}
                    initial={false}
                    animate={target}
                    transition={
                      moving?.phase === "out"
                        ? { type: "tween", duration: 0.36, ease: [0.4, 0, 0.2, 1] }
                        : { type: "spring", stiffness: 210, damping: 26 }
                    }
                    onAnimationComplete={() => {
                      if (!moving) return;
                      setMove(moving.phase === "out" ? { ...moving, phase: "in" } : null);
                    }}
                    drag={isFront ? "x" : false}
                    dragSnapToOrigin
                    dragElastic={0.6}
                    onDragEnd={handleDragEnd}
                    style={{ zIndex, touchAction: "pan-y" }}
                    className={`relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-md border border-burgundy/15 bg-white px-7 pt-8 pb-7 select-none sm:px-9 sm:pt-9 ${
                      isFront ? "cursor-grab active:cursor-grabbing" : ""
                    } ${
                      // Only the visible layers cast a shadow, so a deep deck doesn't darken.
                      place < poses.length ? "shadow-[0_24px_50px_-34px_rgb(95_39_48/0.35)]" : ""
                    }`}
                  >
                    <span aria-hidden="true" className="absolute top-0 left-0 h-0.5 w-12 bg-burgundy" />

                    {/* Only the front card's content shows; the cards behind
                        read as plain paper edges. */}
                    <div
                      className={`flex flex-1 flex-col transition-opacity duration-500 ${
                        place === 0 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span aria-hidden="true" className="font-serif text-5xl leading-[0.7] text-burgundy/70">
                          &ldquo;
                        </span>
                        <Stars className="size-3" label="Rated 5 out of 5" />
                      </div>
                      <blockquote className="mt-4 flex-1 font-serif text-[clamp(1.375rem,1.25rem+0.5vw,1.75rem)] leading-[1.3] font-medium text-black">
                        {item.quote}
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-burgundy/15 pt-4">
                        <span
                          aria-hidden="true"
                          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-burgundy/15 bg-ivory text-burgundy"
                        >
                          <UserRound className="size-5" strokeWidth={1.5} />
                        </span>
                        <span>
                          <span className="type-ui block text-ink">{item.name}</span>
                          <span className="type-label mt-1 block text-burgundy/80">{item.service}</span>
                        </span>
                      </figcaption>
                    </div>
                  </motion.figure>
                );
              })}
            </div>
          </MotionConfig>

          {/* Controls */}
          <div data-reveal="item" className="mt-4 flex w-full max-w-[32rem] justify-center">
            <p className="sr-only" aria-live="polite">
              Review {front + 1} of {items.length}
            </p>
            <div className="flex gap-3">
              <DeckButton label="Previous review" onClick={() => cycle(-1)}>
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </DeckButton>
              <DeckButton label="Next review" onClick={() => cycle(1)}>
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </DeckButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Solid white, like the cards; the glass sheen (tuned for light fills) is
// its only hover effect.
function DeckButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="liquid-glass liquid-glass--solid liquid-glass--ivory flex size-11 items-center justify-center rounded-full border border-burgundy/15 bg-white text-burgundy shadow-[0_10px_24px_-14px_rgb(95_39_48/0.35)] transition-transform duration-300"
    >
      <GlassLayers />
      <span className="relative">{children}</span>
    </button>
  );
}

function Stars({ className, label }: { className: string; label?: string }) {
  return (
    <div
      className="flex gap-0.5 text-burgundy"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} strokeWidth={0} />
      ))}
    </div>
  );
}
