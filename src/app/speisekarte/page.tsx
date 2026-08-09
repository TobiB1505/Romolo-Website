import type { Metadata } from "next";
import { MenuList } from "@/components/menu/MenuList";
import { MenuPageExperience } from "@/components/menu/MenuPageExperience";
import { MenuViewProvider } from "@/components/menu/MenuViewProvider";
import { menuBookPages } from "@/lib/data/menuBook";
import { menuVisualGroups } from "@/lib/data/menuPresentation";
import styles from "@/components/menu/MenuExperience.module.css";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Unsere Speisekarte: Antipasti, Pasta, original italienische Pizza, Fleisch- und Fischgerichte sowie Weine – im Ristorante da Romolo in Miesbach.",
};

export default function SpeisekartePage() {
  return (
    <MenuViewProvider>
      <div className={styles.menuPage}>
        <MenuPageExperience pages={menuBookPages} groups={menuVisualGroups} editorialMenu={<MenuList />} />
      </div>
    </MenuViewProvider>
  );
}
