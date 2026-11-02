/**
 * Match the compact homepage gallery's CSS slots, not a viewport fraction.
 * The full works page keeps its existing image behavior in this scoped change.
 * Container: viewport - 40px below lg; viewport - 160px at lg; max 1200px.
 * Grid: three columns from md with two 20px gaps. Cards have a 2px border,
 * comparison media has 24px padding, and paired photos have a 12px gap.
 * Round capped widths up by less than one pixel; let srcset handle device DPR.
 */
export const compactWorkImageSizes = {
  single: "(min-width: 1360px) 385px, (min-width: 1024px) calc((100vw - 206px) / 3), (min-width: 768px) calc((100vw - 86px) / 3), calc(100vw - 42px)",
  pair: "(min-width: 1360px) 175px, (min-width: 1024px) calc((100vw - 314px) / 6), (min-width: 768px) calc((100vw - 194px) / 6), calc((100vw - 78px) / 2)",
  combined: "(min-width: 1360px) 361px, (min-width: 1024px) calc((100vw - 278px) / 3), (min-width: 768px) calc((100vw - 158px) / 3), calc(100vw - 66px)",
} as const;
