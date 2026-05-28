import axios from "axios";

const devFallbackUrl = "http://localhost:5000/api";
const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "development" ? devFallbackUrl : "");

if (!baseURL && import.meta.env.MODE === "production") {
  console.warn(
    "VITE_API_URL is not defined. Set VITE_API_URL in your production environment so the frontend can reach the backend API."
  );
}

const API = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;