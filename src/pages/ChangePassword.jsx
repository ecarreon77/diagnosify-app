import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/authApi";
import { useSnackbar } from "../context/SnackbarContext";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
      showSnackbar("All fields are required", "warning");
      return false;
    }

    if (form.newPassword.length < 8) {
      showSnackbar("New password must be at least 8 characters", "warning");
      return false;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      showSnackbar("New passwords do not match", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      await changePassword(form);

      showSnackbar(
        "Password changed successfully. Please login again.",
        "success",
      );

      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || "Failed to change password",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Old Password */}
          <TextField
            fullWidth
            margin="normal"
            label="Old Password"
            name="oldPassword"
            type={showPassword.old ? "text" : "password"}
            value={form.oldPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleVisibility("old")}
                    edge="end"
                  >
                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* New Password */}
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            value={form.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleVisibility("new")}
                    edge="end"
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            name="confirmNewPassword"
            type={showPassword.confirm ? "text" : "password"}
            value={form.confirmNewPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleVisibility("confirm")}
                    edge="end"
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Password"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
