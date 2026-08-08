"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Container } from "@/components/Container";
import { easing } from "@/lib/motion";
import styles from "./MenuExperience.module.css";

const heroImage = {
  src: "/images/categories/pasta.png",
  alt: "Hausgemachte Pasta vor einer italienischen Kreidetafel",
};

export function MenuHero() {
  const prefersReducedMotion = useReducedMotion();
  const transition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 0.9,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easing.entrance,
  });

  return (
    <section className={styles.menuHero}>
      <m.div
        className={styles.menuHeroImage}
        initial={{ scale: prefersReducedMotion ? 1 : 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 2.2, ease: easing.entrance }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 68%" }}
        />
      </m.div>

      <div className={styles.menuHeroShade} aria-hidden />
      <div className={styles.menuGrain} aria-hidden />

      <Container size="wide" className={styles.menuHeroInner}>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition(0.2)} className={styles.heroKicker}>
          <span>Ristorante da Romolo</span>
          <i />
          <span>Miesbach</span>
        </m.div>

        <h1 className={styles.menuHeroTitle}>
          <span className={styles.titleLine}>
            <m.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={transition(0.35)}>La</m.span>
          </span>
          <span className={`${styles.titleLine} ${styles.titleLineItalic}`}>
            <m.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={transition(0.5)}>Carta</m.span>
          </span>
        </h1>

        <m.div className={styles.heroStatement} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={transition(0.78)}>
          <span className={styles.heroChapter}>Sette capitoli</span>
          <p>Von Antipasti bis Vino – eine Reise durch unsere italienische Küche.</p>
        </m.div>

        <m.div className={styles.heroScroll} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition(1.05)}>
          <span>Menü entdecken</span>
          <ArrowDown size={15} aria-hidden />
        </m.div>
      </Container>
    </section>
  );
}
