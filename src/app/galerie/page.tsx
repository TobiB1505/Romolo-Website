import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { InteriorPageHero } from "@/components/InteriorPageHero";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { Reveal } from "@/components/motion/Reveal";
import { galleryImages } from "@/lib/data/gallery";
import styles from "../InteriorPages.module.css";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Impressionen aus dem Ristorante da Romolo in Miesbach: Gewölbekeller, Gastraum und Innenhof.",
};

export default function GaleriePage() {
  return (
    <div className={styles.page}>
      <InteriorPageHero
        title="Galleria"
        eyebrow="Räume & Momente"
        number="04"
        subtitle="Ein Abend bei Romolo lebt von den kleinen Augenblicken – warmes Licht, gedeckte Tische und Zeit füreinander."
      />

      <Container size="wide" className="py-section">
        <div className={styles.introGrid}>
          <Reveal className={styles.introLabel}>Uno sguardo dentro</Reveal>
          <Reveal delay={0.08} className={styles.introTitle}>
            Jeder Raum erzählt seine eigene Geschichte.
          </Reveal>
          <Reveal delay={0.14} className={styles.introCopy}>
            Vom hellen Gastraum unter historischen Gewölben bis zum begrünten Innenhof: Entdecken Sie die Atmosphäre, die einen Besuch bei uns besonders macht.
          </Reveal>
        </div>

        <div className="mt-section-sm">
          <GalleryExperience images={galleryImages} />
        </div>
      </Container>
    </div>
  );
}
