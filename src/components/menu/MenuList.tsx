import { menuVisualGroups } from "@/lib/data/menuPresentation";
import { menuFootnotes, menuGeneralNotes } from "@/lib/data/menu";
import { MenuGroup } from "@/components/menu/MenuGroup";
import styles from "./MenuExperience.module.css";

/**
 * Rendert alle sieben visuellen Hauptgruppen in Reihenfolge, gefolgt von den
 * bestehenden Fußnoten/Zusatzstoffhinweisen. Reines Server Component – kein
 * JavaScript nötig, damit die komplette Karte lesbar ist.
 */
export function MenuList() {
  return (
    <div>
      {menuVisualGroups.map((group, index) => (
        <MenuGroup key={group.id} group={group} isFirst={index === 0} />
      ))}

      <aside className={styles.menuNotes} aria-label="Hinweise und Zusatzstoffe">
        <span className="eyebrow">Buono a sapersi</span>
        <div>
        {menuGeneralNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>{menuFootnotes}</p>
        </div>
      </aside>
    </div>
  );
}
