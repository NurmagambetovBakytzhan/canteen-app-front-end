import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import axios from "axios";

const RegistrationConfirmation = () => {
    const [code, setCode] = useState('');

    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        const info = axios.post("/api/v1/users/verify/", {
            "session_id": localStorage.getItem("session_id"),
            "code": code,
        });

        info.then((res) => console.log(res))
    }

    return (
        <div>
            <label className="label">Code</label>
            <MyInput onChange={handleCode}
                     value={code} type="text" />
            <MyButton onClick={handleCodeSubmit} type="submit">
                Submit
            </MyButton>
        </div>
    );
};

export default RegistrationConfirmation;