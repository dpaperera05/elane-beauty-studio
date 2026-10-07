import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/services/CategoryNav";
import { RitualFeature } from "@/components/services/RitualFeature";
import { ServiceCategorySection } from "@/components/services/ServiceCategorySection";
import { ServicesHero } from "@/components/services/ServicesHero";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
  title: "Services | Elane Beauty Studio",
  description:
    "The ÉLANE service menu: hair, skin, nails, beauty and makeup, bridal and treatments, with prices and durations. Book any service online.",
};

// The Ritual sits halfway down the menu, between two groups of categories.
const RITUAL_AFTER = 3;

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* The header stays transparent while this is behind it. */}
        <div data-header-overlay>
          <ServicesHero />
        </div>
        <CategoryNav />
        {/* Each group is its own wrapper so the first category of a group
            carries no top rule. */}
        <div>
          {serviceCategories.slice(0, RITUAL_AFTER).map((category, i) => (
            <ServiceCategorySection key={category.id} category={category} index={i} />
          ))}
        </div>
        <RitualFeature />
        <div>
          {serviceCategories.slice(RITUAL_AFTER).map((category, i) => (
            <ServiceCategorySection
              key={category.id}
              category={category}
              index={RITUAL_AFTER + i}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
