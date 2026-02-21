import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const authApi = axios.create({
  baseURL: "https://identity-mao8.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Attach token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const setLoading = getLoadingSetter();
  if (setLoading) setLoading(true);

  return config;
});

authApi.interceptors.response.use(
  (res) => {
    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(false);
    return res;
  },
  (err) => {
    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(false);
    return Promise.reject(err);
  },
);

export const registerUser = (data) => authApi.post("/auth/register", data);
export const loginUser = (data) => authApi.post("/auth/login", data);
export const logoutUser = () => authApi.post("/auth/logout");
export const changePassword = (data) =>
  authApi.post("/auth/change-password", data);

export default authApi;
