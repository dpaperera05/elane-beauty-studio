import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Artists } from "@/components/about/Artists";
import { Story } from "@/components/about/Story";
import { WhyElane } from "@/components/about/WhyElane";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "About | Elane Beauty Studio",
  description:
    "Since 2010, ÉLANE has grown into a full-service beauty studio in Colombo. Our story, what sets us apart and the artists behind your look.",
};

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
        <Artists />
      </main>
      <Footer />
    </>
  );
}
