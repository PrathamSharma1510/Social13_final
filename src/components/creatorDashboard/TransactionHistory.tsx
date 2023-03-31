import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styles from "./transactionHistory.module.css";
import TransactionSingle from "./transactionSingle/TransactionSingle";
import {
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TransactionHistory = () => {
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [transactionData, setTransactionData] = useState<any>([]);

  useEffect(() => {
    const run = async () => {
      let transactions: any = [];
      if (uid && loggedIn) {
        // console.log(uid);
        // console.log(loggedIn);
        await getDocs(
          query(
            collection(db, "paymentRecords"),
            where("recipientData.reciepientUID", "==", uid),
            limit(3)
          )
        )
          .then((snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists()) {
                transactions.push(docs.data());
              } else {
                transactions.push("Null");
              }
            });
            console.log(transactions);
            let transac: any = transactions.reverse();
            setTransactionData(transac.slice(0, 3));
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(transactions[0].amount)
      } else {
        console.log("Not Logged In");
      }
    };
    // console.log(transactionData[0].amount)

    run();
  }, [uid, loggedIn]);

  return (
    <>
      <div className={styles.mainDiv}>
        <h2 className={styles.heading}>Recent Transactions</h2>
        {
          <div className={styles.content}>
            {transactionData.map((e: any, index: number) => (
              <TransactionSingle
                key={index}
                price={e.amount}
                transactionID={e.razorpayPaymentId}
                date={e.timestamp.slice(3, 15)}
                transHead={e.transactionType}
                success={e.transactionSuccess}
                nftUid={e.purchasedNftUID}
              />
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default TransactionHistory;
