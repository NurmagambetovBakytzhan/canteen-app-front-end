import React, {useState} from 'react';
import "./ManagerPage.css";
import ManagerOrder from "./components/orders/ManagerOrder";

const ManagerPage = () => {

    const [activeClicked, setActiveClicked] = useState(true);
    const [completedClicked, setCompletedClicked] = useState(false);

    const clickActiveOrders = () => {
        setCompletedClicked(false);
        setActiveClicked(true);
    }

    const clickCompletedOrders = () => {
        setActiveClicked(false);
        setCompletedClicked(true);
    }

    return (
        <div className="manager-page">
            <div>
                <h3 className={`link ${activeClicked ? "active-link" : ""}`} onClick={clickActiveOrders}>Активные Заказы ></h3>
                <h3 className={`link ${completedClicked ? "active-link" : ""}`} onClick={clickCompletedOrders}>Собранные Заказы ></h3>
            </div>
            <div className="orders-wrapper">
                {activeClicked && <ManagerOrder orderStatus="Processing" />}
                {completedClicked && <ManagerOrder orderStatus="Completed" />}
            </div>
        </div>
    );
};

export default ManagerPage;