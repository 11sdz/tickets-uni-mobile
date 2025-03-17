import axios from "axios";
import { API_BASE_URL } from "@env";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export default axiosInstance;