"use client";

import { useMemo, useState } from "react";
import { blogPosts } from "@/lib/site";
import { BlogCard } from "@/components/BlogCard";

export function BlogGrid() {
  const [query, setQuery] = useState("");
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return blogPosts;

    return blogPosts.filter((post) => [post.title, post.excerpt, post.category].join(" ").toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-graphite" key={category}>{category}</span>
        ))}
      </div>
      <label className="max-w-xl text-sm font-semibold">
        Пошук по статтях
        <input className="mt-2 min-h-12 w-full rounded-md border border-black/10 px-3 font-normal focus-visible:focus-ring" placeholder="Введіть тему" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <div className="grid gap-5 md:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
      {filteredPosts.length === 0 ? <p className="rounded-md bg-brand-mist p-4 text-sm font-medium text-brand-graphite">За цим запитом статей поки немає.</p> : null}
      <div className="text-center text-sm font-medium text-brand-graphite">Сторінка 1 з 1</div>
    </div>
  );
}
