import clsx from "clsx";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";

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
      <ul
        className={clsx(
          isVertical
            ? "space-y-1"
            : "no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 py-3 sm:px-10"
        )}
      >
        {groups.map((group) => {
          const isActive = group.id === activeId;
          return (
            <li key={group.id} className={isVertical ? "" : "shrink-0 snap-start"}>
              <a
                href={`#${group.id}`}
                aria-current={isActive ? "true" : undefined}
                className={clsx(
                  "flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
                  isVertical
                    ? clsx(
                        "gap-3 border-l-2 py-2 pl-4 text-sm",
                        isActive
                          ? "border-terracotta font-medium text-ink"
                          : "border-hairline text-ink-soft hover:border-ink-soft/40 hover:text-ink"
                      )
                    : clsx(
                        "gap-1.5 border-b-2 px-1 text-sm whitespace-nowrap",
                        isActive ? "border-terracotta font-medium text-ink" : "border-transparent text-ink-soft"
                      )
                )}
              >
                {isVertical && (
                  <span aria-hidden className={clsx("text-xs tabular-nums", isActive ? "text-terracotta" : "text-ink-soft/60")}>
                    {group.number}
                  </span>
                )}
                {group.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
