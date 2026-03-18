import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const creepifyApi = axios.create({
  baseURL: "https://creepify.onrender.com",
  headers: { "Content-Type": "application/json" },
});

creepifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const setLoading = getLoadingSetter();
  if (setLoading) setLoading(true);

  return config;
});

creepifyApi.interceptors.response.use(
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

export const fetchAllStories = () => creepifyApi.get("/api/story/all-stories");

export default creepifyApi;
