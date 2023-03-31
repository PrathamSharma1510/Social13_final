import clsx from "clsx";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ArrowLeft, X } from "phosphor-react";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { firebaseApp } from "../../../../firebaseConfig";
import { MODAL_CLOSE_SUCCESS } from "../../../../redux/constants/profileModals";
import GradientBorder from "../../../gradientBorderBtn/GradientBorder";
import InputField from "../../../inputField/Input";
import styles from "./modal.module.css";
import SuccPopup from "../../../popups/SuccPopup";
import ErrPopup from "../../../popups/ErrPopup";

const Modal = () => {
  const [modals, setModals] = useState({
    modal1: true,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
  });
  const storage = getStorage(firebaseApp);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: MODAL_CLOSE_SUCCESS });
    setModals({
      modal1: true,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
    });
  };

  // Error Handling components
  const [success, setSuccess] = useState(false);
  const [openErrMsg, setOpenErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucMessage, setSuccMess] = useState("");

  const handelClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrMsg(false);
    setSuccess(false);
  };

  const [dataMissing, setDataMissing] = useState(false);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );

  const [phoneCorrect, setPhoneCorrect] = useState(true);
  const [data, setData] = useState({
    instagramLink: "",
    twitterLink: "",
    youtubeProfileUrl: "",
    portfolioUrl: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    accountHolderPhoneNumber: "",
    docType: "adhar",
    documentNumber: "",
  });

  // handle update state changes
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log({ data });
  };
  const storageDocRef = ref(storage, "users/" + uid + "/Kyc_Details/doc.jpg");
  // Document upload
  const [document, setDocument] = useState<any>(null);
  const uploadDocument = async (event: any) => {
    const doc = event.target.files[0];
    if (!doc) return;
    setDocument(document);
    console.log(doc.size);
    if (doc.size >= 5242880) {
      setErrorMessage("File size too big");
      setOpenErrMsg(true);
      return;
      // console.log("File Size Too Big");
    } else {
      await uploadBytesResumable(storageDocRef, doc)
        .then((result) => {
          setSuccMess("document uploaded successfully");
          setSuccess(true);
          console.log(result.state);
        })
        .catch((error) => {
          setErrorMessage("Not uploaded");
          setOpenErrMsg(true);
          console.log(error);
        });
    }
  };
  const storageSignRef = ref(storage, "users/" + uid + "/Kyc_Details/sign.jpg");
  // Signature upload
  const [signature, setSign] = useState<any>(null);
  const uploadSignature = async (event: any) => {
    const sign = event.target.files[0];
    if (!sign) return;
    setSign(signature);
    console.log(sign.size);
    console.log(sign);
    if (sign.size >= 5242880) {
      setErrorMessage("File size too big");
      setOpenErrMsg(true);
      // console.log("File Size Too Big");
    } else {
      await uploadBytesResumable(storageSignRef, sign)
        .then((result) => {
          setSuccMess("signature uploaded successfully");
          setSuccess(true);
          console.log(result.state);
        })
        .catch((error) => {
          setErrorMessage("Not uploaded");
          setOpenErrMsg(true);
          console.log(error);
        });
    }
  };

  // const dragOver = (e: any) => {
  //   e.preventDefault();
  //   console.log("dragged");
  // };

  // const dragEnter = (e: any) => {
  //   e.preventDefault();
  // };

  // const dragLeave = (e: any) => {
  //   e.preventDefault();
  // };

  // const fileDrop = (e: any) => {
  //   e.preventDefault();
  //   const files = e.dataTransfer.files;
  //   console.log(files);
  // };

  const dragOver1 = (e: any) => {
    e.preventDefault();
    console.log("dragged");
  };

  const dragEnter1 = (e: any) => {
    e.preventDefault();
  };

  const dragLeave1 = (e: any) => {
    e.preventDefault();
  };

  const fileDrop1 = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    console.log("drag1");
  };

  // check for valid phone number or not.
  const checkPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value.length !== 10) {
      setErrorMessage("Please enter a valid phone number");
      setOpenErrMsg(true);
      setPhoneCorrect(true);
    } else {
      const phoneValidString = "(0|91)?[7-9][0-9]{9}";
      if (e.target.value.match(phoneValidString)) {
        console.log("Phone num correct");
        setPhoneCorrect(false);
      } else {
        setErrorMessage("Please enter a valid phone number");
        setOpenErrMsg(true);
        // console.log("Phone Num not correct");
        setPhoneCorrect(true);
      }
    }
  };

  // create request id
  const makeCreatorRequestId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };

  // send request to admin
  const updateRequest = async () => {
    const db = getFirestore(firebaseApp);
    let docUrl = "";
    let signUrl = "";
    const requestId = "CR" + makeCreatorRequestId(26);
    // console.log(signUrl);
    if (dataMissing) {
      setErrorMessage("Missing Data Values Please check again");
      setOpenErrMsg(true);
      return;
      // console.log("Missing Data Values Please check again");
    } else {
      await getDownloadURL(storageDocRef)
        .then((url) => {
          docUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
      await getDownloadURL(storageSignRef)
        .then((url) => {
          signUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(docUrl);
      console.log(signUrl);
      await setDoc(doc(db, "creatorRequest", requestId), {
        socials: {
          instagramLink: data.instagramLink,
          twitterLink: data.twitterLink,
          youtubeProfileUrl: data.youtubeProfileUrl,
          portfolioUrl: data.portfolioUrl,
        },
        bankAccountDetails: {
          accountHolderName: data.accountHolderName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode,
          accountType: data.accountType,
          accountHolderPhoneNumber: data.accountHolderPhoneNumber,
        },
        kycDetails: {
          documentType: data.docType,
          documentNumber: data.documentNumber,
          documentUrl: docUrl,
          signedPhotoUrl: signUrl,
        },
        personalDetails: {
          emailId: userData?.email,
          uid: uid,
          name: userData?.name,
          username: userData?.username, //     age: userData?.age,
          gender: userData?.gender,
          requestId: requestId,
          state: "PENDING",
        },
        isApproved: false,
        isDecisionTaken: false,
        dateOfJoining: userData?.dateOfJoining,
        dateOfRequest: date,
      })
        .then(() => {
          console.log("Updated");
          const ref = doc(db, "hyprUsers", uid);
          updateDoc(ref, {
            //add function for sending mail to user.
            // todo make upload file thing correct.
            creatorApproval: {
              approvalStatus: "APPLIED",
              comments: "",
            },
          })
            .then(() => {
              console.log("Data Updated");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={clsx("container", styles.modalContent)}>
          <div
            className={clsx(
              styles.firstModal,
              modals.modal1 ? styles.show : styles.hide
            )}
          >
            <p className={styles.crossFirst}>
              <X onClick={closeModal} size={30} weight="bold" />
            </p>
            <div className={styles.topTitleDiv}>
              <h2 className={styles.gradientTitle}>
                Upgrade to a Creator Account
              </h2>
              <p className={styles.topDesc}>
                With a creator account, you can unlock a plethora of benefits
                and extra features.
              </p>
            </div>

            <div
              className={clsx("row align-items-center", styles.sellYourNftDiv)}
            >
              <div className={clsx("col-md-6")}>
                <h3 className={styles.sellYourNftTitle}>
                  Sell your work as NFT
                </h3>
                <p className={styles.sellYourNftdesc}>
                  You can sell your content - be it photography, drawings,
                  gaming clips or even videos- as NFTs.
                </p>
              </div>
              <div className={clsx("col-md-6", styles.sellYourNftImg)}>
                <img
                  className={styles.imgWithMoney}
                  src="/images/sellYourwork.png"
                  alt="heu"
                />
              </div>
            </div>

            <div
              className={clsx("row align-items-center", styles.sellYourNftDiv)}
            >
              <div className={clsx("col-md-6 d-flex justify-content-center")}>
                <img
                  className={styles.imgWithMoney}
                  src="/images/upgrade.png"
                  alt="heu"
                />
              </div>
              <div className={clsx("col-md-6", styles.analyse)}>
                <h3 className={styles.analyseTitle}>
                  Analyse your progress with a personalised Creator Dashboard
                </h3>
                <p className={styles.analysedesc}>
                  You can sell your content - be it photography, drawings,
                  gaming clips or even videos- as NFTs.
                </p>
              </div>
            </div>

            <div className={styles.bottom}>
              <p className={styles.comingSoon}>
                Many more features are coming soon!
              </p>
              <p className={styles.comingSoonDesc}>
                With a creator account, you can unlock a plethora of benefits
                and extra features.
              </p>

              <GradientBorder
                onClick={() => {
                  setModals({
                    modal1: false,
                    modal2: true,
                    modal3: false,
                    modal4: false,
                    modal5: false,
                  });
                }}
                text="Upgrade to Creator Account"
              />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            styles.secondModal,
            modals.modal2 ? styles.show : styles.hide
          )}
        >
          <p className={styles.cross}>
            <ArrowLeft
              onClick={() => {
                setModals({
                  modal1: true,
                  modal2: false,
                  modal3: false,
                  modal4: false,
                  modal5: false,
                });
              }}
              size={30}
              weight="bold"
            />
            <X onClick={closeModal} size={30} weight="bold" />
          </p>
          <h2 className={styles.gradientTitle}>Upgrade to a Creator Account</h2>

          {/* <div className={styles.modal2Btn}>
                                        <GradientBorder onClick={() => setModals({modal1: false, modal2: false, modal3:true, modal4:false, modal5:false})} text='Next'/>
                                    </div> */}

          <p className={styles.secTopDesc}>
            We check each creator application manually to ensure authenticity on
            the platform. Don’t worry, you don’t need to have a huge following
            to be a creator, we welcome all, small or big influencers.{" "}
          </p>
          <div className={styles.step1}>
            <p className={styles.step1Title}>STEP 1: SOCIAL MEDIA HANDLES</p>
            <form action="#">
              <div className={styles.inputs}>
                <InputField
                  required
                  garyBold
                  name="instagramLink"
                  lableText="INSTAGRAM"
                  value={data?.instagramLink}
                  typeOfInput="text"
                  placeholder="Enter Link..."
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
                <InputField
                  required
                  garyBold
                  name="twitterLink"
                  lableText="TWITTER"
                  value={data?.twitterLink}
                  typeOfInput="text"
                  placeholder="Enter Link..."
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
                <InputField
                  required
                  garyBold
                  name="youtubeProfileUrl"
                  lableText="YOUTUBE"
                  value={data?.youtubeProfileUrl}
                  typeOfInput="text"
                  placeholder="Enter Link..."
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
                <InputField
                  required
                  garyBold
                  name="portfolioUrl"
                  lableText="YOUR PERSONAL WEBSITE"
                  value={data?.portfolioUrl}
                  typeOfInput="text"
                  placeholder="Enter Link..."
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
              </div>

              <div className={styles.modal2Btn}>
                <GradientBorder
                  onClick={(e: React.ChangeEvent<any>) => {
                    e.preventDefault();

                    if (data.instagramLink.length === 0) {
                      setErrorMessage("instagram profile link missing");
                      setOpenErrMsg(true);
                      return;
                    }

                    if (data.twitterLink.length === 0) {
                      setErrorMessage("twitter profile link missing");
                      setOpenErrMsg(true);
                      return;
                    }

                    if (data.youtubeProfileUrl.length === 0) {
                      setErrorMessage("youtube profile link missing");
                      setOpenErrMsg(true);
                      return;
                    }

                    setModals({
                      modal1: false,
                      modal2: false,
                      modal3: true,
                      modal4: false,
                      modal5: false,
                    });
                  }}
                  text="Next"
                />
              </div>
            </form>
          </div>
        </div>

        <div
          className={clsx(
            styles.thirdModal,
            modals.modal3 ? styles.show : styles.hide
          )}
        >
          <p className={styles.cross}>
            <ArrowLeft
              onClick={() =>
                setModals({
                  modal1: false,
                  modal2: true,
                  modal3: false,
                  modal4: false,
                  modal5: false,
                })
              }
              size={30}
              weight="bold"
            />
            <X onClick={closeModal} size={30} weight="bold" />
          </p>
          <h2 className={styles.gradientTitle}>Upgrade to a Creator Account</h2>
          <p className={styles.secTopDesc}>
            We check each creator application manually to ensure authenticity on
            the platform. Don’t worry, you don’t need to have a huge following
            to be a creator, we welcome all, small or big influencers.{" "}
          </p>
          <div className={styles.step2}>
            <p className={styles.step1Title}>STEP 2: SUBMIT BANK DETAILS</p>
            <div className={styles.inputs}>
              <InputField
                className="mb-3"
                garyBold
                name="accountHolderName"
                lableText="NAME OF THE ACCOUNT HOLDER"
                value={data?.accountHolderName}
                typeOfInput="text"
                placeholder="eg. John Maxwell"
                onChange={(e: React.ChangeEvent<any>) => {
                  updateState(e);
                  if (e.target.value === "") {
                    setDataMissing(true);
                  } else {
                    setDataMissing(false);
                  }
                }}
              />
              <InputField
                className="mb-3"
                garyBold
                name="accountNumber"
                lableText="ACCOUNT NUMBER"
                value={data?.accountNumber}
                typeOfInput="number"
                placeholder="eg. 1234567890"
                onChange={(e: React.ChangeEvent<any>) => {
                  updateState(e);
                  if (e.target.value === "") {
                    setDataMissing(true);
                  } else {
                    setDataMissing(false);
                  }
                }}
              />
              <InputField
                className="mb-3"
                garyBold
                name="ifscCode"
                lableText="IFSC CODE"
                value={data?.ifscCode}
                typeOfInput="text"
                placeholder="eg. HYPR09879854"
                onChange={(e: React.ChangeEvent<any>) => {
                  updateState(e);
                  if (e.target.value === "") {
                    setDataMissing(true);
                  } else {
                    setDataMissing(false);
                  }
                }}
              />

              <div
                className={clsx(
                  "d-flex align-items-center",
                  styles.savingsAndCurrent
                )}
              >
                <div className={clsx(styles.selectDiv, "halfWidth")}>
                  <label className="grayBold">ACCOUNT TYPE</label>
                  <Form.Select
                    name="accountType"
                    value={data?.accountType}
                    className={clsx(styles.select, "mb-3")}
                    aria-label="Default select example"
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      if (e.target.value === "") {
                        setDataMissing(true);
                      } else {
                        setDataMissing(false);
                      }
                    }}
                  >
                    <option value="savings">SAVINGS</option>
                    <option value="current">CURRENT</option>
                  </Form.Select>
                </div>
                <InputField
                  className="mb-3"
                  half
                  garyBold
                  name="accountHolderPhoneNumber"
                  lableText="PHONE NUMBER"
                  value={data?.accountHolderPhoneNumber}
                  typeOfInput="number"
                  placeholder="+91 1234567890"
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    checkPhoneNumber(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
              </div>
            </div>

            <div className={styles.modal2Btn}>
              <GradientBorder
                onClick={() => {
                  if (data.accountHolderName.length === 0) {
                    setErrorMessage("Account holder name missing");
                    setOpenErrMsg(true);
                    return;
                  }

                  if (data.accountNumber.length === 0) {
                    setErrorMessage("Account number missing");
                    setOpenErrMsg(true);
                    return;
                  }

                  if (data.ifscCode.length === 0) {
                    setErrorMessage("IFSC code missing");
                    setOpenErrMsg(true);
                    return;
                  }

                  if (data.accountHolderPhoneNumber.length === 0) {
                    setErrorMessage("Account holder phone number missing");
                    setOpenErrMsg(true);
                    return;
                  }

                  setModals({
                    modal1: false,
                    modal2: false,
                    modal3: false,
                    modal4: true,
                    modal5: false,
                  });
                }}
                text="Next"
              />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            styles.fourthModal,
            modals.modal4 ? styles.show : styles.hide
          )}
        >
          <p className={styles.cross}>
            <ArrowLeft
              onClick={() =>
                setModals({
                  modal1: false,
                  modal2: false,
                  modal3: true,
                  modal4: false,
                  modal5: false,
                })
              }
              size={30}
              weight="bold"
            />
            <X onClick={closeModal} size={30} weight="bold" />
          </p>
          <h2 className={styles.gradientTitle}>Upgrade to a Creator Account</h2>
          <p className={styles.secTopDesc}>
            We check each creator application manually to ensure authenticity on
            the platform. Don’t worry, you don’t need to have a huge following
            to be a creator, we welcome all, small or big influencers.{" "}
          </p>
          <div className={styles.step2}>
            <p className={styles.step1Title}>STEP 3: COMPLETE KYC</p>
            <div className={styles.inputs}>
              <div
                className={clsx(
                  "d-flex align-items-center",
                  styles.savingsAndCurrent
                )}
              >
                <div className={clsx(styles.selectDiv, "halfWidth")}>
                  <label className="grayBold">CHOOSE DOCUMENT TYPE</label>
                  <Form.Select
                    name="docType"
                    className={clsx(styles.select, "mb-3")}
                    aria-label="Default select example"
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      if (e.target.value === "") {
                        setDataMissing(true);
                      } else {
                        setDataMissing(false);
                      }
                    }}
                  >
                    <option value="aadhar">ADHAR CARD</option>
                    <option value="pan">PAN CARD</option>
                  </Form.Select>
                </div>
                <InputField
                  className="mb-3"
                  half
                  garyBold
                  name="documentNumber"
                  lableText="ENTER DOCUMENT NUMBER"
                  value={data?.documentNumber}
                  typeOfInput="text"
                  placeholder=""
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                    if (e.target.value === "") {
                      setDataMissing(true);
                    } else {
                      setDataMissing(false);
                    }
                  }}
                />
              </div>

              <div className={styles.verificationDocumentDiv}>
                <h3 className={styles.uploadText}>
                  Upload verification document
                </h3>
                <p className={styles.dragndrop}>
                  Drag or choose your file to upload
                </p>
                <input
                  accept=".jpeg,.jpg,.png,.pdf, image/jpeg,image/png"
                  id="documentVerficationInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={uploadDocument}
                />
                <label
                  onDragOver={dragOver1}
                  onDragEnter={dragEnter1}
                  onDragLeave={dragLeave1}
                  onDrop={fileDrop1}
                  className="w-100"
                  role="button"
                  htmlFor="documentVerficationInput"
                >
                  <div
                    className={clsx(
                      styles.dragField,
                      "d-flex justify-content-center flex-column align-items-center"
                    )}
                  >
                    <i className="bi bi-file-earmark-arrow-up"></i>
                    <p className={styles.pngorjpeg}>
                      PNG, JPG or PDF. Max 5MB.
                    </p>
                  </div>
                </label>
              </div>

              <div className={styles.verificationDocumentDiv}>
                <h3 className={styles.uploadText}>
                  Upload a signed photograph
                </h3>
                <p className={styles.dragndrop}>
                  Drag or choose your file to upload
                </p>
                <input
                  accept=".jpeg,.jpg,.png,.pdf, image/jpeg,image/png"
                  id="documentVerficationInput1"
                  type="file"
                  style={{ display: "none" }}
                  onChange={uploadSignature}
                />
                <label
                  className="w-100"
                  role="button"
                  htmlFor="documentVerficationInput1"
                >
                  <div
                    className={clsx(
                      styles.dragField,
                      "d-flex justify-content-center flex-column align-items-center"
                    )}
                  >
                    <i className="bi bi-file-earmark-arrow-up"></i>
                    <p className={styles.pngorjpeg}>
                      PNG, JPG or PDF. Max 5MB.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className={styles.modal2Btn}>
              <GradientBorder
                onClick={(e: React.ChangeEvent<any>) => {
                  if (data.documentNumber.length === 0) {
                    setErrorMessage("Document number missing");
                    setOpenErrMsg(true);
                    return;
                  }

                  updateRequest();

                  if (dataMissing) {
                  } else {
                    setModals({
                      modal1: false,
                      modal2: false,
                      modal3: false,
                      modal4: false,
                      modal5: true,
                    });
                  }
                }}
                text="Upgrade To Creator Account"
              />
            </div>
          </div>
        </div>

        {/* <div className={styles.modal2Btn}>
                <GradientBorder
                  onClick={() =>
                    setModals({
                      modal1: false,
                      modal2: false,
                      modal3: false,
                      modal4: true,
                      modal5 : false
                    })
                  }
                  text="Next"
                />
              </div> */}

        <div
          className={clsx(
            styles.thirdModal,
            modals.modal5 ? styles.show : styles.hide
          )}
        >
          <p className={styles.crossLast}>
            <X onClick={closeModal} size={30} weight="bold" />
          </p>
          <div className={styles.thankYouDiv}>
            <h2 className={styles.gradientTitleLast}>
              Thank You For Applying!
            </h2>
            <p className={styles.lastDesc}>
              We will reach out to you soon! Be sure to check your registered
              email to activate your creator account at HyprClub.{" "}
            </p>
          </div>
        </div>
      </div>
      {success && (
        <SuccPopup
          handelClose={(r: any) => handelClose(r)}
          open={success}
          message={sucMessage}
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

export default Modal;
