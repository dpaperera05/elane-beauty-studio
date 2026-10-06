export const siteConfig = {
  name: "ÉLANE",
  tagline: "Beauty, shaped around you.",
  title: "ÉLANE — Contemporary Hair & Beauty Studio",
  description:
    "A premium contemporary hair and beauty studio creating personalised experiences in hair, beauty, skin and styling.",
  /** Primary navigation. The wordmark links home, so Home is not listed. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  /** Booking CTA target — points at Contact until the booking flow exists. */
  booking: { label: "Book Appointment", href: "/contact" },
  reviews: { rating: 4.9, clients: "2,400+" },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
