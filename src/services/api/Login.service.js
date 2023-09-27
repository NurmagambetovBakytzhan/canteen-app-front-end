import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("/api/v1/users/token/", credentials);
        localStorage.setItem("token", response.data["access"]);

        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
        throw error;
    }
}