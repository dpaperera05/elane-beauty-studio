import { Icon } from "./Icon";
import { GlassLayers } from "./LiquidGlass";

type Variant = "primary" | "secondary" | "light" | "link";

// Every pill variant turns to liquid glass on hover (see LiquidGlass.tsx);
// solid burgundy buttons keep their colour and only gain the glass sheen.
// `link` is text-only, so it keeps a plain colour hover.
const variants: Record<Variant, string> = {
  primary:
    "liquid-glass liquid-glass--solid bg-burgundy text-ivory border-burgundy",
  secondary:
    "liquid-glass liquid-glass--burgundy bg-transparent text-ink border-ink/20 hover:border-white/25 hover:text-ivory",
  light:
    "liquid-glass liquid-glass--clear liquid-glass--frosted text-white border-white/30 hover:border-white/50",
  link: "bg-transparent text-ink border-transparent !px-0 hover:text-burgundy",
};

/**
 * Pill button with a circular arrow badge. On hover the label rolls up and
 * is replaced by a duplicate, and the pill becomes liquid glass.
 */
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
      className={`group inline-flex h-12 items-center whitespace-nowrap gap-3 rounded-full border py-1.5 pr-1.5 pl-5 type-ui transition-[color,background-color,border-color,box-shadow,transform] duration-300 ${variants[variant]} ${className}`}
    >
      {variant !== "link" && <GlassLayers />}
      <span className="relative block overflow-hidden leading-6">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-dotted border-burgundy/40 bg-ivory text-burgundy backdrop-blur-sm">
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-300 group-hover:translate-x-[150%]"
        />
        <Icon
          name="arrow"
          className="absolute size-4 -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0"
        />
      </span>
    </a>
  );
}
