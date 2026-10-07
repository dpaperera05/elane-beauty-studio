"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";

const { videos } = hero;

/**
 * Hero background: the clips are stacked and play one after another on
 * repeat, switching with a hard cut. Only the first clip loads with the page;
 * the rest load once it's playing, so the switch never waits on the network.
 *
 * No video has a poster of its own, so each stays transparent over the
 * hero's poster image until its first frame is ready — no black flash.
 * Sources only match when motion is allowed, so with reduced motion nothing
 * loads or plays (CSS hides the videos as a fallback).
 */
export function HeroVideo() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const clips = refs.current.filter((v): v is HTMLVideoElement => v !== null);
    const [first, ...rest] = clips;
    if (!first) return;

    const warmUp = () =>
      rest.forEach((clip) => {
        clip.preload = "auto";
        clip.load();
      });

    // On each clip's end, start the next and cut to it.
    const onEnded = clips.map((_, i) => () => {
      const next = (i + 1) % clips.length;
      clips[next].play().catch(() => {});
      setCurrent(next);
    });

    first.addEventListener("playing", warmUp, { once: true });
    clips.forEach((clip, i) => clip.addEventListener("ended", onEnded[i]));
    return () => {
      first.removeEventListener("playing", warmUp);
      clips.forEach((clip, i) => clip.removeEventListener("ended", onEnded[i]));
    };
  }, []);

  // Rewind finished clips only after the cut has rendered (they're hidden
  // by then), so they're back on their first frame for their next turn.
  useEffect(() => {
    refs.current.forEach((clip, i) => {
      if (clip && i !== current && clip.ended) clip.currentTime = 0;
    });
  }, [current]);

  return videos.map((video, i) => (
    <video
      key={video.desktop}
      ref={(el) => {
        refs.current[i] = el;
      }}
      autoPlay={i === 0}
      muted
      playsInline
      preload={i === 0 ? "metadata" : "none"}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
      className={`hero-video absolute inset-0 size-full object-cover motion-reduce:hidden ${
        i === current ? "" : "invisible"
      }`}
    >
      <source
        src={video.mobile}
        type="video/mp4"
        media="(prefers-reduced-motion: no-preference) and (max-width: 767px)"
      />
      <source
        src={video.desktop}
        type="video/mp4"
        media="(prefers-reduced-motion: no-preference)"
      />
    </video>
  ));
}
