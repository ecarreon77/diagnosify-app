import { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"; // 👈 import loader

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);

      navigate("/diagnosify"); // redirect
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FULL SCREEN LOADING */}
      {loading && <Loading />}

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
              error={!!error}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              required
              error={!!error}
              helperText={error}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
