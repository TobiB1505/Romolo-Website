"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/Container";
import { useMenuView } from "@/components/menu/MenuViewProvider";
import { easing } from "@/lib/motion";
import styles from "./MenuExperience.module.css";

const heroImage = {
  src: "/images/categories/pasta.png",
  alt: "Hausgemachte Pasta vor einer italienischen Kreidetafel",
};

export function MenuHero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { view } = useMenuView();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coverRotate = useTransform(scrollYProgress, [0, 0.12, 0.82], [0, 0, -158]);
  const bookScale = useTransform(scrollYProgress, [0, 0.82], [1, 0.94]);
  const bookLift = useTransform(scrollYProgress, [0, 0.82], [0, -12]);

  return (
    <section ref={heroRef} className={styles.menuHero} data-hero-menu-view={view}>
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
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 68%" }}
        />
      </m.div>

      <div className={styles.menuHeroShade} aria-hidden />
      <div className={styles.menuGrain} aria-hidden />

      {view === "book" ? (
        <Container size="wide" className={styles.bookHeroInner}>
          <m.div
            className={styles.bookHeroCopy}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.35, ease: easing.entrance }}
          >
            <span>La nostra cucina</span>
            <p>Eine Speisekarte wie ein Abend bei Romolo: Seite für Seite, Gang für Gang.</p>
          </m.div>

          <div className={styles.bookStagePosition}>
            <m.div
              className={styles.bookStage}
              style={{ scale: prefersReducedMotion ? 1 : bookScale, y: prefersReducedMotion ? 0 : bookLift }}
            >
              <div className={styles.bookRightPage}>
                <Image
                  src={heroImage.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, 76vw"
                  className="object-cover"
                  style={{ objectPosition: "center 73%" }}
                />
                <div className={styles.bookPageShade} aria-hidden />
                <div className={styles.bookPageCopy}>
                  <span>Sette capitoli</span>
                  <strong>Buon appetito.</strong>
                  <small>Antipasti · Pasta · Pizza · Carne · Pesce · Dolci · Vino</small>
                </div>
              </div>

              <m.div
                className={styles.bookCover}
                style={{ rotateY: prefersReducedMotion ? -12 : coverRotate }}
              >
                <div className={styles.bookCoverFront}>
                  <span className={styles.bookCoverKicker}>Ristorante</span>
                  <h1>La <em>Carta</em></h1>
                  <i aria-hidden />
                  <small>Da Romolo · Miesbach</small>
                </div>
                <div className={styles.bookCoverBack}>
                  <span>Da Romolo</span>
                  <strong>Fatto con amore.</strong>
                  <small>Seit 2011</small>
                </div>
              </m.div>
            </m.div>
          </div>

          <m.div
            className={styles.bookScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 1 }}
          >
            <span>Scrollen zum Öffnen</span>
            <ArrowDown size={15} aria-hidden />
          </m.div>
        </Container>
      ) : (
        <EditorialHero prefersReducedMotion={Boolean(prefersReducedMotion)} />
      )}
    </section>
  );
}

function EditorialHero({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const transition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 0.9,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easing.entrance,
  });

  return (
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
  );
}
