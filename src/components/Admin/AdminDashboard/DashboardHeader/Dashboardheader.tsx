import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../logo/Logo";
import styles from "./Dashboardheader.module.css";

const Dashboardheader = () => {
  return (
    <div className={styles.body}>
      <div className={styles.logo}>
        <img className={styles.img} src="./images/logo.png" alt="logo" />
      </div>
      <div className={styles.text}>
        <Link to="#" className="styles.link">
          NFT
        </Link>
      </div>
    </div>
  );
};

export default Dashboardheader;
