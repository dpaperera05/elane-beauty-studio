// Copy, details and links for the /contact page. The address, phone, email
// and hours are the footer's (home.ts), so they stay in one place.

import { footer, site } from "./home";

const place = "Colombo 07, Sri Lanka";
const mapQuery = encodeURIComponent(place);

export const contactHero = {
  eyebrow: "Contact ÉLANE",
  title: "Come by, call us, or send a note.",
  body: "Whether you have a question about a service, need help with a booking, or want to talk through a bridal enquiry, our team is here to help.",
  // Also in the homepage's studio collage (stand-in photography).
  image: {
    src: "/images/home/about-nail-lounge.jpg",
    alt: "Marble reception desk beside a nail-colour wall and window manicure stations",
  },
};

export const studio = {
  eyebrow: "Visit the Studio",
  name: "ÉLANE Beauty Studio",
  address: footer.visit,
  phone: { label: footer.contact.phone, href: footer.contact.phoneHref },
  email: { label: footer.contact.email, href: `mailto:${footer.contact.email}` },
  hours: footer.hours,
  labels: { address: "Address", phone: "Phone", email: "Email", hours: "Opening Hours" },
  note: "Walk-ins are welcome when availability allows. Appointments are recommended, especially for evenings, weekends and bridal services.",
};

// `icon` keys map to Lucide icons in ContactVisit.tsx. The WhatsApp number is
// fictional sample data.
export const quickActions = {
  eyebrow: "Get in Touch",
  title: "Reach us directly.",
  items: [
    { icon: "call", label: "Call Us", detail: footer.contact.phone, href: footer.contact.phoneHref },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      detail: "+94 77 245 6789",
      href: "https://wa.me/94772456789",
      external: true,
    },
    {
      icon: "email",
      label: "Email Us",
      detail: footer.contact.email,
      href: `mailto:${footer.contact.email}`,
    },
  ] as const,
};

// A keyless Google Maps embed: the public `output=embed` URL needs no API
// credentials. Directions open Google Maps itself in a new tab.
export const location = {
  eyebrow: "Location",
  title: "Find us in Colombo.",
  body: "In the heart of Colombo 07, a short drive from the city centre.",
  mapTitle: `Map showing ${place}`,
  embedSrc: `https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`,
  directions: {
    label: "Get Directions",
    href: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
  },
};

export const enquiryTypes = [
  "General Enquiry",
  "Service Question",
  "Bridal Enquiry",
  "Booking Help",
  "Feedback",
] as const;

export const contactForm = {
  eyebrow: "Send a Note",
  title: "Tell us how we can help.",
  body: "Leave your details and a few lines about what you need, and we’ll pick it up from there.",
  requiredNote: "are required.",
  fields: {
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    type: "Enquiry Type",
    message: "Message",
  },
  typePlaceholder: "Select an enquiry type",
  messagePlaceholder: "A few lines about what you’d like to ask or arrange.",
  submit: "Send Message",
  success: {
    title: "Message received.",
    body: "Thank you — your message has been received. Our team will be in touch shortly.",
    again: "Send Another Message",
  },
};

export const bookingLine = {
  text: "Looking to book a service?",
  link: { label: "Book your appointment", href: site.bookingHref },
};
