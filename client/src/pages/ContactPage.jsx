import { Seo } from "../components/Seo.jsx";

export const ContactPage = () => (
  <>
    <Seo
      title="Contact SK Pro Beauty Hub | Shoolagiri"
      description="Visit SK Pro Beauty Hub & Makeover Studio in Shoolagiri."
      keywords="Beauty parlour contact Shoolagiri"
      urlPath="/contact"
    />
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl text-gold">Visit Our Studio</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="service-card">
          <h2 className="font-display text-2xl text-gold">SK Pro Beauty Hub & Makeover Studio</h2>
          <p className="mt-3 text-zinc-300">Kumbalam Main Road, Kattikanapalli, Shoolagiri</p>
          <p className="mt-2 text-zinc-300">Phone: +91 93422 44248</p>
          <p className="mt-2 text-zinc-300">Founder: Kavitha</p>
        </div>
        <iframe
          title="Google Map SK Pro Beauty Hub"
          className="min-h-72 w-full rounded-3xl border border-gold/30"
          loading="lazy"
          src="https://maps.google.com/maps?q=Shoolagiri&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </section>
  </>
);
