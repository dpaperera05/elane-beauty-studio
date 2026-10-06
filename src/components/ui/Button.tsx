import { Icon } from "./Icon";
import { GlassLayers } from "./LiquidGlass";

type Variant = "primary" | "secondary" | "light" | "link";

// Liquid glass is the only hover effect on pill buttons (see LiquidGlass.tsx).
// Solid burgundy keeps its colour and only gains the sheen; the outline
// variant's text turns ivory so it stays legible on its burgundy glass tint.
// `link` is text-only, so it keeps a plain colour hover.
const variants: Record<Variant, string> = {
  primary:
    "liquid-glass liquid-glass--solid bg-burgundy text-ivory border-burgundy",
  secondary:
    "liquid-glass liquid-glass--burgundy bg-transparent text-ink border-ink/20 hover:text-ivory",
  light:
    "liquid-glass liquid-glass--clear liquid-glass--frosted text-white border-white/30",
  link: "bg-transparent text-ink border-transparent !px-0 hover:text-burgundy",
};

/** Pill button with a circular arrow badge; turns to liquid glass on hover. */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center whitespace-nowrap gap-3 rounded-full border py-1.5 pr-1.5 pl-5 type-ui transition-[color,transform] duration-300 ${variants[variant]} ${className}`}
    >
      {variant !== "link" && <GlassLayers />}
      {/* flex-1 + text-center: when a button is stretched wider than its
          content, the label centres in the space left of the arrow badge. */}
      <span className="relative block flex-1 text-center leading-6">{children}</span>
      <span className="relative flex size-9 items-center justify-center rounded-full border border-dotted border-burgundy/40 bg-ivory text-burgundy backdrop-blur-sm">
        <Icon name="arrow" className="size-4" />
      </span>
    </a>
  );
}
