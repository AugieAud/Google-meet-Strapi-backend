//this allows us to reuse the pre-configured Axios instance that will handle authentication by automatically adding JWT token from Zustand auth store to the request headers. It also uses the base URL from the env variables for all API calls to strapi

import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
