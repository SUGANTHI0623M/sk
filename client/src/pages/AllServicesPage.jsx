import { Seo } from "../components/Seo.jsx";
import { services } from "./ServicesPage.jsx";

export const AllServicesPage = () => (
  <>
    <Seo
      title="All Salon Services | SK Pro Beauty Hub Shoolagiri"
      description="Browse all beauty parlour, bridal makeup, hair, skin, spa, pedicure and eyebrow services offered by SK Pro Beauty Hub & Makeover Studio in Shoolagiri."
      keywords="All salon services Shoolagiri, pedicure, eyebrow shaping, bridal packages"
      urlPath="/services/all"
    />
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl text-gold text-center">
        All Salon Services
      </h1>
      <p className="mt-3 text-center text-zinc-300">
        Complete list of premium beauty, bridal and spa services available at SK
        Pro Beauty Hub &amp; Makeover Studio.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="rounded-2xl border border-gold/40 bg-black/40 p-5"
          >
            <h2 className="font-display text-xl text-gold">{service.name}</h2>
            <p className="mt-1 text-xs text-zinc-200 uppercase tracking-wide">
              {service.seo}
            </p>
            <p className="mt-3 text-sm text-zinc-400">{service.desc}</p>
          </article>
        ))}
      </div>
    </section>
  </>
);

