import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";
import styles from "./HomeEditorial.module.css";

const atmosphereImages = [
  { image: findGalleryImage("exterior-1"), number: "01", label: "Il giardino" },
  { image: findGalleryImage("interior-3"), number: "02", label: "La cantina" },
  { image: findGalleryImage("interior-5"), number: "03", label: "La finestra" },
];

export function AtmosphereStrip() {
  return (
    <section className={`${styles.atmosphere} overflow-hidden bg-ink-deep py-section text-cream`} aria-labelledby="atmosfera-heading">
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
            <p className="max-w-xs text-sm leading-relaxed text-cream/48">Drei Räume, viele Abende – und immer ein Platz, an dem die Zeit etwas langsamer vergeht.</p>
          </Reveal>
        </div>
      </Container>

      <div className={`${styles.atmosphereScroller} no-scrollbar mt-14 overflow-x-auto pb-4`}>
        <ul className={styles.atmosphereRail}>
          {atmosphereImages.map(({ image, number, label }, index) => (
            <li key={image.src} className={index === 1 ? styles.atmosphereCardWide : styles.atmosphereCard}>
              <div className={styles.atmosphereImageWrap}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={index === 1 ? "(min-width: 1024px) 45vw, 82vw" : "(min-width: 1024px) 31vw, 72vw"}
                  className={styles.editorialImage}
                />
              </div>
              <div className={styles.atmosphereCaption}>
                <span>{number}</span><i /><strong>{label}</strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
