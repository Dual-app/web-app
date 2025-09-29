import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Customer/Home";
import Dashboard from "../Admin/dashboard";
import UserManagement from "../Admin/UserManagement";
import LawyerManagement from "../Admin/LawyerManagement";
import LawBookManagement from "../Admin/LawBookManagement";
import LawyerScheduleManagement from "../Admin/LawyerScheduleManagement";
import App from "../App";

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
    element: isAdmin ? <App /> : <Home />,
    children: isAdmin
      ? [
          { index: true, element: <Navigate to="/dashboard" replace /> },
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
            path: "lawbookmanagement",
            element: (
              <ProtectedRoute>
                <LawBookManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "lawyerschedulemanagement",
            element: (
              <ProtectedRoute>
                <LawyerScheduleManagement />
              </ProtectedRoute>
            ),
          }

        ]
      : [{ index: true, element: <Home /> }],
  },
]);

export default router;
