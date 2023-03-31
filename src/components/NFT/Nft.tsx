import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Iitems } from "../../components/item";
import Items from "../items/Items";
import styles from "./nft.module.css";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firebaseApp } from "../../firebaseConfig";
import { RootStateOrAny, useSelector } from "react-redux";

const Nft = ({ star, profile, user, owned, created }: any) => {
  const [createdSel, setCreatedSel] = useState(true);
  const [ownedSel, setOwnedSel] = useState(false);
  const [stared, setStared] = useState(false);

  const [createdNft, setCreatedNft] = useState<any>([]);
  const db = getFirestore(firebaseApp);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );

  const createdClick = () => {
    setCreatedSel(true);
    setOwnedSel(false);
    setStared(false);
  };

  const ownedClick = () => {
    setCreatedSel(false);
    setOwnedSel(true);
    setStared(false);
  };

  const staredClick = () => {
    setCreatedSel(false);
    setOwnedSel(false);
    setStared(true);
  };

  // get created nft

  useEffect(() => {
    const run = async () => {
      if (user?.uid) {
        await getDocs(
          query(collection(db, "nfts"), where("creatorUid", "==", user.uid))
        )
          .then((querySnapShot) => {
            let nftIds: string[] = [];
            if (querySnapShot) {
              querySnapShot.forEach((element) => {
                if (element) {
                  nftIds.push(element.id);
                  console.log(nftIds);
                } else {
                }
              });
            } else {
            }

            setCreatedNft(nftIds);
          })
          .catch((error) => {
            console.error(error.code);
          });
      } else {
      }
    };
    run();
  }, [db]);

  return (
    <div className={styles.Nft}>
      <p className={styles.navLinks}>
        <span
          onClick={createdClick}
          className={clsx(styles.created, createdSel && styles.active)}
        >
          Created
        </span>
        <span
          onClick={ownedClick}
          className={clsx(styles.owned, ownedSel && styles.active)}
        >
          Owned
        </span>
        {uid === user?.uid && (
          <span
            onClick={staredClick}
            className={clsx(styles.owned, stared && styles.active)}
          >
            Starred
          </span>
        )}
      </p>
      {createdSel && user?.isCreator && (
        <Items nft created={createdSel} myProfile={profile} items={created} />
      )}
      {ownedSel && <Items nft items={owned} />}
      {stared && uid === user?.uid && <Items nft items={star} />}
    </div>
  );
};

export default Nft;
