import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { homeContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";
import styles from "./HomeEditorial.module.css";

const storyImage = findGalleryImage("interior-4");

export function StorySection() {
  return (
    <section className={`${styles.story} overflow-hidden bg-cream py-section`}>
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-3">
            <div className={styles.sectionIndex}>
              <span>04</span><i /><span>{homeContent.storyEyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8 lg:col-start-5">
            <h2 className={styles.storyTitle}>
              Ein Ort<br />zum <em>Ankommen.</em>
            </h2>
          </Reveal>
        </div>

        <div className={styles.storyComposition}>
          <ImageReveal className={`${styles.storyImage} relative overflow-hidden`}>
            <Image src={storyImage.src} alt={storyImage.alt} fill sizes="(min-width: 1280px) 78vw, 100vw" className={styles.editorialImage} />
            <span className={styles.storyImageLabel}>Una tavola per tutti</span>
          </ImageReveal>

          <Reveal delay={0.18} className={styles.storyCard}>
            <span className={styles.quoteMark} aria-hidden>“</span>
            <p>{homeContent.storyText}</p>
            <Link href="/ueber-uns" className={styles.darkArrowLink}>
              Unsere Geschichte <ArrowUpRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
