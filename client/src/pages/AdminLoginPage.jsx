import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { api } from "../lib/api.js";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("skprobeauty.makeover@gmail.com");
  const [password, setPassword] = useState("skprobeauty##2002");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <section className="flex min-h-screen items-center justify-center px-4">
      <Seo
        title="Admin Login | SK Pro Beauty Hub"
        description="Admin login for booking management."
        keywords="Admin login SK Pro Beauty Hub"
      />
      <div className="w-full max-w-sm rounded-3xl border border-gold/30 bg-black/40 p-6 shadow-xl sm:p-7">
        <h1 className="font-display text-3xl text-gold text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            className="input"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="relative">
            <input
              className="input pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            className="btn-gold mt-2 w-full justify-center"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};
