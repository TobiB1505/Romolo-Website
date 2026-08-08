import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent } from "@/lib/data/restaurant";
import { restaurant } from "@/lib/data/restaurant";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function DatenschutzPage() {
  return (
    <div>
      <PageHero title="Datenschutzerklärung" />
      <Container className="max-w-2xl space-y-8 py-16 text-sm leading-relaxed text-ink-soft">
        <p className="rounded-md bg-terracotta/10 p-4 text-terracotta-dark">{legalContent.datenschutz.note}</p>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">1. Verantwortlicher</h2>
          <p>
            {legalContent.impressum.company}, {restaurant.street}, {restaurant.zip} {restaurant.city}, E-Mail:{" "}
            {restaurant.email}
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">2. Hosting &amp; Server-Logfiles</h2>
          <p>
            Diese Website wird bei einem externen Hosting-Anbieter betrieben (Angabe des konkreten Anbieters folgt
            hier). Beim Aufruf der Website erfasst der Hosting-Anbieter automatisch technische Zugriffsdaten
            (Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und
            Browser-Informationen. Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem
            sicheren und funktionsfähigen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">3. Inhalte &amp; Bilder (Sanity.io)</h2>
          <p>
            Texte, Speisekarte und Bilder dieser Website werden über den Content-Management-Dienst Sanity.io
            verwaltet und über dessen Content Delivery Network (CDN) ausgeliefert. Dabei kann es zu einer
            Datenübertragung an Server von Sanity.io kommen. Es handelt sich um rein technische Inhalte, keine
            personenbezogenen Daten von Websitebesuchern.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">4. Reservierungsformular</h2>
          <p>
            Wenn Sie über das Reservierungsformular eine Anfrage stellen, verarbeiten wir die von Ihnen angegebenen
            Daten (Name, E-Mail-Adresse, ggf. Telefonnummer, Datum, Uhrzeit, Personenzahl, Nachricht), um Ihre
            Reservierungsanfrage zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt technisch über den
            E-Mail-Dienstleister Resend an unser Postfach ({restaurant.email}). Ihre Daten werden nur für die
            Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">5. Google Maps</h2>
          <p>
            Auf unserer Kontaktseite bieten wir eine Anfahrtskarte von Google Maps an. Diese wird erst nach Ihrer
            aktiven Zustimmung (Klick auf „Karte laden &amp; anzeigen“) geladen. Erst dann wird eine Verbindung zu
            Servern der Google Ireland Limited hergestellt und es können Daten (z. B. Ihre IP-Adresse) an Google
            übertragen werden. Weitere Informationen: Google-Datenschutzerklärung unter
            policies.google.com/privacy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">6. Keine Analyse-/Tracking-Tools</h2>
          <p>
            Diese Website verwendet aktuell keine Web-Analyse- oder Tracking-Dienste (z. B. Google Analytics). Es
            werden ausschließlich technisch notwendige Daten verarbeitet.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-ink">7. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten sowie ein Widerspruchsrecht gegen die Verarbeitung und ein Recht auf
            Datenübertragbarkeit. Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
            Wenden Sie sich hierzu gerne an: {restaurant.email}
          </p>
        </section>
      </Container>
    </div>
  );
}
