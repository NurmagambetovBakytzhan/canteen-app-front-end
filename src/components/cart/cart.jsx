import { cartService } from "../../services/api/Cart.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";

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
            <h2>Корзина</h2>
            {orders.map((order) => (
                <div className="cart-item" key={order.id}> {/* Apply a class for Cart items */}
                    <h3 onClick={() => pageRoute(`/food/${order.food.id}`)}>
                        {order.food.name}
                    </h3>
                    <div className="food-details">
                        <div className="price">{order.food.price * order.amount} тг.</div>
                    </div>

                    {order.food.name} - Quantity:{" "}
                    <button
                        className="cart-btn"
                        onClick={() => changeQuantity(order.id, order.amount - 1)}
                        disabled={order.amount <= 1}
                    >
                        -
                    </button>{" "}
                    {order.amount}{" "}
                    <button
                        onClick={() => changeQuantity(order.id, order.amount + 1)}
                        className="cart-btn"
                        disabled={order.amount >= order.food.amount}
                    >
                        +
                    </button>{" "}
                    <button  className="cart-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
                    <br />
                    <MyInput
                        type="text"
                        placeholder="Особые пожелания"
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
            <MyButton classNames={["cart-submit"]} onClick={submitOrders}>Отправить Заказ</MyButton>
            <MyButton classNames={["cart-submit"]} onClick={saveChanges}>Сохранить изменения</MyButton>
        </div>
    );
};

export default Cart;
