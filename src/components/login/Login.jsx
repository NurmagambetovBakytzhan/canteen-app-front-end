import React, { useState } from 'react';
import './Login.css';
import axios from "axios";

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
                <label>
                    <p>Email</p>
                    <input onChange={handleEmail} type="text"  />
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={handlePassword} type="password"  />
                </label>
                <div>
                    <button onClick={handleSubmit} type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}
export default Login;