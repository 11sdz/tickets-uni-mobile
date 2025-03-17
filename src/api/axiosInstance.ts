import axios from "axios";
import { API_BASE_URL } from "@env";

const axiosInstance = axios.create({
    baseURL: "http://10.0.0.69:5000/api", // Replace with your local IP address
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export default axiosInstance;