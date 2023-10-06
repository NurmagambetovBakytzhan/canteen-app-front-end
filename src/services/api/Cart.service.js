import axios from "axios";
import axiosInstance from "../../shared/configs/axios-config";

class cartService {
    constructor() {
        this.cart = [];
        this.endpoint = "/api/v1/order/";
    }

    async getCart() {
        try {
            const response = await axiosInstance.get(this.endpoint + 'my_orders/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async addToCart(food) {
        try {
            const response = await axiosInstance.post(this.endpoint, {
                "food": food.id,
                "amount": 1,
                "special_wishes": "",
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveChanges(orders) {
        try {
            const putRequests = orders.map(async (order) => {
                const response = await axiosInstance.put(
                    `${this.endpoint}/${order.id}/`,
                    order
                );
                return response.data;
            });

            const results = await Promise.all(putRequests);
            return results;
        } catch (error) {
            throw error;
        }
    }

    deleteOrder(orderId) {
        try {
            const response = axiosInstance.delete(this.endpoint + '/' + orderId + '/');
        } catch (error) {
            throw error;
        }
    }

    submitOrders() {
        try {
            const response = axiosInstance.get(this.endpoint + '/' + 'send_user_orders' + '/');
            return response
        } catch (error) {
            throw error;
        }
    }


}

const cartServiceInstance = new cartService();

export {cartServiceInstance as cartService};
export default cartServiceInstance;
