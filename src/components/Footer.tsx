import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import { restaurant } from "@/lib/data/restaurant";
import styles from "./Footer.module.css";

const footerNavigation = [
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="wide" className={styles.cta}>
        <p className={styles.eyebrow}>Il vostro tavolo</p>
        <h2 className={styles.ctaTitle}>
          Der nächste schöne Abend
          <span> beginnt hier.</span>
        </h2>
        <Link href="/kontakt" className={styles.ctaLink}>
          Tisch reservieren <ArrowUpRight size={18} aria-hidden />
        </Link>
      </Container>

      <Container size="wide" className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            {restaurant.name}
          </Link>
          <p>{restaurant.tagline}</p>
          <span>Miesbach · Baviera</span>
        </div>

        <nav className={styles.navigation} aria-label="Navigation im Footer">
          <p className={styles.label}>Entdecken</p>
          <ul>
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

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

      <Container size="wide">
        <p className={styles.wordmark} aria-hidden="true">da Romolo</p>
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {restaurant.name}</p>
          <p>Italianità am Stadtplatz</p>
          <nav aria-label="Rechtliche Informationen">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/widerruf">Widerrufsrecht</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
