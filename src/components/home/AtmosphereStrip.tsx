import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { RoomTour } from "@/components/home/RoomTour";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/lib/data/restaurant";
import { roomTourStops } from "@/lib/data/rooms";
import styles from "./HomeEditorial.module.css";

export function AtmosphereStrip() {
  return (
    <section id="galleria" data-home-section className={`${styles.atmosphere} scroll-anchor overflow-hidden bg-ink-deep py-section text-cream`} aria-labelledby="atmosfera-heading">
      <div className={styles.atmosphereMarquee} aria-hidden>
        <span>Atmosfera — Una sera da Romolo — Atmosfera — Una sera da Romolo —</span>
      </div>

      <Container size="wide" className="relative">
        <Reveal>
          <div className={styles.sectionIndexLight}>
            <span>05</span><i /><span>{homeContent.atmosphereEyebrow}</span>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.08}>
            <h2 id="atmosfera-heading" className="max-w-4xl font-display text-[clamp(3.6rem,8vw,7.6rem)] leading-[0.88] tracking-[-0.04em]">
              {homeContent.atmosphereHeadline}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="max-w-xs text-sm leading-relaxed text-cream/48">Drei Räume, viele Abende – wischen Sie sich durch und finden Sie Ihren Lieblingsplatz.</p>
          </Reveal>
        </div>
      </Container>

      <Container size="wide" className={styles.homeGallery}>
        <Reveal delay={0.08}>
          <RoomTour stops={roomTourStops} />
        </Reveal>
        <Reveal delay={0.14}>
          <Link href="/galerie" className="mt-8 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream">
            Alle Eindrücke in der Galerie <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
