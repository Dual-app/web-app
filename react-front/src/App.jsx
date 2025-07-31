import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./Admin/dashboard";
import UserManagement from "./Admin/UserManagement";
import Home from "./Customer/Home";
import { useEffect } from "react";

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

  if (isAdmin) {
    return (
      <>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usermanagement" element={<UserManagement />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    );
  }
}

export default App;
