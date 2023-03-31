/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEvent } from "react";
import { Form } from "react-bootstrap";
import ButtonItself from "../../components/loginSignUpBtn/ButtonItself";
import InputField from "../../components/inputField/Input";
import Logo from "../../components/logo/Logo";
import SocialLogins from "../../components/socialLogins/SocialLogins";
import "./register.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
import {
  setDoc,
  getDoc,
  doc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firebaseApp, analytics } from "../../firebaseConfig";
import {
  useSelector,
  // useDispatch,
  RootStateOrAny,
  // DefaultRootState,
} from "react-redux";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router";
// import { error } from "console";
// import userData from "../../redux/slices/userData";
// import { WindowRounded } from "@mui/icons-material";
import SuccPopup from "../../components/popups/SuccPopup";
import ErrPopup from "../../components/popups/ErrPopup";

const Register = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [usernameTaken, setUsernameTaken] = useState(true);
  const [phoneCorrect, setPhoneCorrect] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  // const [passMatch, setPassMatch] = useState(false);
  const [promotionalMails, setPromotionalMails] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    username: "",
    phone: "",
  });

  // const [checked, setChecked] = useState(true);

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log({ data });
  };
  const navigate = useNavigate();

  const userData = useSelector((state: RootStateOrAny) => state?.userData);

  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );

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

  //check whether username is unique or not

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
    } else {
      try {
        const q = query(
          collection(db, "hyprUsers"),
          where("username", "==", e.target.value)
        );
        const docSnap = await getDocs(q);
        if (docSnap.size !== 0) {
          console.log("Username Taken");
          setUsernameTaken(true);
        } else {
          setUsernameTaken(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //check whether password match or not

  // const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {};

  //make a random string for username
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

  //check for valid phone number

  const checkPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPhoneCorrect(false);
    } else {
      const phoneValidString = "(0|91)?[7-9][0-9]{9}";
      if (e.target.value.match(phoneValidString)) {
        console.log("Phone num correct");
        setPhoneCorrect(true);
      } else {
        console.log("Phone Num not correct");
        setPhoneCorrect(false);
      }
    }
  };

  //check for accepting terms and conditions

  const checkTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndCondition(!termsAndCondition);
  };

  // check for accepting promotional emails
  const checkPromotional = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionalMails(!promotionalMails);
  };

  // function for handle submit
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, email, password, cpassword } = data;

    if (name === "") {
      setErrorMessage("Please enter your name");
      setOpenErrMsg(true);
      return;
    }
    if (email === "") {
      setErrorMessage("Please enter a valid email");
      setOpenErrMsg(true);
      return;
    }
    if (usernameTaken) {
      setErrorMessage("Please use a different username");
      setOpenErrMsg(true);
      // console.log("Please Use a different Username");
    } else {
      if (phoneCorrect === false) {
        setErrorMessage("Invalid phone number");
        setOpenErrMsg(true);
        // console.log("Incorrect Phone Number");
      } else {
        if (password.length === 0) {
          setErrorMessage("Please enter a valid password");
          setOpenErrMsg(true);
          return;
        }
        if (password !== cpassword) {
          setErrorMessage("Passwords do not match");
          setOpenErrMsg(true);
          // console.log("Password Do Not Match");
        } else {
          if (termsAndCondition === false) {
            setErrorMessage(
              "Please agree to the terms and conditions before moving forward"
            );
            setOpenErrMsg(true);
            // console.log(
            //   "Please Agree to terms and Condition before moving forward"
            // );
          } else {
            try {
              // const storage = getStorage(firebaseApp);

              const userCredentials = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
              );

              const user = userCredentials.user;
              const uid = user.uid;
              const current = new Date();
              const date = `${current.getDate()}/${
                current.getMonth() + 1
              }/${current.getFullYear()}`;

              await setDoc(doc(db, "hyprUsers", uid), {
                name: data.name,
                email: data.email,
                username: data.username,
                profileViewsCount: 0,
                phone: data.phone,
                uid: uid,
                newsletterSubscription: promotionalMails,
                category: "",
                age: "",
                gender: "",
                flagCounter: 0,
                profileUrl: "", // add profile url here
                coverPhotoUrl: "", // add firebase storage function url here
                profilePhotoUrl: "", // add firebase storage function here
                bio: "",
                isNsfw: false,
                verified: false,
                interests: [],
                creatorApproval: {
                  approvalStatus: "Not Applied",
                  comments: "",
                },
                isCreator: false,
                dateOfJoining: date, // todo add todays date
                isKycDone: false,
                socials: {
                  portfolioUrl: "",
                  instagramUsername: "",
                  twitterUsername: "",
                  facebookProfileUrl: "",
                  youtubeProfileUrl: "",
                },
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
              });

              setSuccMess("Account created");
              setSuccess(true);
              console.log("Account Created : ", user);

              logEvent(analytics, "new_user_register", data);
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    }
  };

  //function for google sign-in

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
        // const photoUrl = userCredentials.user.photoURL;
        let phone = userCredentials.user.phoneNumber;

        getDoc(doc(db, "hyprUsers", uid))
          .then((querySnapshot) => {
            if (querySnapshot.exists()) {
              console.log("User Data Exits");
            } else {
              if (phone === null) {
                phone = "";
              }
              const username = name?.replaceAll(" ", "") + makeRandomString(5);
              console.log("Set Doc");
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
                logEvent(analytics, "new_user_google");
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

  //function for facebook sign-in
  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const name = userCredentials.user.displayName;
        const email = userCredentials.user.email;
        // const photoUrl = userCredentials.user.photoURL;
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
                username: "hello3", //add username here
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
                savedNfts: [],
                soldNfts: [],
                dateOfJoining: date,
                isKycDone: false,
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
                logEvent(analytics, "new_user_facebook");
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

  useEffect(() => {
    if (loggedIn && userData.username) {
      navigate("/" + userData.username);

      console.log(userData.username);
    } else {
      console.log("No username");
    }
  }, [navigate, loggedIn, uid, userData]);

  return (
    <div>
      <Logo />
      <div className="container-sm registerPage">
        <div className="d-flex justify-content-center">
          <div className="registerForm">
            <h1 className="registerHeaderText">
              Join the Next Big Social Revolution
            </h1>
            <p className="subtitleText">
              Already have an account?{" "}
              <span className="createAccount">
                {" "}
                <Link to="/login" className="link">
                  Login
                </Link>{" "}
              </span>
            </p>
            <div className="mb-3">
              <Form>
                <div className="d-flex registeInputs">
                  <InputField
                    typeOfInput="text"
                    half={false}
                    lableText={"Name"}
                    name="name"
                    required
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                    }}
                  />
                  {/* <InputField  half={true} typeOfInput='text' lableText={"Last Name"}/> */}
                </div>
                <InputField
                  typeOfInput="email"
                  name="email"
                  half={false}
                  lableText={"Email Address:"}
                  required
                  onChange={(e: React.ChangeEvent<any>) => {
                    updateState(e);
                  }}
                />
                <div className="d-flex registeInputs">
                  <InputField
                    typeOfInput="text"
                    half={true}
                    value={data.username}
                    lableText={"Username"}
                    name="username"
                    required
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      checkUsername(e);
                    }}
                  />
                  <InputField
                    typeOfInput="tel"
                    half={true}
                    lableText={"Mobile Number"}
                    name="phone"
                    required
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      checkPhoneNumber(e);
                    }}
                  />
                </div>
                <div className="d-flex registeInputs">
                  <InputField
                    typeOfInput="password"
                    half={true}
                    lableText={"Password"}
                    name="password"
                    required
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                    }}
                  />
                  <InputField
                    typeOfInput="password"
                    half={true}
                    lableText={"Confirm Password"}
                    name="cpassword"
                    required
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                    }}
                  />
                </div>

                <div className="d-flex checkBoxTexts align-items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      checkTerms(e);
                    }}
                  />
                  <label className="ms-2" htmlFor="terms">
                    Yes, I agree to all the{" "}
                    <a className="termsLink" href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div className="d-flex checkBoxTexts align-items-center">
                  <input
                    name="newsletter"
                    id="newsletter"
                    type="checkbox"
                    onChange={(e: React.ChangeEvent<any>) => {
                      updateState(e);
                      checkPromotional(e);
                    }}
                  />
                  <label className="ms-2" htmlFor="newsletter">
                    I would like to receive promotional emails from HyprClub
                  </label>
                </div>
                <div className="mt-3">
                  <ButtonItself
                    btnPurpose={"Sign Up"}
                    onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleSubmit(e);
                    }}
                  />
                </div>
              </Form>
            </div>
            <SocialLogins
              registerGoogle={() => googleSignIn()}
              registerFacebook={() => facebookSignIn()}
              login={false}
              purpose={"Sign Up"}
            />
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
    </div>
  );
};

export default Register;
