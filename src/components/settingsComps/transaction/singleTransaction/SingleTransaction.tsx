import clsx from "clsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./singleTransaction.module.css";

interface Transaction {
  success?: any;
  propertyName: string;
  requestID: string;
  date: Date | string;
  status: string;
}

const SingleTransaction = ({
  status,
  propertyName,
  requestID,
  date,
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
              {/* {itemName === "Creator Support" && ( */}
              <p className={styles.boldTitle}>{propertyName}</p>

              {/* {itemName === "NFT Purchase" && (
                <Link to={`/nft/${nftUid}`}>
                  <p className={styles.boldTitle}>{itemName}</p>
                </Link>
              )} */}
              <p className={styles.boldTitle}>{requestID}</p>
              <p className={styles.date}>{date}</p>
            </div>
            <p className={styles.dateDesk}>{date}</p>
            <p className={styles.transDesk}>{requestID}</p>
            <li className={styles.statusDesk}>{status}</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTransaction;
