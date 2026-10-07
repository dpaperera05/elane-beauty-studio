"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Plays once per full page load; skipped when the page is re-entered client-side.
let introPlayed = false;

// How long the wordmark holds, measured from navigation start, so a slow
// hydration never stretches the intro beyond this.
const HOLD_S = 0.75;

// One slow, shared entrance for every marked element.
const REVEAL_S = 1.8;

/**
 * Brand intro: a burgundy wordmark screen that wipes upward to reveal the
 * hero, then every element marked `data-intro` (header, headline, copy, CTAs)
 * drifts in together in one slow, soft movement.
 * The pre-intro hidden state and the wordmark entrance are pure CSS
 * (globals.css), so the first paint is already correct before hydration.
 */
export function SiteIntro() {
  const [active, setActive] = useState(() => !introPlayed);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!active || !overlay) return;
    introPlayed = true;

    // Reduced motion: CSS already hides the overlay; just drop it from the DOM.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setActive(false));
      return () => cancelAnimationFrame(frame);
    }

    // Hands control from the CSS failsafe to the timeline.
    overlay.classList.add("is-ready");
    // Only what is actually displayed at this breakpoint (e.g. the desktop nav
    // links are display:none on mobile).
    const elements = gsap.utils
      .toArray<HTMLElement>("[data-intro]")
      .filter((el) => el.getClientRects().length > 0);
    // Frosted glass can't blur while an ancestor is fading (opacity < 1 cuts
    // off its backdrop in Chrome), so it's held back and frosts over once the
    // fade has finished — otherwise the blur would snap on at the end.
    const frost = gsap.utils.toArray<HTMLElement>(
      '[data-intro] .liquid-glass--frosted .liquid-glass__frost',
    );

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          delay: Math.max(0.1, HOLD_S - performance.now() / 1000),
          onComplete: () => setActive(false),
        })
        // Intro exit: wordmark lifts away, then the panel wipes upward.
        .to(".site-intro__mark", { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" }, 0)
        .set(overlay, { pointerEvents: "none" }, 0.1)
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "expo.inOut" },
          0.1,
        )
        // Everything at once, slowly: header items settle down from above,
        // hero content rises from below.
        .addLabel("reveal", 0.55)
        .fromTo(
          elements,
          {
            opacity: 0,
            y: (_: number, el: HTMLElement) => (el.closest("header") ? -12 : 24),
          },
          { opacity: 1, y: 0, duration: REVEAL_S, ease: "power2.out" },
          "reveal",
        )
        .fromTo(
          frost,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: "power1.inOut" },
          `reveal+=${REVEAL_S}`,
        );
    }, overlay);

    // Unmounting the overlay (or leaving the page) reverts every inline style,
    // leaving elements in their natural, fully visible state.
    return () => ctx.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div ref={overlayRef} className="site-intro" aria-hidden="true">
      <div className="site-intro__mark">
        <span className="site-intro__mask">
          <span className="site-intro__name type-wordmark">Élane</span>
        </span>
        <span className="site-intro__tagline">Beauty Studio</span>
      </div>
      <noscript>
        <style>{".site-intro{display:none}.site-intro~* [data-intro]{opacity:1!important}"}</style>
      </noscript>
    </div>
  );
}
