import { styled } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AVAILNFT_MODAL_CLOSE_SUCCESS,
  AVAILNFT_MODAL_OPEN_SUCCESS,
} from "../../../redux/constants/availnftModal";
import styles from "../../../screens/NFTs/NFTS.module.css";
import { RootStore } from "../../../store";
import Avail_modals from "../Avail_modals/Avail_modals";
import { ArrowLeft, Gift, Check, NotePencil } from "phosphor-react";
import GradBorder from "../GradBorder/GradBorder";
interface Props {
  item: any;
  Bought: boolean;
  nftDet: any;
  ownerDet: any;
  creatorDet: any;
  perkState: any;
  nftDetail: any;
  ownerPht: any;
}

const Perks = ({
  item,
  Bought,
  nftDet,
  creatorDet,
  ownerDet,
  perkState,
  nftDetail,
  ownerPht,
}: Props) => {
  const { clicked_a } = useSelector(
    (state: RootStore) => state.availnftModalOpen
  );
  const dispatch = useDispatch();
  const AvailPerks = () => {
    dispatch({ type: AVAILNFT_MODAL_OPEN_SUCCESS });
  };
  useEffect(() => {
    if (clicked_a) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [clicked_a]);
  const closeModal = () => {
    dispatch({ type: AVAILNFT_MODAL_CLOSE_SUCCESS });
  };
  const [isIndex, setIsIndex] = useState(4);
  const toggleReadMore = () => {
    {
      isIndex === 4 ? setIsIndex(item.length) : setIsIndex(4);
    }
  };
  return (
    <>
      <ul className={styles.ul}>
        {item.map((e: any, index: number) => {
          if (index < isIndex) {
            return <li key={index}>{e.description}</li>;
          }
        })}
      </ul>
      {item.length > 4 && (
        <span onClick={toggleReadMore} className={styles.readHide}>
          {" "}
          {isIndex === 4 ? "View More" : "View Less"}
        </span>
      )}
      {Bought && perkState === "PENDING" && (
        <GradBorder
          className={styles.avail_perk_button}
          text="Avail Perk"
          onClick={AvailPerks}
        />
      )}
      {Bought && perkState === "AVAILED" && (
        <div className={styles.availed}>
          <Check size={30} weight="bold" className={styles.check} />{" "}
          <p className={styles.p_availed}>Availed</p>
        </div>
      )}
      {Bought && perkState === "REQUESTED" && (
        <div className={styles.requested}>
          <NotePencil size={30} weight="bold" className={styles.request} />{" "}
          <p className={styles.p_request}>Requested</p>
        </div>
      )}
      <div
        className={clsx(styles.modalDiv, clicked_a ? styles.show : styles.hide)}
        onClick={closeModal}
      >
        <Avail_modals
          items={item}
          owner={ownerDet}
          creator={creatorDet}
          nftDoc={nftDet}
          nftDet={nftDetail}
          ownerImg={ownerPht}
        />
      </div>
    </>
  );
};

export default Perks;
