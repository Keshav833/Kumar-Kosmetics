import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : `${URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
