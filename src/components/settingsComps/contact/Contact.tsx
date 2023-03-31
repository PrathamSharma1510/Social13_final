import clsx from "clsx";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../../firebaseConfig";
import userData from "../../../redux/slices/userData";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";
import InputField from "../../inputField/Input";
import styles from "./contact.module.css";
import { useSelector, RootStateOrAny } from "react-redux";
import SuccPopup from "../../popups/SuccPopup";
import ErrPopup from "../../popups/ErrPopup";
import { useNavigate } from "react-router";

const Contact = () => {
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openErrMsg, setOpenErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Submit = () => {
    setSuccess(true);
    setOpen(true);
  };

  const handelClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrMsg(false);
    setSuccess(false);
  };
  const [data, setData] = useState({
    name: userData?.name,
    phone: userData?.phone,
    email: userData?.email,
    message: "",
  });

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log({ data });
  };

  const makeContactUsId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };
  const handleSubmit = async () => {
    const db = getFirestore(firebaseApp);
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const contactUsId = "CONTACT" + makeContactUsId(26);
    if (data.message === "") {
      setOpenErrMsg(true);
      setErrorMessage("Please enter some message");
    } else {
      await setDoc(doc(db, "contactus", contactUsId), {
        name: data.name,
        contactId: contactUsId,
        phone: data.phone,
        email: data.email,
        message: data.message,
        isResolved: false,
        dateOfMessage: date,
        status: "PENDING",
      })
        .then(() => {
          console.log("Data sent");
          setSuccess(true);
          setErrorMessage("Message Sent!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Contact Us</h2>
        <div className={styles.content}>
          <p>Got any collaborations, ideas, or any questions? Let us know!</p>
          <div className={clsx("d-flex", styles.contact)}>
            <InputField
              garyBold
              half
              name="name"
              lableText="NAME"
              value={data?.name}
              typeOfInput="text"
              onChange={(e: React.ChangeEvent<any>) => {
                updateState(e);
              }}
            />
            <InputField
              garyBold
              half
              name="phone"
              lableText="PHONE NUMBER"
              value={data?.phone}
              typeOfInput="tel"
              onChange={(e: React.ChangeEvent<any>) => {
                updateState(e);
              }}
            />
          </div>
          <InputField
            garyBold
            half={false}
            name="email"
            lableText="EMAIL ADDRESS"
            value={data?.email}
            typeOfInput="text"
            onChange={(e: React.ChangeEvent<any>) => {
              updateState(e);
            }}
          />
          <div className={styles.messageDIv}>
            <label
              className={styles.lableText}
              htmlFor="exampleFormControlTextarea1"
            >
              Your Message
            </label>
            <textarea
              className={clsx("form-control", styles.textarea)}
              placeholder="Enter your message..."
              id="exampleFormControlTextarea1"
              rows={5}
              name="message"
              onChange={(e: React.ChangeEvent<any>) => {
                updateState(e);
              }}
            ></textarea>
          </div>
          <div className={clsx("col-md-3 text-center d-flex", styles.avt)}>
            <GradientBorder
              text="Submit"
              onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSubmit();
              }}
            />
          </div>
        </div>
      </div>
      {success && (
        <SuccPopup
          handelClose={(r: any) => handelClose(r)}
          open={success}
          message="Sent Successfully!"
        />
      )}
      {openErrMsg && (
        <ErrPopup
          handelClose={(r: any) => handelClose(r)}
          open={openErrMsg}
          message={errorMessage}
        />
      )}
    </>
  );
};

export default Contact;
