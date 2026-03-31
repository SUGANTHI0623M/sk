import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { api } from "../lib/api.js";

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 50;

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

  const filteredAndSorted = useMemo(() => {
    let list = [...bookings];

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.phone.toLowerCase().includes(term)
      );
    }

    if (filterDate) {
      const target = new Date(filterDate).toDateString();
      list = list.filter(
        (b) => new Date(b.date).toDateString() === target
      );
    }

    list.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return list;
  }, [bookings, sortOrder, search, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredAndSorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Seo title="Admin Dashboard | SK Pro Beauty Hub" description="Manage salon bookings." keywords="Salon booking admin" />
      <h1 className="mb-4 text-center font-display text-4xl text-gold">
        Admin Dashboard
      </h1>
      <div className="mb-6 flex flex-col items-center justify-center gap-2 md:flex-row">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 md:flex-row">
          <input
            className="input md:max-w-xs"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            className="input md:max-w-xs"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button
            className="btn-outline text-xs md:text-sm"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? "Sort: Oldest" : "Sort: Latest"}
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
        <p className="text-zinc-100">Loading bookings...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gold/30">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gold/10 text-gold">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {pageItems.map((b) => (
                  <tr
                    key={b._id}
                    className="cursor-pointer border-t border-gold/20 hover:bg-gold/5"
                    onClick={() => setSelected(b)}
                  >
                    <td className="p-3">{b.name}</td>
                    <td className="p-3">{b.phone}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3">{b.service}</td>
                    <td className="p-3">
                      {new Date(b.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">{b.address}</td>
                    <td className="p-3">{b.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 text-sm text-zinc-200">
            <button
              className="btn-outline px-3 py-1 text-xs"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn-outline px-3 py-1 text-xs"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>

          {selected && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
              <div className="relative w-full max-w-lg rounded-2xl border border-gold/40 bg-black/90 p-5 text-white">
                <button
                  className="absolute right-3 top-3 rounded-full border border-gold/40 p-1 text-gold"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <h2 className="font-display text-2xl text-gold">
                  Appointment Details
                </h2>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  <p>
                    <span className="font-semibold">Name:</span> {selected.name}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {selected.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {selected.email}
                  </p>
                  <p>
                    <span className="font-semibold">Service:</span>{" "}
                    {selected.service}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(selected.date).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {selected.time}
                  </p>
                  <p className="md:col-span-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {selected.address}
                  </p>
                  <p className="md:col-span-2">
                    <span className="font-semibold">Notes:</span>{" "}
                    {selected.description || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
