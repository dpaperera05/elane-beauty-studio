import Image from "next/image";
import { brands } from "@/content/home";
import { SectionHeading } from "../ui/SectionHeading";

// The strip repeats the list four times: two per half, so each half stays
// wider than even a very wide screen and the loop never shows a gap.
const COPIES = 4;

/**
 * Product houses on a white band between the client stories and the booking
 * section: the shared section heading over a slow, endless strip of logos that
 * fades out at both edges and pauses under the pointer. With reduced motion
 * the strip stands still as one centred, wrapping row.
 */
export function Brands() {
  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="section-space bg-white"
    >
      <div className="container-site">
        <SectionHeading
          id="brands-title"
          eyebrow={brands.eyebrow}
          title={brands.title}
          tone="accent"
          titleClassName="leading-[0.94] tracking-[-0.035em]"
        />
      </div>

      <div className="mx-auto mt-12 max-w-[100rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:mt-16 lg:mt-20">
        <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-auto motion-reduce:justify-center">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul
              key={copy}
              // Only the first copy is real content; the rest are for the loop.
              aria-hidden={copy > 0 || undefined}
              className={`flex shrink-0 items-center gap-x-14 pr-14 text-[0.75rem] md:text-base md:gap-x-20 md:pr-20 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:px-6 ${
                copy > 0 ? "motion-reduce:hidden" : "motion-reduce:shrink"
              }`}
            >
              {brands.items.map((brand) => (
                <li key={brand.name} className="shrink-0">
                  {/* brightness-0 paints every logo solid black, whatever
                      colours the file uses. */}
                  <Image
                    src={brand.src}
                    alt={copy === 0 ? brand.name : ""}
                    width={brand.width}
                    height={brand.height}
                    loading="eager"
                    style={{ height: `${brand.size}em` }}
                    className="w-auto max-w-none opacity-85 brightness-0"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
