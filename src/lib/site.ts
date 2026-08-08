/**
 * Kanonische URL der Website.
 *
 * Reihenfolge:
 * 1. NEXT_PUBLIC_SITE_URL – explizit gesetzt (empfohlen für Produktion)
 * 2. VERCEL_PROJECT_PRODUCTION_URL – von Vercel automatisch gesetzt
 * 3. Fallback auf die Zieldomain
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "https://www.ristorante-da-romolo.com";
}

export const siteUrl = getSiteUrl();
