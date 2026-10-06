import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  /** 1280px content width — the default page column. */
  default: "max-w-[calc(var(--container-site)_+_var(--gutter)_*_2)]",
  /** ~768px — long-form copy and forms. */
  narrow: "max-w-[calc(var(--container-narrow)_+_var(--gutter)_*_2)]",
} as const;

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "header" | "footer" | "nav" | "article";
  size?: keyof typeof sizes;
};

/** Centres content and applies the responsive page gutter (`--gutter`). */
export function Container({
  as: Tag = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-(--gutter)", sizes[size], className)}
      {...props}
    />
  );
}
