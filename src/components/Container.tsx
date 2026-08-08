import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Breitenstufen des Layouts.
 *
 * Die Breite wird bewusst über diesen Prop gesteuert und nicht über eine
 * `max-w-*`-Klasse im `className`: Bei zwei konkurrierenden `max-width`-
 * Utilities entscheidet sonst die Reihenfolge im generierten Stylesheet und
 * nicht die Reihenfolge im Aufruf.
 */
const sizes = {
  /** Fließtext, z. B. Rechtstexte – auf angenehme Zeilenlänge begrenzt. */
  prose: "max-w-measure-wide",
  /** Schmale Inhaltsspalte. */
  narrow: "max-w-4xl",
  /** Standardbreite der Seite. */
  default: "max-w-6xl",
  /** Breite Bild- und Editorial-Layouts. */
  wide: "max-w-7xl",
  /** Ohne Begrenzung, z. B. für Full-Bleed-Bereiche. */
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof sizes;

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return <div className={clsx("mx-auto w-full px-6", sizes[size], className)}>{children}</div>;
}
