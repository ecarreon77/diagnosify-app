import apiClient from "./apiClient";

export const checkHealth = (data) => apiClient.post("/api/health/check", data);
