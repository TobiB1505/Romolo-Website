import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/lib/data/restaurant";
import styles from "./HomeEditorial.module.css";

const ribbonWords = ["Benvenuti", "Cucina italiana", "Famiglia", "Miesbach", "Dal cuore"];

export function PhilosophySection() {
  return (
    <section className={`${styles.philosophy} overflow-hidden bg-cream`}>
      <div className={styles.arrivalRibbon} aria-hidden>
        <div className={styles.arrivalTrack}>
          {[...ribbonWords, ...ribbonWords].map((word, index) => (
            <span key={`${word}-${index}`}>
              {word}<i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <Container size="wide" className="relative py-section">
        <span className={styles.manifestoWatermark} aria-hidden>Fatto a mano</span>

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-2">
            <div className={styles.sectionIndex}>
              <span>02</span>
              <i />
              <span>{homeContent.philosophyEyebrow}</span>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <p className={styles.manifesto}>{homeContent.philosophyStatement}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft lg:ml-auto lg:max-w-xl">
                {homeContent.philosophySupport}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="hidden lg:col-span-2 lg:block">
            <div className={styles.qualityMark} aria-hidden>
              <span>Da Romolo</span>
              <strong>R</strong>
              <small>Miesbach · Italia</small>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className={styles.weeklyPanel}>
            <div>
              <span className="eyebrow text-gold">{homeContent.weeklyMenuEyebrow}</span>
              <p className="mt-3 max-w-xl text-cream/68">{homeContent.weeklyMenuNote}</p>
            </div>
            <Link href="/speisekarte" className={styles.lightArrowLink}>
              Aktuelle Karte <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
