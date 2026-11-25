// Copy, details and links for the /contact page. The address, phone, email
// and hours are the footer's (home.ts), so they stay in one place.

import { footer, site } from "./home";

const place = "Colombo 07, Sri Lanka";

export const contactIntro = {
  eyebrow: "Contact ÉLANE",
  title: "Come by, call us, or send a note.",
  body: "Whether you have a question about a service, need help with a booking, or want to talk through a bridal enquiry, our team is here to help.",
};

// The pills under the page title. `icon` keys map to Lucide icons in
// ContactView.tsx; `srLabel` is read before the pill's text by screen readers.
// The WhatsApp number is fictional sample data.
export const quickActions = [
  {
    icon: "call",
    text: footer.contact.phone,
    srLabel: "Call us on",
    href: footer.contact.phoneHref,
  },
  {
    icon: "whatsapp",
    text: "WhatsApp",
    srLabel: "Message us on",
    href: "https://wa.me/94772456789",
    external: true,
  },
  {
    icon: "email",
    text: footer.contact.email,
    srLabel: "Email us at",
    href: `mailto:${footer.contact.email}`,
  },
] as const;

export const enquiryTypes = [
  "General Enquiry",
  "Service Question",
  "Bridal Enquiry",
  "Booking Help",
  "Feedback",
] as const;

export const contactForm = {
  title: "Tell us how we can help.",
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

// The three short columns under the form. Directions open Google Maps in a
// new tab.
export const studioDetails = {
  visit: {
    label: "Visit",
    lines: footer.visit,
    link: {
      label: "Get Directions",
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`,
    },
  },
  hours: { label: "Opening Hours", rows: footer.hours },
  booking: {
    label: "Booking",
    text: "Looking to book a service?",
    link: { label: "Book your appointment", href: site.bookingHref },
  },
};
