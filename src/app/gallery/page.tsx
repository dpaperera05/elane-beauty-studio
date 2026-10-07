import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GalleryCta } from "@/components/gallery/GalleryCta";
import { GalleryView } from "@/components/gallery/GalleryView";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Gallery | Elane Beauty Studio",
  description:
    "The ÉLANE Edit: hair, skin, nails, beauty, bridal and treatment moments from Elane Beauty Studio.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      {/* No hero here, so clear the fixed header before the first section. */}
      <main className="pt-16 lg:pt-20">
        <GalleryView />
        <GalleryCta />
      </main>
      <Footer />
    </>
  );
}
