import React, {useEffect, useState} from 'react';
import {getAllFood} from "../../services/api/Menu.service";

const Menu = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getAllFood()
            .then((data) => {
                setFoods(data);
            })
            .catch((error) => {
                console.error("Error while fetching foods!: ", error);
            });
    }, []);


    return (
        <div>
            <h2>Menu bon appétit</h2>
            <ul>
                {foods.map((food) => (
                    <li key={food.id}>
                        {food.name}
                        <img src={food.image} width={200} alt={food.name} />
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Menu;