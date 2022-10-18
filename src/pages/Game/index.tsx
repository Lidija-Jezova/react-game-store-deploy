import React from 'react';
import styles from './Game.module.scss'
import {Link, useParams} from "react-router-dom";
import Button from "../../componenets/UI/button";
import {TbArrowBackUp} from "react-icons/tb";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../hooks";
import {gameSelector} from "../../store/game/selectors";
import {addItem} from "../../store/cart/slice";
import {fetchGame} from "../../store/game/asyncActions";
import Popup from "../../componenets/UI/popup";
import {cartSelector} from "../../store/cart/selectors";

const Game: React.FC = () => {
    const dispatch = useAppDispatch()
    const {game, status} = useSelector(gameSelector)
    const {items, maxToBuyOfOne} = useSelector(cartSelector)
    const {id} = useParams()
    const [date, setDate] = React.useState(Date)
    const [popupIsActive, setPopupIsActive] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleButtonClick = () => {
        const item = {
            id: game.id,
            name: game.name,
            price: game.price,
            priceOfOne: game.price,
            image: game.image,
            count: 1
        }
        dispatch(addItem(item))
    }

    const getGame = () => {
        dispatch(fetchGame(Number(id)))
    }

    const getDate = () => {
        if (status !== 'loading') {
            const newDate = new Date(game.releaseDate)
            setDate(`${newDate.getDate()} ${months[newDate.getMonth()]}, ${newDate.getFullYear()}`)
        }
    }

    const handlePopup = (value: boolean) => {
        setPopupIsActive(value)
    }

    React.useEffect(() => {
        getGame()
    }, [])

    React.useEffect(() => {
        getDate()
    }, [status])

    React.useEffect(() => {
        if (isMounted) {
            const cartItem = items.find(item => item.id === Number(id))

            if (cartItem && cartItem.count < 10) {
                setPopupIsActive(false)
            } else {
                setPopupIsActive(true)
            }
        }

        setIsMounted(true)
    }, [items])

    return (
        <>
            {status !== 'success'
                ?
                <div className={styles.loading}>Loading...<span>👀</span></div>
                :
                <div className={styles.page}>
                    <div className={styles.poster}>
                        <img
                            src={game.image}
                            alt="poster"/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{game.name}</div>
                        <div className={styles.description}>{game.description}</div>
                        <div className={styles.releaseDate}>Release date: {date}</div>
                        <div className={styles.tags}>
                            {game.genres.map(genre =>
                                <div className={styles.tag} key={genre}>{genre}</div>
                            )}
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.price}>{game.price}€</div>
                            <Button handleClick={() => handleButtonClick()} allWidth>Add to cart</Button>
                            <Link className={styles.goBackButton} to={"/"}><TbArrowBackUp/></Link>
                        </div>
                    </div>
                    <Popup message={`You can buy only ${maxToBuyOfOne} copies of this game.`} isActive={popupIsActive}
                           handleClick={handlePopup}/>
                </div>
            }
        </>
    );
};

export default Game;