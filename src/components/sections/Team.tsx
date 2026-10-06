import Image from "next/image";
import { team } from "@/content/home";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";

export function Team() {
  return (
    <section id="team" className="section-space scroll-mt-8">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow>{team.eyebrow}</Eyebrow>
          <h2 className="type-h2">{team.title}</h2>
          <p className="mt-6 max-w-xl text-muted">{team.body}</p>
          <div className="mt-10">
            <Button href={team.cta.href}>{team.cta.label}</Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
            <Image
              src={`${team.image}?w=1400&q=75`}
              alt={team.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
