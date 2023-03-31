import React from "react";
import cn from "classnames";
import styles from "./card.module.css";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";



const CardStore = ({ className, item }:any) => {

  return (
    <div className={cn(styles.card, className)}>
      {/* <Link className={styles.link} to={item.url}> */}
        <div className={styles.body}>
          <div className={styles.line}>
              <img className={styles.image} src={item.image} alt="" />
            <div className={styles.title}>{item.title}</div>
            <div className={cn(styles.bottomSection, 'd-flex justify-content-between align-items-center')}>
                <GradientBorder text="Buy Now"/>
                <div className={styles.price}>{item.price}</div>
            </div>
          </div>
        </div>
      {/* </Link> */}
    </div>
  );
};

export default CardStore;
