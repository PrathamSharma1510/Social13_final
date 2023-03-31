import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./transactionSingle.module.css";

interface Transaction {
  success?: boolean;
  transHead: string;
  transactionID: string;
  date: Date | string;
  price: string;
  nftUid: string;
}

const TransactionSingle = ({
  success,
  transHead,
  transactionID,
  date,
  price,
  nftUid,
}: Transaction) => {
  return (
    <>
      <div className={styles.mainDiv}>
        <div className="d-flex  px-4 py-2 align-items-center">
          <div
            className={clsx(
              "d-flex justify-content-between ",
              styles.nameUsernamePrice
            )}
          >
            <div className={styles.nameAndPrice}>
              {transHead === "NFT Purchase" && (
                <Link to={`/nft/${nftUid}`}>
                  <p className={styles.boldTitle}>{transHead}</p>
                </Link>
              )}
              {transHead === "Creator Support" && (
                <p className={styles.boldTitle}>{transHead}</p>
              )}
              <p className={styles.boldTitleID}>{transactionID}</p>
              <p className={styles.date}>{date}</p>
            </div>
            <p className={styles.price}>
              <span className={styles.statusMob}>{success ? "🟢" : "🔴"}</span>{" "}
              INR {price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionSingle;
