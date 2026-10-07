import { footer, site } from "@/content/home";
import { Logo } from "./Logo";
import { Icon } from "./ui/Icon";

/** Small uppercase group heading in rose. */
function GroupLabel({ children }: { children: string }) {
  return <p className="type-label text-rose">{children}</p>;
}

const linkClass = "link-underline text-ivory/80 hover:text-ivory";

/**
 * Site footer on a wine band (the same burgundy as the Signature Ritual,
 * deepening towards the bottom). Desktop: the wordmark and tagline on the
 * left, four compact groups on the right; a hairline bottom row closes it.
 * Mobile: wordmark first, then the groups two by two.
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-burgundy bg-[linear-gradient(170deg,var(--color-burgundy)_30%,var(--color-burgundy-deep)_100%)] text-ivory"
    >
      <div className="container-site pt-10 pb-6 md:pt-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-12 lg:gap-x-10">
          {/* Wordmark + tagline */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <a href={site.homeHref} aria-label={`${site.fullName} home`} className="inline-block">
              <Logo />
            </a>
            <p className="mt-3 max-w-xs font-serif text-xl text-ivory/75 italic">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
            <GroupLabel>Explore</GroupLabel>
            <ul className="type-small mt-3 space-y-1">
              {footer.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 lg:col-span-2">
            <GroupLabel>Visit</GroupLabel>
            <address className="type-small mt-3 text-ivory/80 not-italic">
              {footer.visit.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <GroupLabel>Opening Hours</GroupLabel>
            <dl className="type-small mt-3 space-y-1.5">
              {footer.hours.map((row) => (
                <div key={row.days}>
                  <dt className="text-ivory/70">{row.days}</dt>
                  <dd className="whitespace-nowrap text-ivory/80">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <GroupLabel>Contact</GroupLabel>
            <ul className="type-small mt-3 space-y-1">
              <li>
                <a href={`mailto:${footer.contact.email}`} className={linkClass}>
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a href={footer.contact.phoneHref} className={`${linkClass} whitespace-nowrap`}>
                  {footer.contact.phone}
                </a>
              </li>
            </ul>
            <ul className="mt-4 flex gap-2.5">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/80 transition-colors duration-300 hover:border-ivory/60 hover:text-ivory"
                  >
                    <Icon name={item.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="type-small mt-8 flex flex-col gap-2 border-t border-ivory/15 pt-5 text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex gap-6">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline hover:text-ivory">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
