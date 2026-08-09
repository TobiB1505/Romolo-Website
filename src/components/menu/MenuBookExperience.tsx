"use client";

import Image from "next/image";
import {
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { BookOpen, ChevronLeft, ChevronRight, List } from "lucide-react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMenuView } from "@/components/menu/MenuViewProvider";
import type { MenuBookPage } from "@/lib/data/menuBook";
import type { MenuVisualGroup } from "@/lib/data/menuPresentation";
import styles from "./MenuExperience.module.css";

interface MenuBookExperienceProps {
  pages: MenuBookPage[];
  groups: Pick<MenuVisualGroup, "id" | "number" | "label">[];
}

const MOBILE_QUERY = "(max-width: 63.999rem)";

function subscribeMobile(callback: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerMobileSnapshot() {
  return false;
}

export function MenuBookExperience({ pages, groups }: MenuBookExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeTurnRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getServerMobileSnapshot);
  const { setView } = useMenuView();
  const desktopLeaves = useMemo(
    () => Array.from({ length: Math.ceil(pages.length / 2) }, (_, index) => pages.slice(index * 2, index * 2 + 2)),
    [pages],
  );
  const turnCount = isMobile ? pages.length : desktopLeaves.length;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const bookPosition = useTransform(scrollYProgress, [0, 1], [0, turnCount]);
  const desktopBookX = useTransform(bookPosition, [0, 0.9], ["-25%", "0%"]);
  const bookScale = useTransform(bookPosition, [0, 0.85], [0.9, 1]);
  const introOpacity = useTransform(bookPosition, [0, 0.55, 1], [1, 0.35, 0]);
  const baseOpacity = useTransform(bookPosition, [0.18, 0.82], [0, 1]);
  const [activeTurn, setActiveTurn] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState(1);

  useMotionValueEvent(bookPosition, "change", (latest) => {
    const nextTurn = Math.max(0, Math.min(turnCount, Math.round(latest)));
    if (activeTurnRef.current !== nextTurn) {
      setTurnDirection(nextTurn > activeTurnRef.current ? 1 : -1);
      activeTurnRef.current = nextTurn;
      setActiveTurn(nextTurn);
    }

    const nextPage = isMobile
      ? Math.max(0, Math.min(pages.length - 1, Math.round(latest - 1)))
      : Math.max(0, Math.min(pages.length - 1, Math.max(0, Math.round(latest) - 1) * 2));
    setActivePageIndex((current) => (current === nextPage ? current : nextPage));
  });

  const activePage = pages[activePageIndex] ?? pages[0];

  function scrollToPosition(position: number) {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const top = sectionTop + (Math.max(0, Math.min(turnCount, position)) / turnCount) * travel;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  function scrollToGroup(groupId: string) {
    const pageIndex = pages.findIndex((page) => page.groupId === groupId);
    if (pageIndex < 0) return;
    const position = isMobile ? pageIndex + 1 : 1 + Math.ceil(pageIndex / 2);
    scrollToPosition(position);
  }

  function showEditorialMenu() {
    setView("editorial");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.storyBookTrack}
        style={{
          "--book-turns": turnCount,
          "--book-track-height": `${100 + turnCount * (isMobile ? 90 : 74)}svh`,
        } as CSSProperties}
        aria-label="Interaktive Speisekarte"
      >
        <div data-hero-sentinel aria-hidden="true" className={styles.storyBookHeaderSentinel} />
        <div className={styles.storyBookSticky}>
          <div className={styles.storyBookStage}>
          <Image
            src="/images/categories/pasta.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className={styles.storyBookBackdrop}
          />
          <div className={styles.storyBookShade} aria-hidden />
          <div className={styles.menuGrain} aria-hidden />

          <m.div className={styles.storyBookIntro} style={{ opacity: introOpacity }}>
            <span>La nostra cucina</span>
            <p>Scrolle durch unsere Karte.<br />Seite für Seite.</p>
          </m.div>

          <button type="button" className={styles.storyBookListButton} onClick={showEditorialMenu}>
            <List size={15} aria-hidden />
            Klassische Liste
          </button>

          <nav className={styles.storyBookChapters} aria-label="Kapitel der Speisekarte">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                data-active={activePage?.groupId === group.id || undefined}
                onClick={() => scrollToGroup(group.id)}
                aria-label={`Zu ${group.label}`}
              >
                <span>{group.number}</span>
                <strong>{group.label}</strong>
              </button>
            ))}
          </nav>

          <m.div
            className={styles.storyBookDesktop}
            style={{ x: prefersReducedMotion ? 0 : desktopBookX, scale: prefersReducedMotion ? 1 : bookScale }}
            aria-hidden={isMobile}
          >
            <m.div className={styles.storyBookBase} style={{ opacity: prefersReducedMotion ? 1 : baseOpacity }}>
              <div className={styles.storyBookBaseLeft} />
              <div className={styles.storyBookBaseRight} />
              <i className={styles.storyBookSpine} aria-hidden />
            </m.div>

            <TurningSheet index={0} total={desktopLeaves.length + 1} position={bookPosition} className={styles.storyBookDesktopSheet} reducedMotion={Boolean(prefersReducedMotion)}>
              <CoverFront />
              <InsideCover />
            </TurningSheet>

            {desktopLeaves.map((leaf, index) => (
              <TurningSheet
                key={leaf[0]?.id ?? index}
                index={index + 1}
                total={desktopLeaves.length + 1}
                position={bookPosition}
                className={styles.storyBookDesktopSheet}
                reducedMotion={Boolean(prefersReducedMotion)}
              >
                <BookPage page={leaf[0]} pageNumber={index * 2 + 1} />
                {leaf[1] ? <BookPage page={leaf[1]} pageNumber={index * 2 + 2} /> : <BlankPage />}
              </TurningSheet>
            ))}
          </m.div>

          <div
            className={styles.storyBookMobile}
            aria-hidden={!isMobile}
          >
            <div className={styles.storyBookMobileBase} />
            <AnimatePresence initial={false}>
              <m.div
                key={activeTurn}
                className={styles.storyBookMobilePage}
                initial={prefersReducedMotion ? false : {
                  opacity: 0.35,
                  rotateY: turnDirection > 0 ? 82 : -82,
                  x: turnDirection > 0 ? 10 : -10,
                }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={prefersReducedMotion ? undefined : {
                  opacity: 0.2,
                  rotateY: turnDirection > 0 ? -82 : 82,
                  x: turnDirection > 0 ? -10 : 10,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: turnDirection > 0 ? "left center" : "right center" }}
              >
                {activeTurn === 0
                  ? <CoverFront />
                  : activePage
                    ? <BookPage page={activePage} pageNumber={activePageIndex + 1} />
                    : <BlankPage />}
              </m.div>
            </AnimatePresence>
          </div>

          <div className={styles.storyBookProgress} aria-live="polite">
            <button type="button" onClick={() => scrollToPosition(activeTurn - 1)} disabled={activeTurn <= 0} aria-label="Vorherige Seite">
              <ChevronLeft size={16} aria-hidden />
            </button>
            <span>
              {activeTurn === 0 ? "Buch öffnen" : `${activePage?.groupLabel ?? "La Carta"} · ${String(activePageIndex + 1).padStart(2, "0")}/${String(pages.length).padStart(2, "0")}`}
            </span>
            <button type="button" onClick={() => scrollToPosition(activeTurn + 1)} disabled={activeTurn >= turnCount} aria-label="Nächste Seite">
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>

          <div className={styles.storyBookScrollCue} aria-hidden>
            <BookOpen size={15} />
            <span>{activeTurn === 0 ? "Scrollen zum Öffnen" : "Weiterblättern"}</span>
          </div>
          </div>
        </div>
      </section>

      <section className={styles.storyBookOutro}>
        <span>Fine</span>
        <h2>Ci vediamo da Romolo.</h2>
        <p>Alle Gerichte gibt es auch zum Abholen.</p>
      </section>
    </>
  );
}

