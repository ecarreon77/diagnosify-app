import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const diagnosifyApi = axios.create({
  baseURL: "http://localhost:9001",
  headers: { "Content-Type": "application/json" },
});

diagnosifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const setLoading = getLoadingSetter();
  if (setLoading) setLoading(true);

  return config;
});

diagnosifyApi.interceptors.response.use(
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

export const checkHealth = (data) =>
  diagnosifyApi.post("/api/health/check", data);

export default diagnosifyApi;
