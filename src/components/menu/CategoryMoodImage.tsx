"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/motion";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";

interface CategoryMoodImageProps {
  groups: Pick<MenuVisualGroup, "id" | "moodImage">[];
  activeId: string;
}

/**
 * Desktop-Sticky-Panel: alle Mood-Bilder liegen übereinander (absolut
 * positioniert) und blenden per Opacity zwischen sich. So entsteht ein
 * echter Crossfade ohne `src`-Wechsel an einem einzelnen `<Image>` (der
 * würde neu laden statt zu überblenden).
 *
 * Alle sieben Mood-Bilder sind einheitlich Hochformat (~2:3 bis 3:4), daher
 * ein schlichtes 4:5-Hochformat mit `object-cover`. Der Zuschnitt hier ist
 * milde (Quelle und Ziel liegen nah beieinander), `objectPosition` pro Bild
 * schiebt den sichtbaren Ausschnitt trotzdem bewusst leicht nach oben, damit
 * die Schildkante nicht abgeschnitten wird – siehe `MenuGroup.tsx` für den
 * deutlich engeren Mobile-Zuschnitt derselben Bilder mit eigener Position.
 *
 * Nur das erste Bild ist `priority` – die übrigen laden regulär lazy, sind
 * mit 7 Bildern aber unkritisch fürs Ladeverhalten.
 */
export function CategoryMoodImage({ groups, activeId }: CategoryMoodImageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-image">
      {groups.map((group, index) => {
        const isActive = group.id === activeId;
        return (
          <m.div
            key={group.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: prefersReducedMotion ? 1 : isActive ? 1 : 1.02,
            }}
            transition={{ duration: prefersReducedMotion ? 0.15 : duration.categoryChange, ease: easing.entrance }}
            aria-hidden={!isActive}
          >
            <Image
              src={group.moodImage.src}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 38vw, 0vw"
              className="object-cover"
              style={{ objectPosition: group.moodImage.objectPosition ?? "center" }}
            />
          </m.div>
        );
      })}
    </div>
  );
}
