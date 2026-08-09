import type { GalleryImage } from "@/lib/types";

/**
 * Platzhalter-Fotos, übernommen von der bisherigen Jimdo-Seite. Sollten
 * durch aktuelles, professionelles Bildmaterial ersetzt werden, sobald
 * verfügbar (siehe Sanity Studio /studio).
 */
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/interior-2.jpg", alt: "Gewölbekeller-Gastraum mit gedeckten Tischen und Weinregal", width: 1198, height: 1360 },
  { src: "/images/gallery/interior-4.jpg", alt: "Langer festlich gedeckter Tisch im gewölbten Hauptraum", width: 1600, height: 2133 },
  { src: "/images/gallery/exterior-1.jpg", alt: "Begrünter Gastgarten mit Bierbänken unter Kastanienbäumen und Lampions", width: 1085, height: 1450 },
  { src: "/images/gallery/interior-1.jpg", alt: "Gedeckter Tisch in gemütlicher Sitznische", width: 1200, height: 1600 },
  { src: "/images/gallery/interior-5.jpg", alt: "Sitzecke am Fenster zum Stadtplatz", width: 1200, height: 1600 },
  { src: "/images/gallery/interior-3.jpg", alt: "Gewölbekeller-Gastraum mit Blick zur Küche", width: 1500, height: 2000 },
  { src: "/images/gallery/interior-7.jpg", alt: "Privater Gewölberaum mit rundem gedeckten Tisch für acht Personen", width: 1254, height: 1254 },
  { src: "/images/gallery/interior-8.jpg", alt: "Gedeckte Tische im Gewölbekeller mit historischer Weinpresse im Hintergrund", width: 1254, height: 1254 },
  { src: "/images/gallery/interior-9.jpg", alt: "Langer festlich gedeckter Tisch vor der historischen Weinpresse", width: 1122, height: 1402 },
  { src: "/images/gallery/exterior-2.jpg", alt: "Tisch im Gastgarten mit Speisekarte, umgeben von blühendem Oleander", width: 1086, height: 1448 },
  { src: "/images/gallery/exterior-3.jpg", alt: "Langer gedeckter Tisch im Gastgarten unter Kastanienbäumen", width: 1085, height: 1450 },
  { src: "/images/gallery/interior-10.jpg", alt: "Gewölbekeller-Gastraum mit Sitzbank-Reihe und historischen Fischerfotos an der Wand", width: 1086, height: 1448 },
  { src: "/images/gallery/interior-11.jpg", alt: "Gemütliche Sitznische mit zwei gedeckten Tischen unter der Gewölbedecke", width: 1086, height: 1448 },
  { src: "/images/gallery/interior-12.jpg", alt: "Reservierter Tisch am Fenster mit Blick auf den Stadtplatz", width: 1086, height: 1448 },
  { src: "/images/gallery/interior-13.jpg", alt: "Gewölbekeller-Gastraum mit Sitzbank-Reihe, zweite Ansicht", width: 1254, height: 1254 },
];

export const heroImage: GalleryImage = {
  src: "/images/gallery/hero-evening-v2.png",
  alt: "Abendlich beleuchteter Gewölbekeller des Ristorante da Romolo mit gedecktem Tisch",
  width: 1672,
  height: 941,
};

/**
 * Sucht ein Bild anhand eines Dateinamens-Fragments (z. B. "interior-4").
 * Wirft, statt still `undefined` zurückzugeben – ein Tippfehler soll beim
 * Build aussagekräftig auffallen, nicht als leeres Bild im Live-Betrieb.
 */
export function findGalleryImage(fragment: string): GalleryImage {
  const image = galleryImages.find((img) => img.src.includes(fragment));
  if (!image) {
    throw new Error(`Kein Galerie-Bild gefunden, das "${fragment}" enthält.`);
  }
  return image;
}
