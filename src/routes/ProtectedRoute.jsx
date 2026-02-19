import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../api/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to correct dashboard instead of "/"
    if (role === "ADMIN") return <Navigate to="/admin-dashboard" replace />;
    if (role === "DOCTOR") return <Navigate to="/doctor-dashboard" replace />;
    if (role === "USER") return <Navigate to="/diagnosify" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
}
