import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { aboutContent } from "@/lib/data/restaurant";
import { galleryImages } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Familiengeführtes italienisches Restaurant am Stadtplatz in Miesbach – gute Küche, herzliche Gastfreundschaft.",
};

export default function UeberUnsPage() {
  return (
    <div>
      <PageHero title={aboutContent.title} />
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5 leading-relaxed text-ink-soft">
            {aboutContent.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <Link
              href="/kontakt"
              className="inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream hover:bg-terracotta-dark"
            >
              Tisch reservieren
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
            <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
}
