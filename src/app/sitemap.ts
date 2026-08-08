import type { MetadataRoute } from "next";

const siteUrl = "https://www.ristorante-da-romolo.com";

const routes = ["", "/speisekarte", "/galerie", "/ueber-uns", "/kontakt", "/impressum", "/datenschutz", "/widerruf"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
