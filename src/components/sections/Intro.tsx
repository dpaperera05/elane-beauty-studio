import Image from "next/image";
import { intro } from "@/content/home";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function Intro() {
  return (
    <section className="section-space">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="type-h2">{intro.title}</h2>
          <p className="mt-6 max-w-xl text-muted">{intro.body}</p>
        </Reveal>

        <Reveal delay={150}>
          <a
            href="#"
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={`${intro.image}?w=1400&q=75`}
              alt="Inside the Elane studio"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 rounded-full border border-dotted border-white/40 bg-white/20 py-2 pr-5 pl-2 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-ink">
                <span className="flex size-11 items-center justify-center rounded-full bg-burgundy text-ivory">
                  <Icon name="play" className="size-4" />
                </span>
                {intro.videoLabel}
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