function TurningSheet({
  index,
  total,
  position,
  className,
  reducedMotion,
  children,
}: {
  index: number;
  total: number;
  position: MotionValue<number>;
  className: string;
  reducedMotion: boolean;
  children: [ReactNode, ReactNode];
}) {
  const rotateY = useTransform(
    position,
    reducedMotion ? [index, index + 0.001] : [index, index + 1],
    [0, -180],
    { clamp: true },
  );
  const [turned, setTurned] = useState(false);

  useMotionValueEvent(rotateY, "change", (latest) => {
    const next = latest <= -90;
    setTurned((current) => (current === next ? current : next));
  });

  return (
    <m.div
      className={className}
      style={{ rotateY, zIndex: turned ? index + 1 : total - index + 10 }}
    >
      <div className={styles.storyBookSheetFront}>{children[0]}</div>
      <div className={styles.storyBookSheetBack}>{children[1]}</div>
    </m.div>
  );
}

function CoverFront() {
  return (
    <div className={styles.bookCoverFront}>
      <span className={styles.bookCoverKicker}>Ristorante</span>
      <h1>La <em>Carta</em></h1>
      <i aria-hidden />
      <small>Da Romolo · Miesbach</small>
    </div>
  );
}

function InsideCover() {
  return (
    <div className={styles.storyBookInsideCover}>
      <span>Ristorante da Romolo</span>
      <strong>Fatto con amore.</strong>
      <p>Italienische Küche im Herzen von Miesbach.</p>
    </div>
  );
}

