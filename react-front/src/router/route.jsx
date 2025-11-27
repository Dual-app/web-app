import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"; // admin layout
import Home from "../Customer/Home";
import Dashboard from "../Admin/dashboard";
import LawyerManagement from "../Admin/LawyerManagement";
import LawBookManagement from "../Admin/LawBookManagement";
import LawyerScheduleManagement from "../Admin/LawyerScheduleManagement";
import AdminManagement from "../Admin/AdminManagement";
import AdminError from "../Admin/AdminError";
import ClientBookingManagement from "../Admin/ClientBookingtManagement";
import CustomerLayout from "../customerlayout";
import AboutUs from "../Customer/aboutus";
import Lawbook from "../Customer/lawbook";
import Lawyer from "../Customer/lawyer";
import Payment from "../Customer/payment";
import TermsAndConditions from "../Customer/terms&conditions";
import Clientbooking from "../Customer/clientbooking";
import PostCase from "../Customer/posecase";
import ClientBookingHistory from "../Customer/clientbookinghistory";
import ClientManagement from "../Admin/ClientManagement";
import { useAuth } from "../content/AuthContext";

// Route protection components
function ProtectedAdmin({ children }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/" replace />;

  return auth.user.role === "admin" || auth.user.role === "superadmin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

function ProtectedCustomer({ children }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/" replace />;

  return auth.user.role === "customer" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

function ProtectedSuperAdmin({ children }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/" replace />;

  return auth.user.role === "superadmin" ? children : <AdminError />;
}

const router = createBrowserRouter([
  // HOME
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/customer/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/customer/lawbook",
    element: <Lawbook />,
  },
  {
    path: "/customer/lawyer",
    element: <Lawyer />,
  },
  {
    path: "/customer/termsandconditions",
    element: <TermsAndConditions />,
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
      { path: "payment", element: <Payment /> },
      { path: "clientbooking", element: <Clientbooking /> },
      { path: "postcase", element: <PostCase /> },
      { path: "clientbookinghistory", element: <ClientBookingHistory /> },
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
      {
        path: "clientbookingmanagement",
        element: <ClientBookingManagement />,
      },
      { path: "clientmanagement", element: <ClientManagement /> },

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
