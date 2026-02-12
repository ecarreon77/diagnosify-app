import { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    birthDate: "",
    sex: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered Successfully");
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message || "Register failed. Please try again.";

      alert(message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center">
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2, mt: 2 }}
        >
          <TextField
            name="email"
            label="Email"
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            required
          />
          <TextField
            name="firstName"
            label="First Name"
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
          />
          <TextField
            name="contactNumber"
            label="Contact Number"
            onChange={handleChange}
          />
          <TextField name="birthDate" type="date" onChange={handleChange} />
          <TextField name="sex" label="Sex" onChange={handleChange} />

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
