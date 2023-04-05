import clsx from "clsx";
import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { firebaseApp } from "../../../firebaseConfig";
import SuccPopup from "../../popups/SuccPopup";
import ErrPopup from "../../popups/ErrPopup";
import GradientBorder from "../../gradientBorderBtn/GradientBorder";
import styles from "./help.module.css";
import axios from "axios";
import {
  getFunctions,
  httpsCallable,
  // HttpsCallableOptions,
} from "firebase/functions";

const functions = getFunctions();

const Help = () => {
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openErrMsg, setOpenErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

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
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const [data, setData] = useState({
    name: userData?.name,
    description: "",
    reportedBy: userData?.email,
  });
  const makeReportABugId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log({ data });
  };
  // Function that reports the problem when the submitted
  const handleSubmit = async () => {
    // const result = await axios.post(
    //   "https://us-central1-social13-0712.cloudfunctions.net/gpt",
    //   { message: "Hello" },
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );

    // console.log(result);
    const function_firebase = getFunctions(firebaseApp);

    const gpt = httpsCallable(function_firebase, "gpt");
    const body = { message: "Hello" };
    gpt(body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    // function_firebase.
    // setBtnDisable(true);
    // const db = getFirestore(firebaseApp);
    // const bugId = "HYPRBUG" + makeReportABugId(26);
    // if (data.description === "") {
    //   setOpenErrMsg(true);
    //   setBtnDisable(false);
    //   setErrorMessage("Please Enter Description");
    // } else {
    //   await setDoc(doc(db, "bugReport", bugId), {
    //     dateOfReporting: date,
    //     description: data.description,
    //     reporterEmailId: userData?.email,
    //     reporterName: userData?.name,
    //     reporterUsername: userData?.username,
    //     reporterUid: userData?.uid,
    //     reportId: bugId,
    //     bugState: "PENDING",
    //   })
    //     .then(() => {
    //       console.log("Reported");
    //       setSuccess(true);
    //       setBtnDisable(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };
  return (
    <>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Help</h2>
        <div className={styles.content}>
          <div className={styles.reportDiv}>
            <h3 className={styles.heading}>Report a Problem</h3>
            <div id="chat4">
              <div className="row">
                <div className="col-12 mx-auto">
                  <div className="card">
                    <div className="card-header text-center">
                      <span>Chat Box </span>
                    </div>
                    {/* <div key={index}>
								<div>From: {message.from}</div>
								<div>Message: {message.message}</div>
								<div>
									Time : {new Date(message.time).toLocaleDateString()} {new Date(message.time).toLocaleTimeString()}
								</div>
							</div> */}

                    <div className="card-body chat-care">
                      <ul className="chat">
                        <li className="agent clearfix">
                          <div className="chat-body clearfix">
                            <div className="header clearfix">
                              <strong className="primary-font">"PRO"</strong>{" "}
                              <small className="right text-muted">
                                <span className="glyphicon glyphicon-time" />
                                {/* {new Date(message.time).toLocaleTimeString()} */}
                              </small>
                            </div>
                            <p>"jnjneds"</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="card-footer">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control input-sm"
                          name="quiz_id"
                          id="quiz_id"
                          defaultValue=""
                          // value={state.message}
                          // onChange={(e) => {
                          //   setState((state) => ({
                          //     ...state,
                          //     message: e.target.value,
                          //   }));
                          // }}
                          placeholder="Type your message here..."
                        />
                        <span className="input-group-btn">
                          {
                            <button
                              className="btn btn-primary"
                              id="btn-chat"
                              // disabled={disabled}
                              // onClick={() => {
                              //   setLoading(true);
                              //   setDisabled(true);
                              //   socket.current?.emit("send-proctor-message", {
                              //     message: state.message,
                              //     quiz_id: quiz_id,
                              //   });
                              //   setState((state) => ({
                              //     ...state,
                              //     message: "",
                              //   }));
                              // }}
                            >
                              {/* {loading ? "Sending..." : "Send"} */}
                            </button>
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Help;
