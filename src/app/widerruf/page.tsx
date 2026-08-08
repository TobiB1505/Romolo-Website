import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent, restaurant } from "@/lib/data/restaurant";
import styles from "../LegalPages.module.css";

export const metadata: Metadata = { title: "Widerrufsrecht" };

export default function WiderrufPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Widerrufsrecht"
        eyebrow="Rechtliches"
        number="09"
        subtitle="Informationen zur unverbindlichen Reservierungsanfrage über diese Website."
      />

      <Container size="wide" className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <p className={styles.asideLabel}>Dokument 03</p>
            <p className={styles.asideTitle}>Widerruf</p>
            <p className={styles.asideMeta}>Hinweise zur Reservierungsanfrage und zu möglichen künftigen Online-Angeboten.</p>
          </div>
        </aside>

        <article className={styles.article}>
          <p className={styles.lead}>Eine Reservierungsanfrage soll vor allem eines sein: unkompliziert und persönlich.</p>
          <p className={styles.notice}>{legalContent.widerruf.note}</p>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>01</span>
            <div>
              <h2>Aktuelle Reservierungsanfragen</h2>
              <p>Die über das Kontaktformular gestellte Reservierungsanfrage ist unverbindlich und stellt keinen entgeltlichen Vertragsschluss dar – ein gesetzliches Widerrufsrecht nach Fernabsatzrecht ist hierfür daher nicht einschlägig.</p>
            </div>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>02</span>
            <div>
              <h2>Künftige Online-Angebote</h2>
              <p>Sollten künftig entgeltliche Online-Bestellungen, etwa Vorbestellungen mit Zahlung, angeboten werden, ist diese Seite um ein rechtsgültiges Widerrufsformular zu ergänzen.</p>
            </div>
          </section>

          <div className={styles.contactCard}>
            <span>Persönlich für Sie da</span>
            <h2>Fragen zu Ihrer Reservierung?</h2>
            <p>Schreiben Sie uns an <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a> oder rufen Sie uns unter <a href={restaurant.phoneHref}>{restaurant.phone}</a> an.</p>
          </div>
        </article>
      </Container>
    </div>
  );
}
