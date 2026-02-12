import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { logoutUser } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import { useState } from "react";
import Loading from "./Loading";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutUser();
      showSnackbar("Logged out successfully 👋", "success");
    } catch (err) {
      console.warn("Logout API failed, clearing token anyway");
      showSnackbar("Session expired. Logged out.", "warning");
    } finally {
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            🧠 Diagnosify
          </Typography>

          {/* If NOT logged in */}
          {!token && location.pathname === "/" && (
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          )}

          {!token && location.pathname === "/register" && (
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
          )}

          {/* If logged in */}
          {token && (
            <Button color="inherit" onClick={handleLogout} disabled={loading}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
