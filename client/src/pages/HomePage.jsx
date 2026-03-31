import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import heroRight from "../../assets/pc2.jpg";
import { Seo } from "../components/Seo.jsx";
import { BookingPage } from "./BookingPage.jsx";
import { ContactPage } from "./ContactPage.jsx";
import { ServicesPage } from "./ServicesPage.jsx";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const map = {
      "/services": "services",
      "/bridal-makeup-shoolagiri": "services",
      "/hair-styling-shoolagiri": "services",
      "/booking": "booking",
      "/contact": "contact",
    };
    const id = map[location.pathname];
    if (id) {
      setTimeout(() => scrollToId(id), 200);
    } else if (location.pathname === "/" || location.pathname === "/beauty-parlour-shoolagiri") {
      setTimeout(() => scrollToId("home"), 200);
    }
  }, [location.pathname]);

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
      <section
        id="home"
        className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row">
          <motion.div
            className="mx-auto max-w-2xl text-center md:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="typing-title mb-3 text-sm uppercase tracking-[0.25em] text-gold/80">
              SK Pro Beauty Hub
            </p>
            <h1 className="font-display text-4xl leading-tight text-gold md:text-6xl">
              Best Beauty Parlour in Shoolagiri
            </h1>
            <h2 className="mt-3 text-xl font-semibold text-zinc-200">
              Bridal Makeup Experts
            </h2>
            <p className="mt-5 text-zinc-300">
              Signature bridal looks, airbrush makeup, luxury hair styling, skincare rituals and spa experiences crafted for
              Shoolagiri brides at SK Pro Beauty Hub &amp; Makeover Studio.
            </p>
          </motion.div>
          <motion.img
            src={heroRight}
            alt="Bridal makeup in Shoolagiri"
            className="h-64 w-44 rounded-3xl object-cover shadow-xl sm:h-72 sm:w-52 md:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </section>

      <div id="services">
        <ServicesPage />
      </div>
      <div id="booking">
        <BookingPage />
      </div>
      <div id="contact">
        <ContactPage />
      </div>
    </>
  );
};
