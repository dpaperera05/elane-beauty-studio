// All homepage copy and imagery lives here so it can be edited without touching layout code.

export const site = {
  name: "Elane",
  fullName: "Elane Beauty Studio",
  location: "Colombo, Sri Lanka",
  // Top of the homepage, for the logo and "Home" links. Works from any page;
  // on the homepage itself it scrolls up without reloading.
  homeHref: "/#",
  // The booking flow; every "book" CTA should link here.
  bookingHref: "/booking",
};

// Root-relative so every link works from any page.
export const nav = [
  { label: "Home", href: site.homeHref },
  {
    label: "Services",
    children: [
      {
        label: "Studio",
        description: "Everyday hair, skin & nails",
        href: "/#services",
      },
      {
        label: "Bridal",
        description: "Trials, styling & on-location care",
        href: "/#services",
      },
      {
        label: "Academy",
        description: "Hands-on beauty courses",
        href: "/#services",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/#gallery" },
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
  secondary: { label: "Book a Visit", href: site.bookingHref },
};

export const about = {
  eyebrow: "About the Studio",
  title: "A modern beauty studio in the heart of Colombo",
  body: [
    "ÉLANE is a full-service beauty studio created around thoughtful care, skilled artistry and a calm, welcoming experience. From hair and skin to nails, makeup and bridal, every service begins with understanding what works for you.",
    "Tucked into Colombo 07, the studio is a quiet retreat from the city, with soft light, unhurried appointments and senior artists who take the time to get it right. From a fresh cut to your wedding day, you leave feeling looked after, never rushed.",
  ],
  cta: { label: "Discover Our Studio", href: "/about" },
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

// Two carousel rows of 2:3 portraits, shown as capsules. The first row drifts
// left, the second right. Illustrative stock photographs from Pexels, cut
// down to 720×1080 from the originals in
// /public/images/gallery/Elane_Beauty_Gallery_24_Photos (sources.json there
// links each one to its Pexels page). They are not the studio's own work.
const edit = (name: string, alt: string) => ({ src: `/images/gallery/edit-${name}.jpg`, alt });

export const gallery = {
  eyebrow: "The ÉLANE Edit",
  title: "A closer look at our work.",
  body: "Hair, beauty, skin, details and moments from inside the studio.",
  cta: { label: "Explore the Gallery", href: "/gallery" },
  rows: [
    [
      edit("bridal-01", "Bride looking out through a sheer ivory veil, her hands lifting its edges"),
      edit("hair-02", "Shoulder-length brunette waves with soft caramel ends, seen in profile"),
      edit("nails-03", "Blush almond nails resting on a white surface beside small white flowers"),
      edit("makeup-01", "Warm copper eyeshadow and softly defined brows in golden light"),
      edit("treatments-02", "Therapist kneading a guest's shoulders during a massage"),
      edit("skin-02", "Gloved hands pressing a warm cloth to a guest's cheek during a facial"),
      edit("bridal-03", "Bride with closed eyes framed by a drift of white tulle"),
      edit("hair-04", "Braided low bun finished with gold leaf hairpins, seen from behind"),
      edit("nails-01", "French-tip nails on a relaxed hand against a deep navy backdrop"),
      edit("makeup-04", "Powder being brushed onto a cheek, reflected in a round mirror"),
      edit("treatments-04", "Hands cradling a guest's forehead and jaw during a head massage"),
      edit("skin-04", "Aesthetician applying a mask with a brush to a guest wrapped in white towels"),
    ],
    [
      edit("makeup-02", "Soft matte makeup with long lashes and a berry lip, eyes lowered"),
      edit("nails-02", "Pearl-pink square nails and gold rings resting on white feathers"),
      edit("hair-01", "Long copper curls gathered into a half-up twist, seen from behind"),
      edit("bridal-04", "Bride half hidden behind a pearl-dotted veil, with a nude manicure"),
      edit("skin-03", "Aesthetician tending to a guest on a treatment bed in a bright white room"),
      edit("treatments-01", "A hand resting on a guest's forehead in a softly lit treatment room"),
      edit("hair-03", "Long, glossy dark layers with a wispy fringe"),
      edit("makeup-03", "Deep red lip and long auburn curls against a teal backdrop"),
      edit("nails-04", "Glossy red nails during a hand massage"),
      edit("bridal-02", "Bride with a low textured updo, seen in profile through pale tulle"),
      edit("treatments-03", "Therapist working warm oil along a guest's upper arm"),
      edit("skin-01", "Aesthetician in a mask and cap cleansing a guest's face with cotton"),
    ],
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
    {
      quote:
        "My nails have never looked this neat or lasted this long. The studio is so calm it feels like a proper pause.",
      name: "Dinali P.",
      service: "Nails · Gel Manicure",
    },
    {
      quote:
        "I came in unsure about my skin and left with a plan that actually made sense. Honest advice, gentle hands.",
      name: "Amara W.",
      service: "Treatments · Facial",
    },
    {
      quote:
        "A cut that grows out beautifully and styling tips I can actually repeat at home. I won’t go anywhere else now.",
      name: "Tharushi M.",
      service: "Hair · Cut & Style",
    },
    {
      quote:
        "They planned my wedding morning down to the minute. My makeup lasted through every photo, tear and dance.",
      name: "Ishara D.",
      service: "Bridal · Hair & Makeup",
    },
    {
      quote:
        "Booked a makeup session before a gala and felt like myself, only more polished. Soft, glowing and long-lasting.",
      name: "Leah F.",
      service: "Beauty · Event Makeup",
    },
    {
      quote:
        "The hydrating facial was exactly what my skin needed after a long trip. Calm room, unhurried hands, real glow.",
      name: "Kavindi S.",
      service: "Skin · Hydrating Facial",
    },
    {
      quote:
        "Finally a colourist who understood the soft blonde I had in mind. It still looks lovely weeks later.",
      name: "Anna L.",
      service: "Hair · Balayage",
    },
    {
      quote:
        "A pedicure that felt like a small holiday. Spotless tools, a gentle touch and a colour I keep being asked about.",
      name: "Ruvini J.",
      service: "Nails · Spa Pedicure",
    },
    {
      quote:
        "The scalp treatment has made a real difference. They explained every step and never pushed extra products.",
      name: "Hiruni K.",
      service: "Treatments · Scalp Therapy",
    },
  ],
};

// Product houses shown in the moving strip under the client stories. Logos
// are SVGs in /public/images/brands, painted solid ink by the section.
// `width`/`height` are the file's own proportions; `size` is the displayed
// height in em, tuned per logo so wide wordmarks and tall emblems look
// equally weighted.
export const brands = {
  eyebrow: "Our Products",
  title: "The world’s finest, in every treatment.",
  items: [
    { name: "L’Oréal", src: "/images/brands/loreal.svg", width: 800, height: 145, size: 1.5 },
    { name: "Wella", src: "/images/brands/wella.svg", width: 1024, height: 583, size: 3.25 },
    { name: "Sothys Paris", src: "/images/brands/sothys.svg", width: 1024, height: 252, size: 2.5 },
    { name: "Aveda", src: "/images/brands/aveda.svg", width: 512, height: 125, size: 1.6 },
    { name: "Schwarzkopf", src: "/images/brands/schwarzkopf.svg", width: 1024, height: 438, size: 3.4 },
    { name: "Redken", src: "/images/brands/redken.svg", width: 1024, height: 282, size: 2.4 },
    { name: "Kiehl’s", src: "/images/brands/kiehls.svg", width: 512, height: 258, size: 3.1 },
    { name: "Shiseido", src: "/images/brands/shiseido.svg", width: 400, height: 73, size: 1.6 },
  ],
};

export const booking = {
  eyebrow: "Book Your Visit",
  title: "Your next appointment starts here.",
  body: "An unhurried hour, a considered result. Reserve your time with ÉLANE and we’ll take care of the rest.",
  primary: { label: "Book Your Visit", href: site.bookingHref },
  secondary: { label: "View Services", href: "/services" },
  note: "Open daily from 9 AM · Colombo",
  // Stand-in from Pexels (mirrored, so the stations sit on the right and
  // the copy gets the quiet wall); replace with the studio's own photography.
  image: {
    src: "/images/home/booking-salon-stations.jpg",
    alt: "A bright salon floor with a row of styling chairs facing round, softly lit mirrors",
  },
};

export const footer = {
  tagline: "Beauty, thoughtfully considered.",
  nav: [
    { label: "Home", href: site.homeHref },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/#gallery" },
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
