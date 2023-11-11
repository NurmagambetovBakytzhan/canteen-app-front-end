import cartServiceInstance from "../../services/api/Cart.service";

const useCart = () => {
    const cartService = cartServiceInstance;

    const addToCart = async (food) => {
        await cartService.addToCart(food);
    }

    const removeFromCart = async (orderId) => {
        await cartServiceInstance.deleteOrder(orderId);
    }
}