"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink" onClick={() => setOpen(false)}>
          Ristorante da Romolo
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm tracking-wide transition-colors hover:text-terracotta",
                  active ? "text-terracotta" : "text-ink-soft"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={restaurant.phoneHref}
            className="flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm text-cream transition-colors hover:bg-terracotta-dark"
          >
            <Phone size={16} /> Anrufen
          </a>
        </nav>

        <button
          type="button"
          className="text-ink md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-black/5 bg-cream md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-md px-2 py-3 text-base",
                  pathname === item.href ? "text-terracotta" : "text-ink-soft"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={restaurant.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-terracotta px-4 py-3 text-cream"
            >
              <Phone size={16} /> {restaurant.phone}
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
