import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {FoodService} from "../../services/api/Food.service";

const FoodDetail = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const foodService = new FoodService();

    useEffect(() => {
        foodService.getFood(id).then((data) => setFood(data))
    }, [id]);

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Food Details</h2>
            <h3>{food.name}</h3>
            <p>Price: {food.price}</p>
            <img src={food.image} alt={food.name} width={200} />

        </div>
    );};

export default FoodDetail;