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
  let isAdmin = true;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAdmin && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    } else if (!isAdmin && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate, location.pathname]);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:block w-1/6">
      <AdminNav />
      </div>
      <div className="flex flex-col w-full p-7">
        <AdminTop />
        <div className="flex-1 p-8">
          {isAdmin ? (
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lawyermanagement" element={<LawyerManagement />} />
              <Route path="/lawbookmanagement" element={<LawBookManagement />} />
              <Route path="/lawyerschedulemanagement" element={<LawyerScheduleManagement />} />
              <Route path="/adminmanagement" element={<AdminManagement />} />
              <Route path="/home" element={<Home />} />

            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
