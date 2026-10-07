// Copy and options for the /booking flow. Services, prices and availability
// are sample data: there is no booking backend yet.

import { Brush, Droplets, Gem, Hand, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { team } from "./home";

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

export type BookingService = {
  id: string;
  name: string;
  description: string;
  /** Minutes. */
  duration: number;
  /** Starting price in LKR. */
  price: number;
};

// Keyed by category id.
export const bookingServices: Record<string, BookingService[]> = {
  hair: [
    {
      id: "signature-cut",
      name: "Signature Cut & Finish",
      description: "A consultation, precision cut and blow-dry shaped to how you wear your hair.",
      duration: 60,
      price: 6500,
    },
    {
      id: "colour-refresh",
      name: "Colour Refresh",
      description: "Root touch-up or all-over gloss to revive tone and shine.",
      duration: 90,
      price: 9500,
    },
    {
      id: "keratin-treatment",
      name: "Keratin Treatment",
      description: "Smooths frizz and softens texture for weeks of easier styling.",
      duration: 120,
      price: 14500,
    },
    {
      id: "scalp-ritual",
      name: "Scalp Ritual",
      description: "Exfoliation, a warm oil massage and a nourishing mask for the scalp.",
      duration: 45,
      price: 5500,
    },
  ],
  skin: [
    {
      id: "signature-glow-facial",
      name: "Signature Glow Facial",
      description: "Deep cleanse, gentle exfoliation and massage for rested, luminous skin.",
      duration: 60,
      price: 7500,
    },
    {
      id: "deep-hydration-facial",
      name: "Deep Hydration Facial",
      description: "Layered serums and a cooling mask to restore dry or tired skin.",
      duration: 75,
      price: 9000,
    },
    {
      id: "brightening-peel",
      name: "Brightening Peel",
      description: "A mild resurfacing peel that evens tone and refines texture.",
      duration: 45,
      price: 8500,
    },
    {
      id: "sculpt-lift-facial",
      name: "Sculpt & Lift Facial",
      description: "Facial massage and contouring techniques to lift and define.",
      duration: 90,
      price: 12500,
    },
  ],
  nails: [
    {
      id: "classic-manicure",
      name: "Classic Manicure",
      description: "Shape, cuticle care, hand massage and a polish of your choice.",
      duration: 45,
      price: 3500,
    },
    {
      id: "gel-manicure",
      name: "Gel Manicure",
      description: "Long-wear gel colour with a high-gloss, chip-resistant finish.",
      duration: 60,
      price: 5000,
    },
    {
      id: "spa-pedicure",
      name: "Spa Pedicure",
      description: "A warm soak, exfoliation, massage and polish for well-kept feet.",
      duration: 60,
      price: 4500,
    },
    {
      id: "mani-pedi-ritual",
      name: "Mani-Pedi Ritual",
      description: "Our manicure and spa pedicure together, unhurried.",
      duration: 105,
      price: 8000,
    },
  ],
  "beauty-makeup": [
    {
      id: "brow-shape-tint",
      name: "Brow Shape & Tint",
      description: "Brows mapped, shaped and tinted to frame your face.",
      duration: 30,
      price: 2500,
    },
    {
      id: "lash-lift-tint",
      name: "Lash Lift & Tint",
      description: "A lasting curl and deeper colour for your natural lashes.",
      duration: 60,
      price: 6500,
    },
    {
      id: "soft-glam-makeup",
      name: "Soft Glam Makeup",
      description: "Polished, skin-first makeup for daytime events and portraits.",
      duration: 60,
      price: 9500,
    },
    {
      id: "evening-makeup",
      name: "Evening Makeup & Lashes",
      description: "A fuller evening look with defined eyes and lashes applied.",
      duration: 75,
      price: 12500,
    },
  ],
  bridal: [
    {
      id: "bridal-trial",
      name: "Bridal Consultation & Trial",
      description: "Plan and try your hair and makeup ahead of the day.",
      duration: 120,
      price: 18000,
    },
    {
      id: "bridal-hair",
      name: "Bridal Hair Styling",
      description: "Your wedding-day hair, with veil or accessories set in place.",
      duration: 120,
      price: 25000,
    },
    {
      id: "bridal-makeup",
      name: "Bridal Makeup",
      description: "Long-wearing, camera-ready makeup designed around your look.",
      duration: 120,
      price: 30000,
    },
    {
      id: "complete-bridal-look",
      name: "Complete Bridal Look",
      description: "Hair, makeup and draping, with final touches before you leave.",
      duration: 240,
      price: 55000,
    },
  ],
  treatments: [
    {
      id: "keratin-smoothing",
      name: "Keratin Smoothing",
      description: "Tames frizz and adds lasting smoothness and shine.",
      duration: 120,
      price: 14500,
    },
    {
      id: "bond-repair",
      name: "Bond Repair Treatment",
      description: "Rebuilds strength in coloured, lightened or heat-worn hair.",
      duration: 60,
      price: 7500,
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning Ritual",
      description: "An intensive mask under steam for softness and moisture.",
      duration: 45,
      price: 4500,
    },
    {
      id: "scalp-detox",
      name: "Scalp Detox & Massage",
      description: "Clarifies the scalp and eases tension with a slow massage.",
      duration: 45,
      price: 5500,
    },
  ],
};

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
  // The homepage team, so names, roles and portraits stay in one place.
  ...team.members.map(({ id, name, role, specialties, image }) => ({
    id,
    name,
    role,
    specialties,
    image,
    categories: artistCategories[id] ?? [],
  })),
  // Sample artist so skin, nails and beauty have more than one choice. Not on
  // the team page and has no portrait yet.
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
