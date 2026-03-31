import { motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book" },
  { to: "/contact", label: "Contact" },
];

export const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme text-theme">
      <header className="sticky top-0 z-50 border-b border-gold/30 glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/sklogo.jpeg" alt="SK Pro Beauty Hub logo" className="h-12 w-12 rounded-full border border-gold/40 object-cover" />
            <div>
              <p className="font-display text-lg text-gold">SK Pro Beauty Hub</p>
              <p className="text-xs text-zinc-400">Makeover Studio</p>
            </div>
          </Link>
          <div className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-gold text-black" : "text-zinc-200 hover:text-gold"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            className="flex items-center justify-center rounded-full border border-gold/40 p-2 text-gold md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>
        </nav>
        {open && (
          <div className="border-t border-gold/20 bg-black/80 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm ${isActive ? "bg-gold text-black" : "text-zinc-200"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg"
      >
        WhatsApp
      </a>

      <footer className="border-t border-gold/20 px-4 py-8 text-center text-sm text-zinc-400">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          SK Pro Beauty Hub & Makeover Studio - Best Beauty Parlour in Shoolagiri
        </motion.p>
      </footer>
    </div>
  );
};
