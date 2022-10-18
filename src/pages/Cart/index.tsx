import React from 'react';
import styles from './Cart.module.scss'
import CartItem from "../../componenets/cartItem";
import Button from "../../componenets/UI/button";
import {Link} from "react-router-dom";
import {TbArrowBackUp} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {cartSelector} from "../../store/cart/selectors";
import {checkout} from "../../store/cart/slice";

const Cart: React.FC = () => {
    const dispatch = useDispatch()
    const {items, totalItems, totalPrice} = useSelector(cartSelector)
    const [didCheckout, setDidCheckout] = React.useState(false)
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleCheckout = () => {
        dispatch(checkout())
        setDidCheckout(true)
    }

    return (
        <div className={styles.cartPage}>
            {items.length
                ?
                <div className={styles.cart}>
                    <div className={styles.items}>
                        <h2 className={styles.title}>Cart</h2>
                        <div className={`${styles.itemsInner} ${styles.wrapper}`}>
                            {items.map(item =>
                                <CartItem key={item.id} item={item} arr={arr}/>
                            )}
                        </div>
                    </div>
                    <div className={styles.summary}>
                        <h2 className={styles.title}>Summary</h2>
                        <div className={`${styles.summaryInfo} ${styles.wrapper}`}>
                            <div className={styles.totalItems}>
                                <span>Total items: </span> <span>{totalItems}</span>
                            </div>
                            <div className={styles.totalPrice}>
                                <span>Total: </span> <span>{+totalPrice.toFixed(2)}€</span>
                            </div>
                            <Button handleClick={handleCheckout} allWidth>Checkout</Button>
                            <div className={styles.goBack}>
                                <span>or</span>
                                <Link className={styles.goBackButton} to={"/"}><TbArrowBackUp/>Continue shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={`${styles.emptyCart} ${styles.wrapper}`}>
                    {didCheckout
                        ? <>Thank you for purchase!<span>😉</span></>
                        : <>Cart is empty<span>🤔</span></>
                    }
                    <Link to={"/"}><TbArrowBackUp/>Continue shopping</Link>
                </div>
            }
        </div>
    );
};

export default Cart;