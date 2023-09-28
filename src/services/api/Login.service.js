import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("/api/v1/users/token/", credentials);
        localStorage.setItem("token", response.data["access"]);
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });



        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
        throw error;
    }
}