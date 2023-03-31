import clsx from "clsx";
import { UploadSimple } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UPLOADNFT_MODAL_CLOSE_SUCCESS } from "../../../../redux/constants/uploadnftmodal";
import styles from "./UploadModals.module.css";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { firebaseApp } from "../../../../firebaseConfig";
const UploadModals = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [modals, setModals] = useState({
    Modal1: true,
    Modal2: false,
    Modal3: false,
  });
  const [cont, setCont] = useState(0);
  const [cont2, setCont2] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const db = getFirestore(firebaseApp);
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const makeCollectionId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };
  const closeModal = () => {
    dispatch({ type: UPLOADNFT_MODAL_CLOSE_SUCCESS });
    setModals({ Modal1: true, Modal2: false, Modal3: false });
  };
  const Redirect = () => {
    if (cont === 1) {
      navigate("/uploadnft");
      closeModal();
      // setCont(0);
    } else if (cont === 2) {
      setModals({ Modal1: false, Modal2: true, Modal3: false });
      setCont(0);
    }
  };
  const Redirect2 = async () => {
    if (cont2 === 1) {
      const req = "ASSISTANCE REQUIRED";
      const collectionId = "COL" + makeCollectionId(26);
      await setDoc(doc(db, "collectionRequest", collectionId), {
        creatorName: userData?.name,
        creatorEmail: userData?.email,
        collectionReqId: collectionId,
        creatorUid: uid,
        creatorUsername: userData?.username,
        isDecisionTaken: false,
        applyDate: date,
        typeOfRequest: req,
      })
        .then(() => {
          console.log("Req Sent");
          setModals({ Modal1: false, Modal2: false, Modal3: true });
          setCont2(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (cont2 === 2) {
      // navigate("/uploadnft");
      console.log("eheh1231");
      const req = "COLLECTION READY";
      const collectionId = "COL" + makeCollectionId(26);
      await setDoc(doc(db, "collectionRequest", collectionId), {
        creatorName: userData?.name,
        creatorEmail: userData?.email,
        collectionReqId: collectionId,
        creatorUid: uid,
        creatorUsername: userData?.username,
        isDecisionTaken: false,
        applyDate: date,
        typeOfRequest: req,
      })
        .then(() => {
          console.log("Req Sent");
          setModals({ Modal1: false, Modal2: false, Modal3: true });
          setCont2(0);
          closeModal();
          setCont2(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.first_modal,
          modals.Modal1 ? styles.show : styles.hide
        )}
      >
        <div className={styles.box_head}>
          <div className={styles.upload_icon}>
            <UploadSimple size={32} weight="bold" />
          </div>
          <h3 className={styles.heading}>Upload NFT</h3>
          <p className={styles.p}>
            Please choose one of the following upload options:
          </p>
        </div>
        <div className={styles.box_body}>
          <div
            className={clsx(
              styles.selection,
              cont === 1 ? styles.border : styles.borderless
            )}
            onClick={() => setCont(1)}
          >
            <h4 className={styles.selection_heading}>Upload Single NFT</h4>
            <p className={styles.selection_subheading}>
              Upload a single NFT or add piece to collection.
            </p>
          </div>
          <div
            className={clsx(
              styles.selection,
              cont === 2 ? styles.border : styles.borderless
            )}
            onClick={() => setCont(2)}
          >
            <h4 className={styles.selection_heading}>Upload a Collection</h4>
            <p className={styles.selection_subheading}>
              Get assisted in design and upload a collection of NFTs
            </p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn_white} onClick={closeModal}>
              <p className={styles.btn_white_text}>Cancel</p>
            </button>
            <button className={styles.btn} onClick={Redirect}>
              <p className={styles.btn_text}>Continue</p>
            </button>
          </div>
        </div>
      </div>

      {/*////////////////////////////////// MODAL2 /////////////////////////////////*/}

      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.second_modal,
          modals.Modal2 ? styles.show : styles.hide
        )}
      >
        <div className={styles.box_head}>
          <div className={styles.upload_icon}>
            <UploadSimple size={32} weight="bold" />
          </div>
          <h3 className={styles.heading}>Upload a Collection</h3>
          <p className={styles.p}>
            Please choose one of the following upload options:
          </p>
        </div>
        <div className={styles.box_body}>
          <div
            className={clsx(
              styles.selection,
              cont2 === 1 ? styles.border : styles.borderless
            )}
            onClick={() => setCont2(1)}
          >
            <h4 className={styles.selection_heading}>
              I would like to be assisted in designing a collection.
            </h4>
            <p className={styles.selection_subheading}>
              HyprClub can help you in designing your personalised collection
              with our talented NFT artists!
            </p>
          </div>
          <div
            className={clsx(
              styles.selection,
              cont2 === 2 ? styles.border : styles.borderless
            )}
            onClick={() => setCont2(2)}
          >
            <h4 className={styles.selection_heading}>Upload a Collection</h4>
            <p className={styles.selection_subheading}>
              Your collection will be uploaded automatically through us.
            </p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn_white} onClick={closeModal}>
              <p className={styles.btn_white_text}>Cancel</p>
            </button>
            <button className={styles.btn} onClick={Redirect2}>
              <p className={styles.btn_text}>Continue</p>
            </button>
          </div>
        </div>
      </div>

      {/*/////////////////////////////// MODAL3 /////////////////////////////////////////*/}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.third_modal,
          modals.Modal3 ? styles.show : styles.hide
        )}
      >
        <div className={styles.box_head}>
          <div className={styles.upload_icon}>
            <UploadSimple size={32} weight="bold" />
          </div>
          <h3 className={styles.heading}>Congratulations</h3>
          <p className={styles.p}>
            You have taken the first step to building an NFT collection! Our
            executives will be reaching out to you soon regarding the
            collection. Watch out your email for more!
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn_white} onClick={closeModal}>
            <p className={styles.btn_white_text}>Okay</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadModals;
