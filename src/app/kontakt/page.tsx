import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { InteriorPageHero } from "@/components/InteriorPageHero";
import { ReservationForm } from "@/components/ReservationForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { restaurant } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";
import styles from "../InteriorPages.module.css";

export const metadata: Metadata = {
  title: "Kontakt & Reservierung",
  description: "Tisch reservieren im Ristorante da Romolo in Miesbach – per Formular oder telefonisch unter +49 8025 9978676.",
};

const heroImage = findGalleryImage("interior-5");

export default function KontaktPage() {
  return (
    <div className={styles.page}>
      <InteriorPageHero
        title="Prenotazione"
        eyebrow="Kontakt & Reservierung"
        number="06"
        subtitle="Ihr Tisch bei Romolo – fragen Sie Ihren Wunschtermin online an oder rufen Sie uns direkt an."
        image={heroImage}
      />

      <Container size="wide" className="py-section">
        <div className={styles.contactGrid}>
          <Reveal className={styles.formPanel}>
            <h2>Ein Tisch<br />für Sie.</h2>
            <p>Schicken Sie uns Ihre unverbindliche Reservierungsanfrage. Wir melden uns persönlich bei Ihnen und bestätigen den Termin.</p>
            <div className="mt-10"><ReservationForm /></div>
          </Reveal>

          <Reveal delay={0.1} className={styles.contactAside}>
            <div className={styles.contactAsideInner}>
              <span className="eyebrow text-gold">Concierge</span>
              <h2 className="mt-4">Direkter Kontakt</h2>
              <ul className={styles.contactList}>
                <li><MapPin size={18} aria-hidden /><span>{restaurant.street}<br />{restaurant.zip} {restaurant.city}</span></li>
                <li><Phone size={18} aria-hidden /><a href={restaurant.phoneHref}>{restaurant.phone}</a></li>
                <li><Mail size={18} aria-hidden /><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></li>
                <li>
                  <Clock size={18} aria-hidden />
                  <ul className={styles.hours}>
                    {restaurant.hours.map((entry) => (
                      <li key={entry.day}><span>{entry.day}</span><span>{entry.hours}</span></li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className={styles.mapWrap}><MapEmbed /></div>
        </Reveal>
      </Container>
    </div>
  );
}
