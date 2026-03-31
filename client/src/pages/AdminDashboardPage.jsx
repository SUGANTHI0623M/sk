import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { api } from "../lib/api.js";

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/bookings");
      setBookings(data);
    } catch {
      localStorage.removeItem("sk-admin-token");
      toast.error("Session expired. Please login again.");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const sortedBookings = useMemo(() => {
    const copy = [...bookings];
    copy.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return copy;
  }, [bookings, sortOrder]);

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      toast.success("Booking deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Seo title="Admin Dashboard | SK Pro Beauty Hub" description="Manage salon bookings." keywords="Salon booking admin" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl text-gold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}>
            Sort: {sortOrder === "asc" ? "Oldest" : "Latest"}
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              localStorage.removeItem("sk-admin-token");
              navigate("/admin/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-300">Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gold/30">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gold/10 text-gold">
              <tr>
                <th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Email</th>
                <th className="p-3">Service</th><th className="p-3">Date</th><th className="p-3">Time</th>
                <th className="p-3">Address</th><th className="p-3">Notes</th><th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((b) => (
                <tr key={b._id} className="border-t border-gold/20">
                  <td className="p-3">{b.name}</td><td className="p-3">{b.phone}</td><td className="p-3">{b.email}</td>
                  <td className="p-3">{b.service}</td><td className="p-3">{new Date(b.date).toLocaleDateString()}</td><td className="p-3">{b.time}</td>
                  <td className="p-3">{b.address}</td><td className="p-3">{b.description || "-"}</td>
                  <td className="p-3">
                    <button className="rounded-lg bg-red-500 px-3 py-1 text-white" onClick={() => deleteBooking(b._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
