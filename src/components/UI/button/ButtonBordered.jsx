import React from 'react';
import classes from './Btn.module.css'

const ButtonBordered = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.borderedBtn}>
            {children}
        </button>
    );
};

export default ButtonBordered;