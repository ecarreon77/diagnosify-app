import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_GATEWAY || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// REQUEST INTERCEPTOR
// =========================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(true);

    return config;
  },
  (error) => {
    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(false);

    return Promise.reject(error);
  },
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
apiClient.interceptors.response.use(
  (response) => {
    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(false);

    return response;
  },
  (error) => {
    const setLoading = getLoadingSetter();
    if (setLoading) setLoading(false);

    return Promise.reject(error);
  },
);

export default apiClient;
