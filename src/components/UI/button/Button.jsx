import React from 'react';
import classes from './Btn.module.css'

const Button = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.blueBtn}>
            {children}
        </button>
    );
};

export default Button;