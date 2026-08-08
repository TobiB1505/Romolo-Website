"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Container } from "@/components/Container";
import { easing } from "@/lib/motion";
import { heroImage } from "@/lib/data/gallery";
import { homeContent, restaurant } from "@/lib/data/restaurant";
import styles from "./HeroCinematic.module.css";

type EntranceState = "closed" | "opening" | "open";

const ENTRANCE_STORAGE_KEY = "romolo-entrance-seen";
const DOOR_DURATION_MS = 1650;

export function HeroCinematic() {
  const prefersReducedMotion = useReducedMotion();
  const [entranceState, setEntranceState] = useState<EntranceState>("closed");
  const [skipEntranceAnimation, setSkipEntranceAnimation] = useState(false);

  const isRevealed = entranceState !== "closed";
  const isOpen = entranceState === "open";
  const shouldAnimateEntrance = !prefersReducedMotion && !skipEntranceAnimation;

  const enterRestaurant = useCallback(() => {
    if (entranceState !== "closed") return;

    try {
      window.sessionStorage.setItem(ENTRANCE_STORAGE_KEY, "true");
    } catch {
      // Session Storage kann in restriktiven Browsermodi deaktiviert sein.
      // Die Inszenierung funktioniert dann weiterhin, nur ohne Erinnerung.
    }

    if (prefersReducedMotion) {
      setEntranceState("open");
      return;
    }

    setEntranceState("opening");
  }, [entranceState, prefersReducedMotion]);

  useEffect(() => {
    let hasSeenEntrance = false;
    try {
      hasSeenEntrance = window.sessionStorage.getItem(ENTRANCE_STORAGE_KEY) === "true";
    } catch {
      // Siehe Kommentar in enterRestaurant().
    }

    if (!hasSeenEntrance && !prefersReducedMotion) return;

    // Nach dem ersten Paint umschalten: Server- und Hydration-Markup bleiben
    // identisch, trotzdem erscheint die Tür bei Folgebesuchen nicht erneut.
    const frame = window.requestAnimationFrame(() => {
      setSkipEntranceAnimation(true);
      setEntranceState("open");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (entranceState !== "opening") return;
    const timer = window.setTimeout(() => setEntranceState("open"), DOOR_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [entranceState]);

  useEffect(() => {
    if (entranceState === "open") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY <= 8) return;
      event.preventDefault();
      enterRestaurant();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "PageDown", "Enter", " ", "Escape"].includes(event.key)) return;
      event.preventDefault();
      enterRestaurant();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [entranceState, enterRestaurant]);

  return (
    <>
      <section className={`${styles.hero} relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-deep text-cream`}>
        <div className="absolute inset-0">
          <m.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: isRevealed ? 1.015 : 1.065 }}
            transition={{ duration: shouldAnimateEntrance ? 2.4 : 0, ease: easing.entrance }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "45% 58%" }}
            />
          </m.div>
        </div>

        <div className={styles.ambientGlow} aria-hidden />
        <div className={styles.vignette} aria-hidden />
        <div className={styles.grain} aria-hidden />

        <Container size="wide" className="relative z-10 pb-14 pt-32 sm:pb-16 lg:pb-12">
          <m.div
            data-portal-content
            className="max-w-3xl"
            initial={false}
            animate={{
              opacity: isRevealed ? 1 : 0,
              y: isRevealed ? 0 : 22,
              filter: isRevealed ? "blur(0px)" : "blur(8px)",
            }}
            transition={{
              duration: shouldAnimateEntrance ? 1.05 : 0,
              delay: shouldAnimateEntrance ? 0.72 : 0,
              ease: easing.entrance,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="eyebrow text-gold">Una sera italiana</span>
              <span className="h-px w-12 bg-gold/50" aria-hidden />
            </div>

            <h1
              aria-label={`${homeContent.heroHeadline} – ${restaurant.name}`}
              className="mt-5 font-display leading-[0.86] tracking-[-0.04em]"
            >
              <span className="block text-[clamp(4.1rem,13vw,10rem)]">{homeContent.heroHeadline}</span>
              <span className="ml-[0.08em] mt-2 block text-[clamp(2.2rem,6vw,5rem)] font-normal italic text-cream/88">
                {homeContent.heroBrandLine}
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-cream/78 sm:text-lg">
              {homeContent.heroSubline} Mitten am Stadtplatz, mit offenen Türen und einem Tisch für Sie.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/speisekarte" className={`${styles.primaryLink} group`}>
                Speisekarte entdecken
                <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/kontakt" className={styles.textLink}>
                Tisch reservieren
              </Link>
            </div>
          </m.div>

          <m.div
            className={`${styles.heroMeta} mt-14`}
            initial={false}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            transition={{ duration: shouldAnimateEntrance ? 0.8 : 0, delay: shouldAnimateEntrance ? 1.15 : 0 }}
          >
            <span>{restaurant.street}</span>
            <span>{restaurant.city}</span>
            <span>Ristorante · Cucina italiana</span>
          </m.div>
        </Container>

        <m.div
          className={styles.scrollCue}
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -8 }}
          transition={{ duration: shouldAnimateEntrance ? 0.6 : 0, delay: shouldAnimateEntrance ? 0.2 : 0 }}
        >
          <span>Entdecken</span>
          <ArrowDown size={16} aria-hidden />
        </m.div>

        <div
          data-door-intro
          className={`${styles.doorStage} ${isRevealed ? styles.doorStageOpen : ""}`}
          aria-hidden={isRevealed}
          style={{ transitionDelay: skipEntranceAnimation ? "0s" : undefined }}
        >
          <m.div
            className={`${styles.doorLeaf} ${styles.doorLeft}`}
            initial={false}
            animate={
              isRevealed
                ? { rotateY: shouldAnimateEntrance ? 104 : 0, x: shouldAnimateEntrance ? "-6%" : "-100%" }
                : { rotateY: 0, x: "0%" }
            }
            transition={{ duration: shouldAnimateEntrance ? 1.55 : 0, ease: [0.76, 0, 0.24, 1] }}
          >
            <DoorDetails side="left" />
          </m.div>

          <m.div
            className={`${styles.doorLeaf} ${styles.doorRight}`}
            initial={false}
            animate={
              isRevealed
                ? { rotateY: shouldAnimateEntrance ? -104 : 0, x: shouldAnimateEntrance ? "6%" : "100%" }
                : { rotateY: 0, x: "0%" }
            }
            transition={{ duration: shouldAnimateEntrance ? 1.55 : 0, ease: [0.76, 0, 0.24, 1] }}
          >
            <DoorDetails side="right" />
          </m.div>

          <m.div
            className={styles.lightSeam}
            initial={false}
            animate={{ opacity: isRevealed ? [0.75, 1, 0] : 0.68, scaleX: isRevealed ? [1, 12, 30] : 1 }}
            transition={{ duration: shouldAnimateEntrance ? 1.05 : 0, ease: easing.entrance }}
          />

          <m.div
            className={styles.doorInvitation}
            initial={false}
            animate={{ opacity: isRevealed ? 0 : 1, scale: isRevealed ? 0.96 : 1 }}
            transition={{ duration: shouldAnimateEntrance ? 0.35 : 0, ease: easing.exit }}
          >
            <p className="eyebrow text-gold">Miesbach · Stadtplatz 12</p>
            <div className={styles.plaque}>
              <span>Ristorante</span>
              <strong>da Romolo</strong>
              <small>Cucina italiana</small>
            </div>
            <button type="button" onClick={enterRestaurant} className={styles.enterButton}>
              <span>Eintreten</span>
              <ArrowRight size={16} aria-hidden />
            </button>
            <p className={styles.gestureHint}>Klicken oder scrollen, um die Tür zu öffnen</p>
          </m.div>

          <button type="button" onClick={enterRestaurant} className={styles.skipButton}>
            Intro überspringen
          </button>
        </div>
      </section>

      <div data-hero-sentinel aria-hidden="true" className="h-px w-full" />
    </>
  );
}

function DoorDetails({ side }: { side: "left" | "right" }) {
  return (
    <>
      <span className={`${styles.doorMoulding} ${styles.doorMouldingTop}`} aria-hidden />
      <span className={`${styles.doorMoulding} ${styles.doorMouldingBottom}`} aria-hidden />
      <span className={`${styles.doorHandle} ${side === "left" ? styles.handleLeft : styles.handleRight}`} aria-hidden>
        <span />
      </span>
    </>
  );
}
