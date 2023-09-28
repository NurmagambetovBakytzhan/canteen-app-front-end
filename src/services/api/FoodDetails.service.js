import axios from "axios";

    export const getFoodById = async (id) => {
        try {
            const response = await axios.get(`/api/v1/food/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
};

