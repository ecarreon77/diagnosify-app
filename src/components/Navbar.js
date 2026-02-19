import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      handleMenuClose();
      navigate("/");
    }
  };

  const handleChangePassword = () => {
    handleMenuClose();
    navigate("/change-password");
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

          {/* Not logged in */}
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

          {/* Logged in */}
          {token && (
            <>
              <Button
                color="inherit"
                startIcon={<AccountCircle />}
                onClick={handleMenuOpen}
              >
                Account
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
