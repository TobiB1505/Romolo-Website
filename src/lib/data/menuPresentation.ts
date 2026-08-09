import { menuGroups } from "@/lib/data/menu";
import type { MenuCategory } from "@/lib/types";

/**
 * Rein visuelle Zusammenfassung der 22 Kategorien aus `menu.ts` in 7
 * Hauptgruppen für die Speisekarten-Seite (Sprint 3).
 *
 * WICHTIG: Diese Datei kopiert keine Gerichte, Preise oder Zusatzstoffe.
 * Sie referenziert nur Kategorie-Slugs; die tatsächlichen Daten kommen zur
 * Laufzeit ausschließlich aus `menu.ts` (siehe `buildMenuVisualGroups()`
 * unten). `menu.ts` bleibt die alleinige Source of Truth.
 */
export interface MoodImageRef {
  src: string;
  alt: string;
  /**
   * CSS `object-position` für den Desktop-Ausschnitt (4:5, `CategoryMoodImage`).
   * Alle sieben Bilder folgen derselben Komposition (Schild oben, Teller
   * unten) – bei diesem milden Zuschnitt reicht ein leichter Versatz nach
   * oben, damit der Schildrand nicht abgeschnitten wird. Default: "center".
   */
  objectPosition?: string;
  /**
   * CSS `object-position` für den Mobile-Banner (16:10, `MenuGroup`). Der
   * Zuschnitt ist hier deutlich enger als am Desktop (schmaler horizontaler
   * Streifen aus einem hochkant-Bild) – ein starker Versatz nach unten zeigt
   * bevorzugt den Teller statt der Schildmitte. Default: "center".
   */
  mobileObjectPosition?: string;
}

export interface MenuVisualGroupConfig {
  /** Auch Anchor-/Hash-ID, z. B. für /speisekarte#pizza. */
  id: string;
  /** Zweistellige Nummer für Rail und Eyebrow, z. B. "01". */
  number: string;
  label: string;
  /** Sehr kurzer, sachlicher Editorial-Satz. Keine Marketing-Übertreibung. */
  editorial?: string;
  /** Slugs aus menu.ts, die dieser visuellen Gruppe zugeordnet sind. */
  categorySlugs: string[];
  moodImage: MoodImageRef;
}

