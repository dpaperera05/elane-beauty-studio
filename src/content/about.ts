// Copy and imagery for the /about page. The photographs are files already in
// /public/images (illustrative stock, not the studio's own work).

import { team } from "./home";

export const aboutHero = {
  eyebrow: "About Élane",
  // Set on two fixed lines; the emphasis line is italicised, echoing the
  // homepage hero.
  titleLines: ["Beauty, care and craft", "since 2010"],
  titleEmphasis: "since 2010",
  body: "A full-service beauty studio in Colombo, built on thoughtful consultations, skilled artistry and a calm, personal approach.",
  cta: { label: "Book a Visit", href: "/booking" },
  // Quick facts along the hairline at the base of the hero.
  facts: ["Since 2010", "Colombo 07 · Sri Lanka", "Six areas of care", "Five artists"],
  // Also the homepage's closing booking photo (stand-in from Pexels).
  image: { src: "/images/home/booking-salon-stations.jpg" },
};

// The narrative is written for the site (no founder or figures are claimed
// beyond "since 2010" and what the studio offers); swap in the studio's own
// words when available.
export const story = {
  eyebrow: "Our Story",
  title: "From a small beginning to a complete beauty experience.",
  // Set large in the serif, as the opening line.
  lead: "ÉLANE began in 2010 as a small studio with one simple belief: beauty care should feel personal.",
  body: [
    "In those first years, every appointment began the way it still does today, with a conversation. Guests came back because they felt understood rather than hurried through.",
    "As word spread, new artists joined and hair was joined by skin, nails and beauty. Today the studio is larger, but the way we work has not changed: unhurried appointments, honest advice and results that suit you.",
  ],
  caption: "Inside the studio · Colombo 07",
  // A tall 4:5 photo that rises out of the top of the ivory panel, with a
  // small 4:5 detail overlapping its lower right corner. Stand-ins from
  // Pexels (see /public/images/about/sources.json); replace with the
  // studio's own photography. Both are landscape files, so `position` sets
  // the 4:5 crop.
  images: {
    main: {
      src: "/images/about/about-story-stylist.jpg",
      alt: "Stylist styling a guest's dark curls in a bright salon by the window",
      position: "36% 40%",
    },
    detail: {
      src: "/images/about/about-story-tools.jpg",
      alt: "Hairdryer, paddle brush and two bottles of hair oil laid out on marble",
      position: "62% 50%",
    },
  },
};

// Three views of the space, shown as tall capsules. Stand-ins from Pexels
// (see /public/images/about/sources.json); `position` sets each crop.
export const studio = {
  eyebrow: "Inside the Studio",
  title: "A calm space, made for unhurried care.",
  spaces: [
    {
      label: "The welcome lounge",
      image: {
        src: "/images/about/about-space-lounge.jpg",
        alt: "Warm wood-panelled lounge with an armchair beside the reception desk",
        position: "48% 50%",
      },
    },
    {
      label: "The nail bar",
      image: {
        src: "/images/about/about-space-nails.jpg",
        alt: "Nail technician filing a guest's nails at a manicure table",
        position: "50% 50%",
      },
    },
    {
      label: "The treatment room",
      image: {
        src: "/images/about/about-space-treatment.jpg",
        alt: "Softly lit arched treatment room with a made-up treatment bed and folded towels",
        position: "50% 50%",
      },
    },
  ],
};

export const why = {
  eyebrow: "Why Élane",
  title: "Care that goes beyond the appointment.",
  points: [
    {
      title: "Personal Consultations",
      body: "Every service begins with understanding your goals, routine and preferences.",
    },
    {
      title: "Expert Artists",
      body: "A skilled team across hair, skin, nails, beauty and bridal.",
    },
    {
      title: "Premium Products",
      body: "Professional-grade products chosen for performance, care and lasting results.",
    },
    {
      title: "Calm, Considered Space",
      body: "A welcoming studio designed to make every appointment feel relaxed and personal.",
    },
  ],
};

export type Artist = {
  id: string;
  name: string;
  role: string;
  specialties: string;
  image: { src: string; alt: string };
};

// Portraits: 2:3, 1200×1800, cropped from the top in the layout. Stand-ins
// from Unsplash; replace with the studio's own team photography. The first
// member is featured large beside the others.
export const artists = {
  eyebrow: team.eyebrow,
  title: team.title,
  body: team.body,
  members: [
    // The first three also take bookings (see booking.ts).
    ...team.members,
    {
      id: "nethmi-perera",
      name: "Nethmi Perera",
      role: "Nail Artist",
      specialties: "Nails · Detail Work",
      image: { src: "/images/team/nethmi-perera.jpg", alt: "Portrait of Nethmi Perera" },
    },
    {
      id: "kavindu-silva",
      name: "Kavindu Silva",
      role: "Treatment Specialist",
      specialties: "Keratin · Scalp Care",
      image: { src: "/images/team/kavindu-silva.jpg", alt: "Portrait of Kavindu Silva" },
    },
  ] satisfies Artist[],
};

// The page's closing invitation.
export const aboutCta = {
  eyebrow: "Visit the Studio",
  title: "Your next appointment starts with a conversation.",
  primary: { label: "Book Your Visit", href: "/booking" },
  secondary: { label: "Contact the Studio", href: "/contact" },
};
