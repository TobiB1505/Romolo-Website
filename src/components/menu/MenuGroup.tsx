import Image from "next/image";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { Reveal } from "@/components/motion/Reveal";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";

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
      className="scroll-anchor py-14 first:pt-0 lg:py-16"
    >
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span aria-hidden className="text-xs text-ink-soft/50">
            {group.number}
          </span>
          <span className="eyebrow text-terracotta">Menü</span>
        </div>
        <h2 id={`${group.id}-heading`} className="mt-2 font-display text-display-md text-ink">
          {group.label}
        </h2>
        {group.editorial && <p className="mt-2 max-w-measure text-ink-soft">{group.editorial}</p>}
      </Reveal>

      {/* Mood-Banner nur auf Mobile/Tablet, innerhalb der Gruppe statt global
          sticky – atmosphärischer Einstieg, ohne dauerhaft Platz zu
          blockieren. Statisches Bild ohne Crossfade: auf Mobile ist "Menü
          lesen" wichtiger als eine Bildwechsel-Animation.
          Art Direction: eigene, deutlich engere Bildposition als am Desktop
          (16:10 aus einem Hochkant-Bild ist ein viel schmalerer Ausschnitt
          als 4:5) – bevorzugt den Teller im unteren Bilddrittel statt der
          Schildmitte, siehe `mobileObjectPosition` in menuPresentation.ts. */}
      <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-image lg:hidden">
        <Image
          src={group.moodImage.src}
          alt=""
          fill
          loading={isFirst ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 0px, 100vw"
          className="object-cover"
          style={{ objectPosition: group.moodImage.mobileObjectPosition ?? "center" }}
        />
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
        {group.categories.map((category) => (
          <MenuCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
