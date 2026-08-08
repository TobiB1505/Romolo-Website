"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./ReservationForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function ReservationForm() {
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
      <div className={styles.success}>
        <p className="font-medium">Vielen Dank für Ihre Reservierungsanfrage!</p>
        <p className="mt-1 text-sm">Wir melden uns so schnell wie möglich bei Ihnen zur Bestätigung.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Honeypot – für echte Nutzer unsichtbar */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">
            Name *
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">
            E-Mail *
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={styles.input} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="partySize">
            Personenzahl *
          </label>
          <input id="partySize" name="partySize" type="number" min={1} max={30} required className={styles.input} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="date">
            Datum *
          </label>
          <input id="date" name="date" type="date" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="time">
            Uhrzeit *
          </label>
          <input id="time" name="time" type="time" required className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">
          Nachricht
        </label>
        <textarea id="message" name="message" rows={4} className={styles.input} placeholder="Allergien, besondere Wünsche, …" />
      </div>

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
        {status === "submitting" ? "Wird gesendet …" : <>Reservierungsanfrage senden <ArrowRight size={16} aria-hidden /></>}
      </button>
      <p className={styles.note}>
        Diese Anfrage ist unverbindlich. Wir bestätigen Ihre Reservierung per E-Mail oder Telefon.
      </p>
    </form>
  );
}
