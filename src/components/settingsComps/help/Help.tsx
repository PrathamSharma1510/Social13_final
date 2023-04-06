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
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const [data, setData] = useState({
    name: userData?.name,
    description: "",
    reportedBy: userData?.email,
  });
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
    const body = { message: message };
    gpt(body)
      .then((result) => {
        console.log(result);
        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
                      <span>AI Property Dealer </span>
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
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          placeholder="Type your message here..."
                        />
                        <span className="input-group-btn">
                          {
                            <button
                              className="btn btn-primary"
                              id="btn-chat"
                              disabled={disabled}
                              onClick={() => {
                                setLoading(true);
                                setDisabled(true);
                                handleSubmit();
                              }}
                            >
                              {loading ? "Sending..." : "Send"}
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
    </>
  );
};

export default Help;
