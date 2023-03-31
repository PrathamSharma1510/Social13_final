import clsx from "clsx";
import React, { useEffect, useState } from "react";
import CreatorStats from "../../components/creatorDashboard/creatorStats/CreatorStats";
import GetHelp from "../../components/creatorDashboard/getHelp/GetHelp";
import MyNfts from "../../components/creatorDashboard/myNFTs/MyNfts";
import SayThanks from "../../components/creatorDashboard/sayThanks/SayThanks";
import Perks from "../../components/creatorDashboard/Perks/Perks";
import TransactionHistory from "../../components/creatorDashboard/TransactionHistory";
import Header_login from "../../components/header/header_after_login/Header_login";
import styles from "./styles.module.css";
import { useNavigate } from "react-router";
import { RootStateOrAny, useSelector } from "react-redux";
import SalesChart from "../../components/creatorDashboard/charts/SalesChart";
import { db } from "../../firebaseConfig";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  limit,
} from "firebase/firestore";
const Creator = () => {
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const navigate = useNavigate();
  const [creatorTrans, setCreatorTran] = useState<any>([]);
  useEffect(() => {
    if (userData?.isCreator && loggedIn && uid) {
      console.log("hey");
    } else if (userData?.isCreator !== true) {
      console.log("Not found");
    } else {
      console.log("hey2");
    }
  }, [uid]);

  return (
    <>
      <div className={styles.body}>
        <Header_login />
        {userData?.isCreator && loggedIn && uid && (
          <div className="container">
            <CreatorStats />
            <div className={clsx("mt-4 pt-4 row", styles.mainDiv)}>
              <div className="col-lg-8">
                <SalesChart />
                <MyNfts />
                <Perks />
                <SayThanks />
              </div>
              <div className="col-lg-4  mt-4 pt-4">
                <TransactionHistory />
                <GetHelp className="mt-5" />
              </div>
            </div>
          </div>
        )}
        {userData?.isCreator !== true && `Upgrade to Creator.`}
      </div>
    </>
  );
};

export default Creator;
