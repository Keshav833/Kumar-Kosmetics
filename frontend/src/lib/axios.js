import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// Debugging: Log the environment mode and URL to console
console.log("Current Environment Mode:", import.meta.env.MODE);
console.log("VITE_API_URL:", URL);

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : `${URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
