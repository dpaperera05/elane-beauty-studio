// Copy and photographs for the /gallery page. The photographs are the files
// already in /public/images/gallery (illustrative stock, not the studio's own
// work; see the note on `gallery` in home.ts).

export const galleryIntro = {
  eyebrow: "The ÉLANE Edit",
  title: "Real looks. Real moments.",
  body: "Explore hair, skin, nails, beauty, bridal and treatment moments from inside ÉLANE.",
};

export const galleryCategories = [
  { id: "hair", label: "Hair" },
  { id: "skin", label: "Skin" },
  { id: "nails", label: "Nails" },
  { id: "beauty", label: "Beauty" },
  { id: "bridal", label: "Bridal" },
  { id: "treatments", label: "Treatments" },
] as const;

export type GalleryCategoryId = (typeof galleryCategories)[number]["id"];
export type GalleryFilter = GalleryCategoryId | "all";

export const allFilter = { id: "all", label: "All" } as const;

export const categoryLabel = (id: GalleryCategoryId) =>
  galleryCategories.find((category) => category.id === id)!.label;

/**
 * How much of the grid a photo takes. Almost every file is a 2:3 portrait, so
 * the variety comes from these crops: `feature` is a double-size portrait,
 * `wide` a landscape across two columns, `square` a short single cell.
 */
export type GallerySize = "portrait" | "square" | "wide" | "feature";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategoryId;
  title?: string;
  size: GallerySize;
};

const item = (
  file: string,
  category: GalleryCategoryId,
  title: string,
  alt: string,
  size: GallerySize = "portrait",
): GalleryItem => ({ src: `/images/gallery/${file}.jpg`, alt, category, title, size });

