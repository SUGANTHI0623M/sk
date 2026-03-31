import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Seo
        title="SK Pro Beauty Hub & Makeover Studio | Best Beauty Parlour in Shoolagiri"
        description="Luxury beauty parlour in Shoolagiri for bridal makeup, spa, skincare and hair styling."
        keywords="Best Beauty Parlour in Shoolagiri, Bridal Makeup Shoolagiri, Salon near me"
        urlPath="/beauty-parlour-shoolagiri"
      />
      {loading && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-24 w-24 rounded-full border-2 border-gold/40 border-t-gold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
        </motion.div>
      )}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          className="absolute -top-32 right-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl leading-tight text-gold md:text-6xl">
            Best Beauty Parlour in Shoolagiri
          </h1>
          <h2 className="mt-3 text-xl font-semibold text-zinc-200">Bridal Makeup Experts</h2>
          <p className="mt-5 text-zinc-300">
            Signature bridal looks, airbrush makeup, luxury hair styling, skincare rituals and spa experiences crafted for
            Shoolagiri brides at SK Pro Beauty Hub &amp; Makeover Studio.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/booking" className="btn-gold">
              Book Appointment
            </Link>
            <Link to="/services" className="btn-outline">
              View Services
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};
