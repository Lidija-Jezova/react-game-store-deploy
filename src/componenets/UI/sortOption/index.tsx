import React from 'react';
import styles from "../dropdown/Dropdown.module.scss";
import {TSort} from "../../../store/selections/types";

type SortProps = {
    handleClick: (value: TSort) => void;
    close: () => void;
    by: string;
    order: string;
    name: string;
    setIsSelectedByUser: (value: boolean) => void;
}

const SortOption: React.FC<SortProps> = ({handleClick, close, by, order, name, setIsSelectedByUser}) => {
    return (
        <div
            key={name}
            className={styles.option}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                handleClick({by, order, name})
                setIsSelectedByUser(true)
                close()
            }}
        >
            {name}
        </div>
    );
};

export default SortOption;