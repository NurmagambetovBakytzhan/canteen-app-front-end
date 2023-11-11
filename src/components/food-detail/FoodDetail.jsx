import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {FoodService} from "../../services/api/Food.service";
import "./FoodDetail.css";

const FoodDetail = () => {
    const { id } = useParams();
    const foodService = useMemo(() => new FoodService(), []);
    const [food, setFood] = useState(null);

    useEffect(() => {
        foodService.retrieve(id).then((data) => setFood(data))
    }, [id, foodService]);

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-wrapper">
            <h1>{food.name}</h1>
            <hr/>
            <div className="food-detail">
                <div className="food-img">
                    <img src={food.image} alt={food.name}/>
                </div>
                <div className="item-info">
                    <h4 className="price">{food.price} тг.</h4>
                    <label>Описание:</label>
                    <p>{food.description}</p>
                </div>
            </div>
        </div>
    );};

export default React.memo(FoodDetail);