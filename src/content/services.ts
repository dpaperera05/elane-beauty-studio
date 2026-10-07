// The studio's service menu: copy, prices and imagery for the /services page.
// The booking flow builds its treatment lists from the same data (see
// booking.ts), so a service can never be listed here and missing there.
// Prices and durations are sample data. The photographs are files already in
// /public/images (illustrative stock, not the studio's own work).

export type Service = {
  /** URL-safe and unique within its category; used in booking links. */
  id: string;
  name: string;
  description: string;
  /** Minutes. */
  duration: number;
  /** LKR. */
  price: number;
};

export type ServiceCategoryId =
  | "hair"
  | "skin"
  | "nails"
  | "beauty-makeup"
  | "bridal"
  | "treatments";

export type ServiceCategory = {
  /** Also the section's anchor (`/services#hair`) and the booking category. */
  id: ServiceCategoryId;
  name: string;
  intro: string;
  image: { src: string; alt: string };
  services: Service[];
};

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "Signature Cut & Finish" becomes the id `signature-cut-finish`. */
const service = (name: string, price: number, duration: number, description: string): Service => ({
  id: slug(name),
  name,
  description,
  duration,
  price,
});

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    name: "Hair",
    intro: "Cuts, colour and finishing shaped around your hair’s texture and the way you wear it.",
    image: {
      src: "/images/services/hair-balayage.jpg",
      alt: "Back view of long, softly waved balayage hair in a bright salon",
    },
    services: [
      service("Signature Cut & Finish", 6500, 60, "Personalised consultation, precision cut and professional finish."),
      service("Wash & Blow Dry", 4000, 45, "Cleanse, condition and polished blow-dry styling."),
      service("Root Colour", 8500, 90, "Targeted root colour refresh and finishing."),
      service("Full Colour", 12500, 120, "Complete colour application tailored to your desired tone."),
      service("Highlights", 15000, 150, "Dimensional highlights with personalised placement and toning."),
      service("Balayage", 18000, 180, "Hand-painted colour for a soft, natural blend."),
      service("Keratin Smooth", 18500, 150, "Smoothing treatment designed to reduce frizz and improve manageability."),
      service("Scalp Ritual", 5500, 45, "Deep scalp cleanse, treatment and relaxing massage."),
    ],
  },
  {
    id: "skin",
    name: "Skin",
    intro: "Facials chosen for your skin on the day, from a quick glow to a full renewal.",
    image: {
      src: "/images/services/skin-face-mask.jpg",
      alt: "Guest lying back with a cream face mask as a gloved aesthetician works above her",
    },
    services: [
      service("Express Glow Facial", 5000, 30, "Quick cleanse, exfoliation and hydration boost."),
      service("Signature Facial", 8500, 60, "Personalised facial with deep cleansing, exfoliation and hydration."),
      service("Hydration Therapy", 9500, 60, "Intensive moisture treatment for dry or dehydrated skin."),
      service("Brightening Facial", 10500, 75, "Treatment focused on dullness, uneven tone and radiance."),
      service("Purifying Facial", 9000, 60, "Deep-cleansing treatment for congested and combination skin."),
      service("Calming Facial", 9500, 60, "Soothing treatment for sensitive or stressed skin."),
      service("Advanced Renewal Facial", 13500, 90, "Multi-step treatment focused on texture, hydration and renewal."),
      service("Eye Revival Treatment", 4500, 30, "Targeted treatment for tired and dehydrated eye areas."),
    ],
  },
  {
    id: "nails",
    name: "Nails",
    intro: "Careful shaping, clean cuticle work and colour that lasts.",
    image: {
      src: "/images/services/nails-nude.jpg",
      alt: "Hand with a glossy nude-pink manicure resting on soft white fur",
    },
    services: [
      service("Classic Manicure", 3500, 45, "Nail shaping, cuticle care and polish."),
      service("Classic Pedicure", 4500, 60, "Foot soak, nail care, exfoliation and polish."),
      service("Gel Manicure", 5500, 60, "Long-lasting gel polish with full nail preparation."),
      service("Gel Pedicure", 6500, 75, "Complete pedicure finished with gel colour."),
      service("Nail Art Detail", 2500, 30, "Custom minimal nail art added to your manicure."),
      service("French Finish", 1500, 15, "Classic French detailing added to selected nail service."),
      service("Spa Manicure", 5000, 60, "Extended manicure with exfoliation and hand treatment."),
      service("Spa Pedicure", 6500, 75, "Relaxing pedicure with exfoliation, mask and massage."),
    ],
  },
  {
    id: "beauty-makeup",
    name: "Beauty & Makeup",
    intro: "Brows, lashes and makeup that define your features without masking them.",
    image: {
      src: "/images/services/makeup-eyeshadow.jpg",
      alt: "Makeup artist blending warm eyeshadow onto a client's eyelid",
    },
    services: [
      service("Brow Shape", 2000, 20, "Precision brow shaping tailored to your features."),
      service("Brow Tint", 2500, 30, "Custom brow tint for added definition."),
      service("Lash Tint", 2500, 30, "Semi-permanent lash tint for deeper definition."),
      service("Lash Lift", 6500, 60, "Lift and curl treatment for natural lashes."),
      service("Day Makeup", 7500, 60, "Soft, polished makeup for daytime occasions."),
      service("Evening Makeup", 10000, 75, "Refined evening makeup with enhanced definition."),
      service("Event Makeup", 12500, 90, "Full makeup application tailored to your event and styling."),
      service("Makeup Consultation", 4000, 45, "Personalised consultation covering colour, products and application."),
    ],
  },
  {
    id: "bridal",
    name: "Bridal",
    intro: "Trials, wedding-day hair and makeup, and styling for the bridal party.",
    image: {
      src: "/images/services/bridal-updo.jpg",
      alt: "Bridal braided updo finished with a pearl and leaf hair comb and veil",
    },
    services: [
      service("Bridal Consultation", 5000, 60, "Style consultation covering makeup, hair and overall bridal direction."),
      service("Bridal Makeup Trial", 12000, 90, "Full trial to refine your bridal makeup look before the wedding day."),
      service("Bridal Hair Trial", 10000, 90, "Hair trial exploring your selected bridal style."),
      service("Bride Makeup", 25000, 120, "Complete bridal makeup application for the wedding day."),
      service("Bride Hair Styling", 20000, 120, "Bridal hairstyling designed around your dress, features and accessories."),
      service("Bridal Hair & Makeup", 42000, 180, "Complete bridal hair and makeup experience."),
      service("Bridesmaid Makeup", 12000, 75, "Event makeup designed to complement the bridal party."),
      service("Bridesmaid Hair Styling", 9000, 60, "Professional styling for members of the bridal party."),
    ],
  },
  {
    id: "treatments",
    name: "Treatments",
    intro: "Restorative care for hair and scalp, matched to what yours needs.",
    image: {
      src: "/images/services/treatments-shirodhara.jpg",
      alt: "Guest resting beneath a brass vessel during an Ayurvedic shirodhara oil treatment",
    },
    services: [
      service("Keratin Treatment", 18500, 150, "Professional smoothing treatment for reduced frizz and easier styling."),
      service("Hair Repair Ritual", 9500, 60, "Intensive treatment for dry, damaged or chemically treated hair."),
      service("Scalp Detox", 6500, 45, "Deep cleanse designed to remove buildup and refresh the scalp."),
      service("Moisture Treatment", 7500, 45, "Hydration-focused treatment for dry and brittle hair."),
      service("Bond Repair Treatment", 10500, 60, "Strengthening service designed for coloured or compromised hair."),
      service("Anti-Frizz Treatment", 12500, 90, "Targeted treatment to smooth texture and improve manageability."),
      service("Gloss Treatment", 8500, 60, "Adds shine and refreshes tone between colour appointments."),
      service("Hair & Scalp Reset", 11500, 75, "Combined scalp and hair treatment for complete restoration."),
    ],
  },
];

