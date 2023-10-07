import React, { useState } from 'react';
import './Login.css';
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";
import {login} from "../../services/api/Login.service";
import {UserCreds} from "../../shared/classes/UserCredentials";
import {Link, useNavigate} from 'react-router-dom';
import ErrorMessage from "../../shared/components/ErrorMessage/ErrorMessage";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = new UserCreds(email, password);
        const status = await login(userCredentials);

        if(status === 200) {
            navigate("/menu");
        } else {
            setError(true);
        }
    };

    return(
        <div className="form-wrapper">
            <div className="form">
                <h3>Авторизация</h3>
                <ErrorMessage error={error} message={"Неправильная почта или пароль"} />
                <label className="creds-label">Почта:</label>
                <MyInput onChange={handleEmail} type="text" placeholder="Введите почту" />
                <label className="creds-label">Пароль:</label>
                <MyInput onChange={handlePassword} type="password" placeholder="Введите пароль" />
                <MyButton onClick={handleSubmit} type="submit" classNames={["login-btn", "login-btn-hover"]}>
                    Войти
                </MyButton>

                <h4>Нет аккаунта? <Link to={"/registration"}>Зарегистрируйтесь</Link>
                </h4>

            </div>
        </div>
    )
}
export default Login;