import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, message or write to Elane Beauty Studio in Colombo 07: an enquiry form, opening hours and directions.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      {/* No hero here, so clear the fixed header before the first section. */}
      <main className="pt-16 lg:pt-20">
        <ContactView />
      </main>
      <Footer />
    </>
  );
}
