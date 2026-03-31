import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { api } from "../lib/api.js";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("skprobeauty.makeover@gmail.com");
  const [password, setPassword] = useState("skprobeauty##2002");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("sk-admin-token", data.token);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <Seo title="Admin Login | SK Pro Beauty Hub" description="Admin login for booking management." keywords="Admin login SK Pro Beauty Hub" />
      <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-gold/30 bg-black/40 p-7">
        <h1 className="font-display text-3xl text-gold">Admin Login</h1>
        <input className="input mt-5" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="input mt-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-gold mt-6 w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
      </form>
    </section>
  );
};
