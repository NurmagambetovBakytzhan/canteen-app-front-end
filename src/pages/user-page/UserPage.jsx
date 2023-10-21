import React, {useEffect, useState} from 'react';
import {UserService} from "../../services/api/User.service";
import MyInput from "../../UI/input/MyInput";
import "./UserPage.css";
import MyButton from "../../UI/button/MyButton";
import {useNavigate} from "react-router-dom";


const UserPage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const userService = new UserService();
    const [userEdit, setUserEdit] = useState({});

    useEffect(() => {
        userService.getUser().then((data) => {setUser(data); setUserEdit({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        })});
    }, [])


    const exit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");
        navigate("/menu");
        window.location.reload();
    }

    const firstNameChange = (e) => {
        const updatedUserEdit = { ...userEdit, first_name: e.target.value };
        setUserEdit(updatedUserEdit);
    }

    const lastNameChange = (e) => {
        const updatedUserEdit = { ...userEdit, last_name: e.target.value };
        setUserEdit(updatedUserEdit);
    }

    const emailNameChange = (e) => {
        const updatedUserEdit = { ...userEdit, email: e.target.value };
        setUserEdit(updatedUserEdit);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await userService.updateUser(userEdit);
        window.location.reload();
    }

    return (
        <div className="user-page">
            <h1>Личный кабинет</h1>
            <div className="user-page-wrapper">
                <div className="user-info">
                    <h3>{user.first_name} {user.last_name}</h3>
                    <h3>{user.email}</h3>
                    <MyButton type="submit" classNames={["exit-btn"]} onClick={exit}>Выйти</MyButton>
                </div>
                <div className="user-edit">
                    <MyInput type="text" value={userEdit.first_name} onChange={firstNameChange}></MyInput>
                    <MyInput type="text" value={userEdit.last_name} onChange={lastNameChange}></MyInput>
                    <MyInput type="email" value={userEdit.email} onChange={emailNameChange}></MyInput>
                    <MyButton type="submit" classNames={["submit-btn"]} onClick={handleSubmit}>Обновить</MyButton>
                </div>
            </div>
        </div>
    );
};

export default UserPage;