import { cartService } from "../../services/api/Cart.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
    const cartInstance = cartService;
    const [orders, setOrders] = useState([]);
    const pageRoute = useNavigate();
    const [specialWishes, setSpecialWishes] = useState({});

    useEffect(() => {
        cartInstance.getCart().then((data) => {
            setOrders(data);
        });
    }, []);

    const submitOrders = () => {
        cartInstance.submitOrders();
    };

    const saveChanges = () => {
        const updatedOrders = orders.map((order) => ({
            ...order,
            special_wishes: specialWishes[order.id],
        }));
        cartInstance.saveChanges(updatedOrders);
    };

    const deleteOrder = (orderId) => {
        cartInstance.deleteOrder(orderId);
        setOrders(orders.filter((order) => order.id !== orderId));
    };

    const changeQuantity = (orderId, newQuantity) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, amount: newQuantity } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="cart-wrapper"> {/* Apply a wrapper class for Cart */}
            <h2>Cart</h2>
            {orders.map((order) => (
                <div className="cart-item" key={order.id}> {/* Apply a class for Cart items */}
                    <h3 onClick={() => pageRoute(`/food/${order.food.id}`)}>
                        {order.food.name}
                    </h3>
                    <div className="food-details">
                        <div className="price">{order.food.price * order.amount}</div>
                    </div>

                    {order.food.name} - Quantity:{" "}
                    <button
                        onClick={() => changeQuantity(order.id, order.amount - 1)}
                        disabled={order.amount <= 1}
                    >
                        -
                    </button>{" "}
                    {order.amount}{" "}
                    <button
                        onClick={() => changeQuantity(order.id, order.amount + 1)}
                        disabled={order.amount >= order.food.amount}
                    >
                        +
                    </button>{" "}
                    <button onClick={() => deleteOrder(order.id)}>Delete</button>
                    <br />
                    <input
                        type="text"
                        placeholder="Special Wishes"
                        value={specialWishes[order.id]}
                        onChange={(e) =>
                            setSpecialWishes({
                                ...specialWishes,
                                [order.id]: e.target.value,
                            })
                        }
                    />
                </div>
            ))}
            <button onClick={submitOrders}>Submit Orders</button>
            <button onClick={saveChanges}>Save Changes</button>
        </div>
    );
};

export default Cart;
