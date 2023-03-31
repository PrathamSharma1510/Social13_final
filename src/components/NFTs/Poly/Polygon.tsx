import React from "react";
import cn from "classnames";
import styles from "./Polygon.module.css";

const Polygon = ({ className }: any) => {
  return (
    <>
      <div className={cn(className, styles.poly)}>
        <img
          id={styles.img}
          src="../../images/polygonscan.png"
          alt="polygonscan"
        />
      </div>
    </>
  );
};

export default Polygon;
