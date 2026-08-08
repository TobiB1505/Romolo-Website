"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "../../../../sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div style={{ fontFamily: "sans-serif", maxWidth: 560, margin: "80px auto", padding: 24, lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 20, marginBottom: 12 }}>Sanity Studio noch nicht verbunden</h1>
        <p>
          Es ist noch kein Sanity-Projekt hinterlegt. Bitte unter{" "}
          <a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer">
            sanity.io/manage
          </a>{" "}
          ein kostenloses Projekt anlegen und die Werte in <code>.env.local</code> eintragen:
        </p>
        <pre style={{ background: "#f2f2f2", padding: 12, borderRadius: 6, overflowX: "auto" }}>
          {`NEXT_PUBLIC_SANITY_PROJECT_ID=dein-projekt-id\nNEXT_PUBLIC_SANITY_DATASET=production`}
        </pre>
        <p>Danach Dev-Server neu starten – das Studio erscheint dann hier unter /studio.</p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
