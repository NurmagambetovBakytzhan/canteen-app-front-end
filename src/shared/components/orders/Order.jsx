import React, {useCallback, useEffect, useRef, useState} from 'react';
import {OrderService} from "../../../services/api/Order.service";
import "./Order.css";
import MyButton from "../../../UI/button/MyButton";


const Order = (orderStatus) => {
    const [orders, setOrders] = useState({});
    const isManager = localStorage.getItem("user_type") === "Manager";
    const orderService = new OrderService();
    // const ws = useRef(null);

    // const [data, setData] = useState(null);

    const statuses = {
        "Processing": "Собирается",
        "Completed": "Заказ готов"
    };

    // useEffect(() => {
    //     const ws = new WebSocket(`ws://localhost:8000/ws/notifications/?token=${localStorage.getItem("token")}`);
    //     ws.current = new WebSocket("wss://ws.kraken.com/"); // создаем ws соединение
    //     ws.current.onopen = () => console.log("Соединение открыто");	// callback на ивент открытия соединения
    //     ws.current.onclose = () => console.log("Соединение закрыто"); // callback на ивент закрытия соединения
    //
    //     return () => ws.current.close();
    // }, []);
    //
    // const gettingData = useCallback(() => {
    //     if (!ws.current) return;
    //
    //     ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
    //         const message = JSON.parse(e.data);
    //         setData(message);
    //         console.log(message);
    //     };
    // }, []);



    useEffect(() => {
        orderService.getOrders(orderStatus).then((data) => {
            const groupedOrders = data === undefined  ? {} : data.reduce((acc, order) => {
                const { order_identifier } = order;
                if (!acc[order_identifier]) {
                    acc[order_identifier] = [];
                }
                acc[order_identifier].push(order);
                return acc;
            }, {});

            setOrders(groupedOrders);
        });
    }, []);

    const getPrice = (orders)  => {
        let result = 0;
        for(const order of orders) {
            result += (order.amount * order.food.price);
        }
        return result
    }

    const markOrder = async (identifier) => {
        await orderService.markOrders(orderStatus.orderStatus, identifier);
        delete orders[identifier];
        setOrders({...orders});
    }

    return (
        <div>

            {
                Object.keys(orders).map((key) => (
                    <div className="order-item">
                        <div className="order-price">
                            <h1>Заказ №{orders[key][0].order_identifier}</h1>
                            <h1>Сумма заказа: {getPrice(orders[key])} тг.</h1>
                        </div>
                        <h3>Статус Заказа: {statuses[orders[key][0].status]}</h3>
                        {
                            orders[key].map((order) => (
                                <div>
                                    <h3>Блюдо: {order.food.name} {order.amount} шт.</h3>
                                    <label>Особые пожелания:</label>
                                    <p>{order.special_wishes}</p>
                                </div>
                            ))
                        }
                        <MyButton
                            onClick={() => markOrder(orders[key][0].order_identifier)}
                            classNames={["order-submit-btn"]}
                            style={{
                                display: isManager ? '' : 'none',
                            }}
                        >Заказ Собран</MyButton>
                    </div>
                ))
            }
        </div>
    );
};

export default Order;