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
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#footer" },
];

// Hero background clips. Both play in sequence (see `hero.videos`).
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
  // Background clips, played in this order on repeat with a hard cut between
  // them. The first clip's poster (its exact first frame) paints before any
  // video loads and is the reduced-motion fallback.
  videos: [heroVideos.nails, heroVideos.salon],
  primary: { label: "Explore Services", href: "#studio" },
  secondary: { label: "Book a Visit", href: "#book" },
};

export const about = {
  eyebrow: "About the Studio",
  title: "A modern beauty studio in the heart of Colombo",
  body: [
    "ÉLANE is a full-service beauty studio created around thoughtful care, skilled artistry and a calm, welcoming experience. From hair and skin to nails, makeup and bridal, every service begins with understanding what works for you.",
    "Tucked into Colombo 07, the studio is a quiet retreat from the city, with soft light, unhurried appointments and senior artists who take the time to get it right. From a fresh cut to your wedding day, you leave feeling looked after, never rushed.",
  ],
  cta: { label: "Discover Our Studio", href: "/contact" },
  location: "Colombo 07 · Sri Lanka",
  // `icon` keys map to Lucide icons in About.tsx.
  highlights: [
    { icon: "disciplines", value: "05", label: "Beauty disciplines under one roof" },
    { icon: "consultation", value: "1:1", label: "Consultation before every service" },
  ],
  // Studio interiors: the tall main photo, then the two stacked beside it.
  images: {
    main: {
      src: "/images/home/about-styling-floor.jpg",
      alt: "Styling floor with round backlit mirrors, pendant lamps and hanging greenery",
    },
    secondary: {
      src: "/images/home/about-nail-lounge.jpg",
      alt: "Marble reception desk beside a nail-colour wall and window manicure stations",
    },
    detail: {
      src: "/images/home/about-mirror-wall.jpg",
      alt: "Row of backlit round mirrors and black styling chairs along a stone wall",
    },
  },
};

// Images: 4:5 portrait, 1200×1500 (shown at 4:5 everywhere), one warm,
// softly lit set. Stand-ins from Unsplash; swap for the studio's own photography.
export const services = {
  eyebrow: "Services",
  title: "Beauty rituals, thoughtfully crafted around you",
  linkLabel: "Explore",
  items: [
    {
      id: "hair",
      name: "Hair",
      descriptor: "Cuts · Colour · Balayage · Blow-Dry",
      href: "/services#hair",
      image: {
        src: "/images/services/hair-balayage.jpg",
        alt: "Back view of long, softly waved balayage hair in a bright salon",
      },
    },
    {
      id: "skin",
      name: "Skin",
      descriptor: "Facials · Peels · Glow Treatments",
      href: "/services#skin",
      image: {
        src: "/images/services/skin-facial-spa.jpg",
        alt: "Therapist giving a relaxed client a calming facial massage",
      },
    },
    {
      id: "nails",
      name: "Nails",
      descriptor: "Manicure · Pedicure · Gel & Nail Art",
      href: "/services#nails",
      image: {
        src: "/images/services/nails-nude.jpg",
        alt: "Hand with a glossy nude-pink manicure resting on soft white fur",
      },
    },
    {
      id: "beauty-makeup",
      name: "Beauty & Makeup",
      descriptor: "Brows · Lashes · Event Makeup",
      href: "/services#beauty-makeup",
      image: {
        src: "/images/services/makeup-eyeshadow.jpg",
        alt: "Makeup artist blending warm eyeshadow onto a client's eyelid",
      },
    },
    {
      id: "bridal",
      name: "Bridal",
      descriptor: "Bridal Hair & Makeup · Trials",
      href: "/services#bridal",
      image: {
        src: "/images/services/bridal-updo.jpg",
        alt: "Bridal braided updo finished with a pearl and leaf hair comb and veil",
      },
    },
    {
      id: "treatments",
      name: "Treatments",
      descriptor: "Keratin · Bond Repair · Scalp Care",
      href: "/services#treatments",
      image: {
        src: "/images/services/treatments-shirodhara.jpg",
        alt: "Guest resting beneath a brass vessel during an Ayurvedic shirodhara oil treatment",
      },
    },
  ],
};

