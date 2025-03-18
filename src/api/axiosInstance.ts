import axios from "axios";
import { API_BASE_URL } from "@env";

const axiosInstance = axios.create({
    baseURL: 'http://10.0.0.69:5000/api', // Replace with your local IP address
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

// Request Interceptor
axiosInstance.interceptors.request.use((request) => {
    console.log("📤 Sending Request:");
    console.log("➡️ URL:", request.url);
    console.log("➡️ Method:", request.method);
    console.log("➡️ Headers:", request.headers);
    console.log("➡️ Data:", request.data);
    return request;
}, (error) => {
    console.log("❌ Request Error:", error);
    return Promise.reject(error instanceof Error ? error : new Error(error));
});

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {
    console.log("📥 Response Received:");
    console.log("⬅️ Status:", response.status);
    console.log("⬅️ Headers:", response.headers);
    console.log("⬅️ Data:", response.data);
    return response;
}, (error) => {
    console.log("❌ Response Error:", error.response?.status, error.response?.data);
    return Promise.reject(error instanceof Error ? error : new Error(error));
});

// Function to set the token dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
      delete axiosInstance.defaults.headers["Authorization"];
  }
};

export default axiosInstance;