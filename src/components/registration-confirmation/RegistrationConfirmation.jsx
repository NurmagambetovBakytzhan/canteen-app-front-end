import React, {useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {confirmRegistration} from "../../services/api/RegistrationConfirmation.service";

const RegistrationConfirmation = () => {
    const [code, setCode] = useState('');

    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        const status = await confirmRegistration(code);
        console.log(status)
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