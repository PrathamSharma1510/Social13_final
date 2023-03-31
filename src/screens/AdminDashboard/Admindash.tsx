import React from "react";
import Dashboardheader from "../../components/Admin/AdminDashboard/DashboardHeader/Dashboardheader";
import Dashtable from "../../components/Admin/AdminDashboard/DashboardTable/Dashtable";
import styles from "./Admindash.module.css";
const Admindash = () => {
  return (
    <>
      <Dashboardheader />
      <div className={styles.wrapper}>
        <h1 className={styles.h1}> NFT Transactions</h1>
        <Dashtable />
      </div>
    </>
  );
};

export default Admindash;
