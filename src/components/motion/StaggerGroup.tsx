"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import {
  distance as distanceTokens,
  duration,
  easing,
  offsetFor,
  reducedDuration,
  stagger as staggerTokens,
  viewportDefaults,
  type RevealDirection,
} from "@/lib/motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** Versatz zwischen den Kindelementen in Sekunden. Default: stagger.content. */
  stagger?: number;
  /** Verzögerung vor dem ersten Kindelement, in Sekunden. */
  delay?: number;
}

/**
 * Steuert eine gestaffelte Einblendung. Die direkten Kinder müssen
 * `<StaggerItem>` sein – nur diese hören auf die Varianten des Containers.
 *
 * Der Container selbst animiert nichts und erzeugt daher keine eigene
 * Composite-Ebene.
 */
export function StaggerGroup({ children, className, stagger, delay = 0 }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefaults}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : (stagger ?? staggerTokens.content),
            delayChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
}

/** Einzelnes Element innerhalb einer `<StaggerGroup>`. */
export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = distanceTokens.md,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? {} : offsetFor(direction, distance);

  return (
    <m.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? reducedDuration : duration.base,
            ease: easing.entrance,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
