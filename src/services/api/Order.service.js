import axiosInstance from "../../shared/configs/axios-config";

export class OrderService {
    constructor() {
        this.endpoint = "/api/v1/order";
    }

    async getOrdersByStatus(orderStatus) {
        try {
            const response = await axiosInstance.get(`${this.endpoint}/get_active_orders?order_status=${orderStatus.orderStatus}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async markOrders(orderStatus, identifier) {
        let markerEndpoint = orderStatus === "Processing" ? this.endpoint + "/mark_ready/" : this.endpoint + "/mark_given/";

        try {
            await axiosInstance.post(markerEndpoint, {"order_identifier": Number(identifier)});
        } catch (error) {
            console.log(error);
        }
    }

}