import React from 'react';
import styles from "../header/Header.module.scss";
import {BiSearch} from "react-icons/bi";
import {MdClear} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from "../../hooks/useDebounce";
import {setSearchQuery} from "../../store/selections/slice";

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const [currentSearchValue, setCurrentSearchValue] = React.useState('')

    const handleSearchSet = (value: string) => {
        dispatch(setSearchQuery(value))
    }

    const debouncedSearch = useDebounce(handleSearchSet, 500)

    React.useEffect(() => {
        debouncedSearch(currentSearchValue)
    }, [currentSearchValue])

    return (
        <form className={styles.search}>
            <div
                className={styles.searchIcon}
                onClick={() => inputRef.current?.focus()}
            >
                <BiSearch/>
            </div>
            <input
                ref={inputRef}
                value={currentSearchValue}
                onChange={e => setCurrentSearchValue(e.target.value)}
                className={styles.searchInput}
                type={"text"}
                placeholder={"Search for..."}
            />
            <button
                className={`${!currentSearchValue ? styles.hideClear : styles.clear}`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault()
                    dispatch(setSearchQuery(''))
                    setCurrentSearchValue('')
                    inputRef.current?.focus()
                }}
            >
                <MdClear/>
            </button>
        </form>
    );
};

export default Search;