// The signature experience. Not one of the menu rows: it has its own feature
// on the page, and is booked under Treatments.
export const ritualService: Service & { categoryId: ServiceCategoryId } = {
  ...service(
    "The ÉLANE Ritual",
    12500,
    90,
    "A slow scalp massage with warm botanical oils, then a treatment and finish tailored to you.",
  ),
  // Set by hand: the generated id would drop the accented É.
  id: "elane-ritual",
  categoryId: "treatments",
};

/** Every service the booking flow offers, keyed by category id. */
export const bookableServices: Record<ServiceCategoryId, Service[]> = Object.fromEntries(
  serviceCategories.map((category) => [
    category.id,
    category.id === ritualService.categoryId
      ? [...category.services, ritualService]
      : category.services,
  ]),
) as Record<ServiceCategoryId, Service[]>;

export const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-US")}`;
export const formatMinutes = (minutes: number) => `${minutes} min`;

/**
 * Link into the booking flow with a service already chosen, e.g.
 * `/booking?category=hair&service=signature-cut-finish`. The flow reads these
 * in `preselectFromSearch` (components/booking/model.ts).
 */
export const bookingHref = (categoryId: ServiceCategoryId, serviceId: string) =>
  `/booking?category=${categoryId}&service=${serviceId}`;

// Page copy.

export const servicesHero = {
  title: "Services designed around you.",
  body: "From everyday maintenance to special occasions, every ÉLANE service is delivered with thoughtful consultation, skilled technique and attention to detail.",
  cta: { label: "Book Now", href: "/booking" },
  // Background photo, decorative (no alt). Stand-in from Unsplash (Adam
  // Winger); replace with the studio's own photography.
  image: { src: "/images/services/hero-blow-dry.jpg" },
};

export const serviceMenu = {
  navLabel: "Service categories",
  bookLabel: "Book this service",
};

export const ritualFeature = {
  // The anchor the homepage's "Discover the Ritual" links to.
  id: "ritual",
  eyebrow: "Signature Experience",
  // Second line is set in italic, as on the homepage.
  titleLines: ["The ÉLANE", "Ritual"],
  body: "Ninety unhurried minutes that begin with a slow scalp massage and warm botanical oils, then move into a treatment and finish tailored entirely to you.",
  details: [
    { label: "Duration", value: formatMinutes(ritualService.duration) },
    { label: "Price", value: formatLkr(ritualService.price) },
  ],
  cta: {
    label: "Book the ÉLANE Ritual",
    href: bookingHref(ritualService.categoryId, ritualService.id),
  },
  image: {
    src: "/images/home/ritual-head-spa-rest.jpg",
    alt: "Guest resting with eyes closed as a fine arc of water from a gold head-spa rail rinses her hair",
  },
};
