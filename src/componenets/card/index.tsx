import React from 'react';
import styles from './Card.module.scss'
import {Link} from "react-router-dom";

type CardProps = {
    game: {
        id: number
        name:string
        price:number
        image: string
    }
}

const Card: React.FC<CardProps> = ({game}) => {
    return (
        <div className={styles.card}>
            <Link to={`/games/${game.id}`}>
                <div className={styles.image}>
                    <img
                        src={game.image}
                        alt="poster"/>
                </div>
            </Link>
            <div className={styles.info}>
                <div className={styles.name}>{game.name}</div>
                <div className={styles.price}>{game.price}€</div>
            </div>
        </div>
    );
};

export default Card;