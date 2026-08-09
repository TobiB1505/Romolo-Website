"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { MenuBookExperience } from "@/components/menu/MenuBookExperience";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { MenuHero } from "@/components/menu/MenuHero";
import { useMenuView } from "@/components/menu/MenuViewProvider";
import type { MenuBookPage } from "@/lib/data/menuBook";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";
import styles from "./MenuExperience.module.css";

interface MenuPageExperienceProps {
  pages: MenuBookPage[];
  groups: MenuVisualGroup[];
  editorialMenu: ReactNode;
}

export function MenuPageExperience({ pages, groups, editorialMenu }: MenuPageExperienceProps) {
  const { view } = useMenuView();

  if (view === "book") {
    return <MenuBookExperience pages={pages} groups={groups} />;
  }

  return (
    <>
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
        <MenuExplorer groups={groups}>{editorialMenu}</MenuExplorer>
      </Container>
    </>
  );
}
