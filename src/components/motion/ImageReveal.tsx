"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { duration, easing, imageRevealScale, reducedDuration, viewportDefaults } from "@/lib/motion";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reveal-Variante für große Story-Bilder: Die Opazität liegt auf dem äußeren
 * Wrapper, das Bild selbst skaliert leicht herein (`imageRevealScale → 1`).
 * So bleibt das bereits geladene Bild jederzeit sichtbar scharf, statt aus
 * dem Nichts zu faden.
 *
 * `children` muss ein bereits positioniertes Element sein (z. B. `next/image`
 * mit `fill`) – diese Komponente steuert nur Opacity und Scale, keine Größe.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportDefaults}
      transition={{
        duration: prefersReducedMotion ? reducedDuration : duration.image,
        ease: easing.entrance,
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {/* `relative`, damit ein `next/image fill` in `children` seinen
          unmittelbaren, positionierten Elternknoten hier findet – nicht erst
          zwei Ebenen höher am äußeren Wrapper. */}
      <m.div
        className="relative h-full w-full"
        initial={{ scale: prefersReducedMotion ? 1 : imageRevealScale }}
        whileInView={{ scale: 1 }}
        viewport={viewportDefaults}
        transition={{
          duration: prefersReducedMotion ? reducedDuration : duration.image,
          ease: easing.entrance,
          delay: prefersReducedMotion ? 0 : delay,
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
