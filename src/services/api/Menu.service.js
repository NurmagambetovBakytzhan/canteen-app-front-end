import axios from "axios";

export const getAllFood = async () => {
    try {
        const response = await axios.get("/api/v1/food/");
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error while fetching foods! :", error);
        throw error;
    }
};