"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import {
  distance as distanceTokens,
  duration,
  easing,
  offsetFor,
  reducedDuration,
  viewportDefaults,
  type RevealDirection,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Verzögerung in Sekunden. */
  delay?: number;
  /** Richtung, aus der eingeblendet wird. Default: "up". */
  direction?: RevealDirection;
  /** Weglänge in Pixeln. Default: 24 (distance.md). */
  distance?: number;
}

/**
 * Blendet Inhalte beim Scrollen einmalig ein – animiert werden ausschließlich
 * `opacity` und `transform`, niemals Layout-Eigenschaften.
 *
 * Bei `prefers-reduced-motion: reduce` entfällt der Versatz vollständig und es
 * bleibt ein kurzes Fade. Ohne JavaScript sorgt die Regel `[data-reveal]` in
 * globals.css dafür, dass der Inhalt sichtbar ist.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = distanceTokens.md,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? {} : offsetFor(direction, distance);

  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportDefaults}
      transition={{
        duration: prefersReducedMotion ? reducedDuration : duration.base,
        ease: easing.entrance,
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
}
