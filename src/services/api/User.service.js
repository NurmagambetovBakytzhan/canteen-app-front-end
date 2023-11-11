import axiosInstance from "../../shared/configs/axios-config";

export class UserService {
    constructor() {
        this.endpoint = "/api/v1/users/";
    }

    async getUser() {
        try {
            const response = await axiosInstance().post(
                this.endpoint + 'user/',
                {"access_token": localStorage.getItem("token")}
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(updated) {
        console.log(updated)
        try {
            const response = await axiosInstance().put(
                this.endpoint + 'update/',
                updated,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}