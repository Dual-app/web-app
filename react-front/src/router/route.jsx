import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"; // admin layout
import Home from "../Customer/Home";
import Dashboard from "../Admin/dashboard";
import LawyerManagement from "../Admin/LawyerManagement";
import LawBookManagement from "../Admin/LawBookManagement";
import LawyerScheduleManagement from "../Admin/LawyerScheduleManagement";
import AdminManagement from "../Admin/AdminManagement";

// 🧠 Simulate logged-in role
const userRole = "admin"; // Change between "admin" and "customer" for testing

// ✅ Route protection components
function ProtectedAdmin({ children }) {
  return userRole === "admin" ? children : <Navigate to="/" replace />;
}
function ProtectedCustomer({ children }) {
  return userRole === "customer" ? children : <Navigate to="/" replace />;
}

const router = createBrowserRouter([
  // HOME (shared for both roles)
  {
    path: "/",
    element: <Home />,
  },

  // 🟢 CUSTOMER AREA
  {
    path: "/customer",
    element: (
      <ProtectedCustomer>
        <Home /> {/* You can replace with CustomerLayout later */}
      </ProtectedCustomer>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: "home",
        element: (
          <ProtectedCustomer>
            <Home />
          </ProtectedCustomer>
        ),
      },
    ],
  },

  // 🔵 ADMIN AREA
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <App />
      </ProtectedAdmin>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <ProtectedAdmin><Dashboard /></ProtectedAdmin> },
      { path: "lawyermanagement", element: <ProtectedAdmin><LawyerManagement /></ProtectedAdmin> },
      { path: "lawbookmanagement", element: <ProtectedAdmin><LawBookManagement /></ProtectedAdmin> },
      { path: "lawyerschedulemanagement", element: <ProtectedAdmin><LawyerScheduleManagement /></ProtectedAdmin> },
      { path: "adminmanagement", element: <ProtectedAdmin><AdminManagement /></ProtectedAdmin> },
    ],
  },

  // Catch-all
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
