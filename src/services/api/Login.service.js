import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("/api/v1/users/token/", credentials);
        localStorage.setItem("token", response.data["access"]);

        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
    }
}

export const setUserType = async () => {
    try {
        const response = await axios.get("/api/v1/users/user/");
        localStorage.setItem("user_type", response.data["user_type"]);

        return response.status;
    } catch (error) {
        throw error;
    }
}