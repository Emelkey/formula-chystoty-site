import type { MetadataRoute } from "next";
import { blogPosts, servicePages, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "poslugy", "tsiny", "nashi-roboty", "vidguky", "blog", "pro-nas", "kontakty"];
  const serviceRoutes = servicePages.map((service) => service.slug);
  const blogRoutes = blogPosts.map((post) => `blog/${post.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("blog/") ? 0.6 : 0.8
  }));
}
