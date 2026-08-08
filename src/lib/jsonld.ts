import { restaurant } from "@/lib/data/restaurant";

const dayMap: Record<string, string> = {
  Montag: "Monday",
  Dienstag: "Tuesday",
  Mittwoch: "Wednesday",
  Donnerstag: "Thursday",
  Freitag: "Friday",
  Samstag: "Saturday",
  Sonntag: "Sunday",
};

function toOpeningHoursSpecification() {
  return restaurant.hours
    .filter((h) => h.hours !== "Ruhetag")
    .map((h) => {
      // "11:30–14:30 & 17:30–22:00 Uhr" -> zwei Zeitfenster
      const ranges = h.hours
        .replace(" Uhr", "")
        .split("&")
        .map((r) => r.trim());
      return ranges.map((range) => {
        const [opens, closes] = range.split("–").map((t) => t.trim());
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayMap[h.day],
          opens,
          closes,
        };
      });
    })
    .flat();
}

export function getRestaurantJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": siteUrl,
    name: restaurant.name,
    url: siteUrl,
    description: restaurant.tagline,
    telephone: restaurant.phone,
    email: restaurant.email,
    servesCuisine: "Italienisch",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.street,
      postalCode: restaurant.zip,
      addressLocality: restaurant.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.lat,
      longitude: restaurant.lng,
    },
    openingHoursSpecification: toOpeningHoursSpecification(),
  };
}
