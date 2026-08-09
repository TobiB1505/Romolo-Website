import { findGalleryImage } from "./gallery";
import type { RoomTourStop } from "@/lib/types";

/**
 * Kuratierte Reihenfolge für den Rundgang auf der Startseite – ein Bild pro
 * Raum, in der Reihenfolge eines echten Besuchs. Die vollständige
 * Bildersammlung bleibt in /galerie; hier zählt die Erzählung, nicht die
 * Vollständigkeit.
 */
export const roomTourStops: RoomTourStop[] = [
  {
    id: "gewoelbekeller",
    number: "01",
    name: "Der Gewölbekeller",
    description:
      "Unter historischen Kreuzgewölben, mit Blick zur offenen Küche – unser Hauptraum für laue Abende zu zweit oder in großer Runde.",
    image: findGalleryImage("interior-2"),
  },
  {
    id: "fensterplaetze",
    number: "02",
    name: "Die Fensterplätze",
    description:
      "Tische direkt am Fenster mit Blick auf den Stadtplatz – ein ruhiger Platz für den Moment vor dem ersten Gang.",
    image: findGalleryImage("interior-12"),
  },
  {
    id: "privater-gewoelberaum",
    number: "03",
    name: "Der private Gewölberaum",
    description:
      "Ein eigener Gewölberaum mit rundem Tisch für acht Personen – für Familienfeiern und größere Gesellschaften.",
    image: findGalleryImage("interior-7"),
  },
  {
    id: "gastgarten",
    number: "04",
    name: "Der Gastgarten",
    description:
      "Unter alten Kastanienbäumen im Innenhof – unser Garten für laue Sommerabende.",
    image: findGalleryImage("exterior-3"),
  },
];
