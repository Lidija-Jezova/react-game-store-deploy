import React from 'react';
import styles from './Popup.module.scss'

type TPopup = {
    message: string
    isActive?: boolean
    handleClick: (value: boolean) => void
}

const Popup: React.FC<TPopup> = ({message, isActive = false, handleClick}) => {
    return (
        <div
            className={`${styles.wrapperHidden} ${isActive && styles.wrapperVisible}`}
            onClick={() => handleClick(false)}
        >
            <div
                className={styles.popup}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {message}
            </div>
        </div>
    );
};

export default Popup;