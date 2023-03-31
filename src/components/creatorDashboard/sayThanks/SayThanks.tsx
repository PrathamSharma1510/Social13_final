import clsx from "clsx";
import { Check } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";
import styles from "./styles.module.css";
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

const Content = [
  {
    date: "07/02/2022",
    name: "choo",
    username: "@chootalks",
    status: true,
    amount: "46,450.00",
    img: "images/pfx.png",
  },
  {
    date: "07/02/2022",
    name: "choo",
    username: "@chootalks",
    status: true,
    amount: "46,450.00",
    img: "images/pfx.png",
  },
  {
    date: "07/02/2022",
    name: "choo",
    username: "@chootalks",
    status: true,
    amount: "46,450.00",
    img: "images/pfx.png",
  },
  {
    date: "07/02/2022",
    name: "choo",
    username: "@chootalks",
    status: true,
    amount: "46,450.00",
    img: "images/pfx.png",
  },
];

const SayThanks = () => {
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [creatorTran, setCreatorTran] = useState<any>([]);
  const [buyerData, setBuyData] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      let transactions: any = [];
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
                transactions.push(docs.data());
              } else {
                transactions.push("Null");
              }
            });
            console.log(transactions);
            setCreatorTran(transactions);
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
      <div className={clsx(styles.main, "container")}>
        <div className="d-flex">
          <h2 className={styles.h2}>Say Thanks</h2>
          <div className={clsx(styles.selectDiv)}>
            <label className="grayBold">SORT BY</label>
            <Form.Select
              name="bank acc"
              className={clsx(styles.select, " mb-3")}
              aria-label="Default select example"
            >
              <option selected>Filter</option>
              <option value="1">Last Month</option>
              <option value="2">This Month</option>
            </Form.Select>
          </div>
        </div>
        <div className={styles.main2}>
          <div className={clsx("d-flex w-100 ", styles.heading)}>
            <div className={styles.heading1}>User</div>
            <div className={styles.heading2}>Date</div>
            <div className={styles.heading3}>Amount</div>
          </div>
          {creatorTran.map((c: any, index: number) => {
            return (
              <div
                className={clsx(
                  "d-flex w-100 align-items-center",
                  styles.elemm
                )}
              >
                <div className={styles.elem1}>
                  <div
                    className={clsx(
                      "d-flex align-items-center justify-content-center"
                    )}
                  >
                    <img
                      className={styles.creatorImg}
                      src={c.buyerPhoto || "./images/content/avatar-big.jpg"}
                      alt=""
                    />
                    <div className={styles.ownerAndUsername}>
                      <p className={styles.owner}>{c.buyerName}</p>
                      <p className={styles.username}>@{c.buyerUsername}</p>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.elem2, " text-center")}>
                  {c.timestamp.slice(4, 15)}
                </div>
                <div
                  className={clsx(
                    styles.elem3,
                    "text-center",
                    styles.Pricebold
                  )}
                >
                  <span className={styles.circle} />
                  INR {c.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SayThanks;
