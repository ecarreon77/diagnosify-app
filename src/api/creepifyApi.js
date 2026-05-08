import apiClient from "./apiClient";

// STORIES
export const fetchAllStories = (page = 0, size = 10) =>
  apiClient.get(`/api/story/all-stories?page=${page}&size=${size}`);

// CREATE STORY
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

  return apiClient.post("/api/story/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
