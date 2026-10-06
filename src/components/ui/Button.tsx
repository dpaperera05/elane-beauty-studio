import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Burgundy fill — the main call to action. One per view where possible. */
  primary:
    "min-h-13 px-7 rounded-sharp bg-accent text-surface hover:bg-accent-deep",
  /** Hairline outline that fills charcoal on hover. */
  secondary:
    "min-h-13 px-7 rounded-sharp border border-ink text-ink hover:bg-ink hover:text-surface",
  /** Editorial text link with drawn underline. */
  text: "py-1 text-ink",
} as const;

type Variant = keyof typeof variants;

type BaseProps = {
  variant?: Variant;
  /** Show the trailing arrow. Defaults to true for primary and text links. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps>;

type NativeButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Renders a Next.js `Link` when given `href`, otherwise a native `<button>`. */
export function Button({
  variant = "primary",
  arrow,
  className,
  children,
  ...rest
}: ButtonProps) {
  const showArrow = arrow ?? variant !== "secondary";

  const classes = cn(
    "group inline-flex items-center justify-center gap-3 text-ui font-semibold",
    "transition-colors duration-500 ease-editorial",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span className={variant === "text" ? "link-underline" : undefined}>
        {children}
      </span>
      {showArrow && (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
      )}
    </>
  );

  if (rest.href !== undefined) {
    const linkProps = rest as Omit<LinkButtonProps, keyof BaseProps>;
    return (
      <Link className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<NativeButtonProps, keyof BaseProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
