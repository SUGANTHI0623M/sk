import { motion } from "framer-motion";
import { Seo } from "../components/Seo.jsx";

const services = [
  { name: "Bridal Makeup", seo: "Bridal Makeup in Shoolagiri", desc: "HD bridal looks with premium products." },
  { name: "Hair Styling", seo: "Hair Styling in Hosur", desc: "Luxury cuts, color, smoothening and styling." },
  { name: "Skin Care", seo: "Skin Care in Shoolagiri", desc: "Facials and skin rejuvenation therapies." },
  { name: "Spa", seo: "Spa Services in Shoolagiri", desc: "Relaxing premium spa treatments and massage." },
];

export const ServicesPage = () => (
  <>
    <Seo
      title="Bridal Makeup Shoolagiri | Hair Styling Shoolagiri | SK Pro Beauty Hub"
      description="Bridal makeup in Shoolagiri, hair styling in Hosur, skincare and spa services."
      keywords="Bridal Makeup in Shoolagiri, Hair Styling in Hosur, Skin Care and Spa Shoolagiri"
      urlPath="/bridal-makeup-shoolagiri"
    />
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl text-gold">Luxury Salon Services</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <motion.article
            key={service.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="service-card"
          >
            <h2 className="font-display text-2xl text-gold">{service.name}</h2>
            <p className="mt-2 text-sm text-zinc-200">{service.seo}</p>
            <p className="mt-4 text-zinc-400">{service.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  </>
);
