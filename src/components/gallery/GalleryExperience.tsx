"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "@/lib/types";
import styles from "./GalleryExperience.module.css";

export function GalleryExperience({ images }: { images: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => document.body.classList.remove(styles.locked);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  function openImage(index: number) {
    setActiveIndex(index);
    document.body.classList.add(styles.locked);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  const activeImage = images[activeIndex];

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openImage(index)}
            className={`${styles.tile} ${styles[`tile${index + 1}`] ?? ""}`}
            aria-label={`Bild ${index + 1} vergrößern: ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className={styles.image} />
            <span className={styles.tileShade} aria-hidden />
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.expand}><Expand size={15} aria-hidden /> Ansehen</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Galerieansicht"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showPrevious();
          if (event.key === "ArrowRight") showNext();
        }}
      >
        <div className={styles.lightboxInner}>
          <div className={styles.lightboxImage}>
            <Image src={activeImage.src} alt={activeImage.alt} fill sizes="94vw" className="object-contain" />
          </div>
          <div className={styles.lightboxBar}>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <p>{activeImage.alt}</p>
            <div>
              <button type="button" onClick={showPrevious} aria-label="Vorheriges Bild"><ArrowLeft size={19} /></button>
              <button type="button" onClick={showNext} aria-label="Nächstes Bild"><ArrowRight size={19} /></button>
            </div>
          </div>
        </div>
        <button type="button" onClick={close} className={styles.close} aria-label="Galerie schließen"><X size={22} /></button>
      </dialog>
    </>
  );
}
