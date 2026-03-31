import { motion } from "framer-motion";
import { Clock, LoaderCircle, Calendar } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Seo } from "../components/Seo.jsx";
import { api } from "../lib/api.js";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  date: "",
  time: "",
  description: "",
};

export const BookingPage = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address || !form.service || !form.date || !form.time) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", form);
      toast.success("Appointment booked successfully!");
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Book Appointment | SK Pro Beauty Hub Shoolagiri"
        description="Book bridal makeup, hair styling, skincare and spa appointment in Shoolagiri."
        keywords="Book beauty parlour appointment Shoolagiri"
        urlPath="/booking"
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl text-gold">Book Your Premium Appointment</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-gold/30 bg-black/35 p-6 backdrop-blur-xl">
          {["name", "phone", "email", "address"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="input"
              value={form[field]}
              onChange={onChange}
              required
            />
          ))}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Calendar size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                name="date"
                type="date"
                className="input pr-9"
                value={form.date}
                onChange={onChange}
                required
              />
            </div>
            <div className="grid grid-cols-[1.5fr,auto] gap-2">
              <div className="relative">
                <Clock size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold" />
                <input
                  name="time"
                  type="text"
                  className="input pr-9"
                  placeholder="HH:MM AM/PM"
                  value={form.time}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <select
            name="service"
            className="input select-input"
            value={form.service}
            onChange={onChange}
            required
          >
            <option value="">Select Service</option>
            <option>Bridal Makeup</option>
            <option>Hair Styling</option>
            <option>Skin Care</option>
            <option>Spa</option>
            <option>Other</option>
          </select>
          <textarea name="description" rows="4" className="input" placeholder="Description / Notes" value={form.description} onChange={onChange} />
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="btn-gold flex items-center justify-center gap-2"
            disabled={loading}
            type="submit"
          >
            {loading && <LoaderCircle className="animate-spin" size={16} />}
            {loading ? "Submitting..." : "Confirm Appointment"}
          </motion.button>
        </form>
      </section>
    </>
  );
};
