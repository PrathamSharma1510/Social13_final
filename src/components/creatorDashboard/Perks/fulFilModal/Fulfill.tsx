import clsx from "clsx";
import { ArrowLeft, Gift } from "phosphor-react";
import React, { useState } from "react";
import { getFirestore, updateDoc, doc, Timestamp } from "firebase/firestore";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  PERK_MODAL_CLOSE_SUCCESS,
  PERK_MODAL_OPEN_SUCCESS,
} from "../../../../redux/constants/perkModal";
import { RootStore } from "../../../../store";
import ButtonItself from "../../../loginSignUpBtn/ButtonItself";
import styles from "./styles.module.css";
import { firebaseApp } from "../../../../firebaseConfig";

const c = {
  name: "Sandip",
  email: "sandip@hyperclub.com",
  img: "images/pfx.png",
};

const Fulfill = ({ item }: any) => {
  const dispatch = useDispatch();
  const [full, setFull] = useState(false);
  const db = getFirestore(firebaseApp);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const firebasetime = Timestamp.now().toDate();
  const handleFullFilled = async () => {
    if (full === false) {
      console.log("Please Confirm that you have sent the perk");
    } else {
      await updateDoc(doc(db, "nfts", item.nftDet.docId), {
        nftPerkState: "AVAILED",
        perkAvailedDate: firebasetime,
      })
        .then(() => {
          updateDoc(doc(db, "hyprUsers", uid, "perkAvailReq", item.reqId), {
            state: "AVAILED",
            availedDate: firebasetime,
          });
          console.log("Perk Sent!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const closeModal = (e: any) => {
    dispatch({ type: PERK_MODAL_CLOSE_SUCCESS });
  };
  return (
    <>
      <div
        onClick={closeModal}
        className={clsx("position-fixed", styles.modalBg)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx("position-absolute", styles.modal)}
        >
          <ArrowLeft className={styles.arrow} onClick={closeModal} size={28} />
          <div className={styles.uptoUser}>
            <Gift className={styles.giftIcon} size={80} weight="bold" />
            <p className={styles.heading}>Fulfil a Perk</p>
            <p className={styles.desc}>
              To fulfil a perk, you would have to reach out to the user
              yourself. We can provide you with the email and name of the user.
            </p>

            <div
              className={clsx(
                "d-flex align-items-center justify-content-center"
              )}
            >
              {/* <img
                className={styles.creatorImg}
                src={item.requestedBy.profilePhoto || c.img}
                alt="pht"
              /> */}
              <div className={styles.ownerAndUsername}>
                <p className={styles.owner}>{item.requestedBy.name}</p>
                <p className={styles.username}>{item.requestedBy.email}</p>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "d-flex mt-4 py-3 align-items-baseline",
              styles.checkBoxTexts
            )}
          >
            <input
              name="newsletter"
              onChange={() => setFull(!full)}
              id="newsletter"
              type="checkbox"
            />
            <label className="ms-2" htmlFor="newsletter">
              I can confirm, I have fulfilled the perk request sent by the user.
            </label>
          </div>
          <ButtonItself
            className="my-4 p-2"
            full
            onClick={handleFullFilled}
            btnPurpose={"FulFil Perk"}
          />
        </div>
      </div>
    </>
  );
};

export default Fulfill;
