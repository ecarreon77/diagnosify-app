import axios from "axios";

const diagnosifyApi = axios.create({
  baseURL: "http://localhost:9001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
diagnosifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const checkHealth = (data) =>
  diagnosifyApi.post("/api/health/check", data);

export default diagnosifyApi;
