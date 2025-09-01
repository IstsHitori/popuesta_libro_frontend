import axios from "axios";

const getToken = () => localStorage.getItem("authToken");

const axiosPrivate = axios.create({
  baseURL: import.meta.env.API_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
