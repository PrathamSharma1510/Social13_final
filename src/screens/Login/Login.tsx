/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ButtonItself from "../../components/loginSignUpBtn/ButtonItself";
import InputField from "../../components/inputField/Input";
import Logo from "../../components/logo/Logo";
import SocialLogins from "../../components/socialLogins/SocialLogins";
import "./login.css";
import { useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { firebaseApp } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Key } from "phosphor-react";
import SuccPopup from "../../components/popups/SuccPopup";
import ErrPopup from "../../components/popups/ErrPopup";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [forgotPass, setForgotPass] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

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

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
    // console.log({ data });
  };

  const makeRandomString = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    await signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const name = userCredentials.user.displayName;
        const email = userCredentials.user.email;
        const photoUrl = userCredentials.user.photoURL;
        let phone = userCredentials.user.phoneNumber;

        getDoc(doc(db, "hyprUsers", uid))
          .then((querySnapshot) => {
            if (querySnapshot.exists()) {
              console.log("User Data Exits");
            } else {
              if (phone === null) {
                phone = "";
              }
              console.log("Set Doc");
              const username = name?.replaceAll(" ", "") + makeRandomString(5);
              setDoc(doc(db, "hyprUsers", uid), {
                name: name,
                email: email,
                username: username, //add username here
                profileViewsCount: 0,
                phone: phone,
                uid: uid,
                newsletterSubscription: false,
                category: "",
                age: "",
                gender: "",
                flagCounter: 0,
                profileUrl: "",
                bio: "",
                isNsfw: false,
                verified: false,
                socials: {
                  portfolioUrl: "",
                  instagramUsername: "",
                  twitterUsername: "",
                  facebookProfileUrl: "",
                  youtubeProfileUrl: "",
                },
                interests: [],
                isCreator: false,
                creatorApproval: {
                  approvalStatus: "Not Applied",
                  comments: "",
                },
                dateOfJoining: date,
                isKycDone: false,
                savedNfts: [],
                soldNfts: [],
                followers: [],
                following: [],
                followerCount: 0,
                followingCount: 0,
                posts: {
                  createdPosts: [],
                  savedPosts: [],
                },
                bankAccountDetails: {
                  accountHolderName: "",
                  accountType: "",
                  ifscCode: "",
                  accountNumber: "",
                  branchName: "",
                  accountHolderPhoneNumber: "",
                },
              }).then((snap) => {
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const name = userCredentials.user.displayName;
        const email = userCredentials.user.email;
        const photoUrl = userCredentials.user.photoURL;
        let phone = userCredentials.user.phoneNumber;
        const current = new Date();
        const date = `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`;

        getDoc(doc(db, "hyprUsers", uid))
          .then((querySnapshot) => {
            if (querySnapshot.exists()) {
              console.log("User Data Exits");
            } else {
              if (phone === null) {
                phone = "";
              }
              console.log("Set Doc");
              const username = name?.replaceAll(" ", "") + makeRandomString(5);
              setDoc(doc(db, "hyprUsers", uid), {
                name: name,
                email: email,
                username: username, //add username here
                profileViewsCount: 0,
                phone: phone,
                uid: uid,
                newsletterSubscription: false,
                category: "",
                age: "",
                gender: "",
                flagCounter: 0,
                profileUrl: "",
                bio: "",
                isNsfw: false,
                verified: false,
                socials: {
                  portfolioUrl: "",
                  instagramUsername: "",
                  twitterUsername: "",
                  facebookProfileUrl: "",
                  youtubeProfileUrl: "",
                },
                interests: [],
                isCreator: false,
                creatorApproval: {
                  approvalStatus: "Not Applied",
                  comments: "",
                },
                dateOfJoining: date,
                isKycDone: false,
                savedNfts: [],
                soldNfts: [],
                followers: [],
                following: [],
                followerCount: 0,
                followingCount: 0,
                posts: {
                  createdPosts: [],
                  savedPosts: [],
                },
                bankAccountDetails: {
                  accountHolderName: "",
                  accountType: "",
                  ifscCode: "",
                  accountNumber: "",
                  branchName: "",
                  accountHolderPhoneNumber: "",
                },
              }).then((snap) => {
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        setSuccMess("Login Successful");
        setSuccess(true);
        console.log(userCredentials.user);
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/user-not-found") {
          setErrorMessage("User not found");
          setOpenErrMsg(true);
          // console.log("User Not Found");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email");
          setOpenErrMsg(true);
          // console.log("Please Enter Valid Email Address");
        } else {
          setErrorMessage("Invalid Credentials");
          setOpenErrMsg(true);
          // console.log("Invalid Credentials");
        }
      });
  };

  useEffect(() => {
    if (loggedIn && userData.username) {
      navigate("/" + userData.username);
      console.log(userData.username);
    } else {
      console.log("No username");
    }
  }, [navigate, loggedIn, uid, userData]);

  const resetPassword = async (e: React.FormEvent<any>) => {
    sendPasswordResetEmail(auth, resetEmail, {
      url: window.location.href,
    });
    setSuccMess("Reset password email sent");
    setSuccess(true);
    // console.log("Email sent");
  };

  return (
    <div>
      <Logo />
      <div className="container loginPage">
        <div className="d-flex justify-content-center">
          {!forgotPass && <div className="loginForm">
            <h1 className="loginHeaderText">
              Join the Next Big Social Revolution
            </h1>
            <p className="subtitleText">
              New to HyprClub?{" "}
              <span className="createAccount">
                {" "}
                <Link to="/register" className="link">
                  Create Account
                </Link>{" "}
              </span>
            </p>
            <Form
              action="#"
              onSubmit={(e: React.FormEvent<any>) => {
                handleSubmit(e);
              }}
            >
              <InputField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateState(e)
                }
                typeOfInput="email"
                half={false}
                name="email"
                lableText={"Email Address"}
                required
              />
              <InputField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateState(e)
                }
                typeOfInput="password"
                name="password"
                half={false}
                lableText={"Password"}
                required
              />
              <p className="forgotPassword">
                <a onClick={() => setForgotPass(true)} className="link">
                  Forgot Password?
                </a>
              </p>
              <ButtonItself
                onClick={(e: React.FormEvent<HTMLInputElement>) =>
                  handleSubmit(e)
                }
                btnPurpose={"Login"}
              />
            </Form>
            <div className="social">
              <SocialLogins
                loginGoogle={googleSignIn}
                loginFacebook={facebookSignIn}
                login={true}
                purpose={"Login"}
              />
            </div>

          </div>}
          {forgotPass && (
              <div className="forgotPasswordDiv">
                <i
                  onClick={() => setForgotPass(false)}
                  className="leftArr bi bi-arrow-left"
                ></i>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <Key className="key" size={64} weight="bold" />
                  <h3 className="forgotPasstext text-center">
                    Forgot Password?
                  </h3>
                  <p className="text-center">
                    Dont worry, it happens! Please enter your registered email
                    and we will send you a link to reset your password.
                  </p>
                  <form className="w-100" action="#">
                    <InputField
                      required
                      lableText="ENTER EMAIL ID"
                      typeOfInput="email"
                      garyBold
                      placeholder="example@hyprclub.com"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setResetEmail(e.target.value)
                      }
                    />
                    <ButtonItself
                      className="my-4 p-2"
                      full
                      btnPurpose={"Reset Password"}
                      onClick={(e: React.FormEvent<HTMLInputElement>) =>
                        resetPassword(e)
                      }
                    />
                  </form>
                </div>
              </div>
            )}
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
    </div>
  );
};

export default Login;
