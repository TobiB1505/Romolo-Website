import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CucinaRotatingGallery, type CucinaDish } from "@/components/home/CucinaRotatingGallery";
import { menuGroups } from "@/lib/data/menu";
import { aboutContent } from "@/lib/data/restaurant";
import type { MenuItem } from "@/lib/types";
import styles from "./HomeEditorial.module.css";

const signatureDishSelection: { categorySlug: string; name: string }[] = [
  { categorySlug: "carne-di-vitello", name: "Saltimbocca alla Romana" },
  { categorySlug: "pizza", name: "Pizza Buffalina" },
  { categorySlug: "pasta", name: "Spaghetti Frutti di Mare" },
  { categorySlug: "dolce", name: "Tiramisù" },
];

function getSignatureDishes(): MenuItem[] {
  const categories = menuGroups.flatMap((group) => group.categories);
  return signatureDishSelection
    .map(({ categorySlug, name }) => categories.find((category) => category.slug === categorySlug)?.items.find((item) => item.name === name))
    .filter((item): item is MenuItem => Boolean(item));
}

/**
 * Rotieren in der Collage durch: Slot i zeigt reihum die Gerichte i, i+3
 * (siehe CucinaRotatingGallery). Die Reihenfolge bestimmt also die Paarung
 * pro Slot – die beiden auffälligsten Teller liegen im großen Haupt-Slot.
 */
const cucinaDishes: CucinaDish[] = [
  {
    src: "/images/cucina/scampi-alla-griglia.jpg",
    alt: "Gegrillte Scampi auf Blattspinat, angerichtet auf dem Tisch im Restaurant",
    label: "Scampi alla Griglia",
  },
  {
    src: "/images/cucina/tagliatelle-piselli-e-vongole.jpg",
    alt: "Tagliatelle mit Erbsen, Venusmuscheln und Tomaten-Sahne-Soße",
    label: "Tagliatelle Piselli e Vongole",
  },
  {
    src: "/images/cucina/spiedini-di-gamberi.jpg",
    alt: "Gambero-Spiedini vom Grill mit Zucchini und Basilikum-Öl",
    label: "Spiedini di Gamberi",
  },
  {
    src: "/images/cucina/insalata-di-mare.jpg",
    alt: "Insalata di Mare mit Muscheln, Venusmuscheln und Garnelen",
    label: "Insalata di Mare",
  },
  {
    src: "/images/cucina/linguine-ai-funghi.jpg",
    alt: "Linguine mit Pfifferlingen, angerichtet auf dem Tisch im Restaurant",
    label: "Linguine ai Funghi",
  },
  {
    src: "/images/cucina/pasta-pollo-e-funghi.jpg",
    alt: "Linguine mit Hähnchen und Waldpilzen in Sahnesoße",
    label: "Pasta Pollo e Funghi",
  },
];

export function CucinaSection() {
  const dishes = getSignatureDishes();

  return (
    <section id="cucina" data-home-section className={`${styles.cucina} scroll-anchor overflow-hidden bg-forest-dark py-section text-cream`}>
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className={styles.sectionIndexLight}>
                  <span>03</span><i /><span>Cucina</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-8 font-display text-[clamp(3.7rem,7.5vw,7rem)] leading-[0.88] tracking-[-0.04em]">
                  La vera<br /><em className="font-normal text-gold">cucina.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-8 max-w-md leading-relaxed text-cream/65">{aboutContent.paragraphs[1]}</p>
              </Reveal>

              {dishes.length > 0 && (
                <Reveal delay={0.2}>
                  <ol className={styles.signatureList}>
                    {dishes.map((dish, index) => (
                      <li key={dish.name}>
                        <span className={styles.dishNumber}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{dish.name}</span>
                        <i aria-hidden />
                        <strong>{dish.price}</strong>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )}

              <Reveal delay={0.25}>
                <Link href="/speisekarte" className={styles.cucinaMenuButton}>
                  Ganze Speisekarte <ArrowRight size={16} aria-hidden />
                </Link>
              </Reveal>
            </div>
          </div>

          <CucinaRotatingGallery dishes={cucinaDishes} className="lg:col-span-7" />
        </div>
      </Container>
    </section>
  );
}
