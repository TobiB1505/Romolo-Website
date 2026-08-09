# Ristorante da Romolo – Website

Website für das Ristorante da Romolo, Stadtplatz 12, 83714 Miesbach.
Ersetzt die bisherige Jimdo-Seite.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
Tailwind CSS v4 (CSS-first config, kein `tailwind.config.js`) · Motion
(`motion/react`) für Animationen · Resend für den E-Mail-Versand

## Lokal starten

```bash
npm install
npm run dev
```

Läuft auf http://localhost:3000.

Für den E-Mail-Versand des Reservierungsformulars `.env.local.example` nach
`.env.local` kopieren und ausfüllen. Ohne Konfiguration bleibt die Seite voll
funktionsfähig – das Formular weist dann darauf hin, telefonisch zu reservieren.

## Seiten

| Route | Inhalt |
| --- | --- |
| `/` | Startseite (Hero, Philosophie, Cucina, Storia, Atmosfera/Room-Tour, Reservierung) |
| `/speisekarte` | Speise- und Getränkekarte |
| `/galerie` | Alle Fotos |
| `/ueber-uns` | Über das Restaurant |
| `/kontakt` | Kontakt & Reservierung |
| `/impressum`, `/datenschutz`, `/widerruf` | Rechtliches |

`/sitemap.xml` und `/robots.txt` werden aus `src/app/sitemap.ts` bzw.
`src/app/robots.ts` generiert.

## Inhalte pflegen

Alle Inhalte liegen als TypeScript-Dateien im Repo – Änderungen erfordern
also einen Commit. Ein Headless-CMS (Sanity) war vorbereitet und wurde
wieder entfernt; die Schemas lassen sich bei Bedarf aus Commit `0dde84d`
wiederherstellen.

| Datei | Inhalt |
| --- | --- |
| `src/lib/data/restaurant.ts` | Adresse, Telefon, Öffnungszeiten, Homepage-Texte, Impressum/Datenschutz-Textbausteine |
| `src/lib/data/menu.ts` | Speise- und Getränkekarte (Single Source of Truth für Preise/Beschreibungen) |
| `src/lib/data/menuPresentation.ts` | Ordnet die Menü-Kategorien den Anzeige-Gruppen auf `/speisekarte` zu (rein visuell, dupliziert keine Daten) |
| `src/lib/data/menuBook.ts` | Paginiert die Speisekarte für die Flipbook-Ansicht |
| `src/lib/data/gallery.ts` | Alle Fotos (Alt-Texte, Maße) + `findGalleryImage()`-Helper |
| `src/lib/data/rooms.ts` | Kuratierte Stopps für die Room-Tour auf der Startseite |
| `src/lib/data/googleReviews.ts` | Statischer Snapshot der Google-Bewertungen (Rating, Anzahl, Zitate) – manuell aktuell halten |

> **Achtung:** Speisekarte und Preise stammen ursprünglich aus der
> Word-Datei der alten Website (Stand 2021) und sollten vor dem Livegang
> final geprüft werden.

## Bildmaterial

```
public/images/gallery/     Restaurant-Fotos (Innen-/Außenaufnahmen) – genutzt von gallery.ts & rooms.ts
public/images/cucina/      Gerichte-Fotos für die Cucina-Sektion der Startseite
public/images/categories/  Kategorie-Illustrationen für die Speisekarte
```

Alle Bilder sind aktuelles, echtes Bildmaterial vom Restaurant – die
ursprünglichen Platzhalterfotos der alten Jimdo-Seite wurden vollständig
ersetzt. Neue Fotos einfach in den passenden Ordner legen und in der
jeweiligen `src/lib/data/*.ts`-Datei referenzieren.

## Architektur-Hinweise

- **Tür-Intro auf der Startseite** (`src/components/home/HeroCinematic.tsx`):
  ein animiertes Türmotiv gated den Hero beim ersten Besuch (Klick, Scroll
  oder Tastatur öffnet sie). Merkt sich den Besuch via `sessionStorage`
  und überspringt sich selbst bei `prefers-reduced-motion`.
- **Room Tour** (`src/components/home/RoomTour.tsx`, Daten aus `rooms.ts`):
  wischbare Raum-für-Raum-Ansicht auf Mobile via natives CSS
  Scroll-Snap – bewusst ohne JS-Carousel-Library. Dasselbe Muster nutzen
  `CucinaDishStrip` und die Speisekarten-Kategorie-Leiste.
- **Reservierungsformular** (`src/components/ReservationForm.tsx` →
  `src/app/api/reservation/route.ts`): Versand über Resend, mit
  Honeypot-Feld gegen Bots. Ohne `RESEND_API_KEY` liefert die Route einen
  freundlichen Fallback ("bitte anrufen") statt eines Fehlers.
- **Design-System**: Farb- und Abstands-Tokens als CSS-Variablen in
  `src/app/globals.css` (Tailwind-v4-`@theme`, kein separates Config-File).
  Palette: Creme, Ink, Terracotta, Forest, Gold. Schriften: Playfair
  Display (Headlines) + Inter (Fließtext).

## Deployment auf Vercel

1. Repo zu GitHub/GitLab pushen.
2. Auf [vercel.com/new](https://vercel.com/new) importieren – Next.js wird
   automatisch erkannt, es ist keine zusätzliche Konfiguration nötig.
3. Environment-Variablen im Vercel-Projekt setzen (Settings → Environment Variables):

   | Variable | Pflicht | Beschreibung |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | empfohlen | Kanonische URL, z. B. `https://www.ristorante-da-romolo.com`. Ohne Angabe wird die Vercel-Produktionsdomain genutzt. |
   | `RESEND_API_KEY` | für Reservierungen | API-Key von [resend.com](https://resend.com) |
   | `RESEND_FROM_EMAIL` | für Reservierungen | Absender, dessen Domain in Resend verifiziert ist |
   | `RESERVATION_TO_EMAIL` | für Reservierungen | Empfänger der Anfragen |

4. Domain in Vercel verbinden und die DNS-Einträge von Jimdo umziehen.

`NEXT_PUBLIC_SITE_URL` wird beim Build eingebacken (Sitemap und robots.txt
werden statisch erzeugt). Nach einer Änderung dieser Variable ist also ein
Redeploy nötig.

Nach dem Domainwechsel prüfen: `/sitemap.xml`, `/robots.txt` und die
strukturierten Daten via [Rich Results Test](https://search.google.com/test/rich-results).

## Vor dem Livegang

- [ ] Speisekarte und Preise auf Aktualität prüfen
- [ ] Datenschutzerklärung rechtlich prüfen lassen (`src/app/datenschutz/page.tsx`
      ist ein fachlicher Entwurf, keine Rechtsberatung) – erwähnt aktuell
      noch Sanity als Hosting-/CDN-Anbieter für Inhalte, was seit der
      Sanity-Entfernung nicht mehr stimmt und angepasst werden sollte
- [ ] Geo-Koordinaten in `src/lib/data/restaurant.ts` verifizieren
- [ ] Resend-Domain verifizieren und Reservierungsformular live testen
- [ ] Google-Bewertungen in `src/lib/data/googleReviews.ts` vor Launch
      aktualisieren (aktuell ein manueller Snapshot)

## Skripte

```bash
npm run dev     # Entwicklungsserver
npm run build   # Produktions-Build
npm run start   # Produktions-Build lokal starten
npm run lint    # ESLint
```
