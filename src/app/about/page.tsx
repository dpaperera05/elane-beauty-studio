import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Team } from "@/components/sections/Team";
import { WhyElane } from "@/components/sections/WhyElane";

export const metadata: Metadata = {
  title: "About | Elane Beauty Studio",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* No hero here, so clear the fixed header before the first section. */}
      <main className="pt-16 lg:pt-20">
        <WhyElane />
        <Team />
      </main>
      <Footer />
    </>
  );
}
