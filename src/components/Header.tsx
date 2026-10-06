"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/home";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Logo } from "./Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close the services dropdown on outside click or Escape.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdownOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-site">
        <div className="relative flex items-center justify-between pt-5 lg:pt-8">
          <a
            href="#"
            className="relative z-20 text-ivory"
            aria-label={`${site.fullName} home`}
          >
            <Logo />
          </a>

          {/* Desktop nav pill */}
          <nav
            aria-label="Main"
            className="type-ui absolute left-1/2 hidden -translate-x-1/2 rounded-full bg-ink/80 px-2 py-1.5 text-white backdrop-blur-md lg:block"
          >
            <ul className="flex items-center">
              {nav.map((item) =>
                "children" in item && item.children ? (
                  <li key={item.label} ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex items-center gap-1.5 rounded-full px-5 py-3 leading-none transition hover:bg-white/10"
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        className={`size-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 transition duration-200 ${
                        dropdownOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <ul className="rounded-2xl bg-ink/90 p-2 backdrop-blur-md">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-white/10"
                            >
                              <span>
                                <span className="block">
                                  {child.label}
                                </span>
                                <span className="type-small block font-normal text-white/60">
                                  {child.description}
                                </span>
                              </span>
                              <Icon
                                name="arrow"
                                className="size-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block rounded-full px-5 py-3 leading-none transition hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="relative z-20 flex items-center gap-3">
            <span className="hidden sm:block">
              <Button href="#book">Book Now</Button>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-12 flex-col items-center justify-center gap-1.5 rounded-full bg-ink/80 text-white backdrop-blur-md lg:hidden"
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
          {nav.map((item) =>
            "children" in item && item.children ? (
              <li key={item.label}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-2xl font-medium">
                    {item.label}
                    <Icon
                      name="chevron"
                      className="size-6 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <ul className="mb-3 flex flex-col gap-1 border-l border-white/20 pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={closeMenu}
                          className="block py-2 text-lg text-white/80"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={item.label}>
                <a href={item.href} onClick={closeMenu} className="block py-3 text-2xl font-medium">
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
        <div className="mt-8 sm:hidden" onClick={closeMenu}>
          <Button href="#book">Book Now</Button>
        </div>
      </div>
    </header>
  );
}
