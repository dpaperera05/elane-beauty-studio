import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactVisit } from "@/components/contact/ContactVisit";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact | Elane Beauty Studio",
  description:
    "Visit, call or message Elane Beauty Studio in Colombo 07: address, opening hours, directions and an enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      {/* No full-bleed hero here, so clear the fixed header before the first section. */}
      <main className="pt-16 lg:pt-20">
        <ContactHero />
        <ContactVisit />
        <ContactMap />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
