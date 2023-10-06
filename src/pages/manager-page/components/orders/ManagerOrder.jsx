import React, {useEffect, useState} from 'react';
import {OrderService} from "../../../../services/api/Order.service";
import "./ManagerOrder.css";
import MyButton from "../../../../UI/button/MyButton";


const ManagerOrder = (orderStatus) => {
    const [orders, setOrders] = useState({});

    const orderService = new OrderService();


    useEffect(() => {
        orderService.getOrdersByStatus(orderStatus).then((data) => {
            const groupedOrders = data.reduce((acc, order) => {
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
                        {
                            orders[key].map((order) => (
                                <div>
                                    <h3>Блюдо: {order.food.name} {order.amount} шт.</h3>
                                    <label>Особые пожелания:</label>
                                    <p>{order.special_wishes}</p>
                                </div>
                            ))
                        }
                        <MyButton onClick={() => markOrder(orders[key][0].order_identifier)} classNames={["order-submit-btn"]} >Заказ Собран</MyButton>
                    </div>
                ))
            }
        </div>
    );
};

export default ManagerOrder;