import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { menuGroups } from "@/lib/data/menu";
import { aboutContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";
import type { MenuItem } from "@/lib/types";

/**
 * Kuratierte Auswahl für den Homepage-Teaser. Namen müssen exakt zu
 * `src/lib/data/menu.ts` passen – Preise werden bewusst nicht hier gepflegt,
 * sondern zur Laufzeit aus den echten Menü-Daten gelesen.
 */
const signatureDishSelection: { categorySlug: string; name: string }[] = [
  { categorySlug: "carne-di-vitello", name: "Saltimbocca alla Romana" },
  { categorySlug: "pizza", name: "Pizza Buffalina" },
  { categorySlug: "pasta", name: "Spaghetti Frutti di Mare" },
  { categorySlug: "dolce", name: "Tiramisù" },
];

function getSignatureDishes(): MenuItem[] {
  const categories = menuGroups.flatMap((group) => group.categories);
  return signatureDishSelection
    .map(({ categorySlug, name }) => categories.find((c) => c.slug === categorySlug)?.items.find((item) => item.name === name))
    .filter((item): item is MenuItem => Boolean(item));
}

const primaryImage = findGalleryImage("interior-6");
const secondaryImage = findGalleryImage("interior-1");

export function CucinaSection() {
  const dishes = getSignatureDishes();

  return (
    <section className="overflow-hidden bg-cream-warm py-section">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span aria-hidden className="text-xs text-ink-soft/50">
                  03
                </span>
                <span className="eyebrow text-terracotta">Cucina</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-display-lg text-ink">La Cucina</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-measure leading-relaxed text-ink-soft">{aboutContent.paragraphs[1]}</p>
            </Reveal>

            {dishes.length > 0 && (
              <Reveal delay={0.2}>
                <ul className="mt-10 divide-y divide-hairline border-t border-hairline">
                  {dishes.map((dish) => (
                    <li key={dish.name} className="flex items-baseline gap-4 py-4">
                      <span className="font-medium text-ink">{dish.name}</span>
                      <span aria-hidden className="-translate-y-1 flex-1 border-b border-dotted border-ink-soft/30" />
                      <span className="shrink-0 font-medium text-terracotta">{dish.price}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.26}>
              <Link href="/speisekarte" className="btn-primary mt-10 px-7 py-3">
                Speisekarte entdecken
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-5 gap-4 sm:gap-6">
              <ImageReveal className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-image">
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 60vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal delay={0.1} className="relative col-span-2 mt-12 aspect-[3/4] overflow-hidden rounded-image">
                <Image
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 38vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
