import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ExploreCard.module.css";
import clsx from "clsx";
import axios from "axios";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { firebaseApp } from "../../../../firebaseConfig";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router";
import Loader from "../../../Loader/Loader";
import Items_1 from "../../../../Items_house.json";

const Explore_Card1 = ({ className, items: itemFromProps }: any) => {
  const [item, setItem] = useState<null | any>({});
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const storage = getStorage(firebaseApp);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [creatorPhoto, setCreatorPhoto] = useState("");
  const [creatorUsername, setCreatorUsername] = useState("");
  const [video, setVideo] = useState(false);
  const [collectionTag, setCollectionTag] = useState("");
  const [idToken, setIdToken] = useState("");

  // console.log(itemFromProps);

  return (
    <div className={cn(styles.card, className)}>
      {loading && <Loader />}
      {loading === false && (
        <Link
          className={styles.link}
          to={`/property/${itemFromProps.id}/listing`}
        >
          <div className={styles.body}>
            <div className={styles.line}>
              <div
                className={clsx(styles.imgAndBtn, "position-relative w-100")}
              >
                {
                  <img
                    className={styles.image}
                    src={itemFromProps.imag_url}
                    alt="PropertyImg"
                  />
                }
              </div>
              <div className={styles.title}>{itemFromProps.propertyName}</div>
              <div
                className={clsx(
                  "d-flex align-items-center justify-content-between w-100 mt-2"
                )}
              >
                <div className={clsx("d-flex align-items-center")}>
                  <div className={styles.ownerAndUsername}>
                    <p className={styles.owner}>{itemFromProps.name}</p>
                  </div>
                </div>
                <div className={styles.price}>
                  <span className={styles.pricetxt}>
                    $ {itemFromProps.rent}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Explore_Card1;
