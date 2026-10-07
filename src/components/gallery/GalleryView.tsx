"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  allFilter,
  categoryLabel,
  galleryCategories,
  galleryIntro,
  galleryItems,
  type GalleryFilter,
  type GallerySize,
} from "@/content/gallery";
import { Icon } from "../ui/Icon";
import { GlassLayers } from "../ui/LiquidGlass";
import { SectionHeading } from "../ui/SectionHeading";
import { Lightbox } from "./Lightbox";

const filters = [allFilter, ...galleryCategories];

// Grid cells per size. A row is half a column wide (see `gridStyle`), so three
// rows make a 2:3 portrait and two make a square.
const spans: Record<GallerySize, string> = {
  portrait: "row-span-3",
  square: "row-span-2",
  wide: "col-span-2 row-span-3",
  feature: "col-span-2 row-span-6",
};

// `--cols` and `--gap` are set per breakpoint on the grid. The row height is
// derived from the column width, so the cells keep their proportions at any
// width, and `dense` packing lets smaller photos fill in around larger ones.
const gridStyle = {
  gridTemplateColumns: "repeat(var(--cols), minmax(0, 1fr))",
  gridAutoRows:
    "calc(((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols) - var(--gap)) / 2)",
  gridAutoFlow: "dense",
  gap: "var(--gap)",
};

const sizes = (size: GallerySize) =>
  size === "feature" || size === "wide"
    ? "(min-width: 1024px) 50vw, (min-width: 768px) 67vw, 100vw"
    : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";

/**
 * The /gallery page body: intro, category filters, the editorial grid and the
 * lightbox. Filtering re-flows the grid in place; the lightbox steps through
 * whatever the current filter shows.
 */
export function GalleryView() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  // Index into `visible`, or null while the lightbox is closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="gallery-page-title" className="container-site pt-12 pb-16 md:pt-16 md:pb-24">
        <SectionHeading
          as="h1"
          id="gallery-page-title"
          eyebrow={galleryIntro.eyebrow}
          title={galleryIntro.title}
          intro={galleryIntro.body}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        >
          <div
            role="group"
            aria-label="Filter the gallery by category"
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
          >
            {filters.map((option) => {
              const active = option.id === filter;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option.id)}
                  className={`type-ui liquid-glass h-11 cursor-pointer rounded-full border px-5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
                    active
                      ? "liquid-glass--solid border-burgundy bg-burgundy text-ivory"
                      : "liquid-glass--burgundy border-ink/20 text-ink hover:text-ivory"
                  }`}
                >
                  <GlassLayers />
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>
        </SectionHeading>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "photo" : "photos"}
          {filter === "all" ? "" : ` in ${categoryLabel(filter)}`}.
        </p>

        <div className="@container mt-10 md:mt-14">
          <ul
            style={gridStyle}
            className="relative grid [--cols:2] [--gap:0.5rem] sm:[--gap:0.75rem] md:[--cols:3] lg:[--cols:4] lg:[--gap:1rem]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, index) => (
                <motion.li
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className={spans[item.size]}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className="group relative block size-full cursor-zoom-in overflow-hidden bg-beige focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={sizes(item.size)}
                      // The first screenful loads at once; the rest as they near view.
                      loading={index < 4 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none"
                    />
                    {/* Hover: a wine shade rising from the bottom, with the category and a cue. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-end justify-between gap-3 bg-[linear-gradient(to_top,rgb(95_39_48/0.78),rgb(95_39_48/0.18)_45%,transparent_70%)] p-4 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5"
                    >
                      <span className="type-label">{categoryLabel(item.category)}</span>
                      <span className="type-small flex items-center gap-1.5 font-medium">
                        View
                        <Icon name="arrow" className="size-4" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <Lightbox
            items={visible}
            index={openIndex}
            onNavigate={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
