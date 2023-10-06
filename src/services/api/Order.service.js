import axiosInstance from "../../shared/configs/axios-config";
import {get} from "axios";

export class OrderService {
    constructor() {
        this.endpoint = "/api/v1/order";
    }

    async getOrders(orderStatus) {
        let getEndpoint = this.endpoint + "/get_active_orders";
        if(orderStatus)  {
            getEndpoint += `?order_status=${orderStatus.orderStatus}`;
        }
        try {
            const response = await axiosInstance.get(getEndpoint);
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

    async getCustomerOrders() {
        try {
            const response = await axiosInstance.get(`${this.endpoint}/get_active_orders/`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

}