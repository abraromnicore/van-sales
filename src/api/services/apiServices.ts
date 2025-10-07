import axiosInstance from "@api/axios.config";

const apiService = {
  get: async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  },

  post: async (url: string, data:any) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  },

  put: async (url: string, data: any) => {
    const response = await axiosInstance.put(url, data);
    return response.data;
  },

  delete: async (url: string) => {
    const response = await axiosInstance.delete(url);
    return response.data;
  },
};

export default apiService;
