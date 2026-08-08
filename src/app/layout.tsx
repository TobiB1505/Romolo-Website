import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getRestaurantJsonLd } from "@/lib/jsonld";
import { restaurant } from "@/lib/data/restaurant";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.ristorante-da-romolo.com";

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
    <html lang="de" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <JsonLd data={getRestaurantJsonLd(siteUrl)} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
