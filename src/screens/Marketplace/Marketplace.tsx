import React, { useEffect, useState } from "react";

import Selection from "../../components/Selection";
import Popular from "../../components/Marketplace/Popular/Popular";
import Collections from "../../components/Marketplace/Collections/Collections";
import styles from "./Marketplace.module.css";
import Hero_section from "../../components/Marketplace/Hero_section/Hero_section";
import Header_login from "../../components/header/header_after_login/Header_login";
import Explore from "../../components/Marketplace/Explore/Explore";
import Discover from "../../components/Marketplace/Discover/Discover";
import {
  getDocs,
  doc,
  getFirestore,
  collection,
  orderBy,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { firebaseApp } from "../../firebaseConfig";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import userData, { UserDataActions } from "../../redux/slices/userData";
import Loader from "../../components/Loader/Loader";

const Marketplace = () => {
  const db = getFirestore(firebaseApp);
  const dispatch = useDispatch();
  const [subletIds, setSubletIds] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const query1 = query(
    collection(db, "subletRequest"),
    where("state", "==", "APPROVED")
  );
  const userData = useSelector((state: RootStateOrAny) => state.userData);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await getDocs(query1)
        .then((querySnapShot) => {
          let propertyIds: any[] = [];
          querySnapShot.forEach((element) => {
            propertyIds.push(element.data());
          });
          console.log(propertyIds);
          setSubletIds(propertyIds);
          dispatch(UserDataActions.propertyIds({ propertyIds }));
          console.log(userData?.propertyIds);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.code);
        });
    };
    run();
  }, [db]);

  return (
    <>
      <Header_login />
      <div className={styles.home}>
        {loading && <Loader />}
        {loading === false && <Hero_section />}
        {loading === false && <Explore items={subletIds} />}
      </div>
    </>
  );
};

export default Marketplace;
