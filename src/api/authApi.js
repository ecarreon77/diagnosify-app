import apiClient from "./apiClient";

export const registerUser = (data) => apiClient.post("/auth/register", data);

export const loginUser = (data) => apiClient.post("/auth/login", data);

export const logoutUser = () => apiClient.post("/auth/logout");

export const changePassword = (data) =>
  apiClient.post("/auth/change-password", data);
