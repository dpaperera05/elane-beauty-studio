// Copy and imagery for the /about page. The photographs are files already in
// /public/images (illustrative stock, not the studio's own work).

import { team } from "./home";

export const aboutHero = {
  // Set on three fixed lines; the last is italic, echoing the homepage hero.
  titleLines: ["Beauty, care", "and craft", "since 2010"],
  body: "Since 2010, ÉLANE has grown into a full-service beauty studio in Colombo, bringing together thoughtful consultations, skilled artistry and a calm, personal approach to beauty.",
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
    "In those first years, every appointment began the way it still does today, with a conversation. We listened before we reached for a brush or a pair of scissors, and guests came back because they felt understood rather than hurried through.",
    "As word spread, the studio grew with the people it served. New artists joined, each bringing their own craft, and hair was soon joined by skin, nails and beauty. We added a service only when we could offer it with the same care as the first.",
    "Today ÉLANE brings hair, skin, nails, makeup, bridal and specialist treatments together under one roof in Colombo. The studio is larger and the team is bigger, but the way we work has not changed: unhurried appointments, honest advice and results that suit you.",
  ],
  caption: "Inside the studio · Colombo 07",
  // Stand-in from Unsplash; replace with the studio's own photography.
  image: {
    src: "/images/home/why-elane-studio.jpg",
    alt: "Stylist smiling as she blow-dries a client's hair in a bright, airy studio",
  },
};

// `icon` keys map to Lucide icons in WhyElane.tsx.
export const why = {
  eyebrow: "Why Élane",
  title: "Care that goes beyond the appointment.",
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
  image: {
    src: "/images/gallery/stylist-at-work.jpg",
    alt: "Stylist pinning rolled sections of an updo into place",
  },
};

export type Artist = {
  id: string;
  name: string;
  role: string;
  specialties: string;
  image: { src: string; alt: string };
};

// Portraits: 2:3, 1200×1800, cropped from the top in the layout. Stand-ins
// from Unsplash; replace with the studio's own team photography.
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
