import { axiosInstance } from '@utils/api/request-service.ts';

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`[Error] ${error.response?.status} → ${error.message}`);
    return Promise.reject(error);
  },
);

export default axiosInstance;
