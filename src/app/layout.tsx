import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
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

export const metadata: Metadata = {
  title: "Elane Beauty Studio | Hair, Beauty & Bridal",
  description:
    "Elane Beauty Studio — a calm, luxurious space for hair artistry, skin and nail care, and bridal styling.",
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
