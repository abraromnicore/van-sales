import { getAccessToken } from '@utils/utils.ts';
import axios, { type AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173',
  headers: { 'Content-Type': 'application/json' },
});

// Unauth
export const getUnAuthRequest = (url: string) => axiosInstance.get(url);
export const postUnAuthRequest = (url: string, params: any) =>
  axiosInstance.post(url, params);

// Auth helpers
const authCfg = () => ({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export const getRequest = (url: string) => axiosInstance.get(url, authCfg());
export const postRequest = (url: string, params: any) =>
  axiosInstance.post(url, params, authCfg());
export const putRequest = (url: string, params: any) =>
  axiosInstance.put(url, params, authCfg());
export const deleteRequest = (url: string) =>
  axiosInstance.delete(url, authCfg());