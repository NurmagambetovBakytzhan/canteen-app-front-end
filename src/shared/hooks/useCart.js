import { useState } from 'react';
import CartService from "../../services/api/Cart.service";
import cartServiceInstance from "../../services/api/Cart.service";

export function useCart() {
    const [cart, setCart] = useState([]);
    const cartService = cartServiceInstance;

    const getCart = async () => {
        const data = await cartService.getCart();
        return data;
    };

    const addToCart = async (food) => {
        await cartService.addToCart(food);
    };

    const submitOrders = async () => {
        await cartService.submitOrders();
    };

    const saveChanges = async (updatedOrders) => {
        await cartService.saveChanges(updatedOrders);
    };

    const deleteOrder = async (orderId) => {
        await cartService.deleteOrder(orderId);
    };


    return { cart, getCart, addToCart, submitOrders, saveChanges, deleteOrder };
}
