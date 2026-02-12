import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Diagnosify from "../pages/Diagnosify";
import Navbar from "../components/Navbar";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

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
            <ProtectedRoute>
              <Diagnosify />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
