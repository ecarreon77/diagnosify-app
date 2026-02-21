import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import { useSnackbar } from "../../context/SnackbarContext";
import { registerDoctorUser } from "../../api/registerDoctor";

const AdminDashboard = () => {
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    birthDate: "",
    sex: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerDoctorUser({
        ...form,
        role: "DOCTOR",
        password: "password123",
      });

      showSnackbar("Doctor added successfully ✅", "success");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        birthDate: "",
        sex: "",
      });
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || "Failed to add doctor",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Add Doctor
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2, mt: 2 }}
        >
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Birth Date"
            name="birthDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.birthDate}
            onChange={handleChange}
            helperText="Please select date"
            required
          />

          <TextField
            fullWidth
            select
            label="Gender"
            name="sex"
            value={form.sex}
            onChange={handleChange}
            helperText="Please select gender"
            required
          >
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </TextField>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Doctor"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
