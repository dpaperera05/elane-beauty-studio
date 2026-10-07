import { footer, site } from "@/content/home";
import { Icon } from "./ui/Icon";

/** Small uppercase group heading with a burgundy hairline. */
function GroupLabel({ children }: { children: string }) {
  return (
    <p className="type-label flex items-center gap-3 text-burgundy/80">
      <span className="h-px w-5 bg-burgundy/50" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Site footer on a warm ivory band (a quiet close after the charcoal booking
 * section). A large wordmark with the tagline and navigation leads; the
 * practical details sit below in four light groups.
 */
export function Footer() {
  return (
    <footer id="footer" className="bg-ivory text-ink">
      <div className="container-site pt-20 pb-10 md:pt-24 lg:pt-28">
        {/* Wordmark + tagline | navigation */}
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <a href="#" aria-label={`${site.fullName} home`} className="inline-flex flex-col leading-none">
              {/* Negative right margin cancels the trailing letter-spacing. */}
              <span className="type-wordmark mr-[-0.26em] text-[clamp(3.5rem,2.4rem+5.5vw,7.5rem)]">
                Élane
              </span>
              <span className="mt-3 font-sans text-[0.6875rem] font-medium tracking-[0.42em] text-ink/70 uppercase md:mt-4">
                Beauty Studio
              </span>
            </a>
            <p className="mt-8 font-serif text-2xl text-ink/80 italic md:text-[1.75rem]">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-5 lg:justify-self-end">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 sm:gap-x-10">
              {footer.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="type-ui link-underline pb-1 text-ink hover:text-burgundy">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Details */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          <div>
            <GroupLabel>Visit</GroupLabel>
            <address className="type-small mt-5 text-ink not-italic">
              {footer.visit.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <GroupLabel>Opening Hours</GroupLabel>
            <dl className="type-small mt-5 space-y-3">
              {footer.hours.map((row) => (
                <div key={row.days}>
                  <dt className="text-muted">{row.days}</dt>
                  <dd className="text-ink">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <GroupLabel>Contact</GroupLabel>
            <ul className="type-small mt-5 space-y-1.5">
              <li>
                <a href={`mailto:${footer.contact.email}`} className="link-underline text-ink hover:text-burgundy">
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a href={footer.contact.phoneHref} className="link-underline text-ink hover:text-burgundy">
                  {footer.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <GroupLabel>Follow</GroupLabel>
            <ul className="type-small mt-5 space-y-2.5">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-burgundy">
                    <Icon
                      name={item.icon}
                      className="size-4 text-burgundy/80 transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    <span className="link-underline">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="type-small mt-16 flex flex-col gap-4 border-t border-line pt-8 text-muted sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p>{footer.copyright}</p>
          <ul className="flex gap-6">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline hover:text-ink">
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
