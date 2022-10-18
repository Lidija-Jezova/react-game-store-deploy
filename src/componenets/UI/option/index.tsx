import React from 'react';
import styles from "../dropdown/Dropdown.module.scss";

type OptionProps = {
    option: number | string;
    handleClick: (value: number | string) => void;
    close: () => void;
    setIsSelectedByUser: (value: boolean) => void;
}

const Option: React.FC<OptionProps> = ({option, handleClick, close, setIsSelectedByUser}) => {
    return (
        <div
            key={option}
            className={styles.option}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                handleClick(option)
                setIsSelectedByUser(true)
                close()
            }}
        >
            {option}
        </div>
    );
};

export default Option;