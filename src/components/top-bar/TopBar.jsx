import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './TopBar.css';

const TopBar = (isManager) => {
    return (
        <div className="top-bar">
            <div className="primary-menu">
                <Link to="/menu">Главная</Link>
                <Link to={ isManager.isManager ? "/manager" : "/active-orders" } style={{"margin": "20px"}}>Активные заказы </Link>
            </div>

            <div className="icons">

                <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <Link to="/login">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </div>
        </div>
    );
};

export default TopBar;