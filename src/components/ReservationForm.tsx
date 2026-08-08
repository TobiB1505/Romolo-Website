"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft/50 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta";

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
      <div className="rounded-lg bg-forest/10 p-6 text-forest">
        <p className="font-medium">Vielen Dank für Ihre Reservierungsanfrage!</p>
        <p className="mt-1 text-sm">Wir melden uns so schnell wie möglich bei Ihnen zur Bestätigung.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot – für echte Nutzer unsichtbar */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name *
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            E-Mail *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="partySize" className="mb-1.5 block text-sm font-medium">
            Personenzahl *
          </label>
          <input id="partySize" name="partySize" type="number" min={1} max={30} required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium">
            Datum *
          </label>
          <input id="date" name="date" type="date" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="time" className="mb-1.5 block text-sm font-medium">
            Uhrzeit *
          </label>
          <input id="time" name="time" type="time" required className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Nachricht
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} placeholder="Allergien, besondere Wünsche, …" />
      </div>

      {status === "error" && (
        <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark">
          {errorMessage || "Es ist ein Fehler aufgetreten. Bitte rufen Sie uns an."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Wird gesendet …" : "Reservierungsanfrage senden"}
      </button>
      <p className="text-xs text-ink-soft">
        Diese Anfrage ist unverbindlich. Wir bestätigen Ihre Reservierung per E-Mail oder Telefon.
      </p>
    </form>
  );
}
