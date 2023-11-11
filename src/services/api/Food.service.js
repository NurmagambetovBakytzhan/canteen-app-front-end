import axiosInstance from "../../shared/configs/axios-config";

export class FoodService {
    constructor() {
        this.endpoint = "/api/v1/food/";
        this.orderSelection = {
            "not-selected": "",
            "price-asc": "price",
            "price-desc": "-price",
            "name-asc": "name",
            "name-desc": "-name",
        };
    }

    async getAll() {
        try {
            const response = await axiosInstance().get(this.endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async retrieve(id) {
        try {
            const response = await axiosInstance().get(this.endpoint+id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async searchFood(name) {
        try {
            const response = await axiosInstance().get(`${this.endpoint}?search=${name}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getOrderedFoods(value) {
        try {
            const response = await axiosInstance().get(`${this.endpoint}?ordering=${this.orderSelection[value]}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}