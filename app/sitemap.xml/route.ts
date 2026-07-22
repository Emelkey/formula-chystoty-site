import { blogPosts, servicePages, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const lastModified = "2026-07-04T00:00:00.000Z";

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: string;
};

const mainRoutes: SitemapUrl[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/poslugy", changefreq: "weekly", priority: "0.9" },
  { loc: "/prices", changefreq: "monthly", priority: "0.9" },
  { loc: "/nashi-roboty", changefreq: "monthly", priority: "0.8" },
  { loc: "/vidguky", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/pro-nas", changefreq: "monthly", priority: "0.7" },
  { loc: "/kontakty", changefreq: "monthly", priority: "0.8" }
];

const servicePriorityOverrides: Record<string, string> = {
  "prybyrannya-kvartyr-cherkasy": "0.95",
  "generalne-prybyrannya-cherkasy": "0.95",
  "generalne-prybyrannya-kvartyry-cherkasy": "0.9",
  "generalne-prybyrannya-kuhni-cherkasy": "0.9",
  "pidtrymuyuche-prybyrannya-kvartyr-cherkasy": "0.9",
  "prybyrannya-pislya-remontu-cherkasy": "0.95",
  "himchystka-mebliv-cherkasy": "0.95",
  "himchystka-dyvana-cherkasy": "0.9",
  "himchystka-avto-cherkasy": "0.9",
  "myttya-vikon-cherkasy": "0.9",
  "myttya-fasadiv-cherkasy": "0.9",
  "dezinfektsiya-prymishchen-cherkasy": "0.9"
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absolutePath(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}

function normalizeLastmod(value?: string) {
  if (!value) return lastModified;
  return value.includes("T") ? value : `${value}T00:00:00.000Z`;
}

function buildUrlEntry({ loc, lastmod, changefreq, priority }: SitemapUrl) {
  return [
    "  <url>",
    `    <loc>${escapeXml(absolutePath(loc))}</loc>`,
    `    <lastmod>${normalizeLastmod(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>"
  ].join("\n");
}

export function GET() {
  const serviceRoutes: SitemapUrl[] = servicePages.map((service) => ({
    loc: `/${service.slug}`,
    changefreq: "monthly",
    priority: servicePriorityOverrides[service.slug] ?? "0.8"
  }));

  const blogRoutes: SitemapUrl[] = blogPosts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt,
    changefreq: "weekly",
    priority: "0.6"
  }));

  const urls = [...mainRoutes, ...serviceRoutes, ...blogRoutes];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.map(buildUrlEntry).join("\n"),
    "</urlset>"
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
