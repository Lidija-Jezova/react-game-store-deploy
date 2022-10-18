import React from 'react';
import styles from './Dropdown.module.scss'
import {IoIosArrowDown} from 'react-icons/io';
import {useClickOutside} from "../../../hooks/useClickOutside";
import Option from "../option";
import SortOption from "../sortOption";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import {TSort} from "../../../store/selections/types";

type DropdownProps = {
    options: {
        by: string
        order: string
        name: string
    }[] | string[] | number[];
    displayedValue: string | number;
    handleClick: (value: any) => void;
    hideFirstOption?: boolean;
    sort?: boolean;
    initialValue: {
        by: string
        order: string
        name: string
    } | string | number;
    currentValue: {
        by: string
        order: string
        name: string
    } | string | number;
}

const Dropdown: React.FC<DropdownProps> = React.memo(
    ({
         options,
         initialValue,
         currentValue,
         displayedValue,
         handleClick,
         hideFirstOption = false,
         sort = false
     }) => {
        useWhyDidYouUpdate('Games', {
            options,
            displayedValue,
            handleClick,
            hideFirstOption,
            sort
        })
        const [dropdownIsActive, setDropdownIsActive] = React.useState<boolean>(false)
        const [isSelectedByUser, setIsSelectedByUser] = React.useState<boolean>(false)

        const expand = () => {
            setDropdownIsActive(true)
        }

        const close = () => {
            setDropdownIsActive(false)
        }

        const clearUserSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation()
            setIsSelectedByUser(false)
            handleClick(options[0])
        }

        const dropdownRef = useClickOutside(close)

        React.useEffect(() => {
            if (currentValue !== initialValue) {
                setIsSelectedByUser(true)
            } else {
                setIsSelectedByUser(false)
            }
        }, [isSelectedByUser, currentValue])

        return (
            <div
                className={`
          ${styles.dropdown} 
          ${dropdownIsActive ? styles.dropdownIsActive : ''}
          `}
                ref={dropdownRef}
                onClick={expand}
            >
        <span
            className={`${isSelectedByUser ? styles.clear : ''}`}
            onClick={clearUserSelect}
        ></span>
                <div className={styles.currentOption}>
                    <div>{displayedValue}</div>
                    <IoIosArrowDown/>
                </div>
                <div className={`${styles.optionList} ${hideFirstOption && styles.hideFirst}`}>
                    {sort
                        ?
                        options?.map(option => typeof option === "object" &&
                            <SortOption
                                key={option.name}
                                handleClick={handleClick as (value: TSort) => void}
                                close={close}
                                {...option}
                                setIsSelectedByUser={setIsSelectedByUser}
                            />
                        )
                        :
                        options?.map(option => typeof option !== "object" &&
                            <Option
                                key={option}
                                handleClick={handleClick as (value: string | number) => void}
                                close={close}
                                option={option}
                                setIsSelectedByUser={setIsSelectedByUser}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
)

export default Dropdown;