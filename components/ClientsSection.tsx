import { clients } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function ClientsSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading eyebrow="Клієнти" title="З ким ми працювали" description="Маємо досвід роботи з ресторанами, готелями, торговими мережами, АЗК та великим бізнесом у Черкасах і регіоні." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div className="rounded-lg border border-black/5 bg-brand-mist p-5 text-lg font-bold text-brand-black" key={client}>
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
