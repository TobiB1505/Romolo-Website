import { Container } from "./Container";
import { Reveal } from "./motion/Reveal";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  number?: string;
}

export function PageHero({ title, subtitle, eyebrow = "Information", number = "00" }: PageHeroProps) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden />
        <div className={styles.monogram} aria-hidden>R</div>
        <Container size="wide" className={styles.inner}>
          <Reveal>
            <div className={styles.index}>
              <span>{number}</span><i /><span>{eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.16}>
              <p className={styles.subtitle}>{subtitle}</p>
            </Reveal>
          )}
        </Container>
      </section>
      <div data-hero-sentinel aria-hidden="true" className="h-px w-full" />
    </>
  );
}
