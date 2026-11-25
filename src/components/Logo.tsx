import { site } from "@/content/home";

/**
 * Typographic wordmark: Cormorant capitals over a small Manrope line
 * (both from `site.logo` in content/home.ts).
 * `intro` marks both lines for the entrance in SiteIntro, and `compact` steps
 * the wordmark down on phones (both header only).
 */
export function Logo({
  className = "",
  intro = false,
  compact = false,
}: {
  className?: string;
  intro?: boolean;
  compact?: boolean;
}) {
  const introAttr = intro ? { "data-intro": "header-item" } : {};

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      {/* Negative right margin cancels the trailing letter-spacing so the mark stays optically aligned. */}
      <span {...introAttr} className={`type-wordmark mr-[-0.26em] ${compact ? "text-[1.75rem] sm:text-[2.125rem]" : "text-[2.125rem]"}`}>
        {site.logo.wordmark}
      </span>
      <span
        {...introAttr}
        className="mt-1.5 font-sans text-[0.5625rem] font-medium tracking-[0.42em] text-current/75 uppercase"
      >
        {site.logo.tagline}
      </span>
    </span>
  );
}
