import clsx from "clsx";
import React, { useEffect, useState } from "react";
import SingleTransaction from "./singleTransaction/SingleTransaction";
import styles from "./transaction.module.css";
import { db } from "../../../firebaseConfig";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";

const Transaction = ({ transactionData }: any) => {
  return (
    <>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Transaction History</h2>
        <div className={styles.content}>
          <div className={clsx( styles.tranInfo)}>
            <div className={clsx(styles.heading1)}>Product</div>
            <div className={clsx(styles.heading2)}>Date</div>
            <div className={clsx(styles.heading3)}>Transaction ID</div>
            <div className={clsx(styles.heading4)}>Status</div>
            <div className={clsx(styles.heading5)}>Order Total</div>
          </div>

          {transactionData.map((e: any, index: number) => (
            <SingleTransaction
              price={`${e.amount}`}
              transactionID={e.razorpayPaymentId}
              date={e.timestamp.slice(4, 15)}
              success={e.transactionSuccess}
              nftUid={e.purchasedNftUID}
              itemName={e.transactionType}
            />
          ))}
        </div>

        {/* <div className="d-flex justify-content-center mt-5">
          <button className={styles.loadMoreBtn}>Load More</button>
        </div> */}
      </div>
    </>
  );
};

export default Transaction;
