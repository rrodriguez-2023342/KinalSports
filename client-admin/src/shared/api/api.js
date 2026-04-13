import axios from "axios";

const axiosAuth = axios.create({
    baseUrl: import.meta.env.VITE_AUTH_URL,
    timeout: 8000,
    headers: {
        "Content-Type": "application/json"
    }
})

export { axiosAuth }