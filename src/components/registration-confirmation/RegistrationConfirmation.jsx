import React, {useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {confirmRegistration} from "../../services/api/RegistrationConfirmation.service";
import ErrorMessage from "../../shared/components/ErrorMessage/ErrorMessage";
import {useNavigate} from "react-router-dom";

const RegistrationConfirmation = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        const status = await confirmRegistration(code);
        if (status !== 201) {
            setError(true);
        } else {
            setError(false);
            navigate("/menu");
        }
    }

    return (
        <div  className="form">
            <label className="creds-label">Код:</label>
            <ErrorMessage error={error} message="Неправильный код" />
            <MyInput onChange={handleCode}
                     value={code} type="text" />
            <MyButton onClick={handleCodeSubmit} type="submit" className="submit-btn">
                Отправить
            </MyButton>
        </div>
    );
};

export default RegistrationConfirmation;