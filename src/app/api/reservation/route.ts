import { NextResponse } from "next/server";
import { Resend } from "resend";
import { restaurant } from "@/lib/data/restaurant";

interface ReservationPayload {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: string;
  message?: string;
  company: string; // Honeypot – muss leer sein
}

function isValidPayload(data: Partial<ReservationPayload>): data is ReservationPayload {
  return Boolean(data.name && data.email && data.date && data.time && data.partySize);
}

export async function POST(request: Request) {
  let data: Partial<ReservationPayload>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: Bots füllen versteckte Felder aus, echte Nutzer nicht.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidPayload(data)) {
    return NextResponse.json({ error: "Bitte alle Pflichtfelder ausfüllen." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL || restaurant.email;

  if (!apiKey) {
    console.warn(
      "[reservation] RESEND_API_KEY ist nicht gesetzt – Anfrage wurde NICHT per E-Mail versendet:",
      data
    );
    return NextResponse.json(
      { error: "Der Reservierungsversand ist aktuell nicht konfiguriert. Bitte rufen Sie uns an." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Reservierung Website <reservierung@ristorante-da-romolo.com>",
      to,
      replyTo: data.email,
      subject: `Neue Reservierungsanfrage – ${data.name} (${data.date}, ${data.time})`,
      text: [
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        data.phone ? `Telefon: ${data.phone}` : null,
        `Datum: ${data.date}`,
        `Uhrzeit: ${data.time}`,
        `Personenzahl: ${data.partySize}`,
        data.message ? `Nachricht: ${data.message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (error) {
    console.error("[reservation] Versand fehlgeschlagen:", error);
    return NextResponse.json(
      { error: "Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