// `icon` keys map to Lucide icons in WhyElane.tsx.
export const whyElane = {
  eyebrow: "Why Élane",
  title: "Care that goes beyond the appointment.",
  tagline: "Thoughtful service. Skilled hands. No rushed appointments.",
  points: [
    {
      icon: "consultation",
      title: "Personal Consultations",
      body: "Every service begins with understanding your goals, routine and preferences.",
    },
    {
      icon: "artists",
      title: "Expert Artists",
      body: "A skilled team across hair, skin, nails, beauty and bridal.",
    },
    {
      icon: "products",
      title: "Premium Products",
      body: "Professional-grade products chosen for performance, care and lasting results.",
    },
    {
      icon: "space",
      title: "Calm, Considered Space",
      body: "A welcoming studio designed to make every appointment feel relaxed and personal.",
    },
  ] as const,
  // Stand-in from Unsplash; replace with the studio's own photography.
  image: {
    src: "/images/home/why-elane-studio.jpg",
    alt: "Stylist smiling as she blow-dries a client's hair in a bright, airy studio",
  },
};

export const signature = {
  eyebrow: "Signature Experience",
  // Second line is set in italic, echoing the hero's emphasis.
  titleLines: ["The ÉLANE", "Ritual"],
  body: "Ninety unhurried minutes that begin with a slow scalp massage and warm botanical oils, then move into a treatment and finish tailored entirely to you.",
  details: [
    { label: "Duration", value: "90 min" },
    { label: "Begins with", value: "Consultation" },
    { label: "Focus", value: "Scalp · Hair · Finish" },
    { label: "From", value: "LKR 12,500" },
  ],
  cta: { label: "Discover the Ritual", href: "/services#ritual" },
  // Stand-in from Unsplash; replace with the studio's own photography.
  image: {
    src: "/images/home/ritual-head-spa-rest.jpg",
    alt: "Guest resting with eyes closed as a fine arc of water from a gold head-spa rail rinses her hair",
  },
};

// Portraits: 2:3, 1200×1800, cropped from the top in the layout. Stand-ins
// from Unsplash; replace with the studio's own team photography.
export const team = {
  eyebrow: "Meet the Artists",
  title: "The people behind your look.",
  body: "Meet the artists who bring together skill, care and creativity across hair, skin, beauty and styling.",
  profileLabel: "View profile",
  cta: { label: "Meet the Full Team", href: "/about#team" },
  members: [
    {
      id: "amaya-sen",
      name: "Amaya Sen",
      role: "Creative Director",
      specialties: "Hair · Colour",
      href: "/about#amaya-sen",
      image: { src: "/images/team/amaya-sen.jpg", alt: "Portrait of Amaya Sen" },
    },
    {
      id: "maya-fernando",
      name: "Maya Fernando",
      role: "Senior Stylist",
      specialties: "Cuts · Styling",
      href: "/about#maya-fernando",
      image: { src: "/images/team/maya-fernando.jpg", alt: "Portrait of Maya Fernando" },
    },
    {
      id: "rhea-jay",
      name: "Rhea Jay",
      role: "Beauty Artist",
      specialties: "Skin · Makeup",
      href: "/about#rhea-jay",
      image: { src: "/images/team/rhea-jay.jpg", alt: "Portrait of Rhea Jay" },
    },
  ],
};

// Stand-ins from Unsplash; replace with the studio's own work. `position`
// keeps the subject in frame where a tile crops the photo.
export const gallery = {
  eyebrow: "The ÉLANE Edit",
  title: "A closer look at our work.",
  body: "Hair, beauty, skin, details and moments from inside the studio.",
  cta: { label: "Explore the Gallery", href: "/gallery" },
  items: [
    {
      id: "hair",
      category: "Finished Hair",
      src: "/images/gallery/finished-hair.jpg",
      alt: "Long lavender waves with a soft, glossy finish",
      position: "center 30%",
    },
    {
      id: "nails",
      category: "Nails",
      src: "/images/gallery/nail-detail.jpg",
      alt: "Black and tortoiseshell manicure against a knit sleeve",
      position: "center 45%",
    },
    {
      id: "stylist",
      category: "In the Studio",
      src: "/images/gallery/stylist-at-work.jpg",
      alt: "Stylist setting pin curls for an updo",
      position: "center 40%",
    },
    {
      id: "bridal",
      category: "Bridal",
      src: "/images/gallery/bridal-detail.jpg",
      alt: "Bride holding a bouquet of peach and white roses",
      position: "center 45%",
    },
    {
      id: "skin",
      category: "Skin",
      src: "/images/gallery/skin-ritual.jpg",
      alt: "Client relaxing during a hydrating facial mask treatment",
      position: "center",
    },
    {
      id: "interior",
      category: "The Studio",
      src: "/images/gallery/studio-interior.jpg",
      alt: "Styling stations with round mirrors in a calm, modern studio",
      position: "center",
    },
  ],
};

