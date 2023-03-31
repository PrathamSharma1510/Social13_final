import clsx from "clsx";
import {
  ChartLineUp,
  CurrencyCircleDollar,
  HandPointing,
} from "phosphor-react";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useSelector, RootStateOrAny } from "react-redux";
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

const CreatorStats = () => {
  const userData = useSelector((state: RootStateOrAny) => state.userData);

  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [creatorTran, setCreatorTran] = useState<any>([]);
  const [buyerData, setBuyData] = useState<any>({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesMade, setSalesMade] = useState(0);
  const [userThanks, setUserThanks] = useState(0);

  useEffect(() => {
    const run = async () => {
      let totalRevenue: number = 0;
      if (uid && loggedIn) {
        await getDocs(
          query(
            collection(db, "paymentRecords"),
            where("recipientData.reciepientUID", "==", uid)
            // orderBy("timestamp", "desc")
          )
        )
          .then((snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists()) {
                totalRevenue = totalRevenue + docs.data().amount;
              } else {
                totalRevenue = 0;
              }
            });
            console.log(totalRevenue);
            setTotalRevenue(totalRevenue);
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

  useEffect(() => {
    const run = async () => {
      let totalUserThanks: any = [];
      if (uid && loggedIn) {
        await getDocs(
          query(
            collection(db, "paymentRecords"),
            where("recipientData.reciepientUID", "==", uid),
            where("transactionType", "==", "Creator Support")
            // orderBy("timestamp", "desc")
          )
        )
          .then((snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists()) {
                totalUserThanks.push(docs.data());
              } else {
                totalUserThanks = [];
              }
            });
            setUserThanks(totalUserThanks.length);
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

  useEffect(() => {
    const run = async () => {
      let totalSalesMade: any = [];
      if (uid && loggedIn) {
        await getDocs(
          query(
            collection(db, "paymentRecords"),
            where("recipientData.reciepientUID", "==", uid),
            where("transactionType", "==", "NFT Purchase")
            // orderBy("timestamp", "desc")
          )
        )
          .then((snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists()) {
                totalSalesMade.push(docs.data());
              } else {
                totalSalesMade = [];
              }
            });
            console.log(totalSalesMade.length);
            setSalesMade(totalSalesMade.length);
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
      <div className="container mt-4 pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className={styles.creatorHeading}>
            Welcome to your Creator Dashboard
          </h2>
          {/* <select className={clsx("form-select w-25", styles.select)} aria-label="Default select example">
                    <option value="1">All Time</option>
                    <option value="2">Monthly</option>
                    <option value="3">Yearly</option>
                </select> */}
        </div>
        <div
          className={clsx("d-flex mt-4 justify-content-between", styles.cards)}
        >
          <div className={styles.card}>
            <CurrencyCircleDollar
              className={styles.icon}
              size={64}
              weight="bold"
            />
            <p className={styles.text}>Total revenue earned</p>
            <p className={styles.price}>₹ {totalRevenue}</p>
          </div>

          <div className={styles.card}>
            <HandPointing className={styles.icon} size={64} weight="bold" />
            <p className={styles.text}>Total profile visits</p>
            <p className={styles.price}>{userData?.profileViews}</p>
          </div>

          <div className={styles.card}>
            <ChartLineUp className={styles.icon} size={64} weight="bold" />
            <p className={styles.text}>User Thanksful</p>
            <p className={styles.price}>{userThanks}</p>
          </div>

          <div className={styles.card}>
            <ChartLineUp className={styles.icon} size={64} weight="bold" />
            <p className={styles.text}>Total sales made</p>
            <p className={styles.price}>{salesMade}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorStats;
