import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-brand-mist">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-bold">Сторінку не знайдено</h1>
        <p className="mt-4 leading-7 text-brand-graphite">Можливо, сторінка змінила адресу. Перейдіть на головну або перегляньте послуги.</p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-md bg-brand-green px-5 py-3 font-semibold text-white" href="/">На головну</Link>
          <Link className="rounded-md bg-white px-5 py-3 font-semibold text-brand-black" href="/poslugy">Послуги</Link>
        </div>
      </div>
    </section>
  );
}
