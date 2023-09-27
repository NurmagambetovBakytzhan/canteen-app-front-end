import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === ''){
            setError(true);
        }else{
            setSubmitted(true);
            setError(false);
            const token =  axios.post("/api/v1/users/token/",{
                "email": email,
                "password": password
            });
            token.then((res) => localStorage.setItem("token", res.data["access"]));
        }
    };

    return(
        <div className="login-form">
            <h1>Please Log In</h1>
            <form >
                <label className="label">Email</label>
                <MyInput onChange={handleEmail} type="text" />
                <label className="label">Password</label>
                <MyInput onChange={handlePassword} type="password" />
                <MyButton onClick={handleSubmit} type="submit">
                    Submit
                </MyButton>
            </form>

        </div>
    )
}
export default Login;