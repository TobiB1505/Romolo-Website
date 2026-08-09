"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import type { CucinaDish } from "@/components/home/CucinaDishStrip";
import { dishRotationIntervalMs, duration, easing } from "@/lib/motion";
import styles from "./HomeEditorial.module.css";

/** Slot-Klassen und Bildgrößen entsprechen der Collage-Geometrie in HomeEditorial.module.css. */
const slots = [
  { className: styles.cucinaImageMain, sizes: "35vw" },
  { className: styles.cucinaImageAccent, sizes: "20vw" },
  { className: styles.cucinaImageDetail, sizes: "19vw" },
];

/**
 * Desktop-Pendant zu CucinaDishStrip (siehe dort für die Mobile/Tablet-
 * Variante): die 3-Slot-Collage der Cucina-Sektion, durch die alle
 * Gerichte-Fotos langsam durchrotieren. Jeder Slot zeigt reihum die Fotos
 * an seiner Position (Slot i: Gericht i, i+3, i+6 …); pro Tick wechselt
 * genau ein Slot per Crossfade, sodass nie zwei Bilder gleichzeitig
 * springen und dasselbe Foto nie doppelt zu sehen ist.
 *
 * Die Rotation pausiert, solange die Collage außerhalb des Viewports ist
 * oder der Zeiger darüber steht. Bei reduzierter Bewegung rotiert nichts –
 * es bleibt die statische Dreier-Collage.
 */
export function CucinaRotatingGallery({ dishes, className }: { dishes: CucinaDish[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const nextSlotRef = useRef(0);
  const [phases, setPhases] = useState<number[]>(() => slots.map(() => 0));
  const inView = useInView(containerRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    const id = setInterval(() => {
      if (hoveredRef.current) return;
      const slot = nextSlotRef.current;
      nextSlotRef.current = (slot + 1) % slots.length;
      setPhases((prev) => prev.map((phase, index) => (index === slot ? phase + 1 : phase)));
    }, dishRotationIntervalMs);
    return () => clearInterval(id);
  }, [prefersReducedMotion, inView]);

  return (
    <div
      ref={containerRef}
      className={`${styles.cucinaGallery} ${className ?? ""}`}
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
    >
      {slots.map((slot, slotIndex) => {
        const slotDishes = dishes.filter((_, index) => index % slots.length === slotIndex);
        if (slotDishes.length === 0) return null;
        const activeIndex = phases[slotIndex] % slotDishes.length;

        return (
          <ImageReveal key={slotIndex} delay={slotIndex * 0.1} className={`${slot.className} overflow-hidden`}>
            {slotDishes.map((dish, index) => {
              const isActive = index === activeIndex;
              return (
                <m.div
                  key={dish.src}
                  className={styles.cucinaSlotLayer}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: prefersReducedMotion ? 1 : isActive ? 1 : 1.03,
                  }}
                  transition={{ duration: duration.dishRotation, ease: easing.entrance }}
                  aria-hidden={!isActive}
                >
                  <Image src={dish.src} alt={dish.alt} fill sizes={slot.sizes} className={styles.editorialImage} />
                  <span className={styles.imageCaption}>{dish.label}</span>
                </m.div>
              );
            })}
          </ImageReveal>
        );
      })}
    </div>
  );
}
