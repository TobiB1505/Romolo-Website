"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type MenuView = "book" | "editorial";

/**
 * Harter Fallback: auf false stellen, um die Buchinszenierung inklusive
 * Umschalter vollständig zu entfernen und Sprint 3 unverändert auszuliefern.
 */
export const BOOK_EXPERIENCE_ENABLED = true;

/** Weicher Fallback: "editorial" macht Sprint 3 zur vorausgewählten Ansicht. */
export const DEFAULT_MENU_VIEW: MenuView = "book";

const STORAGE_KEY = "romolo-menu-view";

interface MenuViewContextValue {
  view: MenuView;
  setView: (view: MenuView) => void;
}

const MenuViewContext = createContext<MenuViewContextValue | null>(null);

export function MenuViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<MenuView>(
    BOOK_EXPERIENCE_ENABLED ? DEFAULT_MENU_VIEW : "editorial",
  );

  useEffect(() => {
    if (!BOOK_EXPERIENCE_ENABLED) return;

    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch {
      // Restriktive Browsermodi dürfen die Speicherung verhindern.
    }
    if (stored !== "book" && stored !== "editorial") return;

    const frame = window.requestAnimationFrame(() => setViewState(stored));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setView = useCallback((nextView: MenuView) => {
    if (!BOOK_EXPERIENCE_ENABLED) {
      setViewState("editorial");
      return;
    }

    setViewState(nextView);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, nextView);
    } catch {
      // Die Umschaltung funktioniert auch ohne persistente Speicherung.
    }
  }, []);

  const value = useMemo(() => ({ view, setView }), [view, setView]);
  return <MenuViewContext value={value}>{children}</MenuViewContext>;
}

export function useMenuView() {
  const context = useContext(MenuViewContext);
  if (!context) throw new Error("useMenuView muss innerhalb von MenuViewProvider verwendet werden.");
  return context;
}
