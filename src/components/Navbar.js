import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Home as HomeIcon,
  Medication as MedicationIcon,
  AutoStories as AutoStoriesIcon,
  SendToMobile as SendToMobileIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import { logoutUser } from "../api/authApi";
import Loading from "./Loading";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  // Sidebar Drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Menu state (for account settings)
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

  // Sidebar toggle functions
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {loading && <Loading />}

      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            🧠 ONE-APP
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

      {/* Render Sidebar only when the user is logged in */}
      {token && (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleSidebar}
          sx={{
            width: 250, // Adjust width to give more space
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              top: "64px", // Make sure it starts below the AppBar
              backgroundColor: "#1a202c", // Dark background for better contrast
              color: "#fff", // White text for contrast
              paddingTop: "20px",
              transition: "width 0.3s ease", // Smooth transition when opening/closing the sidebar
            },
          }}
        >
          {/* Sidebar Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <IconButton sx={{ color: "#fff" }} onClick={() => navigate("/")}>
              <HomeIcon />
            </IconButton>
          </div>

          <List>
            <ListItem
              button
              onClick={() => navigate("/diagnosify")}
              sx={{ "&:hover": { backgroundColor: "#2d3748" } }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <MedicationIcon />
              </ListItemIcon>
              <ListItemText primary="Diagnosify" sx={{ color: "#fff" }} />
            </ListItem>
            <Divider sx={{ backgroundColor: "#4A5568" }} />

            <ListItem
              button
              onClick={() => navigate("/creepify")}
              sx={{ "&:hover": { backgroundColor: "#2d3748" } }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText
                primary="Creepify (Read Story)"
                sx={{ color: "#fff" }}
              />
            </ListItem>
            <Divider sx={{ backgroundColor: "#4A5568" }} />

            <ListItem
              button
              onClick={() => navigate("/about")}
              sx={{ "&:hover": { backgroundColor: "#2d3748" } }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <SendToMobileIcon />
              </ListItemIcon>
              <ListItemText
                primary="Creepify (Send Story)"
                sx={{ color: "#fff" }}
              />
            </ListItem>
          </List>

          <Divider sx={{ backgroundColor: "#4A5568", marginTop: "20px" }} />
          <div
            style={{ textAlign: "center", padding: "10px", color: "#BEE3F8" }}
          >
            <p>© 2026 One-App</p>
          </div>
        </Drawer>
      )}
    </>
  );
}
