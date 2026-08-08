import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { legalContent, restaurant } from "@/lib/data/restaurant";

export const metadata: Metadata = { title: "Widerrufsrecht" };

export default function WiderrufPage() {
  return (
    <div>
      <PageHero title="Widerrufsrecht" />
      <Container size="prose" className="space-y-6 py-section-sm text-sm leading-relaxed text-ink-soft">
        <p className="rounded-md bg-terracotta/10 p-4 text-terracotta-dark">{legalContent.widerruf.note}</p>
        <p>
          Die über das Kontaktformular gestellte Reservierungsanfrage ist unverbindlich und stellt keinen
          entgeltlichen Vertragsschluss dar – ein gesetzliches Widerrufsrecht nach Fernabsatzrecht ist hierfür daher
          nicht einschlägig. Sollten künftig entgeltliche Online-Bestellungen (z. B. Vorbestellungen mit Zahlung)
          angeboten werden, ist diese Seite um ein rechtsgültiges Widerrufsformular zu ergänzen.
        </p>
        <p>
          Bei Fragen zu einer bestehenden Reservierung wenden Sie sich bitte direkt an uns:{" "}
          <a href={`mailto:${restaurant.email}`} className="underline">
            {restaurant.email}
          </a>{" "}
          oder telefonisch unter {restaurant.phone}.
        </p>
      </Container>
    </div>
  );
}
