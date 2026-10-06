import { Header } from "@/components/Header";
import { SiteIntro } from "@/components/SiteIntro";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      {/* Must stay before the header and main: CSS keys the hidden pre-intro state off it. */}
      <SiteIntro />
      <Header />
      <main>
        {/* The header stays transparent while this is behind it. */}
        <div data-header-overlay>
          <Hero />
        </div>
        <About />
      </main>
    </>
  );
}
