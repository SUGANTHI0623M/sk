import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { AdminDashboardPage } from "./pages/AdminDashboardPage.jsx";
import { AdminLoginPage } from "./pages/AdminLoginPage.jsx";
import { AllServicesPage } from "./pages/AllServicesPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("sk-admin-token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/beauty-parlour-shoolagiri" element={<HomePage />} />
        <Route path="/services" element={<HomePage />} />
        <Route path="/services/all" element={<AllServicesPage />} />
        <Route path="/bridal-makeup-shoolagiri" element={<HomePage />} />
        <Route path="/hair-styling-shoolagiri" element={<HomePage />} />
        <Route path="/booking" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
