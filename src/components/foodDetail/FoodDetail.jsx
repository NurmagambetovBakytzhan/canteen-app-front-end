import React, {useEffect, useState} from 'react';
import {getFoodById} from "../../services/api/FoodDetails.service";
import {useParams} from "react-router-dom";

const FoodDetail = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);

    useEffect(() => {

        getFoodById(id)
            .then((data) => {
                setFood(data);
            })
            .catch((error) => {
                console.error('Error while fetching food details: ', error);
            });
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