import axios from "axios";
import type { AxiosInstance } from "axios";


const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`[Error] ${error.response?.status} → ${error.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;
