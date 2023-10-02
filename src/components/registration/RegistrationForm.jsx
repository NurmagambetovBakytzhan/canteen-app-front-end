import React, {useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import "./RegistrationForm.css"
import {registerUser} from "../../services/api/Registration.service";
import ErrorMessage from "../../shared/components/ErrorMessage/ErrorMessage";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleSurname = (e) => {
        setSurname(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            setError(false);
            const session_id = await registerUser(name, surname, email, password);
            localStorage.setItem("session_id", session_id)
            navigate("/registration-confirmation");
        }
    };

    return (
        <div className="form">
            <h1>Регистрация</h1>

            <ErrorMessage error={error} message={'Заполните все поля'} />

            <label className="creds-label">Имя:</label>
            <MyInput onChange={handleName} value={name} type="text" placeholder="Введите имя" />

            <label className="creds-label">Фамилия:</label>
            <MyInput onChange={handleSurname} value={surname} type="text" placeholder="Введите фамилию" />

            <label className="creds-label">Почта:</label>
            <MyInput onChange={handleEmail} value={email} type="email" placeholder="Введите почту" />

            <label className="creds-label">Пароль:</label>
            <MyInput onChange={handlePassword} value={password} type="password" placeholder="Введите пароль" />
            <MyButton
                onClick={handleSubmit}
                type="submit"
                classNames={["submit-btn"]}
            >
                Регистрация
            </MyButton>
        </div>
    );
};

export default RegistrationForm;