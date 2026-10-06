"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Desktop navigation link. A hairline draws in from the left on hover and
 * retracts to the right on leave; the current page keeps a burgundy line.
 */
export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const isActive = isActivePath(usePathname(), href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="relative py-2 text-label font-semibold tracking-[0.16em] text-ink uppercase after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-editorial hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 aria-[current=page]:after:scale-x-100 aria-[current=page]:after:bg-accent"
    >
      {children}
    </Link>
  );
}
