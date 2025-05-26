// lib/axiosInstance.js
import axios from 'axios';

const baseURL =
    typeof window === 'undefined'
        ? process.env.API_URL  // use private one on server
        : process.env.NEXT_PUBLIC_API_URL;  // public for client

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
