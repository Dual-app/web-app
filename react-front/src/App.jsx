import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./Admin/dashboard";
import LawyerManagement from "./Admin/LawyerManagement";
import LawBookManagement from "./Admin/LawBookManagement";
import LawyerScheduleManagement from "./Admin/LawyerScheduleManagement";
import AdminManagement from "./Admin/AdminManagement";
import Home from "./Customer/Home";
import { useEffect } from "react";
import AdminNav from "./Components/AdminNav";
import AdminTop from "./Components/AdminTop";

function App() {
  const isAdmin = false; // toggle this for testing
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect logic
  useEffect(() => {
    if (location.pathname === "/home") return; // Don't redirect if on /home

    if (isAdmin && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    } else if (!isAdmin && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate, location.pathname]);

  // ✅ if /home, always show Home
  if (location.pathname === "/home") {
    return <Home />;
  }

  // ✅ if admin, show admin layout
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Sidebar hidden on mobile */}
        <div className="hidden md:block w-1/6">
          <AdminNav />
        </div>

        <div className="flex flex-col w-full p-7">
          <AdminTop />
          <div className="flex-1 p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lawyermanagement" element={<LawyerManagement />} />
              <Route path="/lawbookmanagement" element={<LawBookManagement />} />
              <Route
                path="/lawyerschedulemanagement"
                element={<LawyerScheduleManagement />}
              />
              <Route path="/adminmanagement" element={<AdminManagement />} />
              {/* Optional: /home for admin preview */}
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default for non-admin users
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
