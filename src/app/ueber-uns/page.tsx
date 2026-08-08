import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { InteriorPageHero } from "@/components/InteriorPageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { aboutContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";
import styles from "../InteriorPages.module.css";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Familiengeführtes italienisches Restaurant am Stadtplatz in Miesbach – gute Küche, herzliche Gastfreundschaft.",
};

const heroImage = findGalleryImage("interior-4");
const mainImage = findGalleryImage("interior-6");
const sideImage = findGalleryImage("exterior-1");

const values = [
  { number: "01", title: "Famiglia", text: "Persönliche Aufmerksamkeit und ein herzliches Miteinander – vom ersten Benvenuti bis zum letzten Espresso." },
  { number: "02", title: "Cucina", text: "Italienische Klassiker, sorgfältig zubereitet und mit einer Karte, die sich an den Jahreszeiten orientiert." },
  { number: "03", title: "Ospitalità", text: "Ein Ort, an dem Freunde und Familie zusammenkommen, bleiben und gerne wiederkehren." },
];

export default function UeberUnsPage() {
  return (
    <div className={styles.page}>
      <InteriorPageHero
        title="La famiglia"
        eyebrow="Über uns"
        number="05"
        subtitle="Ein familiengeführtes Restaurant, entstanden aus der Liebe zu gutem Essen und guter Gesellschaft."
        image={heroImage}
      />

      <Container size="wide" className="py-section">
        <div className={styles.introGrid}>
          <Reveal className={styles.introLabel}>La nostra storia</Reveal>
          <Reveal delay={0.08} className={styles.introTitle}>
            Wir machen das Restaurant, in dem wir selbst gern essen würden.
          </Reveal>
          <Reveal delay={0.14} className={styles.introCopy}>
            {aboutContent.paragraphs[0]}
          </Reveal>
        </div>

        <div className={styles.aboutComposition}>
          <ImageReveal className={`${styles.aboutMainImage} relative`}>
            <Image src={mainImage.src} alt={mainImage.alt} fill sizes="(min-width: 1024px) 68vw, 92vw" className={styles.image} />
          </ImageReveal>
          <ImageReveal delay={0.12} className={`${styles.aboutSideImage} relative`}>
            <Image src={sideImage.src} alt={sideImage.alt} fill sizes="(min-width: 1024px) 35vw, 54vw" className={styles.image} />
          </ImageReveal>
          <Reveal delay={0.2} className={styles.aboutCard}>
            <span aria-hidden>“</span>
            <p>{aboutContent.paragraphs[2]}</p>
          </Reveal>
        </div>

        <div className={styles.values}>
          {values.map((value, index) => (
            <Reveal key={value.number} delay={index * 0.08} className={styles.value}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={`${styles.aboutCta} mt-section-sm`}>
            <h2>Wir freuen uns<br />auf Ihren Besuch.</h2>
            <Link href="/kontakt">Tisch reservieren <ArrowRight size={17} aria-hidden /></Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
