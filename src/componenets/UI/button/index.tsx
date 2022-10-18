import React from 'react';
import styles from './Button.module.scss'

type ButtonProps = {
    children: string;
    handleClick: (...val: any) => void;
    allWidth: boolean;
}

const Button: React.FC<ButtonProps> = ({children, handleClick, allWidth = false}) => {
    return (
        <button className={`${styles.button} ${allWidth && styles.allWidth}`} onClick={() => handleClick()}>
            {children}
        </button>
    );
};

export default Button;