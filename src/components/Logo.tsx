/**
 * Typographic wordmark: Cormorant capitals over a small Manrope "Beauty Studio" line.
 * `intro` marks both lines for the staggered entrance in SiteIntro (header only).
 */
export function Logo({ className = "", intro = false }: { className?: string; intro?: boolean }) {
  const introAttr = intro ? { "data-intro": "header-item" } : {};

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      {/* Negative right margin cancels the trailing letter-spacing so the mark stays optically aligned. */}
      <span {...introAttr} className="type-wordmark mr-[-0.26em] text-[2.125rem]">
        Élane
      </span>
      <span
        {...introAttr}
        className="mt-1.5 font-sans text-[0.5625rem] font-medium tracking-[0.42em] text-current/75 uppercase"
      >
        Beauty Studio
      </span>
    </span>
  );
}
