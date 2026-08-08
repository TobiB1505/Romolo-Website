export const apiVersion = "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** true sobald ein echtes Sanity-Projekt (siehe .env.local) verbunden ist. */
export const isSanityConfigured = Boolean(projectId);
