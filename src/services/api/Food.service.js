import axios from "axios";

export class FoodService {
    constructor() {
        this.endpoint = "/api/v1/food";
    }

    async getFoods() {
        try {
            const response = await axios.get(this.endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getFood(id) {
        try {
            const response = await axios.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async searchFood(name) {
        try {
            const response = await axios.get(`${this.endpoint}?search=${name}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}