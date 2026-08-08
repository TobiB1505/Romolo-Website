import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent } from "@/lib/data/restaurant";

export const metadata: Metadata = { title: "Impressum" };

const { impressum } = legalContent;

export default function ImpressumPage() {
  return (
    <div>
      <PageHero title="Impressum" />
      <Container size="prose" className="space-y-6 py-section-sm text-sm leading-relaxed text-ink-soft">
        <div>
          <p className="font-medium text-ink">{impressum.company}</p>
          <p>{impressum.street}</p>
          <p>
            {impressum.zip} {impressum.city}
          </p>
        </div>
        <div>
          <p>Telefon: {impressum.phone}</p>
          <p>E-Mail: {impressum.email}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Vertreten durch:</p>
          <p>{impressum.representative}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Registereintrag:</p>
          <p>Eingetragen im Handelsregister.</p>
          <p>Registergericht: {impressum.registerCourt}</p>
          <p>Registernummer: {impressum.registerNumber}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Umsatzsteuer-ID:</p>
          <p>Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz: {impressum.vatId}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Aufsichtsbehörde:</p>
          <p>{impressum.supervisoryAuthority}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Haftungsausschluss:</p>
          <p>{impressum.liabilityNote}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Copyright-Hinweis:</p>
          <p>{impressum.copyrightNote}</p>
        </div>
      </Container>
    </div>
  );
}
