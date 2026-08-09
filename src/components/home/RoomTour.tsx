"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { RoomTourStop } from "@/lib/types";
import styles from "./HomeEditorial.module.css";

/**
 * Rundgang durch die Räume: derselbe native Scroll-Snap-Ansatz wie
 * CucinaDishStrip (kein JS-Carousel), aber als Story-artige Sequenz statt
 * Fotoreihe – ein Raum pro Bildschirm, mit Namen und kurzer Beschreibung
 * direkt im Bild. Die Punkte/Pfeile spiegeln nur die Scrollposition,
 * sie steuern sie nicht – Wischen bleibt die primäre Bedienung.
 */
export function RoomTour({ stops }: { stops: RoomTourStop[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const index = stopRefs.current.findIndex((el) => el === mostVisible.target);
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: [0.6] },
    );

    stopRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [stops.length]);

  function scrollToIndex(index: number) {
    const clamped = Math.max(0, Math.min(stops.length - 1, index));
    stopRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className={styles.roomTour}>
      <div ref={trackRef} className={`${styles.roomTourTrack} no-scrollbar`}>
        {stops.map((stop, index) => (
          <figure
            key={stop.id}
            ref={(el) => {
              stopRefs.current[index] = el;
            }}
            className={`${styles.roomTourStop} overflow-hidden`}
          >
            <Image
              src={stop.image.src}
              alt={stop.image.alt}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 52vw, 82vw"
              className={styles.editorialImage}
              priority={index === 0}
            />
            <span className={styles.roomTourShade} aria-hidden />
            <figcaption className={styles.roomTourCaption}>
              <span className={styles.roomTourCount}>
                {stop.number} / {String(stops.length).padStart(2, "0")}
              </span>
              <span className={styles.roomTourName}>{stop.name}</span>
              <span className={styles.roomTourDesc}>{stop.description}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.roomTourControls}>
        <div className={styles.roomTourDots}>
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`${styles.roomTourDot} ${index === activeIndex ? styles.roomTourDotActive : ""}`}
              aria-label={`Zu „${stop.name}“ springen`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>

        <div className={styles.roomTourNav}>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Vorheriger Raum"
          >
            <ArrowLeft size={17} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === stops.length - 1}
            aria-label="Nächster Raum"
          >
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
