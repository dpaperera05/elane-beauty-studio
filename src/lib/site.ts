export const siteConfig = {
  name: "ÉLANE",
  tagline: "Beauty, shaped around you.",
  title: "ÉLANE — Contemporary Hair & Beauty Studio",
  description:
    "A premium contemporary hair and beauty studio creating personalised experiences in hair, beauty, skin and styling.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Visit", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
