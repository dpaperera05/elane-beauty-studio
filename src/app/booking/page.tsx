import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Book Your Visit | Elane Beauty Studio",
  description:
    "Plan your visit to Elane Beauty Studio: choose a service, treatment, artist and time.",
};

export default function BookingPage() {
  return (
    <>
      <Header />
      {/* No hero here, so clear the fixed header before the first section. */}
      <main className="pt-16 lg:pt-20">
        <BookingFlow />
      </main>
      <Footer />
    </>
  );
}
