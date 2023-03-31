import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RootCloseEvent } from "react-bootstrap/esm/types";
import { RootStateOrAny, useSelector } from "react-redux";
import Card from "../../card/Card";
import Sold from "./sold/Sold";
import styles from "./styles.module.css";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  where,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const NFTs = [
  {
    title: "European themed Collage",
    desc: "Classic collage capturing the essence of Europian fashion.",
    price: "INR 10,753",
    image: "images/nftImg.png",
    creatorImg: "images/pfx.png",
    creatorUsername: "chootalks",
    stage: "under review",
  },
  {
    title: "European themed Collage",
    desc: "Classic collage capturing the essence of Europian fashion.",
    price: "INR 10,753",
    image: "images/nftImg.png",
    creatorImg: "images/pfx.png",
    creatorUsername: "chootalks",
    stage: "rejected",
  },
  {
    title: "European themed Collage",
    desc: "Classic collage capturing the essence of Europian fashion.",
    price: "INR 10,753",
    image: "images/nftImg.png",
    creatorImg: "images/pfx.png",
    creatorUsername: "chootalks",
    stage: "under review",
  },
  {
    title: "European themed Collage",
    desc: "Classic collage capturing the essence of Europian fashion.",
    price: "INR 10,753",
    image: "images/nftImg.png",
    creatorImg: "images/pfx.png",
    creatorUsername: "chootalks",
    stage: "approved",
  },
];
const MyNfts = () => {
  const [created, setCreated] = useState(true);
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [nftData, setNftData] = useState<any>([]);
  // const query1 = query(
  //   collection(db, "nftRequest"),
  //   where("creatorUid", "==", uid)
  // );
  useEffect(() => {
    const run = async () => {
      let nft: any = [];
      if (uid && loggedIn) {
        console.log(uid);
        console.log(loggedIn);
        await getDocs(
          query(collection(db, "nftRequest"), where("creatorUid", "==", uid))
        )
          .then((snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists()) {
                nft.push(docs.data());
              } else {
                nft.push("Null");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
        setNftData(nft);
      } else {
        console.log("Not Logged In");
      }
    };
    run();
  }, [uid, loggedIn]);

  // useEffect(() => {
  //   const run = async () => {
  //     let nft: any = [];
  //     if (uid && loggedIn && userData) {
  //       await getDocs(
  //         query(
  //           collection(db, "nfts"),
  //           where("nftUid", "in", userData?.soldNfts)
  //         )
  //       )
  //         .then((snapshot) => {
  //           console.log("snapshot");
  //           snapshot.forEach((docs) => {
  //             if (docs.exists()) {
  //               console.log(docs.data());
  //             } else {
  //               console.log("null");
  //             }
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       console.log("Not Logged In");
  //     }
  //   };
  //   run();
  // }, [uid, loggedIn]);

  const createdHandler = () => {
    setCreated(true);
  };

  return (
    <>
      <div className={clsx("container", styles.mainDiv)}>
        <h2 className={styles.heading}>My NFTs</h2>

        <div className="d-flex justify-content-between">
          <p className={styles.createdAndSold}>
            <span
              onClick={() => setCreated(true)}
              className={created ? styles.active : ""}
            >
              Created
            </span>{" "}
            <span
              className={!created ? styles.active : ""}
              onClick={() => setCreated(false)}
            >
              Sold
            </span>
          </p>
          {created && (
            <div className={clsx(styles.selectDiv)}>
              <label className="grayBold">SORT BY</label>
              <Form.Select
                name="bank acc"
                className={clsx(styles.select, "mb-3")}
                aria-label="Default select example"
              >
                <option selected>Filter</option>
                <option value="1">Rejected</option>
                <option value="2">Under Review</option>
                <option value="3">Selected</option>
              </Form.Select>
            </div>
          )}
        </div>

        {created && (
          <div
            className={clsx(styles.createdNfts, "d-flex align-items-center")}
          >
            {nftData?.map((n: any, index: number) => {
              return <Card className="col-md-5" item={n} />;
            })}
          </div>
        )}

        {!created && <Sold />}
      </div>
    </>
  );
};

export default MyNfts;
