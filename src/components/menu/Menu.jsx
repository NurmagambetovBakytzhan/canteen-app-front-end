import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Menu.css"
import SearchBar from "../../shared/components/searchBar/SearchBar";
import {FoodService} from "../../services/api/Food.service";

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const pageRoute = useNavigate()
    const foodService = new FoodService();

    useEffect(() => {
        foodService.getFoods().then((data) => setFoods(data))
    }, []);

    const onSearchSubmit = (searchText) => {
        foodService.searchFood(searchText).then((data) => setFoods(data))
    };

    const handleSortChange = (e) => {
        console.log(e.target.value);
        foodService.getOrderedFoods(e.target.value).then((data) => setFoods(data));
    };

    return (
        <div className="menu-wrapper">
            <h2>Menu bon appétit</h2>
                <SearchBar onSearchSubmit={onSearchSubmit} />

                <div className="order-selector">
                    <label htmlFor="order">Порядок:</label>
                    <select id="order" onChange={handleSortChange}>
                        <option value="not-selected">Не выбрано</option>
                        <option value="price-asc">Цена по возрастанию</option>
                        <option value="price-desc">Цена по убыванию</option>
                        <option value="name-asc">Название А-Я</option>
                        <option value="name-desc">Название А-Я</option>
                    </select>
                </div>
                <div className="food-list">

                    {foods.map((food) => (
                        <div className="menu-item">
                            <li key={food.id}>
                                <img width={200} onClick={() => pageRoute(`/food/${food.id}`)} src={food.image} alt="Нет фото"/>
                                <h3 onClick={() => pageRoute(`/food/${food.id}`)}> {food.name}</h3>
                                <h3>{food.price} тг.</h3>
                            </li>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Menu;
