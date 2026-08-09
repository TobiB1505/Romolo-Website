import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { googleReviews } from "@/lib/data/googleReviews";
import styles from "./GoogleReviewsPanel.module.css";

function StarRow({ label }: { label: string }) {
  return (
    <div className={styles.stars} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={15} strokeWidth={1.7} fill="currentColor" aria-hidden />
      ))}
    </div>
  );
}

/**
 * Eigene, echte Vollbild-Sektion statt eingerahmter Karte innerhalb der
 * Philosophie-Sektion – wie jeder andere Abschnitt der Startseite auch.
 * Randlos dunkel, ohne Bordüre oder Schlagschatten ("keine SaaS-Card-Optik",
 * siehe globals.css), damit sie sich nicht wie ein aufgeklebtes Widget
 * anfühlt. Unten bewusst ohne eigenes Padding, damit sie direkt in die
 * folgende (ebenfalls dunkle) Cucina-Sektion übergeht statt zwei Lücken zu
 * addieren.
 */
export function GoogleReviewsPanel() {
  return (
    <section
      id="bewertungen"
      data-home-section
      className="scroll-anchor overflow-hidden bg-forest-dark pt-section text-cream"
      aria-labelledby="bewertungen-heading"
    >
      <Container size="wide" className={`relative ${styles.panel}`}>
        <Reveal>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>Google Bewertungen</span>
              <h2 id="bewertungen-heading">
                Von Herzen <em>empfohlen.</em>
              </h2>
            </div>
            <a href={googleReviews.profileUrl} target="_blank" rel="noreferrer" className={styles.profileLink}>
              Alle Bewertungen ansehen
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.content}>
            <div className={styles.scoreArea}>
              <div className={styles.googleLabel}>
                <span aria-hidden>G</span>
                Google
              </div>
              <div className={styles.scoreLine}>
                <strong>{googleReviews.rating}</strong>
                <small>von 5</small>
              </div>
              <StarRow label={`${googleReviews.rating} von 5 Sternen`} />
              <p>
                {googleReviews.count} Google-Bewertungen
                <span>Stand {googleReviews.verifiedAt}</span>
              </p>
            </div>

            <div className={styles.quotes}>
              {googleReviews.excerpts.map((review, index) => (
                <article key={review.author}>
                  <div className={styles.quoteMeta}>
                    <span>0{index + 1}</span>
                    <StarRow label="5 von 5 Sternen" />
                  </div>
                  <blockquote>„{review.text}“</blockquote>
                  <footer>
                    <strong>{review.author}</strong>
                    <span>Google-Rezension</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
