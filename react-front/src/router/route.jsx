import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"; // admin layout
import Home from "../Customer/Home";
import Dashboard from "../Admin/dashboard";
import LawyerManagement from "../Admin/LawyerManagement";
import LawBookManagement from "../Admin/LawBookManagement";
import LawyerScheduleManagement from "../Admin/LawyerScheduleManagement";
import AdminManagement from "../Admin/AdminManagement";
import AdminError from "../Admin/AdminError";
import CustomerLayout from "../customerlayout";
import AboutUs from "../Customer/aboutus";
import Lawbook from "../Customer/lawbook";
import Lawyer from "../Customer/lawyer";
import Topup from "../Customer/topuppg";
import TermsAndConditions from "../Customer/terms&conditions";
import Clientbooking from "../Customer/clientbooking";

// Simulate logged-in role
const userRole = "admin"; // can be 'admin', 'superadmin', or 'customer'

// Route protection components
function ProtectedAdmin({ children }) {
  return userRole === "customer" || userRole === "superadmin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

function ProtectedCustomer({ children }) {
  return ["admin", "customer", "superadmin"].includes(userRole) ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

function ProtectedSuperAdmin({ children }) {
  return userRole === "superadmin" ? children : <AdminError />;
}

const router = createBrowserRouter([
  // HOME
  {
    path: "/",
    element: <Home />,
  },

  // CUSTOMER AREA
  {
    path: "/customer",
    element: (
      <ProtectedCustomer>
        <CustomerLayout />
      </ProtectedCustomer>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "lawbook", element: <Lawbook /> },
      { path: "lawyer", element: <Lawyer /> },
      { path: "topuppg", element: <Topup /> },
      {path: "termsandconditions", element: <TermsAndConditions />},
      {path: "clientbooking", element: <Clientbooking />},
    ],
  },

  // ADMIN AREA
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <App />
      </ProtectedAdmin>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "lawyermanagement", element: <LawyerManagement /> },
      { path: "lawbookmanagement", element: <LawBookManagement /> },
      {
        path: "lawyerschedulemanagement",
        element: <LawyerScheduleManagement />,
      },

      // AdminManagement - only for superadmins
      {
        path: "adminmanagement",
        element: (
          <ProtectedSuperAdmin>
            <AdminManagement />
          </ProtectedSuperAdmin>
        ),
      },
    ],
  },

  // Catch-all route
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
