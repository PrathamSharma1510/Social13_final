import React, { useState, useRef } from "react";
import styles from "./UploadNFT.module.css";
import { FileUploader } from "react-drag-drop-files";
// import ToggleBtn from "./ToggleBtn/ToggleBtn";
// import Collection from "./Collection_Categories/Collection";
import { getFirestore, setDoc, doc, GeoPoint } from "firebase/firestore";
import { FileArrowUp, Plus, X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Geocode from "react-geocode";
import { Form } from "react-bootstrap";
import InputField from "../../inputField/Input";
// import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import GradBorder from "../../NFTs/GradBorder/GradBorder";
import { firebaseApp } from "../../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { RootStateOrAny, useSelector } from "react-redux";
import SuccPopup from "../../popups/SuccPopup";
import ErrPopup from "../../popups/ErrPopup";

const fileTypes = ["GIF", "PNG", "JPEG", "JPG"];
const Apartment = ["4x4", "4X3", "4x2", "3x3", "3x2", "2x2", "2x1"];

const items = [
  {
    title: "Create Collection",
    color: "#23262F",
  },
  {
    title: "Crypto Legend -Professor",
    color: "#45B26B",
  },
  {
    title: "Crypto Legend -Professor",
    color: "#EF466F",
  },
  {
    title: " Legend Photography",
    color: "#9757D7",
  },
];

const UploadNFT = () => {
  const [ApartmentType, setApartmentType] = useState("");
  const [perks, setPerks]: any[] = useState(() => new Set());
  const navigate = useNavigate();
  const [community, setCommunity]: any[] = useState(() => new Set());
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  // const [file, setFile] = useState(null);
  const [securityRating, setSecurityRating] = useState<any>();
  const [overallRating, setOverallRating] = useState<any>();
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [Utility, setUtility] = useState(0);
  const [cred, setRent] = useState(100);
  const perksarray = [...perks];
  const communityArray = [...community];
  const [propertyImage, setPropertyImage] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(false);
  // const [propertyName, setPropetyName]=useState('');

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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  // const textRef =useRef<HTMLTextAreaElement | null>(null);
  // console.log(perks);
  // const capitalise = {};

  const [perks1, setPerks1]: any[] = useState(() => new Set());
  const [perks2, setPerks2]: any[] = useState(() => new Set());

  const addPerk = () => {
    if (inputRef!.current!.value === "") {
      setErrorMessage("Please add a perk");
      setOpenErrMsg(true);
      // alert("Please add a perk");
      return;
    }
    // setPerks([...perks, inputRef!.current!.value]); prevState:any)=> new Set(prevState).add(inputRef!.current!.value)

    if (perks1.has(inputRef!.current!.value!.toLowerCase())) {
      setErrorMessage("Duplicate Perks Not Allowed");
      setOpenErrMsg(true);
      // alert("Duplicate Perks Not Allowed");
      return;
    }

    setPerks1(new Set([...perks, inputRef!.current!.value!.toLowerCase()]));

    setPerks(new Set([...perks, inputRef!.current!.value!]));
    console.log(inputRef!.current!.value);
    inputRef!.current!.value = "";
  };
  const addPerk2 = () => {
    if (inputRef2!.current!.value === "") {
      setErrorMessage("Please add a Amenity");
      setOpenErrMsg(true);
      // alert("Please add a perk");
      return;
    }
    // setPerks([...perks, inputRef!.current!.value]); prevState:any)=> new Set(prevState).add(inputRef!.current!.value)

    if (perks2.has(inputRef2!.current!.value!.toLowerCase())) {
      setErrorMessage("Duplicate Amenity Not Allowed");
      setOpenErrMsg(true);
      // alert("Duplicate Perks Not Allowed");
      return;
    }

    setPerks2(
      new Set([...community, inputRef2!.current!.value!.toLowerCase()])
    );

    setCommunity(new Set([...community, inputRef2!.current!.value!]));
    console.log(inputRef2!.current!.value);
    inputRef2!.current!.value = "";
  };
  const enterPerk = (e: any) => {
    if (e.key === "Enter") addPerk();
  };
  const enterPerk2 = (e: any) => {
    if (e.key === "Enter") addPerk2();
  };

  const makeSubletId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };

  let subletid = "NFT" + makeSubletId(26);

  const current = new Date();
  const [isVideo, setVideo] = useState(false);
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleChange = async (e: any) => {
    setLoading(true);
    const file = e;

    console.log(file);
    if (!file) {
      setErrorMessage("no file");
      setOpenErrMsg(true);
      return;
    }
    console.log(file.size);
    console.log("Hey");

    const storage = getStorage(firebaseApp);
    const storageNFTref = ref(storage, "sublet/" + subletid + "/room.jpg");
    await uploadBytesResumable(storageNFTref, file)
      .then((result) => {
        console.log(result.state);
      })
      .then(() => {
        getDownloadURL(storageNFTref)
          .then((url) => {
            setPropertyImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        setSuccMess("Successfully uploaded");
        setSuccess(true);
        // console.log("Success");
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Failed to upload");
        setOpenErrMsg(true);
        console.log(error);
      });
  };
  const makePropertyId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };
  const SubletRequest = async () => {
    Geocode.setApiKey("AIzaSyApeXIBszsayq36Kzn5p1o7-eW6qvR7fq0");
    Geocode.setLanguage("en");
    Geocode.setRegion("us");

    let roomAmenities: any = [];
    let communityAmenities: any = [];
    for (let i = 0; i < perksarray.length; i++) {
      roomAmenities.push({ description: perksarray[i], isAvailed: false });
    }
    for (let i = 0; i < communityArray.length; i++) {
      communityAmenities.push({
        description: communityArray[i],
        isAvailed: false,
      });
    }

    console.log(propertyImage);
    if (
      propertyName === "" ||
      propertyImage === "" ||
      desc === "" ||
      roomAmenities.length === 0 ||
      communityAmenities.length == 0
    ) {
      if (propertyName === "") {
        setErrorMessage("Please Add Property Name");
        setOpenErrMsg(true);
        // console.log("Please Add Title to nft");
      } else if (propertyImage === "") {
        setErrorMessage("Some problem with internet");
        setOpenErrMsg(true);
        // console.log("Problem with Internet");
      } else if (desc === "") {
        setErrorMessage("Add description for the Property");
        setOpenErrMsg(true);
        // console.log("Please describe the nft");
      } else if (roomAmenities.length === 0) {
        setErrorMessage("Please add atleast One Room Amenity");
        setOpenErrMsg(true);
        // console.log("Please add atleast one perk");
      } else if (communityAmenities.length === 0) {
        setErrorMessage("Please add atleast One Community Amenity");
        setOpenErrMsg(true);
        // console.log("Please add atleast one perk");
      } else if (propertyAddress === "") {
        setErrorMessage("Please enter property Address");
        setOpenErrMsg(true);
        // console.log("Please add atleast one perk");
      } else if (ApartmentType === "") {
        setErrorMessage("Please Select Apartment Category");
        setOpenErrMsg(true);
        // console.log("Please add atleast one perk");
      }
    } else {
      Geocode.fromAddress(propertyAddress)
        .then(async (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          const db = getFirestore(firebaseApp);
          const reqID = "REQ" + makeSubletId(24);
          await setDoc(doc(db, "subletRequest", reqID), {
            tentName: userData?.name,
            tentEmail: userData?.email,
            // creatorPhone: userData?.phone,
            tentUsername: userData?.username,
            tentUid: userData?.uid,
            requestId: reqID,
            propertyImg: propertyImage,
            applyDate: date,
            // isMinted: false,
            isApproved: false,
            // video: isVideo,\
            propertyUid: "PROP" + makePropertyId(20),
            overallRating: parseFloat(overallRating),
            securityRating: parseFloat(securityRating),
            ApartmentCat: ApartmentType,
            location: new GeoPoint(lat, lng),
            propertyAddress: propertyAddress,
            state: "PENDING",
            roomAmenities: perksarray,
            communityAmenities: communityArray,
            rent: cred,
            utilityCost: Utility,
            description: desc,
            propertyName: propertyName,
          })
            .then(() => {
              setSuccMess("Sublet Request Sent");
              setSuccess(true);
              // navigate("/");
            })
            .catch((error) => {
              setErrorMessage("Some Error Occured");
              setOpenErrMsg(true);
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const removePerk = (e: any) => {
    const updatedPerks = new Set(perks);
    const updatedPerks1 = new Set(perks1);
    updatedPerks.delete(e);
    updatedPerks1.delete(e.toLowerCase());
    setSuccMess("perk removed successfully");
    setSuccess(true);
    setPerks(updatedPerks);
    setPerks1(updatedPerks1);
  };
  const removePerk2 = (e: any) => {
    const updatedPerks = new Set(community);
    const updatedPerks1 = new Set(perks2);
    updatedPerks.delete(e);
    updatedPerks1.delete(e.toLowerCase());
    setSuccMess("perk removed successfully");
    setSuccess(true);
    setCommunity(updatedPerks);
    setPerks2(updatedPerks1);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <h1 className={styles.title}> Create a Subletting Request</h1>
          {loading === false && !propertyImage && (
            <div className={styles.Upload}>
              <h4 className={styles.upldFile}>Upload file</h4>
              <h6 className={styles.drag}>
                Drag or choose your file to upload
              </h6>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              >
                <FileArrowUp size={24} id={styles.Filearrow} />
                <h6 className={styles.fileTypes}>PNG, JPEG, JPG</h6>
              </FileUploader>
            </div>
          )}
          {loading === false && propertyImage && (
            <div className={styles.Upload}>
              <h4 className={styles.upldFile}>File Uploaded</h4>
              <button
                onClick={(e) => {
                  setPropertyImage("");
                }}
                className={styles.Previewbtn}
              >
                <p className={styles.btnText}>Upload Again</p>
              </button>
            </div>
          )}
          {loading && <Loader />}
          <div className={styles.Item_stck_prc}>
            <div className={styles.ItemCred}>
              {/* <h6 className={styles.Heading}>Enter Property Name</h6> */}
              <InputField
                typeOfInput="text"
                lableText="Enter Property Name"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => setPropertyName(e.target.value)}
              />
            </div>
            <div className={styles.ItemCred}>
              {/* <h6 className={styles.Heading}>Enter Property Address</h6> */}
              <InputField
                typeOfInput="textarea"
                lableText="Enter Property Address"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => setPropertyAddress(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.Item_stck_prc}>
            <div className={styles.ItemCred}>
              {/* <h6 className={styles.Heading}>Enter Property Name</h6> */}
              <InputField
                typeOfInput="number"
                lableText="Security Rating"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => {
                  if (e.target.value <= 5 && e.target.value >= 0) {
                    setSecurityRating(e.target.value);
                  } else {
                    setErrorMessage("only Max Rating 5 and Minimum 0");
                    setOpenErrMsg(true);
                  }
                }}
              />
            </div>
            <div className={styles.ItemCred}>
              {/* <h6 className={styles.Heading}>Enter Property Address</h6> */}
              <InputField
                typeOfInput="number"
                lableText="Overall Rating"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => {
                  if (e.target.value <= 5 && e.target.value >= 0) {
                    setOverallRating(e.target.value);
                  } else {
                    setErrorMessage("only Max Rating 5 and Minimum 0");
                    setOpenErrMsg(true);
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.Item_stck_prc}>
            <div className={styles.ItemCred}>
              <InputField
                typeOfInput="Number"
                lableText="Enter Utility Amount ($)"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => setUtility(e.target.value)}
              />
            </div>
            <div className={styles.ItemCred}>
              <InputField
                typeOfInput="text"
                lableText="Enter Base Rent Amount ($)"
                garyBold={true}
                className={styles.Input}
                onChange={(e: any) => setRent(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.ItemDesc}>
            <h6 className={styles.Heading}>
              Enter Room Description example: Proximity to University,etc.
            </h6>
            <textarea
              onChange={(e: any) => setDesc(e.target.value)}
              className={styles.Input_Description}
            />
            <h6 className={styles.note}>Use 30-500 characters </h6>
          </div>
          <div className={styles.Perks}>
            <div className={styles.PerkHead}>
              <h6 className={styles.Heading}>
                Add Apartment Amenities like chair, bed,etc.
              </h6>
              {/* <div className={styles.transferable}>
                <h6 className={styles.Heading_transfer}>Make Transferable</h6>
                <ToggleBtn />
              </div> */}
            </div>
            <input
              type="text"
              onKeyDown={enterPerk}
              className={styles.Input}
              ref={inputRef}
            />
            <div className={styles.PerkBody}>
              <button onClick={addPerk} className={styles.Plus}>
                <Plus size={20} className={styles.perkicon} />
              </button>
              <h5 className={styles.AddPerk}>Add more Amenities</h5>
              {perksarray &&
                perksarray.map((e: any) => (
                  <div className={styles.addedPerk} key={e}>
                    <button
                      className={styles.Plus}
                      onClick={() => removePerk(e)}
                    >
                      <X size={20} className={styles.perkicon} />{" "}
                    </button>
                    <h6 className={styles.AddPerk}>{e}</h6>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.Perks}>
            <div className={styles.PerkHead}>
              <h6 className={styles.Heading}>
                Add Community Amenities like gym, swimming pool,etc.
              </h6>
              {/* <div className={styles.transferable}>
                <h6 className={styles.Heading_transfer}>Make Transferable</h6>
                <ToggleBtn />
              </div> */}
            </div>
            <input
              type="text"
              onKeyDown={enterPerk2}
              className={styles.Input}
              ref={inputRef2}
            />
            <div className={styles.PerkBody}>
              <button onClick={addPerk2} className={styles.Plus}>
                <Plus size={20} className={styles.perkicon} />
              </button>
              <h5 className={styles.AddPerk}>Add more community Amenities</h5>
              {communityArray &&
                communityArray.map((e: any) => (
                  <div className={styles.addedPerk} key={e}>
                    <button
                      className={styles.Plus}
                      onClick={() => removePerk2(e)}
                    >
                      <X size={20} className={styles.perkicon} />{" "}
                    </button>
                    <h6 className={styles.AddPerk}>{e}</h6>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.dropdown}>
            <h6 className={styles.Heading}> Apartment Category</h6>
            <Form.Select
              aria-label="Default select example"
              className={styles.drop}
              onChange={(e) => {
                setApartmentType(e.target.value);
              }}
            >
              {Apartment.map((x, index) => (
                <option key={index}>{x} </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className={styles.Bottom}>
          {/* <div className={styles.Collection}>
            <h3 className={styles.Collection_title}>Choose Collection</h3>
            <h6 className={styles.Collection_sub}>
              Choose an existing collection or create a new one
            </h6>
            <Collection item={items} />
          </div> */}
          <div className={styles.btns}>
            <GradBorder
              className={styles.Gradbtn}
              text="Upload Request"
              onClick={SubletRequest}
            />
            {/* <button type="submit" className={styles.Previewbtn}>
              <p className={styles.btnText}> Preview NFT</p>
            </button> */}
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
export default UploadNFT;
