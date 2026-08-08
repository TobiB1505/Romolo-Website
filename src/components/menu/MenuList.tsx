import { menuVisualGroups } from "@/lib/data/menuPresentation";
import { menuFootnotes, menuGeneralNotes } from "@/lib/data/menu";
import { MenuGroup } from "@/components/menu/MenuGroup";

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

      <div className="mt-4 space-y-2 border-t border-hairline pt-6 text-xs text-ink-soft">
        {menuGeneralNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>{menuFootnotes}</p>
      </div>
    </div>
  );
}
