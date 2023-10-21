import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './TopBar.css';

const TopBar = () => {

    const isManager = () => {
        return localStorage.getItem("user_type") === 'Manager';
    };

    const isAuthenticated = () => {
        return localStorage.getItem("token") !== null;
    }

    return (
        <div className="top-bar">
            <div className="primary-menu">
                <Link to="/menu">Главная</Link>
                <Link to={ isManager() ? "/manager" : "/active-orders" } style={{"margin": "20px"}}>Активные заказы </Link>
            </div>

            <div className="icons">

                <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <Link to={isAuthenticated() ? "/profile" : "/login"}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </div>
        </div>
    );
};

export default TopBar;