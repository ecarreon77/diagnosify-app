import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { logoutUser } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout API failed, clearing token anyway");
    }

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
