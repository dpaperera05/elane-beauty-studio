import { galleryCta } from "@/content/gallery";
import { Button } from "../ui/Button";

/**
 * The gallery's closing invitation: a burgundy block set inside the white
 * page, so it reads as the end of the gallery and stays distinct from the
 * burgundy footer below it.
 */
export function GalleryCta() {
  return (
    <section aria-labelledby="gallery-cta-title" className="container-site pb-16 md:pb-24">
      <div className="relative isolate flex flex-col items-center overflow-hidden bg-burgundy bg-[radial-gradient(ellipse_75%_65%_at_88%_8%,rgb(150_72_82/0.55),transparent_70%),linear-gradient(160deg,var(--color-burgundy)_15%,var(--color-burgundy-deep)_100%)] px-6 py-[clamp(4rem,3rem+5vw,7.5rem)] text-center text-ivory">
        {/* The same faint É used on the homepage's Ritual section. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-0.06em] bottom-[-0.24em] -z-10 font-serif text-[clamp(14rem,8rem+20vw,30rem)] leading-none text-ivory/4.5 select-none"
        >
          É
        </span>
        <h2
          id="gallery-cta-title"
          className="type-h2 leading-[0.98] tracking-[-0.03em] text-ivory"
        >
          {galleryCta.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-9 md:mt-11">
          <Button href={galleryCta.button.href} variant="ivory" className="min-w-60">
            {galleryCta.button.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
