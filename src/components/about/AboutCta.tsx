import { aboutCta } from "@/content/about";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * The page's closing invitation on an ivory band: a centred heading with two
 * buttons beneath, booking first. SectionHeading reveals it on scroll.
 */
export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-title" className="section-space bg-ivory">
      <div className="container-site">
        <SectionHeading
          id="about-cta-title"
          eyebrow={aboutCta.eyebrow}
          title={aboutCta.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        >
          <div className="flex flex-wrap justify-center gap-3.5">
            <Button href={aboutCta.primary.href} className="min-w-48">
              {aboutCta.primary.label}
            </Button>
            <Button href={aboutCta.secondary.href} variant="secondary">
              {aboutCta.secondary.label}
            </Button>
          </div>
        </SectionHeading>
      </div>
    </section>
  );
}