function BlankPage() {
  return <div className={styles.storyBookBlankPage} aria-hidden />;
}

function BookPage({ page, pageNumber }: { page: MenuBookPage; pageNumber: number }) {
  if (page.kind === "chapter") {
    return (
      <article className={styles.storyBookChapterPage}>
        {page.image && (
          <Image
            src={page.image.src}
            alt={page.image.alt}
            fill
            sizes="(min-width: 1024px) 42vw, 88vw"
            className={styles.storyBookChapterImage}
            style={{ objectPosition: page.image.objectPosition ?? "center" }}
          />
        )}
        <div className={styles.storyBookChapterShade} aria-hidden />
        <div className={styles.storyBookChapterCopy}>
          <span>{page.groupNumber} · Capitolo</span>
          <h2>{page.groupLabel}</h2>
          {page.editorial && <p>{page.editorial}</p>}
        </div>
        <PageFolio pageNumber={pageNumber} />
      </article>
    );
  }

  if (page.kind === "notes") {
    return (
      <article className={`${styles.storyBookPaperPage} ${styles.storyBookNotesPage}`}>
        <span className={styles.storyBookPageKicker}>Buono a sapersi</span>
        <h2>Hinweise</h2>
        <div>
          {page.notes?.map((note) => <p key={note}>{note}</p>)}
        </div>
        <PageFolio pageNumber={pageNumber} />
      </article>
    );
  }

  return (
    <article className={styles.storyBookPaperPage}>
      <header className={styles.storyBookPageHeader}>
        <span>{page.groupNumber}</span>
        <strong>{page.groupLabel}</strong>
        <i aria-hidden />
        <small>Da Romolo</small>
      </header>
      <div className={styles.storyBookPageSections}>
        {page.sections?.map((section) => (
          <section key={section.id} className={styles.storyBookMenuSection}>
            <div className={styles.storyBookMenuHeading}>
              <h2>{section.title}</h2>
              <span>{section.continued ? "Fortsetzung" : section.subtitle}</span>
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item.name + item.description}>
                  <div>
                    <strong>{item.name}</strong>
                    {item.note && <sup>({item.note})</sup>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <i aria-hidden />
                  <b>{item.price}</b>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <PageFolio pageNumber={pageNumber} />
    </article>
  );
}

function PageFolio({ pageNumber }: { pageNumber: number }) {
  return <span className={styles.storyBookFolio}>{String(pageNumber).padStart(2, "0")}</span>;
}
