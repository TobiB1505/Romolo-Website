import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { MenuTabs } from "@/components/MenuTabs";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Unsere Speisekarte: Antipasti, Pasta, original italienische Pizza, Fleisch- und Fischgerichte sowie Weine – im Ristorante da Romolo in Miesbach.",
};

export default function SpeisekartePage() {
  return (
    <div>
      <PageHero
        title="Speisekarte"
        subtitle="Hier ist für jeden etwas dabei – entdecken Sie unsere italienische Vielfalt. Gerichte der Restaurantkarte können Sie auch zum Abholen bestellen."
      />
      <Container className="py-16">
        <MenuTabs />
      </Container>
    </div>
  );
}
