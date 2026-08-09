"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { BookOpen, List } from "lucide-react";
import { CategoryRail } from "@/components/menu/CategoryRail";
import { CategoryMoodImage } from "@/components/menu/CategoryMoodImage";
import {
  BOOK_EXPERIENCE_ENABLED,
  useMenuView,
  type MenuView,
} from "@/components/menu/MenuViewProvider";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";
import styles from "./MenuExperience.module.css";

interface MenuExplorerProps {
  groups: Pick<MenuVisualGroup, "id" | "number" | "label" | "editorial" | "moodImage">[];
  children: ReactNode;
}

/**
 * Orchestriert die interaktive Schicht der Speisekarte: Scrollspy (welche
 * Hauptgruppe ist gerade aktiv), das sticky Desktop-Bildpanel und die
 * Kategorie-Navigation (Desktop vertikal, Mobile horizontal).
 *
 * `children` (die eigentliche, 124 Gerichte umfassende Liste) bleibt
 * server-gerendertes Markup, das hier nur durchgereicht wird – dieses
 * Wrapper-Component ist die einzige Client-Grenze der Seite.
 */
export function MenuExplorer({ groups, children }: MenuExplorerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { view, setView } = useMenuView();
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const activeIdRef = useRef(activeId);

  function selectView(nextView: MenuView) {
    setView(nextView);
    if (nextView === "book") {
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
    }
  }

  // Ref-Synchronisation gehört in einen Effect, nicht in den Render-Body
  // (Refs sind für Rendering irrelevant und dürfen dort nicht geschrieben
  // werden).
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const sections = groups
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Referenzlinie bei 40 % der Viewporthöhe. Aktiv ist immer die letzte
    // Gruppe (in Dokumentreihenfolge), deren Überschrift diese Linie bereits
    // passiert hat – Standardalgorithmus für stabile Scrollspy-Navigation.
    //
    // Bewusst NICHT die naive Variante "setze aktiv, sobald eine Gruppe das
    // Band durchquert, ändere sonst nichts": Ganz oben auf der Seite (vor der
    // ersten Gruppe, z. B. noch im Intro-Bereich) durchquert dort keine
    // Gruppe ein schmales Band – der Zustand bliebe fälschlich auf der
    // zuletzt aktiven Gruppe von einer früheren, entfernten Scrollposition
    // hängen (reproduziert: schnell ans Ende scrollen, dann zurück zum
    // Anfang – "Vino & Bar" blieb aktiv, obwohl "Antipasti" sichtbar war).
    // Diese Version berechnet den Zustand bei jedem Trigger neu aus den
    // tatsächlichen aktuellen Positionen aller Gruppen und ist dadurch
    // unabhängig vom vorherigen Zustand immer korrekt.
    const REFERENCE_RATIO = 0.4;
    // Bandbreite um die Referenzlinie herum, in Prozentpunkten. Muss > 0
    // sein: Ein rootMargin, dessen oberer und unterer Wert sich exakt zu
    // -100% summieren, kollabiert die Beobachtungsfläche auf Nullhöhe – eine
    // Fläche ohne Ausdehnung hat immer intersectionRatio 0 und der Observer
    // feuert dann nach dem ersten Aufruf nie wieder (reproduziert: Rail blieb
    // nach jedem weiteren Scrollen auf dem allerersten Wert hängen).
    const BAND_WIDTH_RATIO = 0.04;

    function recomputeActive() {
      const referenceY = window.innerHeight * REFERENCE_RATIO;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceY) {
          current = section;
        } else {
          break; // Abschnitte liegen in Dokumentreihenfolge; weitere sind noch tiefer.
        }
      }
      if (current.id !== activeIdRef.current) {
        setActiveId(current.id);
      }
    }

    recomputeActive();

    const topMargin = REFERENCE_RATIO - BAND_WIDTH_RATIO / 2;
    const bottomMargin = 1 - REFERENCE_RATIO - BAND_WIDTH_RATIO / 2;
    const observer = new IntersectionObserver(recomputeActive, {
      rootMargin: `-${Math.round(topMargin * 100)}% 0px -${Math.round(bottomMargin * 100)}% 0px`,
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const activeLink = document.querySelector<HTMLElement>(
      `[data-menu-link="${activeId}"][data-menu-orientation="horizontal"]`
    );
    activeLink?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId, prefersReducedMotion]);

  return (
    <div className={styles.menuExplorer} data-menu-view={view}>
      {BOOK_EXPERIENCE_ENABLED && (
        <div className={styles.viewControls} role="group" aria-label="Darstellung der Speisekarte">
          <span>Ansicht</span>
          <ViewButton view="book" activeView={view} onSelect={selectView} icon={<BookOpen size={15} aria-hidden />}>
            Buch
          </ViewButton>
          <ViewButton view="editorial" activeView={view} onSelect={selectView} icon={<List size={15} aria-hidden />}>
            Liste
          </ViewButton>
        </div>
      )}

      {/* Mobile/Tablet: horizontale Rail, sticky direkt unter der Kopfzeile. */}
      <div
        className={`${styles.mobileRail} sticky z-30 -mx-6 lg:hidden`}
        style={{ top: "var(--header-h)" }}
      >
        <CategoryRail groups={groups} activeId={activeId} orientation="horizontal" />
      </div>

      <div className={styles.menuLayout}>
        {/* Desktop: sticky Bild + vertikale Rail. */}
        <aside className={styles.visualColumn} aria-label="Aktuelles Menükapitel">
          <div
            className={styles.visualSticky}
            style={{ top: "calc(var(--header-h) + 2rem)" }}
          >
            <CategoryMoodImage groups={groups} activeId={activeId} />
            <div className={styles.desktopRail}>
              <CategoryRail groups={groups} activeId={activeId} orientation="vertical" />
            </div>
          </div>
        </aside>

        <div className={styles.menuContent}>{children}</div>
      </div>
    </div>
  );
}

function ViewButton({
  view,
  activeView,
  onSelect,
  icon,
  children,
}: {
  view: MenuView;
  activeView: MenuView;
  onSelect: (view: MenuView) => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  const active = view === activeView;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(view)}
      className={active ? styles.viewButtonActive : styles.viewButton}
    >
      {icon}
      {children}
    </button>
  );
}
