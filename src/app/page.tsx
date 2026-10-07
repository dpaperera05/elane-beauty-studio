import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteIntro } from "@/components/SiteIntro";
import { About } from "@/components/sections/About";
import { BookingPreview } from "@/components/sections/BookingPreview";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SignatureRitual } from "@/components/sections/SignatureRitual";
import { Testimonials } from "@/components/sections/Testimonials";

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
        <Services />
        <SignatureRitual />
        <Gallery />
        <Testimonials />
        <BookingPreview />
      </main>
      <Footer />
    </>
  );
}
