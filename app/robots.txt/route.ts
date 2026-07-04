import { siteUrl } from "@/lib/site";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /wp-admin/\nDisallow: /wp-content/plugins/\nDisallow: /*/feed\nDisallow: /feed\n\nSitemap: ${siteUrl}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
