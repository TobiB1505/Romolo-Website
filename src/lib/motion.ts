/**
 * Zentrale Motion-Konfiguration.
 *
 * Alle Animationswerte der Website stammen aus dieser Datei. Komponenten
 * definieren keine eigenen Dauern oder Easings – so bleibt das Timing an
 * einer Stelle anpassbar.
 *
 * Bewusst frei von Motion-Imports, damit die Datei auch aus Server
 * Components gelesen werden kann, ohne die Bibliothek einzuziehen.
 */

type Cubic = [number, number, number, number];

/** Dauern in Sekunden (Motion rechnet in Sekunden, nicht in Millisekunden). */
export const duration = {
  /** Buttons, Navigation, Farbwechsel. */
  fast: 0.2,
  /** Text-Reveals, Standard für Einblendungen. */
  base: 0.5,
  /** Bild-Reveals und Crossfades. */
  image: 0.8,
  /** Hero-Entrance (langsamer Zoom). */
  hero: 1.6,
} as const;

export const easing = {
  /** ease-out-quint – ruhiges, hochwertiges Auslaufen. Primäres Entrance-Easing. */
  entrance: [0.22, 1, 0.36, 1] as Cubic,
  /** Für Ausblendungen, die zügiger verschwinden dürfen. */
  exit: [0.4, 0, 1, 1] as Cubic,
};

/** Versatz zwischen aufeinanderfolgenden Kindelementen, in Sekunden. */
export const stagger = {
  /** Textzeilen. */
  text: 0.08,
  /** Inhaltsblöcke, Grid- und Listenelemente. */
  content: 0.11,
} as const;

/** Translationsweg in Pixeln für Reveal-Bewegungen. */
export const distance = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

/**
 * Standard-Viewport für scrollgetriebene Einblendungen.
 * Der negative Rand löst die Animation erst aus, wenn das Element
 * spürbar im Bild ist – nicht schon beim ersten Pixel.
 */
export const viewportDefaults = {
  once: true,
  margin: "-12% 0px -12% 0px",
} as const;

/**
 * Fade-Dauer, wenn der Nutzer reduzierte Bewegung angefordert hat.
 * Inhalte blenden dann nur noch kurz ein, ohne Versatz.
 */
export const reducedDuration = 0.25;

/**
 * Zeitversatz der Hero-Entrance-Choreografie, in Sekunden ab Seitenaufruf.
 * Jeder Schritt nutzt `easing.entrance`; nur die Startzeitpunkte unterscheiden
 * sich, damit die Elemente nacheinander statt gleichzeitig erscheinen.
 */
export const heroSequence = {
  eyebrow: 0.45,
  headline: 0.7,
  brandLine: 0.95,
  subline: 1.15,
  cta: 1.3,
  scrollCue: 1.6,
} as const;

/** Vergrößerungsfaktor, aus dem das Hero-Bild beim Laden herauszoomt. */
export const heroImageScale = 1.055;

/** Skalierung, aus der große Story-Bilder beim Erscheinen einlaufen. */
export const imageRevealScale = 1.04;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/**
 * Startversatz einer Reveal-Bewegung.
 * Gibt bei "none" ein leeres Objekt zurück, damit keine Transform-Eigenschaft
 * gesetzt und damit auch keine überflüssige Composite-Ebene erzeugt wird.
 */
export function offsetFor(direction: RevealDirection, px: number) {
  switch (direction) {
    case "up":
      return { y: px };
    case "down":
      return { y: -px };
    case "left":
      return { x: px };
    case "right":
      return { x: -px };
    case "none":
      return {};
  }
}
