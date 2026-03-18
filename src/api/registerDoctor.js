import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const registerDoctor = axios.create({
  baseURL: "https://identity-mao8.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Attach token
registerDoctor.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const setLoading = getLoadingSetter();
  if (setLoading) setLoading(true);

  return config;
});

registerDoctor.interceptors.response.use(
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

export const registerDoctorUser = (data) =>
  registerDoctor.post("/admin/register-doctor", data);

export default registerDoctor;
