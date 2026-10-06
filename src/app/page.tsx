import { Header } from "@/components/Header";
import { SiteIntro } from "@/components/SiteIntro";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      {/* Must stay before the header and main: CSS keys the hidden pre-intro state off it. */}
      <SiteIntro />
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
