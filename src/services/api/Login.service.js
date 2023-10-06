import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("/api/v1/users/token/", credentials);
        localStorage.setItem("token", response.data["access"]);

        const response2 = await axios.post("/api/v1/users/user/", {"access_token": localStorage.getItem("token")});
        localStorage.setItem("user_type", response2.data["user_type"]);

        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
    }
}