import { defineCliConfig } from "sanity/cli";

// Keep CLI-only local schema tooling aligned with the existing Studio configuration.
// Credentials and dataset contents are not stored or changed by this configuration.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
  }
});
