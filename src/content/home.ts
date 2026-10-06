// All homepage copy and imagery lives here so it can be edited without touching layout code.

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const site = {
  name: "Elane",
  fullName: "Elane Beauty Studio",
  location: "Colombo, Sri Lanka",
};

export const nav = [
  { label: "Home", href: "#" },
  {
    label: "Services",
    children: [
      {
        label: "Studio",
        description: "Everyday hair, skin & nails",
        href: "#studio",
      },
      {
        label: "Bridal",
        description: "Trials, styling & on-location care",
        href: "#bridal",
      },
      {
        label: "Academy",
        description: "Hands-on beauty courses",
        href: "#",
      },
    ],
  },
  { label: "About", href: "#team" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#footer" },
];

// Hero background videos. `salon` is live; `nails` is kept as a spare alternative.
const heroVideos = {
  // Salon wash scene: 1080p source, 15s loop.
  salon: {
    poster: "/video/hero-poster.jpg",
    desktop: "/video/hero-1080.mp4",
    mobile: "/video/hero-720.mp4",
  },
  // Nail bar scene: 720p source only (no 1080p available), 8.3s loop.
  nails: {
    poster: "/video/hero-b-poster.jpg",
    desktop: "/video/hero-b-720.mp4",
    mobile: "/video/hero-b-720.mp4",
  },
};

export const hero = {
  // Headline set on three fixed lines; the emphasis word is italicised.
  titleLines: ["Quiet Luxury", "for Hair, Skin", "& Every Occasion"],
  titleEmphasis: "Luxury",
  body: "Thoughtful hair, beauty and skin experiences, designed around you by expert artists, in a calm studio where nothing is rushed.",
  // Background loop, re-encoded so the last second dissolves into the first
  // (seamless loop). The poster is the video's exact first frame.
  // Swap to `heroVideos.nails` to use the alternative clip.
  video: heroVideos.salon,
  primary: { label: "Explore Services", href: "#studio" },
  secondary: { label: "Book a Visit", href: "#book" },
};

export const products = {
  title: "Professional formulas, chosen with care",
  brands: [
    "Kérastase",
    "Wella Professionals",
    "Olaplex",
    "Davines",
    "Redken",
    "Moroccanoil",
    "Dermalogica",
    "OPI",
    "Goldwell",
    "K18",
  ],
};

export const intro = {
  title: "A slower, more personal kind of salon visit",
  body: "From the first consultation to the final mirror check, every appointment is built around you. Expect warm towels, honest advice and artists who take the time to understand what you actually want — then deliver it beautifully.",
  videoLabel: "Take the studio tour",
  image: unsplash("1560066984-138dadb4c035"),
};

export type ServiceIcon =
  | "scissors"
  | "drop"
  | "hand"
  | "sparkle"
  | "chat"
  | "calendar"
  | "heart"
  | "clock";

type Service = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: { icon: ServiceIcon; title: string; subtitle: string }[];
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "studio",
    eyebrow: "01 — The Studio",
    title: "Everyday Rituals, Elevated",
    body: "Whether it's a fresh cut on your lunch break or a full colour transformation, our studio team blends precision with a soft, relaxed touch.",
    items: [
      { icon: "scissors", title: "Cut & Colour", subtitle: "Precision cuts • Balayage" },
      { icon: "drop", title: "Smoothing", subtitle: "Keratin & bond repair" },
      { icon: "hand", title: "Nail Studio", subtitle: "Gel • Spa pedicures" },
      { icon: "sparkle", title: "Skin Rituals", subtitle: "Facials & brightening" },
    ],
    cta: { label: "View studio services", href: "#" },
    image: unsplash("1562322140-8baeececf3df"),
    imageAlt: "Stylist blow-drying a client's hair in a bright salon",
  },
  {
    id: "bridal",
    eyebrow: "02 — The Bride",
    title: "Bridal Beauty, Thoughtfully Planned",
    body: "Your wedding look should feel effortless on the day — which is why we plan every detail with you weeks ahead, from skin prep to the final pin.",
    items: [
      { icon: "chat", title: "Discovery Session", subtitle: "Mood boards & trials" },
      { icon: "calendar", title: "Countdown Care", subtitle: "Skin & hair prep plans" },
      { icon: "heart", title: "Wedding Morning", subtitle: "In studio or on location" },
      { icon: "clock", title: "All-Day Touch-Ups", subtitle: "We stay until the last dance" },
    ],
    cta: { label: "Plan your bridal look", href: "#" },
    image: unsplash("1519741497674-611481863552"),
    imageAlt: "Bride holding a bouquet in warm evening light",
  },
];

