import axios from "axios";
import newAxiosInstance from "../../shared/configs/axios-config";

export const confirmRegistration = async (code) => {
    try {
        const response = await axios.post("/api/v1/users/verify/", {
            session_id: localStorage.getItem("session_id"),
            code: code,
        });

        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
    }
};