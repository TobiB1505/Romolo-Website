import { ArrowDown } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./InteriorPageHero.module.css";

interface InteriorPageHeroProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  number: string;
}

export function InteriorPageHero({ title, subtitle, eyebrow, number }: InteriorPageHeroProps) {
  return (
    <>
      <section className={`${styles.hero} relative isolate flex items-end overflow-hidden text-cream`}>
        <div className={styles.glow} aria-hidden />
        <span className={styles.monogram} aria-hidden>{title.charAt(0)}</span>
        <div className={styles.grain} aria-hidden />

        <Container size="wide" className="relative z-10 pb-12 pt-32 lg:pb-16">
          <Reveal>
            <div className={styles.index}>
              <span>{number}</span><i /><span>{eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>{title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.subtitle}>{subtitle}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className={styles.meta}>
              <span>Ristorante da Romolo</span>
              <span>Miesbach · Stadtplatz 12</span>
            </div>
          </Reveal>
        </Container>

        <div className={styles.scrollCue} aria-hidden>
          <span>Weiter</span><ArrowDown size={15} />
        </div>
      </section>
      <div data-hero-sentinel aria-hidden="true" className="h-px w-full" />
    </>
  );
}
