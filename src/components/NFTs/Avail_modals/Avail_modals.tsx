import clsx from "clsx";
import { ArrowLeft, Gift, Check, NotePencil } from "phosphor-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AVAILNFT_MODAL_CLOSE_SUCCESS } from "../../../redux/constants/availnftModal";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";
import ButtonItself from "../../loginSignUpBtn/ButtonItself";
import GradBorder from "../GradBorder/GradBorder";
import styles from "./Avail.module.css";
import {
  getFirestore,
  setDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "../../../firebaseConfig";
const Avail = ({ items, owner, creator, nftDoc, nftDet, ownerImg }: any) => {
  const [modals, setModals] = useState({
    Modal1: false,
    Modal2: true,
    Modal3: false,
  });
  const db = getFirestore(firebaseApp);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: AVAILNFT_MODAL_CLOSE_SUCCESS });
    setModals({ Modal1: false, Modal2: true, Modal3: false });
  };
  const makePerkReqId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };

  const handleRequest = async () => {
    const reqId = "PERK" + makePerkReqId(20);
    await setDoc(doc(db, "hyprUsers", creator.uid, "perkAvailReq", reqId), {
      nftDet: {
        docId: nftDoc,
        title: nftDet.name,
        description: nftDet.description,
      },
      perks: items,
      requestedDate: Timestamp.now().toDate(),
      state: "REQUESTED",
      reqId: reqId,
      requestedBy: {
        name: owner.name,
        username: owner.username,
        uid: owner.uid,
        email: owner.email,
        phone: owner.phone,
        profilePhoto: ownerImg,
      },
    })
      .then(() => {
        updateDoc(doc(db, "nfts", nftDoc), {
          nftPerkState: "REQUESTED",
        });
        console.log("Request Sent!");
        setModals({ Modal1: false, Modal2: false, Modal3: true });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(creator);
  };
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.first_modal,
          modals.Modal1 ? styles.show : styles.hide
        )}
      >
        <ArrowLeft
          size={32}
          weight="bold"
          className={styles.back}
          onClick={closeModal}
        />
        <div className={styles.box_head}>
          <div className={styles.gift_icon}>
            <Gift size={32} weight="bold" />{" "}
          </div>
          <h3 className={styles.heading}>Avail Your Perks</h3>
          <p className={styles.p}>
            You can avail your perks by sending a request to the creator. The
            creator will reach out to you as soon as possible once you send the
            request. Remember! The availed perk is non-transferable upon
            reselling the NFT.
          </p>
        </div>
        {/* <div className={styles.box_body}>
          <div className={styles.rows}>
            <p className={styles.content}>
              Get exclusive access to my Discord server!
            </p>{" "}
            <GradBorder
              className={styles.btn_grad}
              text="Avail Perk"
              onClick={() =>
                setModals({ Modal1: false, Modal2: true, Modal3: false })
              }
            />
          </div>
          <div className={styles.rows}>
            <p className={styles.content}>
              Get exclusive access to my Discord server!
            </p>{" "}
            <div className={styles.availed}>
              <Check size={30} weight="bold" className={styles.check} />{" "}
              <p className={styles.p_availed}>Availed</p>
            </div>
          </div>
          <div className={styles.rows}>
            <p className={styles.content}>
              Get exclusive access to my Discord server!
            </p>{" "}
            <div className={styles.requested}>
              <NotePencil size={30} weight="bold" className={styles.request} />{" "}
              <p className={styles.p_request}>Requested</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* /////////////////////////////////////MOdal2///////////////////////////////////// */}

      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.second_modal,
          modals.Modal2 ? styles.show : styles.hide
        )}
      >
        <ArrowLeft
          size={32}
          weight="bold"
          className={styles.back}
          onClick={closeModal}
        />
        <div className={styles.box_head}>
          <div className={styles.gift_icon}>
            <Gift size={32} weight="bold" />
          </div>
          <h3 className={styles.heading}>Confirmation</h3>
          <p className={styles.p}>
            Are you sure you would like to avail the following perk?
          </p>
        </div>
        <div className={styles.body}>
          <div className={styles.ul}>
            <ul className={styles.ul}>
              {items.map((e: any, index: number) => {
                return <li key={index}>{e.description}</li>;
              })}
            </ul>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn_white} onClick={closeModal}>
              <p className={styles.btn_white_text}>Cancel</p>
            </button>
            <button
              className={clsx(styles.btn, styles.btn_yes)}
              onClick={handleRequest}
            >
              <p className={styles.btn_text}>Yes, avail these perk</p>
            </button>
          </div>
        </div>
      </div>
      {/* /////////////////////////////////////////MODAL3/////////////////////////////////////////////////////////////// */}

      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.third_modal,
          modals.Modal3 ? styles.show : styles.hide
        )}
      >
        <div className={styles.box_head}>
          <div className={styles.gift_icon}>
            <Gift size={32} weight="bold" />
          </div>
          <h3 className={styles.heading}>Perk Availed!</h3>
          <p className={styles.p}>
            Congratulations on availing your perk! The creator will reach out to
            you soon with the promised perk.
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={closeModal}>
            <p className={styles.btn_text}>Back to my NFT</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Avail;
