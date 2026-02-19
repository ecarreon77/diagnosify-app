import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Diagnosify from "../pages/Diagnosify";
import Navbar from "../components/Navbar";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ChangePassword from "../pages/ChangePassword";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* LOGIN PAGE (BLOCK WHEN LOGGED IN) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* REGISTER PAGE (BLOCK WHEN LOGGED IN) */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* DIAGNOSIFY PAGE (PROTECTED) */}
        <Route
          path="/diagnosify"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Diagnosify />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN", "DOCTOR"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