export const team = {
  eyebrow: "The Artists",
  title: "The Hands Behind Every Finish",
  body: "Our stylists, colourists and makeup artists train continuously and work as one close-knit team. Tell us who you love working with, or let us match you with the artist best suited to your look.",
  cta: { label: "Meet the team", href: "#" },
  image: unsplash("1559599101-f09722fb4948"),
  imageAlt: "Three smiling stylists holding brushes and scissors",
};

export const testimonials = {
  title: "Kind Words From Our Guests",
  body: "A few notes from the people who keep coming back.",
  items: [
    {
      quote:
        "I've never had a colourist listen this carefully. Mila talked me out of going too light and the result is honestly the best my hair has ever looked.",
      name: "Tharushi W.",
      service: "Balayage with Mila",
    },
    {
      quote:
        "Booked a last-minute blow-dry before a work event and was treated like a VIP. Calm, quick and the style lasted three days.",
      name: "Dinali R.",
      service: "Blow-dry with Jonah",
    },
    {
      quote:
        "The bridal trial alone was worth it. Ravi understood exactly the soft, glowy look I wanted and on the day everything was perfectly on time.",
      name: "Nethmi & Kasun",
      service: "Bridal with Ravi",
    },
    {
      quote:
        "Finally a nail studio that takes hygiene seriously. My gel manicure lasted almost four weeks without a single chip.",
      name: "Amaya F.",
      service: "Gel manicure with Sana",
    },
    {
      quote:
        "The keratin treatment changed my mornings. My hair is softer, shinier and takes half the time to style.",
      name: "Ishara P.",
      service: "Keratin with Mila",
    },
    {
      quote:
        "Beautiful space, lovely people and the facial left my skin glowing for days. Already booked my next one.",
      name: "Hiruni S.",
      service: "Signature facial with Leah",
    },
  ],
};

export const cta = {
  title: "Your Chair Is Waiting",
  body: "Reserve a moment just for you. Book online in under a minute, or start a conversation about your wedding day.",
  primary: { label: "Book Now", href: "#book" },
  secondary: { label: "Bridal Enquiry", href: "#bridal" },
  image: unsplash("1521590832167-7bcbfaa6381f"),
};

export const faq = {
  title: "Questions, Answered",
  body: "Everything you might want to know before your first visit.",
  items: [
    {
      q: "How far in advance should I book?",
      a: "Weekday appointments can usually be booked a few days ahead. For weekends, colour services and bridal trials we recommend booking two to three weeks in advance.",
    },
    {
      q: "When should I schedule my bridal trial?",
      a: "Ideally six to eight weeks before your wedding. That leaves enough time to refine the look and plan any skin or hair prep sessions in the lead-up.",
    },
    {
      q: "Which products do you use?",
      a: "We use professional-grade haircare, skincare and nail systems selected for performance and gentleness. Your artist will happily recommend products for at-home care.",
    },
    {
      q: "Do you accept walk-ins?",
      a: "We welcome walk-ins whenever a chair is free, but booking ahead is the best way to secure your preferred artist and time.",
    },
    {
      q: "Can treatments be tailored to me?",
      a: "Always. Every service starts with a short consultation so we can adjust techniques, products and timing to suit your hair, skin and schedule.",
    },
  ],
};

export const footer = {
  social: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "TikTok", href: "#", icon: "tiktok" },
  ],
  groups: [
    {
      title: "Quick Links",
      links: [
        { label: "About us", href: "#team" },
        { label: "Pricing", href: "#" },
        { label: "Book Online", href: "#book" },
        { label: "Bridal Enquiry", href: "#bridal" },
        { label: "Offers", href: "#" },
        { label: "Contact us", href: "#footer" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Studio", href: "#studio" },
        { label: "Bridal", href: "#bridal" },
        { label: "Academy", href: "#" },
      ],
    },
  ],
  hours: { open: 9, close: 19, timeZone: "Asia/Colombo" },
};
