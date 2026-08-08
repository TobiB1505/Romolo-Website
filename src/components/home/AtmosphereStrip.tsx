import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";

const gardenImage = findGalleryImage("exterior-1");
const nookImage = findGalleryImage("interior-3");
const windowImage = findGalleryImage("interior-5");

/**
 * Rein nativer horizontaler Scroll (CSS `overflow-x` + `scroll-snap`) – kein
 * JS-Carousel, kein Wheel-Hijacking, kein Autoplay. Der Nutzer bestimmt das
 * Tempo. Deshalb ist diese Section eine Server Component; `<Reveal>` ist die
 * einzige Client-Grenze.
 */
export function AtmosphereStrip() {
  return (
    <section className="overflow-hidden bg-forest-dark py-section text-cream" aria-labelledby="atmosfera-heading">
      <Container size="wide">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="text-xs text-cream/40">
              05
            </span>
            <span className="eyebrow text-gold">{homeContent.atmosphereEyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="atmosfera-heading" className="mt-4 font-display text-display-lg">
            {homeContent.atmosphereHeadline}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 text-sm text-cream/50 lg:hidden">Zum Entdecken wischen →</p>
        </Reveal>
      </Container>

      {/*
        Kartenbreiten bewusst in `vw` statt festen Pixeln: Die drei Karten
        allein summieren sich auf 110vw (38 + 44 + 28), unabhängig von der
        Viewport-Breite. Damit ist die Zeile garantiert breiter als der
        Container – bei jeder Bildschirmgröße, auch auf sehr breiten Desktops,
        wo feste Pixelbreiten irgendwann in den Container passen und der
        Streifen nichts mehr zum Scrollen hätte.
      */}
      <div className="no-scrollbar mt-12 overflow-x-auto">
        <ul className="flex snap-x snap-mandatory gap-6 px-6 sm:px-10 lg:px-16">
          <li className="relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-image sm:w-[46vw] lg:w-[38vw]">
            <Image
              src={gardenImage.src}
              alt={gardenImage.alt}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 78vw"
              className="object-cover"
            />
          </li>
          <li className="relative aspect-[3/2] w-[80vw] shrink-0 snap-start overflow-hidden rounded-image sm:w-[54vw] lg:w-[44vw]">
            <Image
              src={nookImage.src}
              alt={nookImage.alt}
              fill
              sizes="(min-width: 1024px) 44vw, (min-width: 640px) 54vw, 80vw"
              className="object-cover"
            />
          </li>
          <li className="relative aspect-square w-[62vw] shrink-0 snap-start overflow-hidden rounded-image sm:w-[36vw] lg:w-[28vw]">
            <Image
              src={windowImage.src}
              alt={windowImage.alt}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 36vw, 62vw"
              className="object-cover"
            />
          </li>
          {/* Rechter Rand als eigenes Element, damit die letzte Karte beim
              Snap nicht bündig am Viewportrand klebt. */}
          <li aria-hidden className="w-px shrink-0 sm:w-4" />
        </ul>
      </div>
    </section>
  );
}
