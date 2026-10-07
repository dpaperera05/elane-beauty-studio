import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Artists } from "@/components/about/Artists";
import { Story } from "@/components/about/Story";
import { WhyElane } from "@/components/about/WhyElane";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { artists } from "@/content/about";

export const metadata: Metadata = {
  title: "About | Elane Beauty Studio",
  description:
    "Since 2010, ÉLANE has grown into a full-service beauty studio in Colombo. Our story, what sets us apart and the artists behind your look.",
};

// A portrait whose file is not in /public yet is swapped (at build time) for
// the artist's stand-in photo, so the team never shows a broken image.
const members = artists.members.map(({ image, standIn, ...member }) => {
  const isPortrait = !standIn || existsSync(path.join(process.cwd(), "public", image.src));
  return { ...member, photo: isPortrait ? image : standIn, isPortrait };
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* The header stays transparent while this is behind it. */}
        <div data-header-overlay>
          <AboutHero />
        </div>
        <Story />
        <WhyElane />
        <Artists members={members} />
      </main>
      <Footer />
    </>
  );
}
