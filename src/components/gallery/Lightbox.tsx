"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { categoryLabel, type GalleryItem } from "@/content/gallery";

const pad = (n: number) => String(n).padStart(2, "0");
// A horizontal drag past this many pixels counts as a swipe.
const SWIPE = 60;

const control =
  "flex size-12 cursor-pointer items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:border-ivory/60 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory";

/**
 * Fullscreen viewer for the gallery. A native modal <dialog>, so the page
 * behind is inert, focus stays inside and Escape closes it; on top of that it
 * adds arrow-key and swipe navigation, locks page scroll and hands focus back
 * to the photo that opened it.
 */
export function Lightbox({
  items,
  index,
  onNavigate,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Which way the last step went, so the next photo arrives from that side.
  const [direction, setDirection] = useState(1);
  const item = items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus({ preventScroll: true });
    };
  }, []);

  const step = (by: number) => {
    setDirection(by);
    onNavigate((index + by + items.length) % items.length);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE) step(1);
    else if (info.offset.x >= SWIPE) step(-1);
  };

  return (
    <motion.dialog
      ref={dialogRef}
      aria-label="Gallery photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-ink/[0.97] p-0 text-ivory backdrop:bg-transparent"
    >
      <div className="flex h-full flex-col">
        {/* Counter, category and close */}
        <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-8 sm:pt-6">
          <p aria-live="polite" className="type-label flex items-center gap-4">
            <span>
              <span className="sr-only">Photo </span>
              {pad(index + 1)} <span className="text-ivory/50">/ {pad(items.length)}</span>
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-ivory/30" />
            <span className="text-rose">{categoryLabel(item.category)}</span>
          </p>
          <button type="button" onClick={onClose} aria-label="Close viewer" className={control}>
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>

        {/* Photo. Clicking the empty space around it closes the viewer. */}
        <div
          onClick={(event) => event.target === event.currentTarget && onClose()}
          className="relative min-h-0 flex-1 px-4 py-4 sm:px-24 sm:py-6"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={item.src}
              custom={direction}
              variants={{
                enter: (from: number) => ({ opacity: 0, x: from * 24 }),
                center: { opacity: 1, x: 0 },
                exit: (from: number) => ({ opacity: 0, x: from * -24 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              drag={items.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={onDragEnd}
              className="pointer-events-none relative size-full touch-pan-y"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                draggable={false}
                className="pointer-events-auto object-contain select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Side arrows from sm; on phones they sit in the bottom bar. */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className={`${control} absolute top-1/2 left-6 hidden -translate-y-1/2 sm:flex`}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className={`${control} absolute top-1/2 right-6 hidden -translate-y-1/2 sm:flex`}
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>

        {/* Title, with the arrows either side on phones */}
        <div className="flex items-center justify-between gap-4 px-4 pb-5 sm:justify-center sm:px-8 sm:pb-7">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className={`${control} sm:hidden`}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
          <p className="type-h4 min-h-[1.25em] text-center text-ivory">{item.title}</p>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className={`${control} sm:hidden`}
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>
      </div>
    </motion.dialog>
  );
}
