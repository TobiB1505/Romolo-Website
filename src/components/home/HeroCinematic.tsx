"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { Container } from "@/components/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { duration, easing, heroImageScale, heroSequence } from "@/lib/motion";
import { heroImage } from "@/lib/data/gallery";
import { homeContent, restaurant } from "@/lib/data/restaurant";

/** Baut aus einem Sequenz-Zeitpunkt eine Motion-Transition mit dem
 * Standard-Entrance-Easing. Reduzierte Bewegung entfernt die Verzögerung
 * vollständig – die Reihenfolge bleibt über die Lesereihenfolge im DOM
 * erkennbar, nur ohne die zeitliche Inszenierung. */
function entranceAt(seconds: number, prefersReducedMotion: boolean) {
  return {
    duration: duration.base,
    ease: easing.entrance,
    delay: prefersReducedMotion ? 0 : seconds,
  };
}

export function HeroCinematic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-deep text-cream lg:items-center">
        <ParallaxImage className="absolute inset-0" strength={22}>
          {/* Einziger animierter Wert auf dem LCP-Bild: `scale`. Kein Opacity-
              Fade, damit der größte contentful Paint nicht verzögert wird. */}
          <m.div
            className="absolute inset-0"
            initial={{ scale: prefersReducedMotion ? 1 : heroImageScale }}
            animate={{ scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : duration.hero, ease: easing.entrance }}
          >
            {/*
              Objekt-Position bewusst gesetzt statt Default-"center": Die
              Quelle ist nahezu quadratisch (1198×1360), der Container reicht
              aber von sehr schmal-hoch (Mobile) bis sehr breit-flach
              (Desktop). Bei einem derart extremen Bereich beschneidet
              `cover` auf Mobile die Breite (X-Wert entscheidet) und am
              Desktop die Höhe (Y-Wert entscheidet) – eine einzige,
              zweidimensionale Position kann hier beide Fälle sinnvoll
              bedienen, ohne getrennte Bild-Assets für Mobile/Desktop zu
              brauchen: 45% X hält mehr vom Fenster/Tisch links im
              Mobile-Ausschnitt, 58% Y priorisiert den Tisch gegenüber der
              Deckenwölbung im breiten Desktop-Ausschnitt.
            */}
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "45% 58%" }}
            />
          </m.div>
        </ParallaxImage>

        {/* Statischer Verlauf für Textkontrast – wird nicht animiert. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/45 to-ink-deep/10" />

        <Container size="wide" className="relative z-10 pb-16 pt-28 lg:pb-0 lg:pt-0">
          <div className="max-w-xl">
            <m.span
              className="eyebrow block text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={entranceAt(heroSequence.eyebrow, Boolean(prefersReducedMotion))}
            >
              {homeContent.heroEyebrow}
            </m.span>

            {/* aria-label trägt den vollständigen Restaurantnamen, damit er
                für Screenreader eindeutig bleibt, auch wenn die Headline
                selbst nur "Benvenuti" zeigt. */}
            <h1
              aria-label={`${homeContent.heroHeadline} – ${restaurant.name}`}
              className="mt-4 font-display leading-[0.95]"
            >
              <span className="block overflow-hidden text-display-xl">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={entranceAt(heroSequence.headline, Boolean(prefersReducedMotion))}
                >
                  {homeContent.heroHeadline}
                </m.span>
              </span>
              <span className="mt-1 block overflow-hidden text-display-md italic text-cream/90">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={entranceAt(heroSequence.brandLine, Boolean(prefersReducedMotion))}
                >
                  {homeContent.heroBrandLine}
                </m.span>
              </span>
            </h1>

            <m.p
              className="mt-6 max-w-sm text-lg text-cream/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={entranceAt(heroSequence.subline, Boolean(prefersReducedMotion))}
            >
              {homeContent.heroSubline}
            </m.p>

            <m.div
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={entranceAt(heroSequence.cta, Boolean(prefersReducedMotion))}
            >
              <Link href="/speisekarte" className="btn-primary px-7 py-3.5 text-base">
                Speisekarte entdecken
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-11 items-center text-sm font-medium text-cream/90 underline decoration-cream/40 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream"
              >
                Reservieren
              </Link>
            </m.div>
          </div>
        </Container>

        <m.div
          className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={entranceAt(heroSequence.scrollCue, Boolean(prefersReducedMotion))}
        >
          <span className="flex flex-col items-center gap-3 text-cream/70">
            <span className="eyebrow">Scroll</span>
            <span aria-hidden className="h-10 w-px bg-cream/40" />
          </span>
        </m.div>
      </section>

      {/* Markiert das Hero-Ende für die Header-Zustandserkennung
          (siehe Header.tsx, [data-hero-sentinel]). */}
      <div data-hero-sentinel aria-hidden="true" className="h-px w-full" />
    </>
  );
}
