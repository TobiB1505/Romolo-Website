import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { googleReviews } from "@/lib/data/googleReviews";
import styles from "./GoogleReviewsSection.module.css";

function StarRow({ label }: { label: string }) {
  return (
    <div className={styles.stars} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={17} strokeWidth={1.7} fill="currentColor" aria-hidden />
      ))}
    </div>
  );
}

export function GoogleReviewsSection() {
  return (
    <section
      id="bewertungen"
      data-home-section
      className={`${styles.reviews} scroll-anchor`}
      aria-labelledby="bewertungen-heading"
    >
      <div className={styles.watermark} aria-hidden>
        4,6
      </div>

      <Container size="wide" className={styles.inner}>
        <Reveal>
          <div className={styles.sectionIndex}>
            <span>06</span>
            <i />
            <span>La voce degli ospiti</span>
          </div>
        </Reveal>

        <div className={styles.headingRow}>
          <Reveal delay={0.05}>
            <p className={styles.eyebrow}>Google Bewertungen</p>
            <h2 id="bewertungen-heading" className={styles.title}>
              Was unsere Gäste
              <br />
              <em>mitnehmen.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.11} className={styles.introWrap}>
            <p className={styles.intro}>
              Echte Stimmen von Menschen, die bei uns gegessen, gelacht und den Abend ein wenig länger gemacht haben.
            </p>
          </Reveal>
        </div>

        <div className={styles.reviewsLayout}>
          <Reveal delay={0.08} className={styles.scorePanel}>
            <div className={styles.googleLabel}>
              <span className={styles.googleMark} aria-hidden>G</span>
              <span>Google</span>
            </div>

            <div className={styles.scoreBlock}>
              <strong className={styles.score}>{googleReviews.rating}</strong>
              <span className={styles.scoreScale}>von 5</span>
            </div>
            <StarRow label={`${googleReviews.rating} von 5 Sternen`} />
            <p className={styles.reviewCount}>
              Aus {googleReviews.count} Google-Bewertungen
              <span>Stand {googleReviews.verifiedAt}</span>
            </p>

            <a
              href={googleReviews.profileUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.profileLink}
            >
              Alle Bewertungen ansehen
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </Reveal>

          <div className={styles.quoteGrid}>
            {googleReviews.excerpts.map((review, index) => (
              <Reveal key={review.author} delay={0.12 + index * 0.06} className={styles.quoteReveal}>
                <article className={styles.quoteCard}>
                  <div className={styles.quoteTopline}>
                    <span className={styles.quoteNumber}>0{index + 1}</span>
                    <StarRow label="5 von 5 Sternen" />
                  </div>
                  <blockquote>„{review.text}“</blockquote>
                  <footer>
                    <strong>{review.author}</strong>
                    <span>Google-Rezension</span>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
