import { useState, useEffect } from 'react';

const useMenu = (foodService, pageRoute) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await foodService.getAll();
                setFoods(data);
            } catch (error) {
                pageRoute("/login");
            }
        };

        fetchMenu();
    }, [foodService, pageRoute]);

    const onSearchSubmit = async (searchText) => {
        try {
            const data = await foodService.searchFood(searchText);
            setFoods(data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleSortChange = async (value) => {
        try {
            const data = await foodService.getOrderedFoods(value);
            setFoods(data);
        } catch (error){
            console.log(error)
        }
    };

    return {
        foods,
        onSearchSubmit,
        handleSortChange,
    };
};

export default useMenu;
