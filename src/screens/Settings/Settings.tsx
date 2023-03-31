import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header_login from "../../components/header/header_after_login/Header_login";
import AccSettings from "../../components/settingsComps/accSettings/AccSettings";
import Contact from "../../components/settingsComps/contact/Contact";
import EditProfile from "../../components/settingsComps/editProfile/EditProfile";
import Help from "../../components/settingsComps/help/Help";
import Privacy from "../../components/settingsComps/privacyAndSec/Privacy";
import SettingsMenu from "../../components/settingsComps/settingsMenu/SettingsMenu";
import Theme from "../../components/settingsComps/themeSettings/Theme";
import styles from "./settings.module.css";
import { Accordion } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router";
import { db } from "../../firebaseConfig";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import Transaction from "../../components/settingsComps/transaction/Transaction";
const Settings = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState<any>([]);
  const path = location.pathname;
  const navigate = useNavigate();
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state.userData
  );
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  useEffect(() => {
    if (loggedIn && uid) {
      GetTransactionHistory();
    } else {
      navigate("/login");
    }
  }, [loggedIn, uid, navigate]);

  const GetTransactionHistory = async () => {
    let transactions: any = [];
    if (uid && loggedIn) {
      // console.log(uid);
      // console.log(loggedIn);
      await getDocs(
        query(collection(db, "paymentRecords"), where("buyerUID", "==", uid))
      )
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            if (docs.exists()) {
              transactions.push(docs.data());
            } else {
              transactions.push("Null");
            }
          });
          console.log(transactions);
          setTransactionData(transactions);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(transactions[0].amount)
    } else {
      console.log("Not Logged In");
    }
  };

  return (
    <>
      <Header_login />
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.mainDiv, "row")}>
          {/* <div className={clsx("col-lg-2", styles.pageLinks)}>
            <PageLinks />
          </div> */}
          <div className={clsx("col-lg-3", styles.settingsMenu)}>
            <SettingsMenu />
          </div>
          <div className={styles.showSection1}>
            <Accordion>
              <div className={styles.heading}>Settings</div>
              <Accordion.Item className={styles.change} eventKey="0">
                <Accordion.Header>Edit Profile</Accordion.Header>
                <Accordion.Body>
                  <EditProfile></EditProfile>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="1">
                <Accordion.Header>Account Settings</Accordion.Header>
                <Accordion.Body>
                  <AccSettings></AccSettings>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="2">
                <Accordion.Header>Theme</Accordion.Header>
                <Accordion.Body>
                  <Theme></Theme>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="3">
                <Accordion.Header>Privacy & Security</Accordion.Header>
                <Accordion.Body>
                  <Privacy></Privacy>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="4">
                <Accordion.Header>Transaction History</Accordion.Header>
                <Accordion.Body>
                  <Transaction transactionData={transactionData} />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="5">
                <Accordion.Header>Help</Accordion.Header>
                <Accordion.Body>
                  <Help></Help>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={styles.change} eventKey="6">
                <Accordion.Header>Contact Us</Accordion.Header>
                <Accordion.Body>
                  <Contact></Contact>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className={clsx("col-lg-9", styles.showSection)}>
            {path === "/settings" && <EditProfile />}
            {path === "/settings/accountsettings" && <AccSettings />}
            {path === "/settings/theme" && <Theme />}
            {path === "/settings/privacyandsecurity" && <Privacy />}
            {path === "/settings/transactionhistory" && (
              <Transaction transactionData={transactionData} />
            )}
            {path === "/settings/help" && <Help />}
            {path === "/settings/contact" && <Contact />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
