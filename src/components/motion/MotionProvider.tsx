"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";

/**
 * Lädt das Animations-Feature-Set einmalig für die gesamte Anwendung.
 *
 * `domAnimation` deckt Transform-, Opacity- und Gesten-Animationen ab und ist
 * deutlich kleiner als das Vollpaket (kein Layout-Projection-Code).
 * `strict` erzwingt die Nutzung von `m.*` statt `motion.*` – ein versehentlicher
 * Voll-Import würde damit sofort auffallen statt still das Bundle aufzublähen.
 *
 * Wichtig: `children` wird als Slot durchgereicht. Server Components, die hier
 * hineingerendert werden, bleiben Server Components.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
