import { createClient } from "@sanity/client";

export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-23";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: sanityApiVersion,
  useCdn: true
});
