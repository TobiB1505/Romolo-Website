import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "./Container";
import { restaurant } from "@/lib/data/restaurant";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-forest text-cream">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg">{restaurant.name}</p>
          <p className="mt-2 text-sm text-cream/70">{restaurant.tagline}</p>
          {(restaurant.instagramUrl || restaurant.facebookUrl) && (
            <div className="mt-4 flex gap-4 text-sm">
              {restaurant.instagramUrl && (
                <a href={restaurant.instagramUrl} target="_blank" rel="noreferrer" className="text-cream/70 underline hover:text-cream">
                  Instagram
                </a>
              )}
              {restaurant.facebookUrl && (
                <a href={restaurant.facebookUrl} target="_blank" rel="noreferrer" className="text-cream/70 underline hover:text-cream">
                  Facebook
                </a>
              )}
            </div>
          )}
        </div>

        <div className="text-sm text-cream/80">
          <p className="mb-2 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>
              {restaurant.street}
              <br />
              {restaurant.zip} {restaurant.city}
            </span>
          </p>
          <p className="mb-2 flex items-center gap-2">
            <Phone size={16} className="shrink-0" />
            <a href={restaurant.phoneHref} className="hover:text-cream">
              {restaurant.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="shrink-0" />
            <a href={`mailto:${restaurant.email}`} className="hover:text-cream">
              {restaurant.email}
            </a>
          </p>
        </div>

        <div className="text-sm text-cream/80">
          <p className="mb-2 font-medium text-cream">Öffnungszeiten</p>
          <ul className="space-y-1">
            {restaurant.hours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span>{entry.day}</span>
                <span className="text-right text-cream/70">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {restaurant.name}</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-cream">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-cream">Datenschutz</Link>
          <Link href="/widerruf" className="hover:text-cream">Widerrufsrecht</Link>
        </div>
      </Container>
    </footer>
  );
}
