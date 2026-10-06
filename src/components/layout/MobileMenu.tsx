"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/layout/Container";
import { isActivePath } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { easeEditorial } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

const PANEL_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 64rem)";

const list: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEditorial } },
};

/** CTA block: follows the last link. */
const footer: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEditorial, delay: 0.38 } },
};

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards — gates the portal. */
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/**
 * Menu trigger plus full-screen navigation panel for widths below `lg`.
 * The panel is portalled to <body> so it is not contained by the header's
 * backdrop-filter, which would otherwise trap a fixed-position overlay.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on any route change, including browser back/forward.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const trigger = triggerRef.current;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep focus inside the dialog.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    // The panel only exists below lg; close it if the viewport grows past that.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const hiddenPanel = reduceMotion ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" };
  const shownPanel = reduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" };

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto overscroll-contain bg-canvas lg:hidden"
          initial={hiddenPanel}
          animate={shownPanel}
          exit={{ ...hiddenPanel, transition: { duration: 0.4, ease: easeEditorial } }}
          transition={{ duration: 0.55, ease: easeEditorial }}
        >
          <Container className="flex h-(--header-height) shrink-0 items-center justify-between">
            <Wordmark onClick={close} />
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="-mr-2.5 flex size-11 items-center justify-center text-ink transition-colors duration-300 hover:text-accent"
            >
              <X aria-hidden="true" strokeWidth={1.25} className="size-6" />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-between gap-12 pt-6 pb-10 sm:pt-10">
            <nav aria-label="Mobile">
              <motion.ul
                variants={list}
                initial="hidden"
                animate="visible"
                className="border-t border-line"
              >
                {siteConfig.nav.map((link, index) => {
                  const isActive = isActivePath(pathname, link.href);
                  return (
                    <motion.li key={link.href} variants={item} className="border-b border-line">
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className="group flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6"
                      >
                        <span className="w-6 text-label font-semibold tracking-[0.04em] text-accent tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-display transition-colors duration-300 group-hover:text-accent group-aria-[current=page]:italic group-aria-[current=page]:text-accent">
                          {link.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            <motion.div
              variants={footer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <Button href={siteConfig.booking.href} onClick={close}>
                {siteConfig.booking.label}
              </Button>
              <p className="font-display text-title text-ink-soft italic">{siteConfig.tagline}</p>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={open ? PANEL_ID : undefined}
        aria-label="Open menu"
        className="group -mr-2.5 flex size-11 flex-col items-end justify-center gap-2 px-2.5 lg:hidden"
      >
        <span aria-hidden="true" className="h-px w-6 bg-ink" />
        <span
          aria-hidden="true"
          className="h-px w-4 bg-ink transition-[width] duration-300 ease-editorial group-hover:w-6"
        />
      </button>
      {isClient && createPortal(panel, document.body)}
    </>
  );
}
