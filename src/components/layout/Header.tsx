import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { siteConfig } from "@/lib/site";

/** Global site header: wordmark, centred primary nav, booking CTA, mobile menu below lg. */
export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-(--header-height) items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Wordmark className="justify-self-start" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10 xl:gap-12">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-self-end lg:col-start-3">
          <div className="hidden sm:block">
            <Button href={siteConfig.booking.href} size="compact">
              {siteConfig.booking.label}
            </Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  );
}
