import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Menu.css"
import SearchBar from "../../shared/components/searchBar/SearchBar";
import {FoodService} from "../../services/api/Food.service";

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const pageRoute = useNavigate()
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
        console.log(e.target.value);
        foodService.getOrderedFoods(e.target.value).then((data) => setFoods(data));
    };

    return (
        <div>
            <h2>Menu bon appétit</h2>
            <ul>
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



            </ul>


        </div>
    );
};

export default Menu;
