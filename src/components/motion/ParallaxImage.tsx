"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";

const DESKTOP_QUERY = "(min-width: 1024px)";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  /** Bewegungsweg in Pixeln in jede Richtung. Default: 24. */
  strength?: number;
}

/**
 * Sehr dezenter Tiefeneffekt für große Bilder: Der Inhalt verschiebt sich
 * beim Scrollen um bis zu `strength` Pixel vertikal.
 *
 * Nur aktiv ab `lg` (1024px) und nur ohne `prefers-reduced-motion: reduce`.
 * Der Startwert ist immer "aus" (Server-Rendering und erster Client-Render
 * matchen exakt), die Aktivierung erfolgt erst nach der Geräteprüfung –
 * dadurch kein Hydration-Mismatch.
 */
export function ParallaxImage({ children, className, strength = 24 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setEnabled(query.matches && !prefersReducedMotion);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = enabled ? strength : 0;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={className}>
      {/* Kein `will-change`: Motion setzt `transform` bereits direkt und
          erzeugt damit die nötige Compositing-Ebene nur bei aktiver
          Animation, nicht dauerhaft. */}
      <m.div style={{ y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
