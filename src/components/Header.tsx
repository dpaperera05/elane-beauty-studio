"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/home";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // True while the full-bleed hero is behind the header.
  const [overHero, setOverHero] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  // Switch to the solid header once the hero has scrolled out from behind it.
  // Pages without a hero get the solid header straight away.
  useEffect(() => {
    const hero = document.querySelector("[data-header-overlay]");
    if (!hero) {
      const frame = requestAnimationFrame(() => setOverHero(false));
      return () => cancelAnimationFrame(frame);
    }
    const height = headerRef.current?.offsetHeight ?? 80;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${height}px 0px 0px 0px` },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Arriving from another page at a "/#section" link: the browser's smooth
  // scroll to the anchor gets cut short while the page is still settling
  // (ScrollTrigger re-measures on load), so finish the jump once it has loaded.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    let timer = 0;
    const jump = () => {
      timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      }, 400);
    };
    if (document.readyState === "complete") jump();
    else window.addEventListener("load", jump, { once: true });
    return () => {
      window.removeEventListener("load", jump);
      window.clearTimeout(timer);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // The open mobile menu is dark, so it keeps the over-hero (light) styling.
  const solid = !overHero && !menuOpen;
  const tone = (overlay: string, solidTone: string) => (solid ? solidTone : overlay);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40">
      {/* Solid background on its own layer: a backdrop-filter on <header>
          itself would trap the fixed mobile menu inside the header box. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b bg-white/85 backdrop-blur-md transition-[opacity,border-color] duration-500 ${tone(
          "border-transparent opacity-0",
          "border-ink/10 opacity-100",
        )}`}
      />
      <div className="container-site relative">
        <div
          className={`relative flex items-center justify-between transition-[padding] duration-500 ${tone(
            "pt-4 sm:pt-5 lg:pt-6 xl:pt-8",
            "py-3 lg:py-3.5",
          )}`}
        >
          <a
            href={site.homeHref}
            className={`relative z-20 transition-colors duration-500 ${tone("text-ivory", "text-ink")}`}
            aria-label={`${site.fullName} home`}
          >
            <Logo intro compact />
          </a>

          {/* Desktop nav pill */}
          <nav
            aria-label="Main"
            className={`type-ui absolute left-1/2 hidden -translate-x-1/2 rounded-full px-2 py-1.5 backdrop-blur-md transition-colors duration-500 lg:block ${tone(
              "bg-ink/80 text-white",
              "bg-transparent text-ink",
            )}`}
          >
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.label} data-intro="header-item">
                  <a
                    href={item.href}
                    className={`block rounded-full px-4 py-3 leading-none transition ${tone("hover:bg-white/10", "hover:bg-ink/5")} xl:px-5`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-20 flex items-center gap-3">
            <span data-intro="header-item" className="hidden sm:block">
              <Button href={site.bookingHref} className="min-w-44">
                Book Now
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              data-intro="header-item"
              className={`flex size-11 flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md transition-colors duration-500 sm:size-12 lg:hidden ${tone(
                "bg-ink/80 text-white",
                "bg-ink/5 text-ink",
              )}`}
            >
              <span
                className={`h-px w-5 bg-current transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-current transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-10 overflow-y-auto bg-ink/95 px-5 pt-32 pb-10 text-white backdrop-blur-lg transition duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible translate-y-4 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={closeMenu} className="block py-3 text-2xl font-medium">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 sm:hidden" onClick={closeMenu}>
          <Button href={site.bookingHref}>Book Now</Button>
        </div>
      </div>
    </header>
  );
}
