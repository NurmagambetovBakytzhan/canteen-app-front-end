import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Menu.css"
import SearchBar from "../../shared/components/searchBar/SearchBar";
import {FoodService} from "../../services/api/Food.service";
import cartServiceInstance from "../../services/api/Cart.service";
import MyButton from "../../UI/button/MyButton";
import useMenu from "../../shared/hooks/useMenu";


const Menu = () => {
    const pageRoute = useNavigate();
    const foodService = useMemo(() => new FoodService(), []);
    // const [foods, setFoods] = useFetch(foodService);
    const cartService = cartServiceInstance;
    const [amount, setAmount] = useState(0);

    const { foods, onSearchSubmit, handleSortChange } = useMenu(foodService, pageRoute);

    return (
        <div className="menu-wrapper">
                <SearchBar onSearchSubmit={onSearchSubmit} />

                <div className="order-selector">
                    <label htmlFor="order">Порядок:</label>
                    <select id="order" onChange={handleSortChange}>
                        <option value="not-selected">Не выбрано</option>
                        <option value="price-asc">Цена по возрастанию</option>
                        <option value="price-desc">Цена по убыванию</option>
                        <option value="name-asc">Название А-Я</option>
                        <option value="name-desc">Название Я-А</option>
                    </select>
                </div>
                <div className="food-list">

                    {foods.map((food) => (
                            <div className="menu-item" key={food.id}>
                                <div className="img-container">
                                    <img onClick={() => pageRoute(`/food/${food.id}`)} src={food.image} alt="Нет фото"/>
                                </div>
                                <h4 className="link" onClick={() => pageRoute(`/food/${food.id}`)}> {food.name}</h4>
                                <h4 className="link">{food.price} тг.</h4>
                                <MyButton onClick={() => cartService.addToCart(food)}>В корзину</MyButton>
                            </div>
                    ))}
                </div>
        </div>
    );
};

export default React.memo(Menu) ;
