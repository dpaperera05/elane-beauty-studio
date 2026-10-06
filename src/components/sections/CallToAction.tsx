import Image from "next/image";
import { cta } from "@/content/home";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CallToAction() {
  return (
    <section id="book" className="relative overflow-hidden text-white">
      <Image
        src={`${cta.image}?w=2400&q=75`}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="container-site relative py-32 md:py-44">
        <Reveal className="max-w-2xl">
          <h2 className="type-h2">{cta.title}</h2>
          <p className="mt-6 max-w-xl text-white/85">{cta.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
            <Button href={cta.secondary.href} variant="light">
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
