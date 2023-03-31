import React from "react";
import styles from "./BuyBtn.module.css";
import cn from "classnames";
interface BtnText {
  text: string;
  className: string;
}

const BuyBtn = ({ text, className }: BtnText) => {
  return (
    <>
      <button
        id={styles.buyBtn}
        className={cn(styles.gradientBorder, className)}
      >
        <span className={styles.btnName}>{text}</span>
      </button>
    </>
  );
};

export default BuyBtn;
