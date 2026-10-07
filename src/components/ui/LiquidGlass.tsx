"use client";

import { useEffect } from "react";

/**
 * Site-wide runtime for the liquid glass hover (styles live in globals.css).
 * Mount once in the root layout. It provides:
 * - the SVG displacement filter used for true refraction (Chromium only;
 *   other browsers keep the frosted glass without the bend), and
 * - pointer tracking that feeds --glass-x / --glass-y to the specular light.
 *
 * To give any element the effect: add the `liquid-glass` class plus a tone
 * (`liquid-glass--solid` for filled buttons that must keep their colour,
 * `liquid-glass--burgundy` or `liquid-glass--clear` for tinted glass,
 * optionally `liquid-glass--frosted`) and render <GlassLayers /> as its first child.
 */
export function LiquidGlass() {
  useEffect(() => {
    // `userAgentData` only exists in Chromium, the one engine that renders
    // SVG filters on backdrop content.
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } })
      .userAgentData?.brands;
    if (brands?.some((b) => b.brand === "Chromium")) {
      document.documentElement.dataset.glassRefraction = "";
    }

    const onMove = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest<HTMLElement>(".liquid-glass");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glass-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glass-y", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <filter
        id="liquid-glass-refraction"
        x="0"
        y="0"
        width="1"
        height="1"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008 0.022"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="map" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="44"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

/** The stacked glass layers; render as the first child of a `.liquid-glass` element. */
export function GlassLayers() {
  return (
    <>
      <span aria-hidden="true" className="liquid-glass__layer liquid-glass__refract" />
      <span aria-hidden="true" className="liquid-glass__layer liquid-glass__frost" />
      <span aria-hidden="true" className="liquid-glass__layer liquid-glass__shine" />
    </>
  );
}
