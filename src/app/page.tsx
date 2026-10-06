import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/site";

// Temporary design-system preview. Replaced by the real homepage in the next phase.

const typeScale = [
  { token: "text-display", note: "Section heading · 64–72px", className: "font-display text-display", sample: "Crafted with intention" },
  { token: "text-heading", note: "Secondary heading · 42–48px", className: "font-display text-heading", sample: "Hair, skin & bridal" },
  { token: "text-title", note: "Card title · 26–32px", className: "font-display text-title font-medium", sample: "Signature Colour" },
  { token: "text-body-lg", note: "Large body · 18px", className: "text-body-lg text-ink-soft", sample: "Every appointment begins with a conversation about you." },
  { token: "text-body", note: "Body · 16px", className: "text-body text-ink-soft", sample: "Precision cuts, considered colour and skin rituals, shaped to your features and your routine." },
];

const swatches = [
  { name: "Canvas", hex: "#F5F1EA", className: "bg-canvas" },
  { name: "Surface", hex: "#FCFAF7", className: "bg-surface" },
  { name: "Surface muted", hex: "#E9E0D5", className: "bg-surface-muted" },
  { name: "Ink", hex: "#191817", className: "bg-ink" },
  { name: "Ink soft", hex: "#67625D", className: "bg-ink-soft" },
  { name: "Accent", hex: "#7A343D", className: "bg-accent" },
  { name: "Accent soft", hex: "#C9A3A1", className: "bg-accent-soft" },
  { name: "Line", hex: "#D8D0C6", className: "bg-line" },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Section className="flex min-h-[85svh] items-center">
        <Container>
          <Reveal className="flex flex-col gap-10 md:gap-14">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <p className="font-display text-title font-medium tracking-[0.18em]">
                {siteConfig.name}
              </p>
              <SectionLabel tone="muted">Design System Foundation Ready</SectionLabel>
            </div>

            <h1 className="max-w-[12ch] text-hero">
              Beauty, <em className="text-accent">shaped</em> around you.
            </h1>

            <p className="max-w-xl text-body-lg text-ink-soft">{siteConfig.description}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="typography-heading">
        <Container className="flex flex-col gap-12">
          <SectionLabel>Typography</SectionLabel>
          <h2 id="typography-heading" className="sr-only">Typography</h2>
          <dl className="divide-y divide-line border-y border-line">
            {typeScale.map((item) => (
              <div key={item.token} className="grid gap-3 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                <dt className="flex flex-col gap-1 text-sm">
                  <code className="font-semibold text-ink">{item.token}</code>
                  <span className="text-ink-soft">{item.note}</span>
                </dt>
                <dd className={item.className}>{item.sample}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="colour-heading">
        <Container className="flex flex-col gap-12">
          <SectionLabel>Colour</SectionLabel>
          <h2 id="colour-heading" className="sr-only">Colour</h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
            {swatches.map((swatch) => (
              <li key={swatch.name} className="flex flex-col gap-3">
                <span aria-hidden="true" className={`aspect-4/3 border border-line ${swatch.className}`} />
                <span className="flex flex-col text-sm">
                  <span className="font-semibold">{swatch.name}</span>
                  <span className="text-ink-soft">{swatch.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="components-heading">
        <Container className="flex flex-col gap-12">
          <SectionLabel>Components</SectionLabel>
          <h2 id="components-heading" className="text-heading">
            Buttons &amp; labels
          </h2>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center">
            <Button>Book Appointment</Button>
            <Button variant="secondary">View Services</Button>
            <Button variant="text">Discover the studio</Button>
          </div>
          <div className="flex flex-col gap-4">
            <SectionLabel>Accent label</SectionLabel>
            <SectionLabel tone="muted">Muted label</SectionLabel>
          </div>
        </Container>
      </Section>
    </main>
  );
}
