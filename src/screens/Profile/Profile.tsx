import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import Icon from "../../components/Icon";

// data
import User from "../../components/user/User";
import Header_login from "../../components/header/header_after_login/Header_login";
import Nft from "../../components/NFT/Nft";
// import Store from "../../components/store/Store";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { logEvent } from "firebase/analytics";
import { db, firebaseApp, analytics } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Loader from "../../components/Loader/Loader";

// import { profile } from "console";
// import { isStepDivisible } from "react-range/lib/utils";

const navLinks = ["NFT"];

const Profile = () => {
  const { username } = useParams();
  const storage = getStorage(firebaseApp);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.userData
  );
  const [profileData, setProfileData] = useState<any | null>({});
  const [myProfile, setMyProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<any | null>();
  const [coverPhoto, setCoverPhoto] = useState<any | null>();
  const [ownedNft, setOwnedNft] = useState<any>([]);
  const [createdNft, setCreatedNft] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state: RootStateOrAny) => state?.userData);
  const fetchData = async (username: any) => {
    if (username) {
      const q = query(
        collection(db, "hyprUsers"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot) {
        querySnapshot.forEach((docs) => {
          if (docs.exists() && uid) {
            checkMyProfile(docs.id);
            if (docs.id !== uid) {
              setMyProfile(false);
            } else {
              updateDoc(doc(db, "hyprUsers", docs.id), {
                profileViewsCount: docs.data().profileViewsCount + 1,
              })
                .then(() => {
                  console.log("+1");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } else {
            console.log("User Doesn't exists");
          }
          setProfileData(docs.data());
          GetOwnedNFT(docs.id);
          GetCreatedNFT(docs.id, docs.data().isCreator);
          GetProfilePhoto(docs.id);
          GetCoverPhoto(docs.id);

          console.log(docs.data());
          setLoading(false);
          logEvent(analytics, "page_view");
        });
      } else {
        console.log("No User Found");
        return;
      }
    } else {
    }
  };

  const GetOwnedNFT = async (uid: any) => {
    if (uid) {
      await getDocs(query(collection(db, "nfts"), where("ownerUid", "==", uid)))
        .then((querySnapShot) => {
          let nftIds: string[] = [];
          if (querySnapShot) {
            querySnapShot.forEach((element) => {
              if (element) {
                nftIds.push(element.id);
                console.log(nftIds);
              } else {
              }
            });
          } else {
            return;
          }
          setOwnedNft(nftIds);
        })
        .catch((error) => {
          console.error(error.code);
        });
    } else {
    }
  };

  const GetCreatedNFT = async (uid: any, creator: any) => {
    if (uid && creator) {
      await getDocs(
        query(collection(db, "nfts"), where("creatorUid", "==", uid))
      )
        .then((querySnapShot) => {
          let nftIds: string[] = [];
          if (querySnapShot) {
            querySnapShot.forEach((element) => {
              if (element) {
                nftIds.push(element.id);
                console.log(nftIds);
              } else {
              }
            });
          } else {
            return;
          }
          setCreatedNft(nftIds);
        })
        .catch((error) => {
          console.error(error.code);
        });
    } else {
    }
  };

  const GetProfilePhoto = async (uid: any) => {
    try {
      // console.log(uid);
      const storagePFref = ref(storage, "users/" + uid + "/profile.jpg");

      const url = await getDownloadURL(ref(storagePFref));

      setProfilePhoto(url);
    } catch (err: any) {
      if (err.code === "storage/object-not-found") {
        setProfilePhoto("/images/content/avatar-big.jpg");
      } else {
        console.error(err.code);
      }
    }
  };
  const GetCoverPhoto = async (uid: any) => {
    try {
      // console.log(uid);
      const storageCoverRef = ref(storage, "users/" + uid + "/cover.jpg");

      const coverUrl = await getDownloadURL(ref(storageCoverRef));
      setCoverPhoto(coverUrl);
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        setCoverPhoto("images/bg-img.png");
      } else {
        console.error(error.code);
      }
    }
  };
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log(file.size);
    if (file.size >= 5242880) {
      console.log("File Size Too Big");
    } else {
      const storagePFref = ref(storage, "users/" + userData.uid + "/cover.jpg");
      await uploadBytesResumable(storagePFref, file)
        .then((result) => {
          console.log(result.state);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const checkMyProfile = (id: any) => {
    if (id === uid) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
  };

  useEffect(() => {
    if (username) {
      setLoading(true);
      fetchData(username);
    } else {
      return;
    }
    // ProfileViewCount();
  }, [username]);

  const socials = [
    {
      title: "twitter",
      url: "https://twitter.com/" + profileData.socials?.twitterUsername + "/",
    },
    {
      title: "instagram",
      url:
        "https://www.instagram.com/" +
        profileData.socials?.instagramUsername +
        "/",
    },
    {
      title: "facebook",
      url: profileData.socials?.facebookProfileUrl,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header_login />
      <div className={clsx(styles.profile)}>
        <div
          className={clsx(styles.head, { [styles.active]: visible })}
          style={{
            backgroundImage: `url(${coverPhoto || "images/bg-img.png"} )`,
          }}
        >
          <div className={clsx("container", styles.container)}>
            {myProfile && (
              <div className={styles.btns}>
                <button
                  className={clsx("button-stroke button-small", styles.button)}
                  onClick={() => setVisible(true)}
                >
                  <span className="me-2 editCover">Edit cover photo</span>
                  <Icon name="edit" size="16" />
                </button>

                <Link to="/settings">
                  <button
                    className={clsx(
                      "button-stroke button-small",
                      styles.button
                    )}
                  >
                    <span className="me-2">Edit profile</span>
                    <Icon name="image" size="16" />
                  </button>
                </Link>
              </div>
            )}
            <div className={styles.file}>
              <input
                accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                id="fileInput"
                type="file"
                style={{ display: "none" }}
              />
              <div className={styles.wrap}>
                <Icon name="upload-file" size="48" />
                <div className={styles.info}>Drag and drop your photo here</div>
                <div className={styles.text}>or click to browse</div>
              </div>
              <button
                className={clsx("button-small", styles.button)}
                onClick={() => setVisible(false)}
              >
                Save photo
              </button>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={clsx("container", styles.container)}>
            <User
              className={styles.user}
              item={socials}
              username={profileData?.username}
              category={profileData?.category}
              name={profileData?.name}
              email={profileData?.email}
              uid={profileData?.uid}
              portfolioUrl={profileData.socials?.portfolioUrl}
              bio={profileData?.bio}
              joiningDate={profileData?.dateOfJoining}
              profilePhotoUrl={profilePhoto}
              isCreator={profileData?.isCreator}
              myProfile={myProfile}
            />
            {loading && <Loader />}
            <div className={styles.wrapper}>
              {/* <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={clsx(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div> */}
              <div className={styles.group}>
                <div className={styles.item}>
                  {/* {activeIndex === 0 && (
                  <div className={styles.posts}>
                    <div className={styles.postSection}>
                      <SinglePost/>
                      <SinglePost/>
                      <SinglePost/>
                    </div>
                  </div>
                )} */}
                  {activeIndex === 0 && (
                    <Nft
                      user={profileData}
                      star={profileData?.savedNfts}
                      profile={myProfile}
                      owned={ownedNft}
                      created={createdNft}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
