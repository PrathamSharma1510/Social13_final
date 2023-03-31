import clsx from "clsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./singleTransaction.module.css";

interface Transaction {
  success?: any;
  itemName: string;
  transactionID: string;
  date: Date | string;
  price: string;
  nftUid: any;
}

const SingleTransaction = ({
  success,
  itemName,
  transactionID,
  date,
  price,
  nftUid,
}: Transaction) => {
  return (
    <>
      <div className={styles.mainDiv}>
        <div className="d-flex px-5 py-2  align-items-center">
          {/* <img src="/images/pfImage.png" alt="" className={styles.pfImage} /> */}
          <div
            className={clsx(
              "d-flex justify-content-between ",
              styles.nameUsernamePrice
            )}
          >
            <div className={styles.nameAndPrice}>
              {itemName === "Creator Support" && (
                <p className={styles.boldTitle}>{itemName}</p>
              )}
              {itemName === "NFT Purchase" && (
                <Link to={`/nft/${nftUid}`}>
                  <p className={styles.boldTitle}>{itemName}</p>
                </Link>
              )}
              <p className={styles.boldTitle}>{transactionID}</p>
              <p className={styles.date}>{date}</p>
            </div>

            {itemName === "Creator Support" && (
              <p className={styles.boldTitle2}>{itemName}</p>
            )}
            {itemName === "NFT Purchase" && (
              <Link to={`/nft/${nftUid}`}>
                <p className={styles.boldTitle2}>{itemName}</p>
              </Link>
            )}
            <p className={styles.dateDesk}>{date}</p>
            <p className={styles.transDesk}>{transactionID}</p>
            <li className={styles.statusDesk}>
              {success === "success" ? "🟢 Success" : "🔴 Failed"}
            </li>
            <p className={styles.price}>
              <span className={styles.statusMob}>
                {success === "success" ? "🟢" : "🔴"}
              </span>{" "}
              INR {price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTransaction;
