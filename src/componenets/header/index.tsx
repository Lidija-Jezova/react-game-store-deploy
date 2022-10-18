import React from 'react';
import styles from './Header.module.scss'
import {BiSearch, BiCart} from 'react-icons/bi'
import {Link, useLocation} from "react-router-dom";
import Search from "../search";
import {useSelector} from "react-redux";
import {cartSelector} from "../../store/cart/selectors";

const Header: React.FC = () => {
    const {totalItems, totalPrice} = useSelector(cartSelector)
    const {pathname} = useLocation()

    return (
        <header className={styles.header}>
            <a href={'/'} className={styles.info}>
                <img className={styles.logo} src="/images/logo.svg" alt="logo"/>
                <div className={styles.name}>Game Store</div>
            </a>
            {pathname !== "/cart" &&
                <Search/>
            }
            {pathname !== "/cart" &&
                <Link to={"/cart"} className={styles.cart}>
                  <div className={styles.total}>{+totalPrice.toFixed(2)}€</div>
                  <div className={styles.cartIcon}>
                    <BiCart/>
                    <span className={styles.count}>{totalItems}</span>
                  </div>
                </Link>
            }
        </header>
    );
};

export default Header;