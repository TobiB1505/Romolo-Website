"use client";

import { useState } from "react";
import clsx from "clsx";
import { menuGroups, menuFootnotes, menuGeneralNotes } from "@/lib/data/menu";
import { MenuCategoryCard } from "./MenuCategoryCard";

export function MenuTabs() {
  const [activeGroup, setActiveGroup] = useState(menuGroups[0].id);
  const group = menuGroups.find((g) => g.id === activeGroup)!;

  return (
    <div>
      <div className="mb-12 flex justify-center gap-3">
        {menuGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGroup(g.id)}
            className={clsx(
              "rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-colors",
              activeGroup === g.id ? "bg-terracotta text-cream" : "bg-cream-dark text-ink-soft hover:text-ink"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {group.categories.map((category) => (
          <MenuCategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <div className="mt-16 space-y-2 border-t border-ink/10 pt-6 text-xs text-ink-soft">
        {menuGeneralNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>{menuFootnotes}</p>
      </div>
    </div>
  );
}
