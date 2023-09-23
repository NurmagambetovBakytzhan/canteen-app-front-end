import axios from "axios";

export const registerUser = async (name, surname, email, password) => {
    try {
        const response = await axios.post("/api/v1/users/", {
            first_name: name,
            last_name: surname,
            email,
            password,
            user_type: "Customer",
        });

        const session_id = response.data.session_id;

        return session_id;
    } catch (error) {
        console.error("Error while registering user:", error);
        throw error;
    }
};