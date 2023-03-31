import clsx from "clsx";
import { Check } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PERK_MODAL_OPEN_SUCCESS } from "../../../redux/constants/perkModal";
import { RootStore } from "../../../store";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";
import Fulfill from "./fulFilModal/Fulfill";
import styles from "./styles.module.css";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  where,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { firebaseApp } from "../../../firebaseConfig";
import userData from "../../../redux/slices/userData";
import { RootCloseEvent } from "react-bootstrap/esm/types";
const Content = [
  {
    nftTitle: "NFT1",
    name: "Sandip Rout",
    username: "sandip@hyprclub.com",
    status: true,
  },
  {
    perk: "Get access to my How to create your own fonts! with FREE worksheets!",
    nftTitle: "NFT2",
    name: "Sandip",
    username: "sandip@hyprclub.com",
    status: false,
  },
];

const Perks = () => {
  const db = getFirestore(firebaseApp);
  const [data, setData] = useState<any>({});
  const [reqId, setReqId] = useState("");
  const userData = useSelector((state: RootStateOrAny) => state?.useState);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [perkData, setPerkData] = useState<any>([]);
  // const query1 = query(collection(db, "hyprUsers", uid, "perkAvailReq"));

  const { clicked } = useSelector((state: RootStore) => state.perksModalOpen);

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: PERK_MODAL_OPEN_SUCCESS });
  };
  useEffect(() => {
    const run = async () => {
      let details: any = [];
      if (loggedIn && uid) {
        await getDocs(query(collection(db, "hyprUsers", uid, "perkAvailReq")))
          .then((querySnapshot) => {
            if (querySnapshot) {
              querySnapshot.forEach((snapshot) => {
                details.push(snapshot.data());
              });
            } else {
            }
            console.log(perkData);
          })
          .catch((err) => {
            console.log(err);
          });
        setPerkData(details);
      } else {
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [clicked]);

  return (
    <>
      <div className={clsx(styles.main, "container")}>
        <div className="d-flex">
          <h2 className={styles.h2}>My Perks</h2>
          <div className={clsx(styles.selectDiv)}>
            <label className="grayBold">SORT BY</label>
            <Form.Select
              name="bank acc"
              className={clsx(styles.select, " mb-3")}
              aria-label="Default select example"
            >
              <option selected>Filter</option>
              <option value="1">Fulfilled</option>
              <option value="2">Not Fulfilled</option>
            </Form.Select>
          </div>
        </div>

        <div className={styles.main2}>
          <div className={clsx("d-flex w-100 ", styles.heading)}>
            <div className={styles.heading1}>NFT Title</div>
            <div className={styles.heading2}>Purchased By</div>
            <div className={styles.heading3}>Status</div>
          </div>
          {perkData?.map((c: any, index: number) => {
            return (
              <div
                key={index}
                className={clsx(
                  "d-flex w-100 align-items-center",
                  styles.elemm
                )}
              >
                <Link to={`/nft/${c.nftDet.docId}`}>
                  <div className={styles.elem1}>{c.nftDet.title}</div>
                </Link>
                <div className={clsx(styles.elem2, " ")}>
                  <p className={clsx(styles.owner)}>{c.requestedBy.name}</p>
                  <p className={styles.username}>{c.requestedBy.email}</p>
                </div>
                <div className={clsx(styles.elem3, "text-center")}>
                  {c.state === "REQUESTED" && (
                    <GradientBorder
                      onClick={() => {
                        openModal();
                        setData(c);
                      }}
                      text="Fulfil"
                    />
                  )}
                  {c.state === "AVAILED" && (
                    <p>
                      <Check className={styles.icon} size={32} weight="bold" />{" "}
                      Fulfilled
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {clicked && <Fulfill item={data} />}
    </>
  );
};

export default Perks;
