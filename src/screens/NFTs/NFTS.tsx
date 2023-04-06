import React, { useState, useEffect } from "react";
import styles from "./NFTS.module.css";
import cn from "classnames";
// import Bidders from "../../components/NFTs/Bidders/Bidders";
import Header_login from "../../components/header/header_after_login/Header_login";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
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
import Items_1 from "../../Items_house.json";
interface Props {
  Video?: boolean;
}

const NFTS = ({ Video }: Props) => {
  let navigate = useNavigate();
  const [video, setVideo] = useState(false);
  const [property, setProperty] = useState<any>({});
  const { docId, sublet } = useParams();
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

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const users = [
    {
      name: creatorData.name,
      position: "Tent",
      avatar: creatorImage || "../../images/logo-dark.jpg",
      profile: "/" + creatorData.username,
    },
  ];
  useEffect(() => {
    // const idToken = new URLSearchParams(window?.location?.search).get("idToken");

    const run = async () => {
      setLoading(true);
      if (docId && sublet === "sublet") {
        await getDoc(doc(db, "subletRequest", docId))
          .then((QuerySnapshot) => {
            // console.log("1");
            if (QuerySnapshot.exists()) {
              setProperty(QuerySnapshot.data());
              QuerySnapshot.data()?.communityAmenities?.map((elem: string) => {
                console.log(elem);
              });

              getDoc(doc(db, "users", QuerySnapshot.data().tentUid))
                .then((tent) => {
                  if (tent.exists()) {
                    setCreatorData(tent.data());
                    console.log("Creator : " + tent.data());
                    const userRef = ref(
                      storage,
                      "users/" + tent.id + "/profile.jpg"
                    );
                    getDownloadURL(ref(userRef))
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
      } else if (sublet !== "sublet" && docId) {
        Items_1.filter((elem) => {
          if (elem.id === parseInt(docId)) {
            setProperty(elem);
            setLoading(false);
          }
        });
      }
    };
    run();
  }, [docId, db, storage]);
  // console.log(property);
  const handleStarred = async () => {
    console.log("Hello");
    if (loggedIn && uid && docId) {
      console.log(userData?.savedProperty);
      if (userData?.savedProperty.includes(docId)) {
        await updateDoc(doc(db, "users", uid), {
          savedProperty: arrayRemove(docId),
        })
          .then(() => {
            setSuccMess("REMOVED");
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await updateDoc(doc(db, "users", uid), {
          savedProperty: arrayUnion(docId),
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
  const AnyReactComponent = (text: any) => <div>{text}</div>;
  // const handlePayment = async () => {
  //   if (loggedIn && uid) {
  //     try {
  //       const paymentProps: paymentDetailsSchema = {
  //         buyerUID: userData?.uid,
  //         buyerUsername: userData?.username,
  //         buyerEmail: userData?.email,
  //         buyerName: userData?.name,
  //         buyerPhoto: userData?.profilePhotoUrl,
  //         buyerPhoneNumber: userData?.phone,
  //         recipientData: {
  //           reciepientUID: ownerData?.uid,
  //           recipientUsername: ownerData?.username,
  //           recipientEmail: ownerData?.email,
  //         },
  //         amount: itemPrice,
  //         transactionType: "NFT Purchase",
  //         transactionSuccess: "in process",
  //         purchasedNftUID: docId,
  //         purchasedNftData: {
  //           nftContractAddress: contractAddress,
  //           nftName: item.name,
  //           nftDescription: item.description,
  //         },
  //       };
  //       // console.log(paymentProps);
  //       // this will return payment status - Payment Successful | Payment Failed
  //       displayRazorpay(paymentProps)
  //         .then((result) => {
  //           console.log(result);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       // navigate(`/${userData?.username}`);
  //     } catch (error) {
  //       console.log("nft paymentprops: ", error);
  //     }
  //   } else {
  //     console.log("Please Login TO continue");
  //     navigate("/login");
  //   }
  // };

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
                      src={"item.animation_url || item.image"}
                      loop
                      autoPlay
                      controls
                      controlsList="nodownload"
                    />
                  ) : (
                    <img
                      id={styles.img}
                      src={property.propertyImg ?? property.imag_url}
                      alt="NFT"
                    />
                  )}
                  {/* <Option
                    onClick={handleStarred}
                    className={styles.options}
                    isSaved={userData?.savedNfts.includes(docId)}
                  /> */}
                </div>
              </div>

              <div className={styles.details}>
                <h1 className={styles.title}>
                  {property.propertyName ?? property.name}
                </h1>
                <div className={`${styles.cost} mt-4`}>
                  <GradBorder
                    className={styles.price}
                    disable={true}
                    text={` Room Rent $${property.rent ?? property.rent}`}
                  />
                  <GradBorder
                    className={styles.price}
                    disable={true}
                    text={` Utility Cost $${
                      property?.utilityCost ?? property?.utility
                    }`}
                  />
                </div>
                <div className={styles.Description_Perks}>
                  <h3 className={styles.subHeading}>Description</h3>
                  {property.description}
                  <br />
                  <a
                    className="hov"
                    href={`https://www.google.com/maps/search/?api=1&query=${
                      property?.location?._lat ?? property?.location?.lat
                    },${property?.location?._long ?? property?.location?.lng}`}
                    target="_blank"
                  >
                    Click for the Location
                  </a>
                </div>
                {sublet === "listing" && (
                  <div className={styles.Description_Perks}>
                    <h3 className={styles.subHeading}>Amenities</h3>
                    {property?.amenities?.map((elem: string, index: number) => (
                      <h5 key={index}>{elem}</h5>
                    ))}
                  </div>
                )}
                {sublet === "sublet" && (
                  <div className={styles.Description_Perks}>
                    <h3 className={styles.subHeading}>Community Amenities</h3>
                    {property?.communityAmenities?.map(
                      (elem: string, index: number) => (
                        <h5 key={index}>{elem}</h5>
                      )
                    )}
                  </div>
                )}
                {sublet === "sublet" && (
                  <div className={styles.Description_Perks}>
                    <h3 className={styles.subHeading}>Apartment Amenities</h3>
                    {property?.roomAmenities?.map(
                      (elem: string, index: number) => (
                        <h5 key={index}>{elem}</h5>
                      )
                    )}
                  </div>
                )}
                {/* <div className={styles.Description_Perks}>
                  <h3 className={styles.subHeading}>Location</h3>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div> */}
                <div className={`${styles.cost} row mt-5`}>
                  <GradBorder
                    className={`${styles.price} col-6`}
                    disable={true}
                    text={`Room Rating ⭐️${
                      property.customer_rating ?? property.customer_rating
                    }`}
                  />
                  <GradBorder
                    className={styles.price}
                    disable={true}
                    text={`Security Rating ⭐️${
                      property.security_rating ?? property.security_rating
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          {sublet === "sublet" && (
            <div className={styles.bottom}>
              <div className={styles.Bottom_part}>
                <h4 className={styles.bottomHeading}>Current Tent</h4>
                <Users className={styles.users} items={users} />
              </div>
              {/* <div className={styles.Bottom_part1}>
                <h4 className={cn(styles.bottomHeading, styles.auth)}>
                  View Authenticity
                </h4>
                <Polygon className={styles.poly} />
              </div> */}
            </div>
          )}

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
