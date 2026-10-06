import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type WordmarkProps = {
  className?: string;
  onClick?: () => void;
};

/** Text logo linking home. */
export function Wordmark({ className, onClick }: WordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "font-display text-[1.625rem] leading-none font-medium tracking-[0.3em] lg:text-[1.75rem]",
        className,
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
