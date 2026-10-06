import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteIntro } from "@/components/SiteIntro";
import { CallToAction } from "@/components/sections/CallToAction";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      {/* Must stay before the header and main: CSS keys the hidden pre-intro state off it. */}
      <SiteIntro />
      <Header />
      <main>
        <Hero />
        <Products />
        <Intro />
        <Services />
        <Team />
        <Testimonials />
        <CallToAction />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
