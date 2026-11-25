# Elane Beauty Studio

A multi-page website for a premium beauty salon: Home, Services, About, Gallery, Contact and a step-by-step booking flow.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4, with GSAP and Motion for animation and Lucide for icons.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Project structure

```
src/
  app/            One folder per page (page.tsx), plus the root layout and globals.css
  components/
    sections/     Homepage sections
    services/     about/  gallery/  contact/  booking/   Sections for each page
    ui/           Shared pieces: Button, SectionHeading, Icon, LiquidGlass
    Header.tsx  Footer.tsx  Logo.tsx  SiteIntro.tsx  HeroVideo.tsx
  content/        All copy, links, prices and image paths, one file per page
public/
  images/         Photos and brand logos, grouped by page
  video/          Homepage hero clips and their posters
```

## Editing content

Text, links, prices, opening hours and image paths live in `src/content/`, so most changes don't touch any component:

- `home.ts`: studio name, logo text, navigation, homepage sections, the team, opening hours and contact details (shared with the footer and Contact page)
- `services.ts`: the service menu (prices and durations), which the booking flow also uses
- `about.ts`, `gallery.ts`, `contact.ts`, `booking.ts`: copy for those pages

Colours and type scales are tokens at the top of `src/app/globals.css`. The fonts are loaded in `src/app/layout.tsx`.

## Notes

- Photos are stand-in stock images (Unsplash and Pexels; see the `sources.json` files and comments in `src/content`), not the studio's own work.
- Prices, durations, team members and the WhatsApp number are sample data.
- The contact and booking forms validate input but don't send anything; connect them to an email or booking service before going live.
- The footer's Privacy and Terms links point to pages that don't exist yet.
