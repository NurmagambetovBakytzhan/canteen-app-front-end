import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({className, ...props}) => {
    return (
        <input  {...props} className={`${classes.input} ${className}`}/>
    );
};

export default MyInput;