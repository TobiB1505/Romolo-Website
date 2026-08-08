import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { galleryImages } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Impressionen aus dem Ristorante da Romolo in Miesbach: Gewölbekeller, Gastraum und Innenhof.",
};

export default function GaleriePage() {
  return (
    <div>
      <PageHero title="Galerie" subtitle="Ein paar Eindrücke aus unserem Restaurant am Stadtplatz." />
      <Container className="py-16">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {galleryImages.map((img) => (
            <div key={img.src} className="relative overflow-hidden rounded-lg break-inside-avoid">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
