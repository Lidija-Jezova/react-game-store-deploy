import React from 'react';
import styles from "../../pages/Cart/Cart.module.scss";
import Dropdown from "../UI/dropdown";
import {FiTrash2} from 'react-icons/fi';
import {useDispatch} from "react-redux";
import {changeItemCount, removeItem} from "../../store/cart/slice";

type CartItemProps = {
    item: {
        id: number
        name: string
        price: number
        priceOfOne: number
        image: string
        count: number
    }
    arr: number[]
}

const CartItem: React.FC<CartItemProps> = ({item, arr}) => {
    const dispatch = useDispatch()

    const handleItemCountChange = (count: number) => dispatch(changeItemCount({item, count}))

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <img
                    src={item.image}
                    alt="poster"/>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{item.name}</div>
                <button className={styles.remove} onClick={() => dispatch(removeItem(item.id))}>
                    <FiTrash2/>
                </button>
            </div>
            <div className={styles.qty}>
                <Dropdown options={arr} displayedValue={item.count}
                          handleClick={handleItemCountChange} initialValue={1} currentValue={item.count}/>
            </div>
            <div className={styles.price}>{item.price.toFixed(2)}$</div>
        </div>
    );
};

export default CartItem;