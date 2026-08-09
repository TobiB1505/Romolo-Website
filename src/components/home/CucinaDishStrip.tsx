"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./HomeEditorial.module.css";

export interface CucinaDish {
  src: string;
  alt: string;
  label: string;
}

/**
 * Horizontal swipebare Reihe aller Gerichte-Fotos. Bewusst kein
 * JS-Carousel – nur nativer Scroll mit Snap-Points, dieselbe Idee wie die
 * Kapitel-Chips der Speisekarte (`CategoryRail`) und die
 * Atmosfera-Galerie: Tastatur, Trackpad und Touch-Wischen funktionieren
 * ohne Zusatzlogik, und niemand wartet auf eine Automatik.
 *
 * Die Karten füllen ihre Breite nie ganz aus (siehe CSS) – das nächste
 * Bild lugt bewusst am Rand hervor, als Hinweis, dass mehr folgt.
 */
export function CucinaDishStrip({ dishes, className }: { dishes: CucinaDish[]; className?: string }) {
  return (
    <Reveal className={className}>
      <div className={`${styles.cucinaStrip} no-scrollbar`}>
        {dishes.map((dish) => (
          <div key={dish.src} className={`${styles.cucinaStripCard} overflow-hidden`}>
            <Image src={dish.src} alt={dish.alt} fill sizes="(min-width: 1024px) 30vw, 76vw" className={styles.editorialImage} />
            <span className={styles.imageCaption}>{dish.label}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
