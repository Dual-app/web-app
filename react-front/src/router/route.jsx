import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Customer/Home";
import Dashboard from "../Admin/dashboard";
import UserManagement from "../Admin/UserManagement";
import LawyerManagement from "../Admin/LawyerManagement";
import Notification from "../Components/Notification";
import Community from "../Components/Community";
import Setting from "../Components/Setting";
import App from "../App";

// Example authentication logic
const isAdmin = true; // Replace with your real auth logic

function ProtectedRoute({ children }) {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "usermanagement",
        element: (
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "lawyermanagement",
        element: (
          <ProtectedRoute>
            <LawyerManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "Notification",
        element: <Notification />,
      },
      {
        path: "Community",
        element: <Community />,
      },
      {
        path: "Setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
