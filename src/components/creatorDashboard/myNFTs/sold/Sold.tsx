import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { db } from "../../../../firebaseConfig";
import { useSelector, RootStateOrAny } from "react-redux";
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
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Sucess",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    name: "Choo",
    username: "chootalks",
    img: "images/pfx.png",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
];

const Sold = () => {
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [creatorTran, setCreatorTran] = useState<any>([]);

  useEffect(() => {
    const run = async () => {
      let transactions: any = [];
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
      <div className={styles.main2}>
        <div className={clsx("d-flex w-100 ", styles.heading)}>
          <div className={styles.heading1}>Item Name</div>
          <div className={styles.heading2}>Purchased By</div>
          <div className={styles.heading3}>Date</div>
          <div className={styles.heading4}>Amount</div>
        </div>
        {creatorTran.map((c: any, index: number) => {
          return (
            <div
              className={clsx("d-flex w-100 align-items-center", styles.elemm)}
            >
              <div className={styles.elem}>
                <Link to={`/nft/${c.purchasedNftUID}`}>
                  <span className={styles.bold}>{c.transactionType}</span>
                </Link>
                <p className={styles.id}>{c.razorpayPaymentId}</p>
              </div>
              <div
                className={clsx(
                  styles.elem,
                  "d-flex align-items-center justify-content-center"
                )}
              >
                <img className={styles.creatorImg} src={c.buyerPhoto} alt="" />
                <div className={styles.ownerAndUsername}>
                  <p className={clsx(styles.owner)}>{c.buyerName}</p>
                  <p className={styles.username}>@{c.buyerUsername}</p>
                </div>
              </div>
              <div className={styles.elem}>{c.timestamp.slice(4, 15)}</div>
              <div
                className={clsx(
                  styles.elem,
                  styles.Pricebold,
                  "d-flex align-items-center justify-content-center"
                )}
              >
                <span
                  className={styles.circle}
                  style={{ backgroundColor: c.color }}
                />
                INR {c.amount}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sold;
