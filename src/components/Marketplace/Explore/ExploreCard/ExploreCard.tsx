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

const ExploreCard = ({ className, items: itemFromProps }: any) => {
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

  const handleSendProfile = () => {
    console.log("Hey");
  };

  const handleSendNft = () => {
    console.log("hey");
  };

  useEffect(() => {
    console.log(itemFromProps);
    const run = async () => {
      getDoc(doc(db, "users", itemFromProps.tentUid))
        .then((document) => {
          if (document.exists()) {
            setCreatorUsername(document?.data()?.username);
            const creatorPhotoRef = ref(
              storage,
              "users/" + itemFromProps.tentUid + "/profile.jpg"
            );
            getDownloadURL(ref(creatorPhotoRef))
              .then((url) => {
                setCreatorPhoto(url);
              })
              .catch((err) => {
                if (err.code === "storage/object-not-found") {
                  setCreatorPhoto("/images/content/avatar-big.jpg");
                } else {
                  console.error(err.code);
                }
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    run();
  }, [db, itemFromProps]);
  return (
    <div className={cn(styles.card, className)}>
      {loading && <Loader />}
      {loading === false && (
        <Link
          className={styles.link}
          to={`/property/${itemFromProps.requestId}/sublet`}
        >
          <div className={styles.body}>
            <div className={styles.line}>
              <div
                className={clsx(styles.imgAndBtn, "position-relative w-100")}
              >
                {
                  <img
                    className={styles.image}
                    src={itemFromProps.propertyImg}
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
                    <p className={styles.owner}>Posted By :{creatorUsername}</p>
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

export default ExploreCard;
