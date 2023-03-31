import React, { useState, useEffect } from "react";
import styles from "./NFTS.module.css";
import cn from "classnames";
// import Bidders from "../../components/NFTs/Bidders/Bidders";
import Header_login from "../../components/header/header_after_login/Header_login";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
// import { Avatar } from "@mui/material";
// import { style } from "@mui/system";

import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  getFirestore,
  // getDocs,
  // collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // QuerySnapshot,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { firebaseApp } from "../../firebaseConfig";
import Option from "../../components/NFTs/Options/Option";
import GradBorder from "../../components/NFTs/GradBorder/GradBorder";
// import ReadMore from "../../components/NFTs/Readmore/Readmore";
import Perks from "../../components/NFTs/Perks/Perks";
import Polygon from "../../components/NFTs/Poly/Polygon";
import Users from "../../components/NFTs/Users/Users";
import ItemsCarousel from "../../components/NFTs/ItemsCarousel/ItemsCarousel";
import { RootStateOrAny, useSelector } from "react-redux";
// import { RootCloseEvent } from "react-bootstrap/esm/types";
import displayRazorpay from "../../razorpay";
import Loader from "../../components/Loader/Loader";
import { paymentDetailsSchema } from "../../razorpay/payment.saveData";
import SuccPopup from "../../components/popups/SuccPopup";
import ErrPopup from "../../components/popups/ErrPopup";
interface Props {
  Video?: boolean;
}

