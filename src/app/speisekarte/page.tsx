import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { MenuList } from "@/components/menu/MenuList";
import { menuVisualGroups } from "@/lib/data/menuPresentation";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Unsere Speisekarte: Antipasti, Pasta, original italienische Pizza, Fleisch- und Fischgerichte sowie Weine – im Ristorante da Romolo in Miesbach.",
};

export default function SpeisekartePage() {
  return (
    <div>
      {/*
        Bewusst kein PageHero (bleibt für Galerie/Über uns/Kontakt/Legal
        unverändert, Sprint 4). Kompakter, seitenspezifischer Einstieg statt
        eines großen Fullscreen-Bereichs – der Fokus soll schnell auf der
        Karte selbst liegen (Punkt 25/26).
      */}
      <div className="bg-forest py-12 text-cream lg:py-16">
        <Container>
          <Reveal>
            <span className="eyebrow text-gold">La Nostra Cucina</span>
            <h1 className="mt-3 font-display text-display-lg">Speisekarte</h1>
            <p className="mt-3 max-w-measure text-cream/80">
              Hier ist für jeden etwas dabei – entdecken Sie unsere italienische Vielfalt. Gerichte der
              Restaurantkarte können Sie auch zum Abholen bestellen.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* size="wide" statt der Standardbreite: Auf großen Desktops (≥1536px)
          soll die Karte nicht als 1152px-Insel in der Bildschirmmitte
          wirken (vgl. Sprint 2, Punkt 21). */}
      <Container size="wide" className="py-12 lg:py-16">
        <MenuExplorer groups={menuVisualGroups}>
          <MenuList />
        </MenuExplorer>
      </Container>
    </div>
  );
}
