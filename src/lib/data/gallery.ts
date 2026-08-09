import type { GalleryImage } from "@/lib/types";

/**
 * Platzhalter-Fotos, übernommen von der bisherigen Jimdo-Seite. Sollten
 * durch aktuelles, professionelles Bildmaterial ersetzt werden, sobald
 * verfügbar (siehe Sanity Studio /studio).
 */
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/interior-2.jpg", alt: "Gewölbekeller-Gastraum mit gedeckten Tischen und Weinregal", width: 1198, height: 1360 },
  { src: "/images/gallery/interior-4.jpg", alt: "Langer festlich gedeckter Tisch im gewölbten Hauptraum", width: 1600, height: 2133 },
  { src: "/images/gallery/exterior-1.jpg", alt: "Begrünter Innenhof mit Bierbänken unter Kastanienbaum", width: 1600, height: 2133 },
  { src: "/images/gallery/interior-1.jpg", alt: "Gedeckter Tisch in gemütlicher Sitznische", width: 1200, height: 1600 },
  { src: "/images/gallery/interior-6.jpg", alt: "Runder gedeckter Tisch im Gewölbekeller", width: 1200, height: 1600 },
  { src: "/images/gallery/interior-5.jpg", alt: "Sitzecke am Fenster zum Stadtplatz", width: 1200, height: 1600 },
  { src: "/images/gallery/interior-3.jpg", alt: "Gewölbekeller-Gastraum mit Blick zur Küche", width: 1500, height: 2000 },
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