const NFTS = ({ Video }: Props) => {
  let navigate = useNavigate();
  const [video, setVideo] = useState(false);
  const { docId } = useParams();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const [contractAddress, setContractAddress] = useState("");
  const [creatorData, setCreatorData] = useState<any | null>({});
  const [ownerData, setOwnerData] = useState<any | null>({});
  const [item, setItem] = useState<any | null>({});
  const [forSale, setForSale] = useState(false);
  const [itemPrice, setItemPrice] = useState(0);
  // let perkId: any = [];
  const [perks, setPerksData] = useState<any>([]);
  const [creatorImage, setCreatorImage] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  const [bought, setBought] = useState(false);
  const [perkState, setPerkState] = useState("PENDING");
  const [saved, setSaved] = useState(false);

  // error handling states
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

  const users = [
    {
      name: ownerData.name,
      position: "Owner",
      avatar: ownerImage || "../../images/logo-dark.jpg",
      profile: "/" + ownerData.username,
    },
    {
      name: creatorData.name,
      position: "Creator",
      avatar: creatorImage || "../../images/logo-dark.jpg",
      profile: "/" + creatorData.username,
    },
  ];
  useEffect(() => {
    // const idToken = new URLSearchParams(window?.location?.search).get("idToken");
    const run = async () => {
      setLoading(true);
      if (docId) {
        await getDoc(doc(db, "nfts", docId))
          .then((QuerySnapshot) => {
            // console.log("1");
            if (QuerySnapshot.exists()) {
              setItemPrice(QuerySnapshot.data().price);
              setPerksData(QuerySnapshot.data().perks);
              setPerkState(QuerySnapshot.data().nftPerkState);
              setContractAddress(QuerySnapshot.data().contractAddress);
              setForSale(QuerySnapshot.data().forSale);
              //   let Perk_list: any = [];
              axios
                .get(
                  "https://cdn.hyprclub.com/" +
                    QuerySnapshot.data().collectionTag +
                    "/" +
                    QuerySnapshot.data().token
                ) // add custom uri settings here.
                .then((result) => {
                  if (result) {
                    setItem(result.data);
                    if (
                      result.data.image.split().pop() === "mp4" ||
                      result.data.animation_url
                    ) {
                      setVideo(true);
                      console.log(true);
                    } else {
                      setVideo(false);
                      console.log(false);
                    }
                  } else {
                    console.log("No Data");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              getDoc(doc(db, "hyprUsers", QuerySnapshot.data().ownerUid))
                .then((snapshotOwner) => {
                  if (snapshotOwner.exists()) {
                    if (QuerySnapshot.data().ownerUid === userData?.uid) {
                      setBought(true);
                    } else {
                      setBought(false);
                    }
                    const storageOwnerRef = ref(
                      storage,
                      "users/" + snapshotOwner.id + "/profile.jpg"
                    );
                    getDownloadURL(ref(storageOwnerRef))
                      .then((url) => {
                        setOwnerImage(url);
                      })
                      .catch((err) => {
                        if (err.code === "storage/object-not-found") {
                          setOwnerImage("./images/content/avatar-big.jpg");
                        } else {
                          console.log(err);
                          setOwnerImage("./images/content/avatar-big.jpg");
                        }
                      });
                    setOwnerData(snapshotOwner.data());
                  } else {
                    return;
                  }
                })
                .catch((err) => {
                  console.log(err);
                });

              getDoc(doc(db, "hyprUsers", QuerySnapshot.data().creatorUid))
                .then((snapshotCreator) => {
                  if (snapshotCreator.exists()) {
                    setCreatorData(snapshotCreator.data());
                    console.log("Creator : " + snapshotCreator.data());
                    const storageCreatorRef = ref(
                      storage,
                      "users/" + snapshotCreator.id + "/profile.jpg"
                    );
                    getDownloadURL(ref(storageCreatorRef))
                      .then((url) => {
                        setCreatorImage(url);
                      })
                      .catch((err) => {
                        console.log(err);
                        if (err.code === "storage/object-not-found") {
                          setCreatorImage("./images/content/avatar-big.jpg");
                        } else {
                          console.log(err);
                          setCreatorImage("./images/content/avatar-big.jpg");
                        }
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("No snapshot");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
      } else {
        return;
        setLoading(false);
      }
    };
    run();
  }, [docId, db, storage]);

  const handleStarred = async () => {
    console.log("Hello");
    if (loggedIn && uid && docId) {
      console.log(userData?.savedNfts);
      if (userData?.savedNfts.includes(docId)) {
        await updateDoc(doc(db, "hyprUsers", uid), {
          savedNfts: arrayRemove(docId),
        })
          .then(() => {
            setSuccMess("REMOVED");
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await updateDoc(doc(db, "hyprUsers", uid), {
          savedNfts: arrayUnion(docId),
        })
          .then(() => {
            setSuccMess("SAVED");
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log("Please Login To continue");
    }
  };

  const handlePayment = async () => {
    if (loggedIn && uid) {
      try {
        const paymentProps: paymentDetailsSchema = {
          buyerUID: userData?.uid,
          buyerUsername: userData?.username,
          buyerEmail: userData?.email,
          buyerName: userData?.name,
          buyerPhoto: userData?.profilePhotoUrl,
          buyerPhoneNumber: userData?.phone,
          recipientData: {
            reciepientUID: ownerData?.uid,
            recipientUsername: ownerData?.username,
            recipientEmail: ownerData?.email,
          },
          amount: itemPrice,
          transactionType: "NFT Purchase",
          transactionSuccess: "in process",
          purchasedNftUID: docId,
          purchasedNftData: {
            nftContractAddress: contractAddress,
            nftName: item.name,
            nftDescription: item.description,
          },
        };
        // console.log(paymentProps);
        // this will return payment status - Payment Successful | Payment Failed
        displayRazorpay(paymentProps)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        // navigate(`/${userData?.username}`);
      } catch (error) {
        console.log("nft paymentprops: ", error);
      }
    } else {
      console.log("Please Login TO continue");
      navigate("/login");
    }
  };

  return (
    <>
      <Header_login />
      {loading && <Loader />}
      {loading === false && (
        <div className={styles.Wrapper}>
          <p className={styles.back}>
            <Link className={styles.link} to="/market">
              <ArrowLeft size={20} id={styles.backArrow} />{" "}
              <span className={styles.spn}>Go Back</span>
            </Link>
          </p>
          <div className={styles.section}>
            <div className={styles.container}>
              <div className={styles.bg}>
                <div className={styles.preview}>
                  {video ? (
                    <video
                      id={styles.video}
                      src={item.animation_url || item.image}
                      loop
                      autoPlay
                      controls
                      controlsList="nodownload"
                    />
                  ) : (
                    <img id={styles.img} src={item.image} alt="NFT" />
                  )}
                  <Option
                    onClick={handleStarred}
                    className={styles.options}
                    isSaved={userData?.savedNfts.includes(docId)}
                  />
                </div>
              </div>

              <div className={styles.details}>
                <h1 className={styles.title}>{item.name}</h1>
                <div className={styles.cost}>
                  <GradBorder
                    className={styles.price}
                    disable={true}
                    text={`INR ${itemPrice}`}
                  />
                </div>

                {forSale && (
                  <GradBorder
                    text="Buy Now"
                    className={styles.buy}
                    onClick={handlePayment}
                  />
                )}

                <div className={styles.Description_Perks}>
                  <h3 className={styles.subHeading}>Description</h3>
                  {item.description}
                </div>

                <div className={styles.Description_Perks}>
                  <h3 className={styles.subHeading}>Perks</h3>
                  <Perks
                    item={perks}
                    Bought={bought}
                    nftDet={docId}
                    ownerDet={ownerData}
                    creatorDet={creatorData}
                    perkState={perkState}
                    nftDetail={item}
                    ownerPht={ownerImage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.Bottom_part}>
              <h4 className={styles.bottomHeading}>Owners</h4>
              <Users className={styles.users} items={users} />
            </div>
            <div className={styles.Bottom_part1}>
              <h4 className={cn(styles.bottomHeading, styles.auth)}>
                View Authenticity
              </h4>
              <Polygon className={styles.poly} />
            </div>
          </div>
          {/* <p className={styles.more}>Discover NFTs Related to The Last Slice</p>
        <div className={styles.carousel}>
        <ItemsCarousel /> 
        </div >*/}
        </div>
      )}
      {success && (
        <SuccPopup
          handelClose={(r: any) => handelClose(r)}
          open={success}
          message={sucMessage}
        />
      )}
    </>
  );
};
export default NFTS;
