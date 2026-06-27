import Image from "next/image";
import Link from "next/link";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  mainImage: string;
  imageAlt: string;
};

export function BlogCard({ post }: { post: BlogCardPost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-soft">
      <Image src={post.mainImage} alt={post.imageAlt} width={1200} height={800} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[3/2] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <time className="text-sm text-brand-graphite" dateTime={post.publishedAt}>{new Intl.DateTimeFormat("uk-UA").format(new Date(post.publishedAt))}</time>
        <h2 className="mt-3 text-xl font-bold leading-snug">{post.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-brand-graphite">{post.excerpt}</p>
        <Link className="mt-5 font-semibold text-brand-hover" href={`/blog/${post.slug}`}>
          Читати
        </Link>
      </div>
    </article>
  );
}
