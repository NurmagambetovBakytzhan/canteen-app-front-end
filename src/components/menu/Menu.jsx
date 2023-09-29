import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAllFood} from '../../services/api/Menu.service';
import "./Menu.css"

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const pageRoute = useNavigate()
    useEffect(() => {
        getAllFood()
            .then((data) => {
                setFoods(data);
            })
            .catch((error) => {
                console.error('Error while fetching foods!: ', error);
            });
    }, []);

    return (
        <div>
            <h2>Menu bon appétit</h2>

            <ul>


                {foods.map((food) => (
                    <li key={food.id}>
                        {/* Use the Link component to create a link to the food details page */}

                        <br />
                        {food.price}
                        <h3 onClick={() => pageRoute(`/food/${food.id}`)}> {food.name}</h3>
                        <br />
                        <img width={200} onClick={() => pageRoute(`/food/${food.id}`)} src={food.image} alt="Нет фото"/>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
