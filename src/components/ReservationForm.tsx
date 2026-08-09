"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./ReservationForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

interface ReservationFormProps {
  variant?: "light" | "dark";
}

export function ReservationForm({ variant = "light" }: ReservationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Unbekannter Fehler");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  if (status === "success") {
    return (
      <div className={`${styles.success} ${variant === "dark" ? styles.successDark : ""}`}>
        <p className="font-medium">Anfrage ist raus.</p>
        <p>Wir melden uns schnellstmöglich per E-Mail mit deiner Bestätigung.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${variant === "dark" ? styles.formDark : ""}`}>
      {/* Honeypot – für echte Nutzer unsichtbar */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset className={styles.group}>
        <legend className={styles.legend}><span>01</span> Wann passt es?</legend>
        <div className={styles.bookingGrid}>
          <div className={`${styles.field} ${styles.dateField}`}>
            <label htmlFor="date">Datum</label>
            <input id="date" name="date" type="date" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor="time">Uhrzeit</label>
            <input id="time" name="time" type="time" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor="partySize">Gäste</label>
            <select id="partySize" name="partySize" defaultValue="" required className={styles.input}>
              <option value="" disabled>Auswählen</option>
              {Array.from({ length: 9 }, (_, index) => index + 1).map((amount) => (
                <option key={amount} value={amount}>{amount}</option>
              ))}
              <option value="10+">10+</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}><span>02</span> Für wen reservieren wir?</legend>
        <div className={styles.contactGrid}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required className={styles.input} placeholder="Dein Name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">E-Mail</label>
            <input id="email" name="email" type="email" autoComplete="email" required className={styles.input} placeholder="name@email.de" />
          </div>
        </div>
      </fieldset>

      <details className={styles.optional}>
        <summary>Noch etwas wichtig?<span aria-hidden>+</span></summary>
        <div className={styles.optionalField}>
          <label htmlFor="message">Wünsche oder Hinweise</label>
          <textarea id="message" name="message" rows={3} className={styles.input} placeholder="Allergien, Kinderstuhl oder besonderer Anlass?" />
        </div>
      </details>

      {status === "error" && (
        <p className={styles.error}>
          {errorMessage || "Es ist ein Fehler aufgetreten. Bitte rufen Sie uns an."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={styles.button}
      >
        {status === "submitting" ? "Wird gesendet …" : <>Tisch anfragen <ArrowRight size={17} aria-hidden /></>}
      </button>
      <p className={styles.note}>
        Dauert weniger als eine Minute. Die Bestätigung kommt per E-Mail.
      </p>
    </form>
  );
}
