import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Menu.css";
import SearchBar from "../../shared/components/searchBar/SearchBar";
import {FoodService} from "../../services/api/Food.service";
import CartService from "../../services/api/Cart.service";
import cartServiceInstance from "../../services/api/Cart.service";
import MyButton from "../../UI/button/MyButton";

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const pageRoute = useNavigate();
    const foodService = new FoodService();
    const cartService = cartServiceInstance;
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        foodService.getFoods().then((data) => setFoods(data))

    }, []);

    const onSearchSubmit = (searchText) => {
        foodService.searchFood(searchText).then((data) => setFoods(data))
    };

    const handleSortChange = (e) => {
        foodService.getOrderedFoods(e.target.value).then((data) => setFoods(data));
    };




    return (
        <div>
            <h2>Menu bon appétit</h2>
            <ul>
                <SearchBar onSearchSubmit={onSearchSubmit}/>
                <div className="order-selector">
                    <label htmlFor="order">Порядок:</label>
                    <select id="order" onChange={handleSortChange}>
                        <option value="price-asc">Цена по возрастанию</option>
                        <option value="price-desc">Цена по убыванию</option>
                        <option value="name-asc">Название А-Я</option>
                        <option value="name-desc">Название А-Я</option>
                    </select>
                </div>

                {foods.map((food) => (
                    <li key={food.id}>
                        <div className="food-details">
                            <h3 onClick={() => pageRoute(`/food/${food.id}`)}> {food.name}</h3>
                            <div className="price">{food.price}</div>
                            <img
                                width={200}
                                onClick={() => pageRoute(`/food/${food.id}`)}
                                src={food.image}
                                alt="Нет фото"
                            />
                        </div>

                        <div className="cart-actions">
                            <MyButton onClick={() => cartService.addToCart(food)}>В корзину</MyButton>
                        </div>
                    </li>
                ))}


            </ul>


        </div>
    );
};

export default Menu;
