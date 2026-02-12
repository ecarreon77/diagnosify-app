import { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);

      alert("Login Success");

      navigate("/diagnosify");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center">
          Login
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

          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
