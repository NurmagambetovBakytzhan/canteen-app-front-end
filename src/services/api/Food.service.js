import axios from "axios";

export class FoodService {
    constructor() {
        this.endpoint = "/api/v1/food";
        this.orderSelection = {
            "price-asc": "price",
            "price-desc": "-price",
            "name-asc": "name",
            "name-desc": "-name",
        };
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

    async getOrderedFoods(value) {
        try {
            const response = await axios.get(`${this.endpoint}?ordering=${this.orderSelection[value]}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}