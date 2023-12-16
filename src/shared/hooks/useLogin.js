import { useState } from 'react';
import {setUserType} from "../../services/api/Login.service";

const useLogin = (login, navigate) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = { email, password };

        try {
            const status = await login(userCredentials);

            if (status === 200) {
                navigate("/menu");
                window.location.reload();
                await setUserType()
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return {
        email,
        password,
        error,
        handleEmail,
        handlePassword,
        handleSubmit,
    };
};

export default useLogin;
