# Ristorante da Romolo – Website

Neubau der Website für das Ristorante da Romolo, Stadtplatz 12, 83714 Miesbach.
Ersetzt die bisherige Jimdo-Seite.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Resend (E-Mail)

## Lokal starten

```bash
npm install
npm run dev
```

Läuft auf http://localhost:3000.

Für den E-Mail-Versand des Reservierungsformulars `.env.local.example` nach
`.env.local` kopieren und ausfüllen. Ohne Konfiguration bleibt die Seite voll
funktionsfähig – das Formular weist dann darauf hin, telefonisch zu reservieren.

## Inhalte pflegen

Alle Inhalte liegen aktuell als TypeScript-Dateien im Repo:

| Datei | Inhalt |
| --- | --- |
| `src/lib/data/restaurant.ts` | Adresse, Telefon, Öffnungszeiten, Texte, Impressum |
| `src/lib/data/menu.ts` | Speise- und Getränkekarte |
| `src/lib/data/gallery.ts` | Galerie-Bilder inkl. Alt-Texte |
| `public/images/gallery/` | Bilddateien |

Änderungen erfordern also einen Commit. Ein Headless-CMS (Sanity) war
vorbereitet und wurde vorerst wieder entfernt – die Schemas lassen sich bei
Bedarf aus Commit `0dde84d` wiederherstellen.

> **Achtung:** Speisekarte und Preise stammen aus der Word-Datei der alten
> Website (Stand 2021) und sollten vor dem Livegang geprüft werden. Die Fotos
> sind ebenfalls von der alten Seite übernommen.

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
- [ ] Aktuelle Fotos und Logo einsetzen
- [ ] Datenschutzerklärung rechtlich prüfen lassen (`src/app/datenschutz/page.tsx`
      ist ein fachlicher Entwurf, keine Rechtsberatung)
- [ ] Geo-Koordinaten in `src/lib/data/restaurant.ts` verifizieren
- [ ] Resend-Domain verifizieren und Reservierungsformular live testen

## Skripte

```bash
npm run dev     # Entwicklungsserver
npm run build   # Produktions-Build
npm run start   # Produktions-Build lokal starten
npm run lint    # ESLint
```
