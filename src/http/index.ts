import axios from "axios";

//export const API_URL = "http://localhost:3890";
export const API_URL = "https://coin-manager.tashima.click";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default api;
