import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { getRestaurantJsonLd } from "@/lib/jsonld";
import { restaurant } from "@/lib/data/restaurant";
import { siteUrl } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} – Italienisches Restaurant in Miesbach`,
    template: `%s | ${restaurant.name}`,
  },
  description:
    "Italienisches Restaurant am Stadtplatz in Miesbach: Pasta, Pizza, Fleisch & Fisch vom Grill. Saisonale Karte, herzliche Gastfreundschaft.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: restaurant.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <JsonLd data={getRestaurantJsonLd(siteUrl)} />
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
