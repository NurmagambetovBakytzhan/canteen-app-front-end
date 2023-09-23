import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import "./RegistrationForm.css"
import axios from "axios";

const RegistrationForm = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
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

    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1 style={{color: "red"}}>Please enter all the fields</h1>
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>Confirmation code was sent to {email}</h1>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            const info = axios.post("/api/v1/users/", {
                "first_name": name,
                "last_name": surname,
                "email": email,
                "password": password,
                "user_type": "Customer"
            });

            info.then((res) => localStorage.setItem("session_id", res.data["session_id"]));
        }
    };

    return (
        <div className="registration-form">
            <div>
                <h1>User Registration</h1>
            </div>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                <label className="label">Name</label>
                <MyInput onChange={handleName} value={name} type="text" />

                <label className="label">Surname</label>
                <MyInput onChange={handleSurname} value={surname} type="text" />

                <label className="label">Email</label>
                <MyInput onChange={handleEmail} value={email} type="email" />

                <label className="label">Password</label>
                <MyInput onChange={handlePassword} value={password} type="password" />
                <MyButton
                    onClick={handleSubmit}
                    type="submit"
                >
                    Submit
                </MyButton>
            </form>
        </div>
    );
};

export default RegistrationForm;