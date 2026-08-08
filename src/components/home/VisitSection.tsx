import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { restaurant } from "@/lib/data/restaurant";

export function VisitSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${restaurant.name}, ${restaurant.street}, ${restaurant.zip} ${restaurant.city}`
  )}`;

  return (
    <section className="bg-cream py-section">
      <Container size="wide">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="text-xs text-ink-soft/50">
              06
            </span>
            <span className="eyebrow text-terracotta">Visit</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 border-t border-hairline pt-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.06}>
            <div>
              <h2 className="font-display text-display-md text-ink">Come Trovarci</h2>
              <address className="mt-6 space-y-4 text-base not-italic text-ink-soft">
                <p className="flex items-start gap-3">
                  <MapPin size={17} className="mt-1 shrink-0 text-terracotta" aria-hidden />
                  <span>
                    {restaurant.street}
                    <br />
                    {restaurant.zip} {restaurant.city}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-terracotta" aria-hidden />
                  <a href={restaurant.phoneHref} className="text-ink transition-colors hover:text-terracotta">
                    {restaurant.phone}
                  </a>
                </p>
              </address>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/kontakt" className="btn-primary px-7 py-3">
                  Tisch anfragen
                </Link>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  Route planen →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h2 className="font-display text-display-md text-ink">Orari</h2>
              <ul className="mt-6 divide-y divide-hairline border-t border-hairline text-ink-soft">
                {restaurant.hours.map((entry) => (
                  <li key={entry.day} className="flex items-center justify-between gap-4 py-3">
                    <span className="flex items-center gap-3 text-ink">
                      <Clock size={15} className="shrink-0 text-terracotta/70" aria-hidden />
                      {entry.day}
                    </span>
                    <span className={entry.hours === "Ruhetag" ? "text-terracotta" : ""}>{entry.hours}</span>
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