// In display order for "All": categories are interleaved so the page reads as
// one edit, and each category has one `feature` so every filter has a lead.
export const galleryItems: GalleryItem[] = [
  item("edit-bridal-01", "bridal", "Behind the Veil", "Bride looking out through a sheer ivory veil, her hands lifting its edges", "feature"),
  item("edit-hair-02", "hair", "Caramel Waves", "Shoulder-length brunette waves with soft caramel ends, seen in profile"),
  item("edit-amber-serum", "skin", "Amber Serum", "Amber glass serum bottle on a turned wooden stand, crossed by palm-leaf shadows", "square"),
  item("edit-nails-03", "nails", "Blush Almond", "Blush almond nails resting on a white surface beside small white flowers"),
  item("edit-makeup-01", "beauty", "Copper Light", "Warm copper eyeshadow and softly defined brows in golden light"),
  item("edit-treatments-02", "treatments", "Shoulder Release", "Therapist kneading a guest's shoulders during a massage", "square"),
  item("stylist-at-work", "hair", "Pinned in Place", "Stylist pinning rolled sections of an updo into place", "wide"),
  item("edit-skin-02", "skin", "Warm Compress", "Gloved hands pressing a warm cloth to a guest's cheek during a facial"),
  item("edit-nails-marigold", "nails", "Marigold Hour", "Glossy taupe almond nails and a gold watch among marigolds", "feature"),
  item("edit-bridal-vine", "bridal", "Pearl Hair Vine", "Loose bridal waves threaded with a pearl and crystal hair vine, seen from behind"),
  item("edit-eye-makeup", "beauty", "Bronze Lash", "Lashes being applied to an eye finished in shimmering bronze shadow", "square"),
  item("edit-hair-01", "hair", "Copper Curls", "Long copper curls gathered into a half-up twist, seen from behind", "feature"),
  item("edit-treatments-04", "treatments", "Head Ritual", "Hands cradling a guest's forehead and jaw during a head massage"),
  item("edit-skin-04", "skin", "Mask Application", "Aesthetician applying a mask with a brush to a guest wrapped in white towels"),
  item("edit-polish-wall", "nails", "The Polish Wall", "Wall of nail polish bottles arranged on slim wooden shelves", "square"),
  item("edit-bridal-03", "bridal", "Tulle Drift", "Bride with closed eyes framed by a drift of white tulle"),
  item("edit-makeup-03", "beauty", "Red Lip", "Deep red lip and long auburn curls against a teal backdrop", "feature"),
  item("edit-precision-cut", "hair", "Precision Cut", "Stylist trimming wet dark hair with scissors and a comb"),
  item("edit-nails-01", "nails", "French Tip", "French-tip nails on a relaxed hand against a deep navy backdrop"),
  item("skin-ritual", "skin", "Clay Mask", "Aesthetician brushing a clay mask onto a guest wearing a blue headband", "wide"),
  item("edit-head-massage", "treatments", "Quiet Minutes", "Guest with closed eyes receiving a head massage on a patterned cushion"),
  item("edit-braid", "hair", "Chestnut Braid", "Thick chestnut braid falling over a black top, seen close up", "square"),
  item("edit-bridal-veil", "bridal", "Lace Veil", "Bride in profile wearing a lace-edged veil over a low updo, greenery behind"),
  item("edit-makeup-04", "beauty", "Finishing Powder", "Powder being brushed onto a cheek, reflected in a round mirror"),
  item("edit-skin-03", "skin", "Treatment Room", "Aesthetician tending to a guest on a treatment bed in a bright white room", "feature"),
  item("edit-ivory-nails", "nails", "Ivory on Wine", "Ivory square nails on folded hands against a deep wine backdrop"),
  item("edit-hair-04", "hair", "Gold Leaf Bun", "Braided low bun finished with gold leaf hairpins, seen from behind"),
  item("edit-rose-gold", "beauty", "Rose-Gold Shelf", "Rose-gold skincare and makeup bottles laid out on a blush surface", "square"),
  item("edit-treatments-01", "treatments", "Stillness", "A hand resting on a guest's forehead in a softly lit treatment room", "feature"),
  item("edit-bridal-04", "bridal", "Pearl Veil", "Bride half hidden behind a pearl-dotted veil, with a nude manicure"),
  item("edit-honey-mask", "skin", "Honey Mask", "Golden honey mask being brushed along a guest's jaw"),
  item("edit-nails-02", "nails", "Pearl Pink", "Pearl-pink square nails and gold rings resting on white feathers"),
  item("edit-curls", "hair", "Setting the Curl", "Stylist curling long brunette hair with a tong"),
  item("bridal-detail", "bridal", "The Bouquet", "Bride holding a bouquet of peach roses and white blooms against a beaded gown", "square"),
  item("edit-makeup-02", "beauty", "Soft Matte", "Soft matte makeup with long lashes and a berry lip, eyes lowered"),
  item("edit-facial-massage", "skin", "Facial Massage", "Therapist's hands resting at a guest's temples during a facial massage"),
  item("edit-hair-03", "hair", "Glossy Layers", "Long, glossy dark layers with a wispy fringe"),
  item("edit-nails-04", "nails", "Classic Red", "Glossy red nails during a hand massage"),
  item("edit-treatments-03", "treatments", "Warm Oil", "Therapist working warm oil along a guest's upper arm"),
  item("edit-bridal-02", "bridal", "Textured Updo", "Bride with a low textured updo, seen in profile through pale tulle"),
  item("edit-skin-01", "skin", "Gentle Cleanse", "Aesthetician in a mask and cap cleansing a guest's face with cotton"),
  item("edit-salon-floor", "hair", "On the Floor", "Stylist working on a guest's hair in a bright, airy salon"),
  item("edit-pink-nails", "nails", "Sheer Pink", "Sheer pink almond nails resting on a folded white cloth"),
  item("finished-hair", "hair", "Lilac Waves", "Long lilac waves framing a face with soft pink makeup"),
  item("nail-detail", "nails", "Tortoiseshell", "Black and tortoiseshell nails against a grey knit sleeve", "square"),
];
