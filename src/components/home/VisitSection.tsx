import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { restaurant } from "@/lib/data/restaurant";
import styles from "./HomeEditorial.module.css";

export function VisitSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${restaurant.name}, ${restaurant.street}, ${restaurant.zip} ${restaurant.city}`
  )}`;

  return (
    <section className={`${styles.visit} overflow-hidden bg-cream py-section`}>
      <Container size="wide">
        <Reveal>
          <div className={styles.sectionIndex}>
            <span>06</span><i /><span>Arrivederci</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <p className={styles.visitEyebrow}>Ein Tisch wartet auf Sie.</p>
              <h2 className={styles.visitTitle}>Ci vediamo<br /><em>da Romolo.</em></h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/kontakt" className={styles.reservationButton}>
                  Tisch anfragen <ArrowRight size={17} aria-hidden />
                </Link>
                <a href={directionsUrl} target="_blank" rel="noreferrer" className={styles.routeButton}>
                  Route planen <MapPin size={16} aria-hidden />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.17}>
              <address className={styles.visitContact}>
                <span>{restaurant.street}<br />{restaurant.zip} {restaurant.city}</span>
                <a href={restaurant.phoneHref}><Phone size={15} aria-hidden />{restaurant.phone}</a>
              </address>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
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
        </div>
      </Container>
    </section>
  );
}
