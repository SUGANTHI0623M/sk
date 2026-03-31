import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export const services = [
  { name: "Bridal Makeup", seo: "Bridal Makeup in Shoolagiri", desc: "HD bridal looks with premium products." },
  { name: "Airbrush Bridal", seo: "Airbrush bridal makeup experts", desc: "Long-lasting HD airbrush finish for weddings." },
  { name: "Hair Styling", seo: "Hair Styling in Hosur", desc: "Luxury cuts, color, smoothening and styling." },
  { name: "Hair Spa & Wash", seo: "Hair spa in Shoolagiri", desc: "Deep nourishment treatments and relaxing hair wash." },
  { name: "Skin Care", seo: "Skin Care in Shoolagiri", desc: "Facials and skin rejuvenation therapies." },
  { name: "Pre-Bridal Packages", seo: "Pre-bridal packages Shoolagiri", desc: "Complete glow-up plans for your big day." },
  { name: "Spa", seo: "Spa Services in Shoolagiri", desc: "Relaxing premium spa treatments and massage." },
  { name: "Pedicure & Manicure", seo: "Pedicure and manicure Shoolagiri", desc: "Luxury hand and foot care with long-lasting finish." },
  { name: "Eyebrow Shaping", seo: "Eyebrow threading and shaping", desc: "Perfectly shaped brows for bridal and party looks." },
];

export const ServicesPage = () => {
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < services.length; i += 4) {
      chunks.push(services.slice(i, i + 4));
    }
    return chunks;
  }, []);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, 4500);
    return () => clearInterval(id);
  }, [pages.length]);

  const goPrev = () =>
    setPage((prev) => (prev - 1 + pages.length) % pages.length);
  const goNext = () => setPage((prev) => (prev + 1) % pages.length);

  const current = pages[page] || [];

  return (
    <>
      <Seo
        title="Bridal Makeup Shoolagiri | Hair Styling Shoolagiri | SK Pro Beauty Hub"
        description="Bridal makeup in Shoolagiri, hair styling in Hosur, skincare and spa services."
        keywords="Bridal Makeup in Shoolagiri, Hair Styling in Hosur, Skin Care and Spa Shoolagiri"
        urlPath="/bridal-makeup-shoolagiri"
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-4xl text-gold">Luxury Salon Services</h1>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full border border-gold/50 p-2 text-gold"
              aria-label="Previous services"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-gold/50 p-2 text-gold"
              aria-label="Next services"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <motion.div
          key={page}
          className="mt-10 service-card w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {current.map((service) => (
              <div
                key={service.name}
                className="rounded-xl border border-gold/30 bg-black/40 p-4"
              >
                <h2 className="font-display text-xl text-gold">
                  {service.name}
                </h2>
                <p className="mt-1 text-xs text-zinc-200 uppercase tracking-wide">
                  {service.seo}
                </p>
                <p className="mt-3 text-sm text-zinc-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="mt-4 flex justify-end">
          <Link
            to="/services/all"
            className="text-sm font-semibold text-gold underline underline-offset-4"
          >
            View all services
          </Link>
        </div>
      </section>
    </>
  );
};
