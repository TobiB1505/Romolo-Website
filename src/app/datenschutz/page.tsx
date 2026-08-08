import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent, restaurant } from "@/lib/data/restaurant";
import styles from "../LegalPages.module.css";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

const sections = [
  {
    title: "Verantwortlicher",
    content: <p>{legalContent.impressum.company}, {restaurant.street}, {restaurant.zip} {restaurant.city}, E-Mail: <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></p>,
  },
  {
    title: "Hosting & Server-Logfiles",
    content: <p>Diese Website wird bei einem externen Hosting-Anbieter betrieben (Angabe des konkreten Anbieters folgt hier). Beim Aufruf der Website erfasst der Hosting-Anbieter automatisch technische Zugriffsdaten (Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und Browser-Informationen. Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem sicheren und funktionsfähigen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).</p>,
  },
  {
    title: "Inhalte & Bilder (Sanity.io)",
    content: <p>Texte, Speisekarte und Bilder dieser Website werden über den Content-Management-Dienst Sanity.io verwaltet und über dessen Content Delivery Network (CDN) ausgeliefert. Dabei kann es zu einer Datenübertragung an Server von Sanity.io kommen. Es handelt sich um rein technische Inhalte, keine personenbezogenen Daten von Websitebesuchern.</p>,
  },
  {
    title: "Reservierungsformular",
    content: <p>Wenn Sie über das Reservierungsformular eine Anfrage stellen, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, ggf. Telefonnummer, Datum, Uhrzeit, Personenzahl, Nachricht), um Ihre Reservierungsanfrage zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt technisch über den E-Mail-Dienstleister Resend an unser Postfach ({restaurant.email}). Ihre Daten werden nur für die Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>,
  },
  {
    title: "Google Maps",
    content: <p>Auf unserer Kontaktseite bieten wir eine Anfahrtskarte von Google Maps an. Diese wird erst nach Ihrer aktiven Zustimmung (Klick auf „Karte laden & anzeigen“) geladen. Erst dann wird eine Verbindung zu Servern der Google Ireland Limited hergestellt und es können Daten (z. B. Ihre IP-Adresse) an Google übertragen werden. Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">Google-Datenschutzerklärung</a>.</p>,
  },
  {
    title: "Keine Analyse-/Tracking-Tools",
    content: <p>Diese Website verwendet aktuell keine Web-Analyse- oder Tracking-Dienste (z. B. Google Analytics). Es werden ausschließlich technisch notwendige Daten verarbeitet.</p>,
  },
  {
    title: "Ihre Rechte",
    content: <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Widerspruchsrecht gegen die Verarbeitung und ein Recht auf Datenübertragbarkeit. Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Wenden Sie sich hierzu gerne an: <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></p>,
  },
];

export default function DatenschutzPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Datenschutz"
        eyebrow="Rechtliches"
        number="08"
        subtitle="Welche Daten verarbeitet werden, zu welchem Zweck und welche Rechte Sie dabei haben."
      />

      <Container size="wide" className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <p className={styles.asideLabel}>Dokument 02</p>
            <p className={styles.asideTitle}>Datenschutzerklärung</p>
            <p className={styles.asideMeta}>Informationen zur Verarbeitung personenbezogener Daten.</p>
          </div>
        </aside>

        <article className={styles.article}>
          <p className={styles.lead}>Ihre Privatsphäre verdient dieselbe Sorgfalt wie alles, was wir unseren Gästen servieren.</p>
          <p className={styles.notice}>{legalContent.datenschutz.note}</p>

          {sections.map((section, index) => (
            <section className={styles.section} key={section.title}>
              <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </Container>
    </div>
  );
}
