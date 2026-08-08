"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import { Container } from "./Container";
import { restaurant } from "@/lib/data/restaurant";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

const MENU_ID = "mobile-navigation";

/**
 * `useLayoutEffect` auf dem Server auszuführen erzeugt eine React-Warnung
 * ("useLayoutEffect does nothing on the server"). Da Client Components in
 * Next.js für das initiale HTML dennoch serverseitig gerendert werden, weicht
 * dieser Hook dort auf `useEffect` aus und verhält sich im Browser wie
 * `useLayoutEffect` (synchron vor dem nächsten Paint).
 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Ab wie vielen Pixeln unterhalb der Oberkante der Hero-Sentinel als verlassen
 * gilt. Entspricht der kompakten Kopfzeilenhöhe.
 */
const HERO_EXIT_OFFSET = 64;

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Overlay-Modus wird nicht per Prop gesetzt, sondern daran erkannt, ob die
   * aktuelle Seite einen Hero-Sentinel rendert. Dadurch bleibt die Kopfzeile
   * im Layout und Seiten müssen nichts durchreichen (siehe Sprint 2).
   *
   * Der Zustand trägt den Pfad mit sich: Wechselt die Route, passt der
   * gespeicherte Pfad nicht mehr und die Kopfzeile fällt automatisch in den
   * Solid-Zustand zurück – ohne Zurücksetzen per setState.
   *
   * Ohne Sentinel bleibt der Wert `null`, was dem Server-Rendering entspricht;
   * daher keine Hydration-Abweichung.
   */
  const [hero, setHero] = useState<{ path: string; past: boolean } | null>(null);

  /**
   * `useLayoutEffect` statt `useEffect`: Bei einer Client-seitigen Navigation
   * ist der Header dieselbe Komponenteninstanz (das Layout bleibt gemountet),
   * nur `pathname` ändert sich. `IntersectionObserver` meldet seinen ersten
   * Zustand jedoch erst asynchron (typischerweise erst nächster Frame) – ohne
   * synchrone Vorabmessung liefe die Seite für einen Frame im zuletzt
   * bekannten Zustand, was z. B. bei /kontakt → / kurz eine falsche
   * (dunkle-auf-dunkel oder helle-auf-hell) Navigation zeigen könnte.
   *
   * Auf dem Server läuft `useLayoutEffect` nicht – siehe
   * `useIsomorphicLayoutEffect` unten, das dafür auf `useEffect` ausweicht,
   * um die bekannte React-SSR-Warnung zu vermeiden.
   */
  useIsomorphicLayoutEffect(() => {
    const sentinel = document.querySelector("[data-hero-sentinel]");
    if (!sentinel) return;

    // Synchrone Erstmessung: unmittelbar korrekt, ohne auf den ersten
    // (asynchronen) IntersectionObserver-Callback warten zu müssen.
    const rect = sentinel.getBoundingClientRect();
    setHero({ path: pathname, past: rect.bottom <= HERO_EXIT_OFFSET });

    const observer = new IntersectionObserver(
      ([entry]) => setHero({ path: pathname, past: !entry.isIntersecting }),
      { rootMargin: `-${HERO_EXIT_OFFSET}px 0px 0px 0px` }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }, []);

  /**
   * Das `close`-Ereignis eines <dialog> steigt nicht auf und wird deshalb von
   * Reacts synthetischem Event-System nicht zuverlässig erfasst. Ohne diesen
   * nativen Listener bliebe nach dem Schließen per ESC `aria-expanded="true"`
   * stehen und die Scroll-Sperre aktiv.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setMenuOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  // Hintergrund darf bei geöffnetem Overlay nicht mitscrollen.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Routenwechsel aus dem Overlay heraus schließt es.
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const activeHero = hero !== null && hero.path === pathname ? hero : null;
  const isOverlay = activeHero !== null && !activeHero.past;
  const isCompact = activeHero !== null && activeHero.past;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isOverlay
          ? "bg-transparent text-cream"
          : "border-b border-hairline bg-cream/85 text-ink shadow-header backdrop-blur-md"
      )}
    >
      <Container
        className={clsx(
          "flex items-center justify-between transition-[height] duration-300",
          isCompact ? "h-16" : "h-20"
        )}
      >
        <Link
          href="/"
          className="font-display text-lg tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
        >
          Ristorante da Romolo
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "group relative py-1 text-sm tracking-wide transition-colors",
                  isOverlay
                    ? "text-cream/80 hover:text-cream"
                    : active
                      ? "text-terracotta"
                      : "text-ink-soft hover:text-ink"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={clsx(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
          <a href={restaurant.phoneHref} className="btn-primary px-5 py-2.5">
            <Phone size={15} aria-hidden /> Anrufen
          </a>
        </nav>

        {/* Auf Mobilgeräten ist die Rufnummer dauerhaft erreichbar – nicht erst
            hinter dem Menü. */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={restaurant.phoneHref}
            aria-label={`Anrufen: ${restaurant.phone}`}
            className="flex size-11 items-center justify-center rounded-full text-current transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            <Phone size={20} aria-hidden />
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            className="flex size-11 items-center justify-center rounded-full text-current transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            <Menu size={24} aria-hidden />
          </button>
        </div>
      </Container>

      {/* Natives <dialog>: liefert Fokus-Falle, ESC und Fokus-Rückgabe an den
          auslösenden Button, ohne zusätzliche Bibliothek. */}
      <dialog
        ref={dialogRef}
        id={MENU_ID}
        className="site-menu m-0 h-[100dvh] max-h-none w-screen max-w-none bg-forest-dark p-0 text-cream backdrop:bg-ink-deep/60"
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">Ristorante da Romolo</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Menü schließen"
              className="flex size-11 items-center justify-center rounded-full transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X size={24} aria-hidden />
            </button>
          </div>

          <nav aria-label="Hauptnavigation mobil" className="mt-10">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.href} className="site-menu__item" style={{ "--i": index } as CSSProperties}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={clsx(
                      "block border-b border-hairline-light py-4 font-display text-3xl transition-colors",
                      pathname === item.href ? "text-gold" : "text-cream hover:text-gold"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-menu__item mt-8" style={{ "--i": navItems.length } as CSSProperties}>
            <a href={restaurant.phoneHref} className="btn-primary w-full px-6 py-4 text-base">
              <Phone size={18} aria-hidden /> {restaurant.phone}
            </a>
          </div>

          <div
            className="site-menu__item mt-auto pt-10 text-sm text-cream/70"
            style={{ "--i": navItems.length + 1 } as CSSProperties}
          >
            <p className="eyebrow mb-3 text-gold">Öffnungszeiten</p>
            <ul className="space-y-1">
              {restaurant.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className="text-right text-cream/60">{entry.hours}</span>
                </li>
              ))}
            </ul>
            <address className="mt-5 not-italic">
              {restaurant.street}
              <br />
              {restaurant.zip} {restaurant.city}
            </address>
          </div>
        </div>
      </dialog>
    </header>
  );
}
