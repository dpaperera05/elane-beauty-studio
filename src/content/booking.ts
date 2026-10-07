// Copy and options for the /booking flow. Artists and availability are sample
// data: there is no booking backend yet.

import { Brush, Droplets, Gem, Hand, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { team } from "./home";
import { bookableServices, type Service } from "./services";

export const bookingIntro = {
  eyebrow: "Book Your Visit",
  title: "Let’s plan your ÉLANE experience.",
  body: "Choose what you’d like to book. You can refine the service, artist, date and time in the next steps.",
};

// In order; the flow's progress indicator is built from this list.
export const bookingSteps = [
  "Service",
  "Treatment",
  "Artist",
  "Date & Time",
  "Your Details",
  "Review",
] as const;

// One entry per step, in the same order as `bookingSteps`. `hint` is the
// footer line shown until the step is complete.
export const stepCopy = [
  { title: "What would you like to book?", hint: "Select a category to continue." },
  { title: "Choose your treatment.", hint: "Select a treatment to continue." },
  {
    title: "Who would you like to see?",
    hint: "Choose an artist, or no preference, to continue.",
  },
  { title: "When suits you?", hint: "Choose a date and time to continue." },
  { title: "Your details.", hint: "Fill in the required fields to continue." },
  { title: "Review your booking.", hint: "Nothing is booked until you confirm." },
];

export const bookingActions = {
  back: "Back",
  continue: "Continue",
  confirm: "Confirm Booking",
};

export type BookingCategory = {
  id: string;
  name: string;
  descriptor: string;
  icon: LucideIcon;
};

export const bookingCategories: BookingCategory[] = [
  { id: "hair", name: "Hair", descriptor: "Cuts · Colour · Styling", icon: Scissors },
  { id: "skin", name: "Skin", descriptor: "Facials · Glow Treatments", icon: Sparkles },
  { id: "nails", name: "Nails", descriptor: "Manicure · Pedicure · Nail Care", icon: Hand },
  {
    id: "beauty-makeup",
    name: "Beauty & Makeup",
    descriptor: "Brows · Lashes · Makeup",
    icon: Brush,
  },
  { id: "bridal", name: "Bridal", descriptor: "Bridal Styling · Makeup", icon: Gem },
  {
    id: "treatments",
    name: "Treatments",
    descriptor: "Keratin · Repair · Scalp Care",
    icon: Droplets,
  },
];

// The treatments on offer are the studio's service menu (services.ts), so the
// /services page and this flow always list the same services and prices.
export type BookingService = Service;

// Keyed by category id.
export const bookingServices: Record<string, BookingService[]> = bookableServices;

export type BookingArtist = {
  id: string;
  name: string;
  role: string;
  specialties: string;
  /** Category ids this artist takes bookings for. */
  categories: string[];
  /** Without a portrait the tile shows the artist's initials. */
  image?: { src: string; alt: string };
};

const artistCategories: Record<string, string[]> = {
  "amaya-sen": ["hair", "bridal", "treatments"],
  "maya-fernando": ["hair", "bridal", "treatments"],
  "rhea-jay": ["skin", "beauty-makeup", "bridal"],
};

export const bookingArtists: BookingArtist[] = [
  // The core team (home.ts), so names, roles and portraits stay in one place.
  ...team.members.map(({ id, name, role, specialties, image }) => ({
    id,
    name,
    role,
    specialties,
    image,
    categories: artistCategories[id] ?? [],
  })),
  // Sample artist so skin, nails and beauty have more than one choice. Not on
  // the About page and has no portrait.
  {
    id: "nisha-perera",
    name: "Nisha Perera",
    role: "Nail & Skin Specialist",
    specialties: "Nails · Facials",
    categories: ["nails", "skin", "beauty-makeup"],
  },
];

export const noPreference = {
  name: "No preference",
  description: "We’ll match you with the first available artist for your treatment.",
};

/** Daily appointment times; `minutes` is the start time from midnight. */
export const timeSlots = [
  { label: "9:00 AM", minutes: 9 * 60 },
  { label: "10:30 AM", minutes: 10 * 60 + 30 },
  { label: "12:00 PM", minutes: 12 * 60 },
  { label: "2:00 PM", minutes: 14 * 60 },
  { label: "3:30 PM", minutes: 15 * 60 + 30 },
  { label: "5:00 PM", minutes: 17 * 60 },
];

export const confirmation = {
  eyebrow: "Booking Confirmed",
  title: "Your ÉLANE visit is reserved.",
  body: (firstName: string) =>
    `Thank you, ${firstName}. We’ve prepared your booking details below.`,
  home: { label: "Return Home", href: "/" },
  again: "Book Another Visit",
};
