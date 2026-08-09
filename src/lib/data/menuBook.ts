import { menuFootnotes, menuGeneralNotes } from "@/lib/data/menu";
import { menuVisualGroups, type MenuVisualGroup } from "@/lib/data/menuPresentation";
import type { MenuItem } from "@/lib/types";

export interface MenuBookSection {
  id: string;
  title: string;
  subtitle?: string;
  continued: boolean;
  items: MenuItem[];
}

export interface MenuBookPage {
  id: string;
  kind: "chapter" | "menu" | "notes";
  groupId: string;
  groupNumber: string;
  groupLabel: string;
  editorial?: string;
  image?: MenuVisualGroup["moodImage"];
  sections?: MenuBookSection[];
  notes?: string[];
}

/* Eine physische Seite bleibt bewusst luftig. Die Gewichtung berücksichtigt,
   dass lange Beschreibungen auf der schmalen mobilen Buchseite umbrechen. */
const PAGE_CAPACITY = 5.2;
const HEADING_WEIGHT = 0.92;

function itemWeight(item: MenuItem) {
  if (!item.description) return 0.62;
  if (item.description.length > 82) return 1.18;
  if (item.description.length > 48) return 1.02;
  return 0.86;
}

function paginateGroup(group: MenuVisualGroup): MenuBookPage[] {
  const pages: MenuBookPage[] = [];
  let sections: MenuBookSection[] = [];
  let used = 0;
  let pageIndex = 0;

  const flush = () => {
    if (sections.length === 0) return;
    pages.push({
      id: `${group.id}-menu-${pageIndex}`,
      kind: "menu",
      groupId: group.id,
      groupNumber: group.number,
      groupLabel: group.label,
      sections,
    });
    pageIndex += 1;
    sections = [];
    used = 0;
  };

  for (const category of group.categories) {
    let itemIndex = 0;
    let continued = false;

    while (itemIndex < category.items.length) {
      if (used > 0 && used + HEADING_WEIGHT + itemWeight(category.items[itemIndex]) > PAGE_CAPACITY) {
        flush();
      }

      const fragment: MenuBookSection = {
        id: `${category.slug}-${itemIndex}`,
        title: category.title,
        subtitle: category.subtitle,
        continued,
        items: [],
      };
      sections.push(fragment);
      used += HEADING_WEIGHT;

      while (itemIndex < category.items.length) {
        const weight = itemWeight(category.items[itemIndex]);
        if (fragment.items.length > 0 && used + weight > PAGE_CAPACITY) break;
        fragment.items.push(category.items[itemIndex]);
        used += weight;
        itemIndex += 1;
      }

      continued = itemIndex < category.items.length;
      if (continued) flush();
    }
  }

  flush();
  return pages;
}

function buildMenuBookPages(): MenuBookPage[] {
  const pages = menuVisualGroups.flatMap((group) => [
    {
      id: `${group.id}-chapter`,
      kind: "chapter" as const,
      groupId: group.id,
      groupNumber: group.number,
      groupLabel: group.label,
      editorial: group.editorial,
      image: group.moodImage,
    },
    ...paginateGroup(group),
  ]);

  pages.push({
    id: "buono-a-sapersi",
    kind: "notes",
    groupId: "notes",
    groupNumber: "08",
    groupLabel: "Buono a sapersi",
    notes: [...menuGeneralNotes, menuFootnotes],
  });

  return pages;
}

export const menuBookPages = buildMenuBookPages();

