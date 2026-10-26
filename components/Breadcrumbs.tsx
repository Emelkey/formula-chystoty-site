import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { SeoJsonLd } from "@/components/SeoJsonLd";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const allItems = [{ name: "Головна", href: "/" }, ...items];

  return (
    <>
      <nav className="container pt-6 text-sm text-brand-graphite/75" aria-label="Хлібні крихти">
        <ol className="flex flex-wrap gap-2">
          {allItems.map((item, index) => (
            <li className="flex items-center gap-2" key={item.href}>
              {index > 0 ? <span aria-hidden>/</span> : null}
              <Link className="hover:text-brand-hover" href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.href)
          }))
        }}
      />
    </>
  );
}
