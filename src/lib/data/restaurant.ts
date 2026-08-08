import type { RestaurantSettings } from "@/lib/types";

export const restaurant: RestaurantSettings = {
  name: "Ristorante da Romolo",
  tagline: "Italienische Küche im Herzen von Miesbach",
  street: "Stadtplatz 12",
  zip: "83714",
  city: "Miesbach",
  phone: "+49 8025 9978676",
  phoneHref: "tel:+4980259978676",
  email: "info@ristorante-da-romolo.de",
  hours: [
    { day: "Montag", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
    { day: "Dienstag", hours: "Ruhetag" },
    { day: "Mittwoch", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
    { day: "Donnerstag", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
    { day: "Freitag", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
    { day: "Samstag", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
    { day: "Sonntag", hours: "11:30–14:30 & 17:30–22:00 Uhr" },
  ],
  // Geo-Koordinaten für Stadtplatz 12, 83714 Miesbach (für JSON-LD/Karte) – bitte bei Bedarf präzisieren.
  lat: 47.7897,
  lng: 11.8331,
};

export const homeContent = {
  heroTitle: "Benvenuti da Ristorante da Romolo",
  heroText:
    "Italienische Küche. Eine Karte, die mit den Jahreszeiten geht. Klassische Lieblingsgerichte mit Herz zubereitet. Und vor allem: viel Liebe für gutes, handgemachtes Essen. Herzlich willkommen!",
  weeklyMenuNote:
    "Wir bieten wöchentlich wechselnde Mittagsmenüs an! Warmes Essen, warme Herzen – so einfach ist das.",
  introText:
    "Wir haben dafür einen einladenden Ort geschaffen, an dem Freunde und Familie zusammenkommen und sich wohlfühlen können. Unser Konzept ist simpel: Wir machen das Restaurant, in dem wir selber gern essen würden. Kommen Sie vorbei! Erfreuen Sie sich an Ihren italienischen Lieblingsgerichten und unserer Gastfreundschaft. Wir freuen uns auf Sie.",
};

export const aboutContent = {
  title: "Über uns",
  paragraphs: [
    "Ristorante da Romolo ist ein inhabergeführtes Restaurant mit einer großen Auswahl an Gerichten für jeden Geschmack. Als Familienunternehmen legen wir Wert auf eine herzliche Beziehung zu unseren Gästen – persönliche Aufmerksamkeit und guter Service gehören für uns einfach dazu.",
    "Mitten am Stadtplatz von Miesbach servieren wir italienische Klassiker, wie man sie aus der Trattoria um die Ecke kennt: Pasta, Pizza aus dem original italienischen Mozzarella, Fleisch und Fisch vom Grill – dazu eine Karte, die sich mit den Jahreszeiten wandelt.",
    "Erleben Sie bei uns aus erster Hand, was wir lieben: gutes Essen und gute Gesellschaft. Beides teilen wir gern – kommen Sie vorbei und lassen Sie sich verwöhnen.",
  ],
};

export const legalContent = {
  // TMG-Pflichtangaben 1:1 von der bisherigen Seite übernommen (impressum/).
  impressum: {
    title: "Impressum",
    company: "Ristorante Da Romolo GmbH",
    street: "Stadtplatz 12",
    zip: "83714",
    city: "Miesbach",
    phone: "+49 8025 9978676",
    email: "info@ristorante-da-romolo.de",
    representative: "Herr Romolo Marchetti",
    registerCourt: "München",
    registerNumber: "HRB 191042",
    vatId: "DE276432302",
    supervisoryAuthority: "Gewerbeamt Miesbach",
    liabilityNote:
      "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
    copyrightNote:
      "Copyright © Ristorante Da Romolo GmbH. Alle Rechte vorbehalten. Sämtliche Texte, Fotos und Grafiken der Website unterliegen dem Urheberrechtsschutz und dürfen ohne schriftliche Genehmigung weder zu privaten noch kommerziellen Zwecken reproduziert werden.",
  },
  // Die bisherige Datenschutzerklärung beschreibt ausschließlich die Jimdo/Google-Analytics-Verarbeitung
  // und passt technisch nicht mehr zum neuen Stack. Unten steht ein fachlicher Entwurf für die neuen
  // Dienste (Hosting, Sanity-CDN, Reservierungsformular) – Freigabe durch den Betreiber/eine Rechtsberatung
  // ist vor Live-Schaltung erforderlich.
  datenschutz: {
    title: "Datenschutzerklärung",
    note: "Entwurf – muss vor Veröffentlichung rechtlich geprüft werden. Ergänzt neue Dienste: Hosting, Sanity.io (Content/CDN), E-Mail-Versand für Reservierungsanfragen.",
  },
  // Ein Fernabsatz-Widerrufsrecht betrifft nur online geschlossene, entgeltliche Verträge. Das
  // Reservierungsformular ist eine unverbindliche Anfrage ohne Zahlung/Vertragsschluss – ob diese Seite
  // überhaupt benötigt wird, sollte mit dem Betreiber geklärt werden (z. B. falls online Vorbestellungen
  // mit Zahlung eingeführt werden).
  widerruf: {
    title: "Widerrufsrecht",
    note: "Nur relevant, sobald über die Website entgeltliche Verträge (z. B. Online-Bestellung mit Zahlung) geschlossen werden. Aktuell bietet die Website nur eine unverbindliche Reservierungsanfrage an.",
  },
};
