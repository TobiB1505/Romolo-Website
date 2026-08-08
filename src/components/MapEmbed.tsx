"use client";

import { useState } from "react";
import { restaurant } from "@/lib/data/restaurant";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(`${restaurant.name}, ${restaurant.street}, ${restaurant.zip} ${restaurant.city}`);

  if (!loaded) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg bg-cream-dark p-6 text-center">
        <p className="text-sm text-ink-soft">
          Die Karte wird von Google Maps geladen. Beim Anzeigen werden Daten an Google übertragen (siehe{" "}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          ).
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta-dark"
        >
          Karte laden &amp; anzeigen
        </button>
      </div>
    );
  }

  return (
    <iframe
      title={`Anfahrt zu ${restaurant.name}`}
      className="aspect-video w-full rounded-lg border-0"
      loading="lazy"
      src={`https://www.google.com/maps?q=${query}&output=embed`}
    />
  );
}
