import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { site } from "@/content/home";
import "./globals.css";

// Interface font: navigation, buttons, body copy, labels.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Editorial font: headlines, statements, quotes and the wordmark.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Each page sets a short `title` ("Services"); the template adds the studio's
// name, so a rebrand only changes `site.fullName`.
export const metadata: Metadata = {
  title: {
    default: `${site.fullName} | Hair, Beauty & Bridal`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} antialiased`}
    >
      <body>
        {children}
        <LiquidGlass />
      </body>
    </html>
  );
}
