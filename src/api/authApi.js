import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (data) => authApi.post("/auth/register", data);
export const loginUser = (data) => authApi.post("/auth/login", data);
export const logoutUser = () => authApi.post("/auth/logout");

export default authApi;
