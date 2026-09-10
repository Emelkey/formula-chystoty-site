// Compatibility view; edit ownership only in seo/query-map.ts.
import { queryMap } from "../seo/query-map.ts";
export type { SeoIntentRole } from "../seo/query-map.ts";
export const seoIntentRegistry = queryMap.map((entry) => ({
  ...entry,
  primaryQuery: entry.primaryIntent,
  secondaryQueries: entry.secondaryIntents,
  prohibitedPrimaryQueries: entry.forbiddenIntents
}));
export type SeoIntentEntry = (typeof seoIntentRegistry)[number];
export const seoIntentPaths = new Set(queryMap.map((entry) => entry.path));
