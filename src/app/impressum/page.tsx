import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent } from "@/lib/data/restaurant";
import styles from "../LegalPages.module.css";

export const metadata: Metadata = { title: "Impressum" };

const { impressum } = legalContent;

export default function ImpressumPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Impressum"
        eyebrow="Rechtliches"
        number="07"
        subtitle="Verantwortung, Kontakt und alle gesetzlich vorgeschriebenen Angaben auf einen Blick."
      />

      <Container size="wide" className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <p className={styles.asideLabel}>Dokument 01</p>
            <p className={styles.asideTitle}>Anbieterkennzeichnung</p>
            <p className={styles.asideMeta}>Angaben gemäß § 5 TMG<br />Ristorante Da Romolo GmbH</p>
          </div>
        </aside>

        <article className={styles.article}>
          <p className={styles.lead}>Transparenz gehört für uns genauso zur Gastfreundschaft wie ein herzliches Benvenuti.</p>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>01</span>
            <div>
              <h2>Unternehmen</h2>
              <address>
                {impressum.company}<br />
                {impressum.street}<br />
                {impressum.zip} {impressum.city}
              </address>
              <p>
                Telefon: <a href={`tel:${impressum.phone.replace(/\s/g, "")}`}>{impressum.phone}</a><br />
                E-Mail: <a href={`mailto:${impressum.email}`}>{impressum.email}</a>
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>02</span>
            <div>
              <h2>Vertretung &amp; Register</h2>
              <h3>Vertreten durch</h3>
              <p>{impressum.representative}</p>
              <h3>Registereintrag</h3>
              <p>Eingetragen im Handelsregister.<br />Registergericht: {impressum.registerCourt}<br />Registernummer: {impressum.registerNumber}</p>
            </div>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>03</span>
            <div>
              <h2>Steuer &amp; Aufsicht</h2>
              <h3>Umsatzsteuer-ID</h3>
              <p>Umsatzsteuer-Identifikationsnummer nach § 27a Umsatzsteuergesetz: {impressum.vatId}</p>
              <h3>Aufsichtsbehörde</h3>
              <p>{impressum.supervisoryAuthority}</p>
            </div>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionNumber}>04</span>
            <div>
              <h2>Haftung &amp; Urheberrecht</h2>
              <h3>Haftungsausschluss</h3>
              <p>{impressum.liabilityNote}</p>
              <h3>Copyright-Hinweis</h3>
              <p>{impressum.copyrightNote}</p>
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