export const menuVisualGroupConfigs: MenuVisualGroupConfig[] = [
  {
    id: "antipasti",
    number: "01",
    label: "Antipasti",
    editorial: "Der Auftakt – leicht und lebendig.",
    categorySlugs: ["antipasti", "zuppe", "insalate"],
    moodImage: {
      src: "/images/categories/antipasti.png",
      alt: "Antipasti-Platte mit Salami, Schinken, Büffelmozzarella und Oliven",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
  {
    id: "pasta",
    number: "02",
    label: "Pasta",
    editorial: "Klassiker, wie man sie aus der Trattoria kennt.",
    categorySlugs: ["pasta", "pasta-al-forno"],
    moodImage: {
      src: "/images/categories/pasta.png",
      alt: "Teller Fettuccine vor der Pasta-Schiefertafel, umgeben von Basilikum und Parmesan",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
  {
    id: "pizza",
    number: "03",
    label: "Pizza",
    editorial: "35 cm, klassisch italienisch.",
    categorySlugs: ["pizza"],
    moodImage: {
      src: "/images/categories/pizza.png",
      alt: "Pizza Margherita vor der Pizza-Schiefertafel und dem Holzofen",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
  {
    id: "carne",
    number: "04",
    label: "Carne",
    editorial: "Rind und Kalb, klassisch zubereitet.",
    categorySlugs: ["carne-di-manzo", "carne-di-vitello"],
    moodImage: {
      src: "/images/categories/carne.png",
      alt: "Aufgeschnittenes gegrilltes Steak mit Rosmarin vor der Carne-Schiefertafel",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
  {
    id: "pesce",
    number: "05",
    label: "Pesce",
    editorial: "Meeresfrüchte und Fisch, mediterran.",
    categorySlugs: ["pesce"],
    moodImage: {
      src: "/images/categories/pesce.jpg",
      alt: "Gegrillte Scampi auf Blattspinat, angerichtet auf dem Tisch im Restaurant",
      objectPosition: "center 55%",
      mobileObjectPosition: "center 75%",
    },
  },
  {
    id: "dolci",
    number: "06",
    label: "Dolci",
    editorial: "Süßer Abschluss, italienische Art.",
    categorySlugs: ["dolce"],
    moodImage: {
      src: "/images/categories/dolci.png",
      alt: "Tiramisù, Panna Cotta und Cannoli vor der Dolci-Schiefertafel",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
  {
    id: "vino-bar",
    number: "07",
    label: "Vino & Bar",
    editorial: "Wein, Aperitivo und mehr.",
    categorySlugs: [
      "aperitivo",
      "digestivo",
      "liquore",
      "weisswein",
      "rotwein",
      "rose",
      "birra",
      "alkoholfreie-getraenke",
      "warme-getraenke",
      "grappa",
      "brandy",
      "whisky",
    ],
    moodImage: {
      src: "/images/categories/vino-bar.png",
      alt: "Rotwein, Cocktails und Antipasti vor der Vino-&-Bar-Schiefertafel",
      objectPosition: "center 42%",
      mobileObjectPosition: "center 78%",
    },
  },
];

export interface MenuVisualGroup extends Omit<MenuVisualGroupConfig, "categorySlugs"> {
  categories: MenuCategory[];
}

/**
 * Löst die Slug-Zuordnung gegen die echten Daten aus `menu.ts` auf und prüft
 * dabei die vollständige Datenintegrität:
 * - jeder referenzierte Slug muss existieren (Tippfehler fallen beim Build auf)
 * - jede reale Kategorie muss in genau einer visuellen Gruppe landen
 *   (nichts doppelt, nichts vergessen)
 *
 * Wirft bei einer Abweichung, statt still Kategorien zu verlieren.
 */
function buildMenuVisualGroups(): MenuVisualGroup[] {
  const allCategories = menuGroups.flatMap((group) => group.categories);
  const consumedSlugs = new Set<string>();

  const groups = menuVisualGroupConfigs.map((config) => {
    const categories = config.categorySlugs.map((slug) => {
      const category = allCategories.find((c) => c.slug === slug);
      if (!category) {
        throw new Error(
          `menuPresentation.ts: Kategorie-Slug "${slug}" (Gruppe "${config.id}") existiert nicht in menu.ts.`
        );
      }
      if (consumedSlugs.has(slug)) {
        throw new Error(`menuPresentation.ts: Kategorie-Slug "${slug}" ist mehrfach zugeordnet.`);
      }
      consumedSlugs.add(slug);
      return category;
    });

    return {
      id: config.id,
      number: config.number,
      label: config.label,
      editorial: config.editorial,
      moodImage: config.moodImage,
      categories,
    };
  });

  const missing = allCategories.filter((c) => !consumedSlugs.has(c.slug));
  if (missing.length > 0) {
    throw new Error(
      `menuPresentation.ts: ${missing.length} Kategorie(n) aus menu.ts sind keiner visuellen Gruppe zugeordnet: ${missing
        .map((c) => c.slug)
        .join(", ")}`
    );
  }

  const totalItemsSource = allCategories.reduce((sum, c) => sum + c.items.length, 0);
  const totalItemsMapped = groups.reduce(
    (sum, g) => sum + g.categories.reduce((s, c) => s + c.items.length, 0),
    0
  );
  if (totalItemsSource !== totalItemsMapped) {
    throw new Error(
      `menuPresentation.ts: Item-Anzahl weicht ab (menu.ts: ${totalItemsSource}, gemappt: ${totalItemsMapped}).`
    );
  }

  return groups;
}

export const menuVisualGroups: MenuVisualGroup[] = buildMenuVisualGroups();
