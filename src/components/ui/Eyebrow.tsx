export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: string;
  tone?: "dark" | "light";
}) {
  const toneClass =
    tone === "light"
      ? "border-white/20 bg-white/20 text-white"
      : "border-rose bg-ivory-light/60 text-ink";

  return (
    <div className="mb-7 flex">
      <span
        className={`inline-flex items-center gap-3 rounded-full border border-dotted px-3 py-1.5 type-label backdrop-blur-md ${toneClass}`}
      >
        <span className="h-3.5 w-px bg-rose" aria-hidden="true" />
        {children}
      </span>
    </div>
  );
}
