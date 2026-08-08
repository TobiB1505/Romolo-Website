import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ReservationForm } from "@/components/ReservationForm";
import { MapEmbed } from "@/components/MapEmbed";
import { restaurant } from "@/lib/data/restaurant";

export const metadata: Metadata = {
  title: "Kontakt & Reservierung",
  description:
    "Tisch reservieren im Ristorante da Romolo in Miesbach – per Formular oder telefonisch unter +49 8025 9978676.",
};

export default function KontaktPage() {
  return (
    <div>
      <PageHero title="Kontakt & Reservierung" subtitle="Wir freuen uns auf Ihre Anfrage." />
      <Container className="grid gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-display text-2xl">Tisch reservieren</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Reservierungen sind auch weiterhin jederzeit telefonisch möglich. Alternativ senden Sie uns gerne eine
            unverbindliche Anfrage über dieses Formular.
          </p>
          <div className="mt-8">
            <ReservationForm />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg bg-cream-dark p-6">
            <h2 className="font-display text-xl">So erreichen Sie uns</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <span>
                  {restaurant.street}
                  <br />
                  {restaurant.zip} {restaurant.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <a href={restaurant.phoneHref} className="hover:text-terracotta">
                  {restaurant.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <a href={`mailto:${restaurant.email}`} className="hover:text-terracotta">
                  {restaurant.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <ul className="space-y-0.5">
                  {restaurant.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-ink-soft">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <MapEmbed />
        </div>
      </Container>
    </div>
  );
}
