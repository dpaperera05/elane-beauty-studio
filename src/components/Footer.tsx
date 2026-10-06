import { footer, site } from "@/content/home";
import { Icon, type IconName } from "./ui/Icon";
import { Logo } from "./Logo";
import { OpeningHours } from "./OpeningHours";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-line">
      <h2 className="sr-only">Footer</h2>
      <div className="container-site grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <a href="#" className="text-burgundy" aria-label={`${site.fullName} home`}>
            <Logo />
          </a>
          <div>
            <h3 className="type-label mb-4">Follow us</h3>
            <ul className="flex gap-2">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="flex size-11 items-center justify-center rounded-full border border-ink/20 transition hover:border-burgundy hover:bg-burgundy hover:text-ivory"
                  >
                    <Icon name={s.icon as IconName} className="size-5" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1.4fr] lg:col-span-8">
          {footer.groups.map((group) => (
            <section key={group.title}>
              <h3 className="type-label mb-5">{group.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-muted transition hover:text-ink"
                    >
                      {link.label}
                      <Icon
                        name="arrow"
                        className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <OpeningHours {...footer.hours} />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col justify-between gap-2 py-6 type-small text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>Designed &amp; built in Next.js</p>
        </div>
      </div>
    </footer>
  );
}
