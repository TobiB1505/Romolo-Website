import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
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

const pastaImage = {
  src: "/images/cucina/spaghetti-frutti-di-mare.png",
  alt: "Spaghetti Frutti di Mare mit Garnelen und Muscheln im warm beleuchteten Restaurant",
};
const pizzaImage = {
  src: "/images/cucina/pizza-buffalina.png",
  alt: "Pizza Buffalina mit Mozzarella und Basilikum vor dem warm leuchtenden Steinofen",
};
const dessertImage = {
  src: "/images/cucina/tiramisu.png",
  alt: "Klassisches Tiramisù mit Espresso im warm beleuchteten Restaurant",
};

const moreDishes = [
  {
    src: "/images/cucina/spiedini-di-gamberi.jpg",
    alt: "Gambero-Spiedini vom Grill mit Zucchini und Basilikum-Öl",
    label: "Spiedini di Gamberi",
  },
  {
    src: "/images/cucina/tagliatelle-piselli-e-vongole.jpg",
    alt: "Tagliatelle mit Erbsen, Venusmuscheln und Tomaten-Sahne-Soße",
    label: "Tagliatelle Piselli e Vongole",
  },
  {
    src: "/images/cucina/pasta-pollo-e-funghi.jpg",
    alt: "Linguine mit Hähnchen und Waldpilzen in Sahnesoße",
    label: "Pasta Pollo e Funghi",
  },
  {
    src: "/images/cucina/insalata-di-mare.jpg",
    alt: "Insalata di Mare mit Muscheln, Venusmuscheln und Garnelen",
    label: "Insalata di Mare",
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

          <div className={`${styles.cucinaGallery} lg:col-span-7`}>
            <ImageReveal className={`${styles.cucinaImageMain} overflow-hidden`}>
              <Image src={pastaImage.src} alt={pastaImage.alt} fill sizes="(min-width: 1024px) 35vw, 82vw" className={styles.editorialImage} />
              <span className={styles.imageCaption}>Pasta fatta con amore</span>
            </ImageReveal>
            <ImageReveal delay={0.12} className={`${styles.cucinaImageAccent} overflow-hidden`}>
              <Image src={pizzaImage.src} alt={pizzaImage.alt} fill sizes="(min-width: 1024px) 20vw, 46vw" className={styles.editorialImage} />
              <span className={styles.imageCaption}>Dal forno</span>
            </ImageReveal>
            <ImageReveal delay={0.2} className={`${styles.cucinaImageDetail} overflow-hidden`}>
              <Image src={dessertImage.src} alt={dessertImage.alt} fill sizes="(min-width: 1024px) 19vw, 44vw" className={styles.editorialImage} />
              <span className={styles.imageCaption}>Dolce finale</span>
            </ImageReveal>
          </div>
        </div>

        <div className={styles.cucinaMoreDishes}>
          <Reveal>
            <span className={styles.cucinaMoreDishesLabel}>Dalla nostra cucina</span>
          </Reveal>
          <div className={styles.cucinaMoreDishesGrid}>
            {moreDishes.map((dish, index) => (
              <ImageReveal key={dish.src} delay={index * 0.06} className={`${styles.cucinaMoreDishesItem} overflow-hidden`}>
                <Image src={dish.src} alt={dish.alt} fill sizes="(min-width: 1024px) 17vw, 46vw" className={styles.editorialImage} />
                <span className={styles.imageCaption}>{dish.label}</span>
              </ImageReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
