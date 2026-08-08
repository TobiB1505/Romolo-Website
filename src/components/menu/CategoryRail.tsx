import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";
import styles from "./MenuExperience.module.css";

interface CategoryRailProps {
  groups: Pick<MenuVisualGroup, "id" | "number" | "label">[];
  activeId: string;
  orientation: "vertical" | "horizontal";
}

/**
 * Kategorie-Navigation für die Speisekarte – als vertikale Desktop-Rail und
 * als horizontale Mobile-Chip-Leiste wiederverwendet (gleiche Logik, anderes
 * Layout). Reine `<a href="#...">`-Anchors: funktionieren identisch ohne
 * JavaScript, Tastatur und Screenreader. `activeId` ist ausschließlich
 * progressive Enhancement (Scrollspy) – ohne sie ist die Navigation weiterhin
 * vollständig nutzbar, nur ohne Hervorhebung.
 */
export function CategoryRail({ groups, activeId, orientation }: CategoryRailProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav aria-label="Speisekarten-Kategorien">
      <ul className={clsx(isVertical ? styles.railVertical : `${styles.railHorizontal} no-scrollbar`)}>
        {groups.map((group) => {
          const isActive = group.id === activeId;
          return (
            <li key={group.id} className={isVertical ? styles.railItem : "shrink-0 snap-start"}>
              <a
                href={`#${group.id}`}
                aria-current={isActive ? "true" : undefined}
                data-menu-link={group.id}
                data-menu-orientation={orientation}
                className={clsx(
                  styles.railLink,
                  isVertical
                    ? clsx(styles.railLinkVertical, isActive && styles.railLinkActive)
                    : clsx(styles.railLinkHorizontal, isActive && styles.railChipActive)
                )}
              >
                <span aria-hidden className={styles.railNumber}>{group.number}</span>
                <span className={styles.railLabel}>{group.label}</span>
                {isVertical && <ArrowUpRight size={14} aria-hidden className={styles.railArrow} />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
