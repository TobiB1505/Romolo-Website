import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import { restaurant } from "@/lib/data/restaurant";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="wide" className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            {restaurant.name}
          </Link>
          <p>{restaurant.tagline}</p>
          <span>Miesbach · Baviera</span>
        </div>

        <div className={styles.contact}>
          <p className={styles.label}>Besuchen</p>
          <address>
            <p>
              <MapPin size={16} aria-hidden />
              <span>{restaurant.street}<br />{restaurant.zip} {restaurant.city}</span>
            </p>
            <p>
              <Phone size={16} aria-hidden />
              <a href={restaurant.phoneHref}>{restaurant.phone}</a>
            </p>
            <p>
              <Mail size={16} aria-hidden />
              <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            </p>
          </address>
        </div>

        <div className={styles.openingHours}>
          <p className={styles.label}><Clock size={14} aria-hidden /> Öffnungszeiten</p>
          <ul>
            {restaurant.hours.map((entry) => (
              <li key={entry.day}>
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container size="wide" className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} {restaurant.name}</p>
        <nav aria-label="Rechtliche Informationen">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/widerruf">Widerrufsrecht</Link>
        </nav>
      </Container>
    </footer>
  );
}
