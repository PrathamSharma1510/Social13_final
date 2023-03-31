import React from 'react';
import Items from "../../../components/items/Items";
import { Iitems } from "../../../components/item";
import styles from "./ItemsCarousel.module.css"
import Card from '../../../components/card/Card';

const ItemsCarousel = () => {
    return (
        <div className={styles.carousel}>
            {Iitems.map((x: any, index: any) => (
                <Card className={styles.card} item={x} key={index} />
            ))}

        </div>
    );
};

export default ItemsCarousel;