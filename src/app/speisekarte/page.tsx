import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { MenuList } from "@/components/menu/MenuList";
import { menuVisualGroups } from "@/lib/data/menuPresentation";
import styles from "@/components/menu/MenuExperience.module.css";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Unsere Speisekarte: Antipasti, Pasta, original italienische Pizza, Fleisch- und Fischgerichte sowie Weine – im Ristorante da Romolo in Miesbach.",
};

export default function SpeisekartePage() {
  return (
    <div className={styles.menuPage}>
      <MenuHero />
      <div data-hero-sentinel aria-hidden="true" className="h-px w-full" />

      <section className={styles.menuPrelude} aria-label="Hinweise zur Speisekarte">
        <Container size="wide" className={styles.preludeInner}>
          <p>Sieben Kapitel. Eine Küche, die Italien mit Miesbach verbindet.</p>
          <div>
            <span>Alle Gerichte auch zum Abholen</span>
            <span>Preise in Euro</span>
          </div>
        </Container>
      </section>

      <Container size="wide" className={styles.explorerContainer}>
        <MenuExplorer groups={menuVisualGroups}>
          <MenuList />
        </MenuExplorer>
      </Container>
    </div>
  );
}
