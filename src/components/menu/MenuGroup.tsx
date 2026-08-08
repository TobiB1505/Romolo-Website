import Image from "next/image";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { Reveal } from "@/components/motion/Reveal";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";
import styles from "./MenuExperience.module.css";

/**
 * Eine visuelle Hauptgruppe (z. B. "Antipasti") mit ihren echten
 * Unterkategorien (z. B. Antipasti, Zuppe, Insalate). Server Component – die
 * 124 Gerichte werden serverseitig gerendert und sind ohne JavaScript
 * vollständig lesbar. `<Reveal>` blendet nur den Gruppen-Container einmalig
 * ein; die einzelnen Gerichte darin animieren nicht (siehe Sprint-Vorgabe:
 * kein Motion pro Gericht bei 124 Einträgen).
 */
export function MenuGroup({ group, isFirst }: { group: MenuVisualGroup; isFirst: boolean }) {
  return (
    <section
      id={group.id}
      data-menu-group
      aria-labelledby={`${group.id}-heading`}
      className={`${styles.menuGroup} scroll-anchor`}
    >
      <Reveal>
        <div className={styles.groupIndex}>
          <span aria-hidden>{group.number}</span>
          <i aria-hidden />
          <span>Capitolo</span>
        </div>
        <h2 id={`${group.id}-heading`} className={styles.groupTitle}>
          {group.label}
        </h2>
        {group.editorial && <p className={styles.groupEditorial}>{group.editorial}</p>}
      </Reveal>

      {/* Mood-Banner nur auf Mobile/Tablet, innerhalb der Gruppe statt global
          sticky – atmosphärischer Einstieg, ohne dauerhaft Platz zu
          blockieren. Statisches Bild ohne Crossfade: auf Mobile ist "Menü
          lesen" wichtiger als eine Bildwechsel-Animation.
          Art Direction: eigene, deutlich engere Bildposition als am Desktop
          (16:10 aus einem Hochkant-Bild ist ein viel schmalerer Ausschnitt
          als 4:5) – bevorzugt den Teller im unteren Bilddrittel statt der
          Schildmitte, siehe `mobileObjectPosition` in menuPresentation.ts. */}
      <div className={styles.mobileMood}>
        <Image
          src={group.moodImage.src}
          alt=""
          fill
          loading={isFirst ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 0px, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          style={{ objectPosition: group.moodImage.mobileObjectPosition ?? "center" }}
        />
        <div className={styles.mobileMoodShade} aria-hidden />
        <span className={styles.mobileMoodLabel}>{group.number} · {group.label}</span>
      </div>

      <div className={styles.categoryGrid}>
        {group.categories.map((category) => (
          <MenuCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