export const testimonials = {
  eyebrow: "Client Stories",
  title: "Loved for the way it feels.",
  body: "Thoughtful care, beautiful results and experiences our guests return for.",
  rating: { value: "4.9", outOf: "5", label: "Average guest rating" },
  items: [
    {
      quote:
        "They really listened to what I wanted and made the whole experience feel calm, personal and effortless.",
      name: "Maya R.",
      service: "Hair · Colour",
    },
    {
      quote:
        "From the consultation to the final result, every detail felt considered. I left feeling completely refreshed.",
      name: "Nethmi A.",
      service: "Skin · Beauty",
    },
    {
      quote:
        "The team made me feel comfortable from the moment I arrived. The service felt polished without ever feeling rushed.",
      name: "Sarah K.",
      service: "Bridal · Makeup",
    },
  ],
};

// Durations and prices are placeholders until the studio confirms its menu.
export const booking = {
  eyebrow: "Book Your Visit",
  title: "Your next appointment starts here.",
  body: "Choose what you’re looking for and begin building your ÉLANE experience.",
  summaryLabel: "Your selection",
  primary: { label: "Start Booking", href: "/book" },
  secondary: { label: "View All Services", href: "/services" },
  options: [
    {
      id: "hair",
      name: "Hair",
      duration: "45–120 min",
      price: "From LKR 4,500",
      description: "Cuts, colour, styling and personalised hair treatments.",
    },
    {
      id: "skin",
      name: "Skin",
      duration: "60–90 min",
      price: "From LKR 6,500",
      description: "Facials and glow treatments tailored to your skin’s needs.",
    },
    {
      id: "nails",
      name: "Nails",
      duration: "45–90 min",
      price: "From LKR 3,500",
      description: "Manicures, pedicures and long-wearing nail care.",
    },
    {
      id: "beauty-makeup",
      name: "Beauty & Makeup",
      duration: "30–90 min",
      price: "From LKR 3,000",
      description: "Brows, lashes and makeup for everyday or special occasions.",
    },
    {
      id: "bridal",
      name: "Bridal",
      duration: "2–4 hours",
      price: "From LKR 35,000",
      description: "Bridal styling, makeup and pre-event care, planned with you.",
    },
    {
      id: "treatments",
      name: "Treatments",
      duration: "60–150 min",
      price: "From LKR 8,500",
      description: "Keratin, scalp care and repair rituals for healthier hair.",
    },
  ],
  // Stand-in from Unsplash; replace with the studio's own photography.
  image: {
    src: "/images/home/booking-detail.jpg",
    alt: "Makeup brushes in a holder at a styling station",
  },
};

export const footer = {
  tagline: "Beauty, thoughtfully considered.",
  nav: [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#footer" },
  ],
  visit: ["Colombo 07", "Sri Lanka"],
  hours: [
    { days: "Mon–Fri", time: "9:00 AM – 7:00 PM" },
    { days: "Sat–Sun", time: "9:00 AM – 6:00 PM" },
  ],
  contact: {
    email: "hello@elane.studio",
    phone: "+94 11 245 6789",
    phoneHref: "tel:+94112456789",
  },
  social: [
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "TikTok", icon: "tiktok", href: "#" },
    { label: "Pinterest", icon: "pinterest", href: "#" },
  ] as const,
  copyright: "© 2026 ÉLANE Beauty Studio",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
