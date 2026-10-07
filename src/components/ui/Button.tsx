import { Icon } from "./Icon";
import { GlassLayers } from "./LiquidGlass";

type Variant = "primary" | "secondary" | "light" | "ivory" | "link";

// Liquid glass is the only hover effect on pill buttons (see LiquidGlass.tsx).
// Solid burgundy keeps its colour and only gains the sheen; the outline
// variant's text turns ivory so it stays legible on its burgundy glass tint.
// `ivory` is the solid button for burgundy sections (its badge inverts; its
// sheen is tuned to show on the ivory fill).
// `link` is text-only, so it keeps a plain colour hover.
const variants: Record<Variant, string> = {
  primary:
    "liquid-glass liquid-glass--solid bg-burgundy text-ivory border-burgundy",
  secondary:
    "liquid-glass liquid-glass--burgundy bg-transparent text-ink border-ink/20 hover:text-ivory",
  light:
    "liquid-glass liquid-glass--clear liquid-glass--frosted text-white border-white/30",
  ivory:
    "liquid-glass liquid-glass--solid liquid-glass--ivory bg-ivory text-burgundy border-ivory",
  link: "bg-transparent text-ink border-transparent !px-0 hover:text-burgundy",
};

const base =
  "inline-flex h-12 items-center whitespace-nowrap gap-3 rounded-full border py-1.5 pr-1.5 pl-5 type-ui";

type ButtonProps = {
  children: string;
  variant?: Variant;
  className?: string;
} & (
  | { href: string }
  // Without an href it renders a real <button> for in-page actions.
  | { href?: undefined; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }
);

/** Pill button with a circular arrow badge; turns to liquid glass on hover. */
export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  // A disabled button goes quiet: muted fill, no glass.
  const disabled = props.href === undefined && Boolean(props.disabled);

  const content = (
    <>
      {variant !== "link" && !disabled && <GlassLayers />}
      {/* flex-1 + text-center: when a button is stretched wider than its
          content, the label centres in the space left of the arrow badge. */}
      <span className="relative block flex-1 text-center leading-6">{children}</span>
      <span
        className={`relative flex size-9 items-center justify-center rounded-full border border-dotted backdrop-blur-sm ${
          disabled
            ? "border-line bg-white text-muted"
            : variant === "ivory"
              ? "border-ivory/40 bg-burgundy text-ivory"
              : "border-burgundy/40 bg-ivory text-burgundy"
        }`}
      >
        <Icon name="arrow" className="size-4" />
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        className={`${base} transition-[color,transform] duration-300 ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={disabled}
      className={`${base} transition-[color,background-color,border-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
        disabled ? "cursor-not-allowed border-line bg-ivory-light text-muted" : variants[variant]
      } ${className}`}
    >
      {content}
    </button>
  );
}
