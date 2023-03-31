import React, { useEffect, useState } from "react";
import { Star } from "phosphor-react";
import cn from "classnames";
import styles from "./Option.module.css";
import StarIcon from '@mui/icons-material/Star';


interface Option {
  className: string;
  onClick: any;
  isSaved:any;
}
const Option = ({ className, onClick, isSaved }: Option) => {
  return (
    <>
      <button onClick={onClick} className={cn(styles.options, className)}>
        {isSaved? <img className={styles.star} src="/images/Star.svg" alt="" /> : <Star size={40} className={styles.star} />}
      </button>
    </>
  );
};

export default Option;
