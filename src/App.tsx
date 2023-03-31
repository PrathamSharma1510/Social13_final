import React from "react";
import { useEffect } from "react";
import {
  useSelector,
  useDispatch,
  RootStateOrAny,
  // DefaultRootState,
} from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Chatbox from "./components/ChatBox/Chatbox";
// import Footer from "./components/footer/Footer";
// import Header from "./components/header/header_before_login/Header";
// import Header_login from "./components/header/header_after_login/Header_login";
// import { useNavigate, BrowserRouter } from "react-router-dom";
import Feed from "./screens/Feed/Feed";
import FollowCreater from "./screens/FollowCreater/FollowCreater";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Interests from "./screens/yourInterest/Interests";
import Profile from "./screens/Profile/Profile";
import Marketplace from "./screens/Marketplace/Marketplace";
import Logout from "./logout";
import Settings from "./screens/Settings/Settings";
import Landing from "./screens/Landing/Landing";
import NFTS from "./screens/NFTs/NFTS";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import UploadNft from "./screens/UploadNft/UploadNft";
import { firebaseApp, analytics } from "./firebaseConfig";
import { logEvent } from "firebase/analytics";
import { useNavigate, BrowserRouter } from "react-router-dom";
import NFTCollection from "./screens/NFTCollections/NFTCollection";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "@firebase/auth";

import {
  getDoc,
  doc,
  // where,
  getDocs,
  collection,
  getFirestore,
  // query,
  // orderBy,
  // limit,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  // uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import userData, { UserDataActions } from "./redux/slices/userData";
import Admindash from "./screens/AdminDashboard/Admindash";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import Creator from "./screens/Creator/Creator";
// import LineChart from "./components/creatorDashboard/charts/SalesChart";
import CreatorOnboard from "./screens/OnBoarding/CreatorOnboard";
// import logo from './logo.svg';
// import './App.css';

function App() {
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const dispatch = useDispatch();

  // monitor any auth changes in the
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (user?.emailVerified) {
          dispatch(UserDataActions.login(user));
        } else {
          sendEmailVerification(user)
            .then((result) => {
              console.log(
                "Verification Mail Sent! please verify email to continue"
              );
            })
            .catch((error) => {
              if (error.code === "auth/too-many-requests") {
                console.log("Verify Email to continue further");
                return;
              } else {
                console.log("Something went wrong verification mail");
              }
            });
        }
      } else {
        dispatch(UserDataActions.logout());
      }
    });
  }, [dispatch, auth]);

  // fetching userData from firebase
  useEffect(() => {
    const run = async () => {
      if (loggedIn && uid) {
        await getDoc(doc(db, "hyprUsers", uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              logEvent(analytics, "login");
              dispatch(UserDataActions.updateCurrentUserDetail(docSnap.data()));
            } else {
              console.log("No User Data");
              return;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("logged Out");
      }
    };
    run();
  }, [dispatch, loggedIn, uid, db, userData]);

  //fetch user profile photo from
  useEffect(() => {
    const run = async () => {
      if (loggedIn && uid) {
        const storagePFref = ref(storage, "users/" + uid + "/profile.jpg");
        await getDownloadURL(ref(storagePFref))
          .then((url) => {
            dispatch(UserDataActions.updateUserDp({ profilePhotoUrl: url }));
          })
          .catch((err) => {
            if (err.code === "storage/object-not-found") {
              dispatch(
                UserDataActions.updateUserDp({
                  profilePhotoUrl: "/images/content/avatar-big.jpg",
                })
              );
            } else {
              dispatch(
                UserDataActions.updateUserDp({
                  profilePhotoUrl: "/images/content/avatar-big.jpg",
                })
              );
            }
          });
      } else {
        console.log("Logged Out profile one");
      }
    };
    run();
  }, [loggedIn, uid, storage, dispatch]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/follow" element={<FollowCreater />} />
            <Route path="/interest" element={<Interests />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/market" element={<Marketplace />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:test" element={<Settings />} />
            <Route path="/uploadnft" element={<UploadNft />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<Admindash />} />
            <Route path="/nft/:docId" element={<NFTS></NFTS>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/follow" element={<FollowCreater />} />
            <Route path="/interest" element={<Interests />} />
            <Route path="/feed" element={<Feed />} />
            {/* <Route path='/profile' element={<Profile/>}/> */}
            <Route path="/market" element={<Marketplace />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/settings/:test" element={<Settings />} />
            <Route path="/uploadnft" element={<UploadNft />} />
            <Route path="/admin" element={<Admindash />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/onboard" element={<CreatorOnboard />} />
            <Route path="/nftcollection" element={<NFTCollection />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* <Header></Header>
          <Footer></Footer> */}
        </header>
      </div>
    </Router>
  );
}

export default App;
