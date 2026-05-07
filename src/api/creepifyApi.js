import axios from "axios";
import { getLoadingSetter } from "./loadingBridge";

const creepifyApi = axios.create({
  baseURL: "https://creepify.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
creepifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const setLoading = getLoadingSetter();

  if (setLoading) {
    setLoading(true);
  }

  return config;
});

creepifyApi.interceptors.response.use(
  (res) => {
    const setLoading = getLoadingSetter();

    if (setLoading) {
      setLoading(false);
    }

    return res;
  },
  (err) => {
    const setLoading = getLoadingSetter();

    if (setLoading) {
      setLoading(false);
    }

    return Promise.reject(err);
  },
);

// ✅ STORIES
export const fetchAllStories = (page = 0, size = 10) =>
  creepifyApi.get(`/api/story/all-stories?page=${page}&size=${size}`);

// ✅ CREATE STORY
export const createStory = ({ data, file }) => {
  const formData = new FormData();

  formData.append(
    "data",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    }),
  );

  if (file) {
    formData.append("file", file);
  }

  return creepifyApi.post("/api/story/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default creepifyApi;
