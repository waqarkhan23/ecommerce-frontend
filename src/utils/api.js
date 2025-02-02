import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/`;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
