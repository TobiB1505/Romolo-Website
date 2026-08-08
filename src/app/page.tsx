import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { homeContent, restaurant } from "@/lib/data/restaurant";
import { heroImage, galleryImages } from "@/lib/data/gallery";

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
        <Container className="relative z-10 text-center text-cream">
          <p className="font-display text-lg italic text-gold">Benvenuti</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {homeContent.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-cream/90">{homeContent.heroText}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/speisekarte"
              className="rounded-full bg-terracotta px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-terracotta-dark"
            >
              Zur Speisekarte
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border border-cream/60 px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Tisch reservieren
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-terracotta py-5 text-center text-cream">
        <Container>
          <p className="text-sm md:text-base">{homeContent.weeklyMenuNote}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-display italic text-terracotta">Unsere Geschichte</p>
            <h2 className="mt-2 font-display text-3xl">Ein Ort zum Ankommen</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{homeContent.introText}</p>
            <Link href="/ueber-uns" className="mt-6 inline-block text-sm font-medium text-terracotta hover:text-terracotta-dark">
              Mehr über uns erfahren →
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
            <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl">Ein Blick ins Restaurant</h2>
            <Link href="/galerie" className="hidden text-sm font-medium text-terracotta hover:text-terracotta-dark sm:block">
              Zur Galerie →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 4).map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
          <Link href="/galerie" className="mt-6 inline-block text-sm font-medium text-terracotta hover:text-terracotta-dark sm:hidden">
            Zur Galerie →
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <MapPin className="text-terracotta" />
            <p className="font-medium">{restaurant.street}</p>
            <p className="text-sm text-ink-soft">
              {restaurant.zip} {restaurant.city}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <Phone className="text-terracotta" />
            <a href={restaurant.phoneHref} className="font-medium hover:text-terracotta">
              {restaurant.phone}
            </a>
            <p className="text-sm text-ink-soft">Reservierung telefonisch oder per Formular</p>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <Clock className="text-terracotta" />
            <p className="font-medium">Di: Ruhetag</p>
            <p className="text-sm text-ink-soft">Mo, Mi–So 11:30–14:30 &amp; 17:30–22 Uhr</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
