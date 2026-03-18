import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Diagnosify from "../pages/diagnosify/Diagnosify";
import Navbar from "../components/Navbar";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ChangePassword from "../pages/auth/ChangePassword";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import UserDashboard from "../pages/UserDashboard";
import CreepifyViewStories from "../pages/creepify/CreepifyViewStories";

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
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creepify"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <CreepifyViewStories />
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
