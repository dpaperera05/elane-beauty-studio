/** Typographic wordmark: Cormorant capitals over a small Manrope "Beauty Studio" line. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      {/* Negative right margin cancels the trailing letter-spacing so the mark stays optically aligned. */}
      <span className="type-wordmark mr-[-0.26em] text-[2.125rem]">Élane</span>
      <span className="mt-1.5 font-sans text-[0.5625rem] font-medium tracking-[0.42em] uppercase opacity-75">
        Beauty Studio
      </span>
    </span>
  );
}
