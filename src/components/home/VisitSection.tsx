import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { ReservationForm } from "@/components/ReservationForm";
import { Reveal } from "@/components/motion/Reveal";
import { restaurant } from "@/lib/data/restaurant";
import styles from "./HomeEditorial.module.css";

export function VisitSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${restaurant.name}, ${restaurant.street}, ${restaurant.zip} ${restaurant.city}`
  )}`;

  return (
    <section id="prenotazione" data-home-section className={`${styles.visit} scroll-anchor overflow-hidden bg-cream py-section`}>
      <Container size="wide">
        <Reveal>
          <div className={styles.sectionIndex}>
            <span>07</span><i /><span>Arrivederci</span>
          </div>
        </Reveal>

        <div className={styles.visitHeader}>
          <Reveal delay={0.06}>
            <p className={styles.visitEyebrow}>Ein Tisch wartet auf dich.</p>
            <h2 className={styles.visitTitle}>Ci vediamo<br /><em>da Romolo.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={styles.visitLead}>Wunschtermin auswählen, Kontaktdaten eintragen und absenden. Wir melden uns persönlich mit der Bestätigung.</p>
          </Reveal>
        </div>

        <div className={styles.reservationLayout}>
          <Reveal delay={0.08} className={styles.reservationPanel}>
            <span className="eyebrow text-terracotta">Online reservieren</span>
            <h3>In weniger als<br />einer Minute.</h3>
            <div className={styles.reservationFormWrap}><ReservationForm /></div>
          </Reveal>

          <aside className={styles.visitAside}>
            <Reveal delay={0.14}>
              <div className={styles.hoursCard}>
                <div className={styles.hoursHeader}>
                  <span className="eyebrow text-gold">Orari</span>
                  <Clock size={18} aria-hidden />
                </div>
                <ul>
                  {restaurant.hours.map((entry) => (
                    <li key={entry.day}>
                      <span>{entry.day}</span>
                      <strong className={entry.hours === "Ruhetag" ? styles.closed : ""}>{entry.hours}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18} className={styles.visitDetails}>
              <address>
                <MapPin size={17} aria-hidden />
                <span>{restaurant.street}<br />{restaurant.zip} {restaurant.city}</span>
              </address>
              <a href={restaurant.phoneHref}><Phone size={16} aria-hidden />{restaurant.phone}</a>
              <a href={`mailto:${restaurant.email}`}><Mail size={16} aria-hidden />{restaurant.email}</a>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className={styles.routeButton}>
                Route öffnen <MapPin size={16} aria-hidden />
              </a>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}
