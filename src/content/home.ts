// All homepage copy and imagery lives here so it can be edited without touching layout code.

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

export const about = {
  eyebrow: "About the Studio",
  title: "A modern beauty studio in the heart of Colombo.",
  body: "ÉLANE is a full-service beauty studio created around thoughtful care, skilled artistry and a calm, welcoming experience. From hair and skin to nails, makeup and bridal, every service begins with understanding what works for you.",
  cta: { label: "Discover Our Studio", href: "/about" },
  location: "Colombo 07 · Sri Lanka",
  highlights: [
    { value: "05", label: "Beauty disciplines under one roof" },
    { value: "1:1", label: "Consultation before every service" },
  ],
  badge: {
    title: "Full-service beauty studio",
    services: ["Hair", "Skin", "Nails", "Makeup", "Bridal"],
  },
  // Stand-ins from Unsplash; replace with the studio's own photography.
  images: {
    main: {
      src: "/images/home/about-hair-ritual.jpg",
      alt: "Stylist rinsing a client's hair at a backwash basin",
    },
    secondary: {
      src: "/images/home/about-skin-ritual.jpg",
      alt: "Therapist brushing a clay mask onto a relaxed client",
    },
    detail: {
      src: "/images/home/about-nail-detail.jpg",
      alt: "Close-up of softly polished, almond-shaped nails",
    },
  },
};
