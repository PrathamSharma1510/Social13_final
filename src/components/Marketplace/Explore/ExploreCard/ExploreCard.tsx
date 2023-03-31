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
      setLoading(true);
      if (itemFromProps) {
        await getDoc(doc(db, "nfts", itemFromProps)).then((docs) => {
          if (docs.exists()) {
            setPrice(docs.data().price);
            setCollectionTag(docs.data().collectionTag);
            setIdToken(docs.data().token);

            setVideo(docs.data().video);
            axios
              .get(
                "https://cdn.hyprclub.com/" +
                  docs.data().collectionTag +
                  "/" +
                  docs.data().token
              )
              .then((repns) => {
                setItem(repns.data);
              })
              .catch((error) => {
                console.error(error);
              });
            getDoc(doc(db, "hyprUsers", docs.data().creatorUid))
              .then((document) => {
                if (document.exists()) {
                  setCreatorUsername(document?.data()?.username);
                  const creatorPhotoRef = ref(
                    storage,
                    "users/" + docs.data().creatorUid + "/profile.jpg"
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
          }
        });
        setLoading(false);
      } else {
        setLoading(false);
        return;
      }
    };
    run();
  }, [db, itemFromProps]);
  return (
    <div className={cn(styles.card, className)}>
      {loading && <Loader />}
      {loading === false && (
        <Link className={styles.link} to={`/nft/${itemFromProps}`}>
          <div className={styles.body}>
            <div className={styles.line}>
              <div
                className={clsx(styles.imgAndBtn, "position-relative w-100")}
              >
                {video ? (
                  <video
                    id="video"
                    className={styles.image}
                    src={item.animation_url || item.image}
                    autoPlay
                    loop
                  />
                ) : (
                  <img className={styles.image} src={item.image} alt="NFT" />
                )}
              </div>
              <div className={styles.title}>{item.name}</div>
              <div
                className={clsx(
                  "d-flex align-items-center justify-content-between w-100 mt-2"
                )}
              >
                <div className={clsx("d-flex align-items-center")}>
                  <img
                    className={styles.creatorImg}
                    src={creatorPhoto || "images/pfx.png"}
                    alt="Pht"
                  />
                  <div className={styles.ownerAndUsername}>
                    <p className={styles.owner}>Creator</p>

                    <p className={styles.username}>@{creatorUsername}</p>
                  </div>
                </div>
                <div className={styles.price}>
                  <span className={styles.pricetxt}>INR {price}</span>
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
