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

    return (
        <div>
            <h2>Menu bon appétit</h2>
            <ul>
                <SearchBar onSearchSubmit={onSearchSubmit} />
                {foods.map((food) => (
                    <li key={food.id}>
                        <br />
                        {food.price}
                        <h3 onClick={() => pageRoute(`/food/${food.id}`)}> {food.name}</h3>
                        <br />
                        <img width={200} onClick={() => pageRoute(`/food/${food.id}`)} src={food.image} alt="No photo"/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
