import Image from "next/image";
import { hero } from "@/content/home";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden text-white">
      {/* Poster first: paints immediately and stays as the reduced-motion fallback. */}
      <Image
        src={hero.video.poster}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/*
        Decorative background loop. It has no poster of its own, so it stays
        transparent over the matching poster image until the first frame is
        ready — no black flash. Sources only match when motion is allowed, so
        with reduced motion nothing loads or plays (CSS hides it as a fallback).
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
        className="hero-video absolute inset-0 size-full object-cover motion-reduce:hidden"
      >
        <source
          src={hero.video.mobile}
          type="video/mp4"
          media="(prefers-reduced-motion: no-preference) and (max-width: 767px)"
        />
        <source
          src={hero.video.desktop}
          type="video/mp4"
          media="(prefers-reduced-motion: no-preference)"
        />
      </video>
      <div
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-black/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-black/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container-site relative pt-44 pb-24 md:pb-40">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="type-display">
            {hero.titleLines.map((line, i) => {
              const [start, end] = line.split(hero.titleEmphasis);
              return (
                <span key={line} data-intro="headline-line" className="block">
                  {end === undefined ? (
                    line
                  ) : (
                    <>
                      {start}
                      <em>{hero.titleEmphasis}</em>
                      {end}
                    </>
                  )}
                  {/* Keeps words separated for screen readers and copy-paste. */}
                  {i < hero.titleLines.length - 1 && " "}
                </span>
              );
            })}
          </h1>
          <p data-intro="hero-copy" className="type-lead mx-auto mt-7 max-w-[42rem] text-balance text-white/85">
            {hero.body}
          </p>
          {/* Equal-width pair: grid columns share the widest button's width
              (stacked on phones, side by side from sm). */}
          <div data-intro="hero-cta" className="mt-9 inline-grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="light">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
