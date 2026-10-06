import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/site";

/*
 * Load sequence (CSS, motion-safe only — reduced motion shows everything at once):
 *   0ms     header fades in (HeaderShell)
 *   100ms   eyebrow · 120ms portrait unveils and settles
 *   180ms   "Beauty," rises · 300ms italic line rises
 *   460ms   copy · 560ms CTAs · 620ms detail image · 680ms rating
 * Everything has settled by ~1.4s and is interactive from first paint.
 */

export function Hero() {
  const { rating, clients } = siteConfig.reviews;

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-[calc(var(--header-height)+2.5rem)] pb-16 md:pt-[calc(var(--header-height)+3.5rem)] md:pb-20 lg:pt-[calc(var(--header-height)+1.5rem)] lg:pb-12"
    >
      <Container className="grid gap-y-10 md:gap-y-14 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:gap-y-0 xl:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] xl:gap-x-16">
        {/* Copy */}
        <div className="flex flex-col lg:self-center">
          <SectionLabel className="motion-safe:animate-fade-in motion-safe:[animation-delay:100ms]">
            Contemporary Hair &amp; Beauty Studio
          </SectionLabel>

          <h1 id="hero-heading" className="mt-7 font-display text-hero md:mt-9">
            {/* Each line rises out of its own mask. Bottom/right padding keeps
                italic overhangs and descenders clear of the clip. */}
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block tracking-[0.01em] uppercase motion-safe:animate-line-rise motion-safe:[animation-delay:180ms]">
                Beauty,
              </span>
            </span>
            <span className="-mt-[0.08em] block overflow-hidden pr-[0.12em] pb-[0.18em]">
              <span className="block pl-[0.05em] text-[0.64em] leading-[1.05] tracking-[-0.01em] text-accent italic motion-safe:animate-line-rise motion-safe:[animation-delay:300ms]">
                shaped around you.
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-[25rem] text-body-lg text-ink-soft motion-safe:animate-fade-up motion-safe:[animation-delay:460ms] md:mt-7">
            Personalised hair, beauty and skin experiences designed around your individuality.
          </p>

          <div className="mt-9 flex flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:560ms] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10">
            <Button href={siteConfig.booking.href}>Book an Appointment</Button>
            <Button href="/services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>

        {/* Imagery */}
        <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-surface-muted motion-safe:animate-unveil motion-safe:[animation-delay:120ms] md:ml-auto md:w-[76%] lg:aspect-auto lg:h-[clamp(34rem,calc(100svh-var(--header-height)-4.5rem),50rem)] lg:w-[84%]">
            <Image
              src="/images/home/hero-portrait.jpg"
              alt="Portrait of a woman with softly sculpted, glossy hair against a warm neutral backdrop"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1440px) 576px, (min-width: 1024px) 40vw, (min-width: 768px) 76vw, 100vw"
              className="object-cover object-[50%_30%] motion-safe:animate-settle motion-safe:[animation-delay:120ms]"
            />
          </div>

          {/* Overlapping detail, framed in canvas so it reads as a separate print. */}
          <div className="absolute bottom-[9%] left-0 hidden aspect-3/4 w-[34%] border-[6px] border-canvas bg-surface-muted motion-safe:animate-fade-up motion-safe:[animation-delay:620ms] md:block lg:w-[30%] lg:border-8">
            <div className="relative size-full overflow-hidden">
              <Image
                src="/images/home/hero-detail.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 200px, 34vw"
                className="object-cover"
              />
            </div>
          </div>

          <p
            aria-hidden="true"
            className="absolute top-0 -right-9 hidden text-label tracking-[0.3em] text-ink-soft uppercase [writing-mode:vertical-rl] motion-safe:animate-fade-in motion-safe:[animation-delay:700ms] xl:block"
          >
            {siteConfig.name} — Est. 2026
          </p>
        </div>

        {/* Rating */}
        <p className="flex items-center gap-4 motion-safe:animate-fade-up motion-safe:[animation-delay:680ms] lg:row-start-2 lg:self-end lg:border-t lg:border-line lg:pt-6">
          <span aria-hidden="true" className="font-display text-[2.75rem] leading-none">
            {rating}
          </span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} strokeWidth={0} fill="currentColor" className="size-3" />
              ))}
            </span>
            <span className="text-sm text-ink-soft">Loved by {clients} clients</span>
          </span>
          <span className="sr-only">
            Rated {rating} out of 5, loved by {clients} clients
          </span>
        </p>
      </Container>
    </section>
  );
}
