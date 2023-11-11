
import axiosInstance from "../../shared/configs/axios-config";

export class OrderService {
    constructor() {
        this.endpoint = "/api/v1/order";
    }

    async getOrders(orderStatus) {
        let getEndpoint = this.endpoint + "/get_active_orders";
        if(orderStatus !== undefined)  {
            getEndpoint += `?order_status=${orderStatus.orderStatus}`;
        }
        try {
            const response = await axiosInstance().get(getEndpoint);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async markOrders(orderStatus, identifier) {
        let markerEndpoint = orderStatus === "Processing" ? this.endpoint + "/mark_ready/" : this.endpoint + "/mark_given/";

        try {
            await axiosInstance().post(markerEndpoint, {"order_identifier": Number(identifier)});
        } catch (error) {
            console.log(error);
        }
    }

}