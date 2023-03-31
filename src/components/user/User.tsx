import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./user.module.css";
import Icon from "../Icon";
import GradientBorder from "../gradientBorderBtn/GradientBorder";
import { useNavigate } from "react-router";
import { useSelector, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { X } from "phosphor-react";
import { analytics } from "../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import displayRazorpay from "../../razorpay/index";
import { paymentDetailsSchema } from "../../razorpay/payment.saveData";
interface Item {
  title: string;
  url: string;
}

interface UserType {
  className: string;
  item: Item[];
  name: any;
  username: any;
  uid: string;
  email: string;
  category: any;
  portfolioUrl: any;
  bio: any;
  joiningDate: any;
  profilePhotoUrl: any;
  isCreator: any;
  myProfile: any;
}

const User = ({
  className,
  item,
  name,
  username,
  email,
  uid,
  category,
  portfolioUrl,
  bio,
  joiningDate,
  profilePhotoUrl,
  isCreator,
  myProfile,
}: UserType) => {
  const userData = useSelector((state: RootStateOrAny) => state.userData);
  const [thanksValue, setThanksValue] = useState("100.00");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state: RootStateOrAny) => state?.userData);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  const [creator, setCreator] = useState(true);

  const handleSayThanks = async (e: any) => {
    e.preventDefault();
    logEvent(analytics, "thanks_event_created", userData?.username);
    console.log("Pay User " + thanksValue);
    try {
      if (loggedIn && userData?.uid) {
        const paymentProps: paymentDetailsSchema = {
          buyerUID: userData?.uid,
          buyerUsername: userData?.username,
          buyerEmail: userData?.email,
          buyerPhoto: userData?.profilePhotoUrl,
          buyerName: userData?.name,
          buyerPhoneNumber: userData?.phone,
          creatorSupportUID: uid,
          recipientData: {
            reciepientUID: uid,
            recipientUsername: username,
            recipientEmail: email,
          },
          amount: parseInt(thanksValue),
          transactionType: "Creator Support",
          transactionSuccess: "in process",
        };
        displayRazorpay(paymentProps)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/login");
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          <img
            src={profilePhotoUrl || "/images/content/avatar-big.jpg"}
            alt="Avatar"
          />
        </div>
        <div className={isCreator ? styles.creatorName : styles.nonCreatorName}>
          {name}
        </div>
        <div className={styles.code}>
          <div className={styles.username}>@{username}</div>
          <div className={styles.prof}>{category}</div>
        </div>
        <div className={styles.info}>{bio}</div>
        <a
          className={styles.href}
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={cn("bi bi-link", styles.linkicon)}></i>
          <span>{portfolioUrl}</span>
        </a>

        {/* <p className={cn(styles.hypes, 'text-center')}> <img src="images/FireSimple.png" className={styles.fire} alt="" /> 1,000,573 hypes</p> */}
        {/* <div className={cn(styles.followersAndFollowiing, 'd-flex')}>
          <p className={cn(styles.followers, 'text-center')}><span className={styles.nums}>100K</span><br /> Followers</p>
          <p className={cn(styles.followings, 'text-center')}><span className={styles.nums}>359</span><br /> Followings</p>
        </div> */}
        {userData?.uid !== uid && isCreator && (
          <div className={styles.gradbtn}>
            <GradientBorder
              onClick={() => setShowModal(true)}
              text="Say Thanks"
            />
          </div>
        )}
        {userData?.uid === uid && isCreator && (
          <Link to="/creator">
            <div className={styles.gradbtn}>
              <GradientBorder text="View Dashboard" />
            </div>
          </Link>
        )}
        <div className={cn(styles.socials, "my-3")}>
          {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="30" />
            </a>
          ))}
        </div>
        <hr className={styles.hr} />
        <div className={styles.note}>
          <i className={cn("bi bi-calendar-week", styles.calendarIcon)}></i>
          Member since {joiningDate}
        </div>
      </div>

      {/* MODAL */}

      <div
        onClick={closeModal}
        className={clsx(styles.modalDiv, showModal ? styles.show : styles.hide)}
      >
        <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
          <p className={styles.cross}>
            <X onClick={closeModal} size={30} weight="bold" />
          </p>
          <div className={styles.thankYouDiv}>
            <h2 className={styles.gradientTitle}>Say Thanks to {name}</h2>
            <p className={styles.lastDesc}>
              We will reach out to you soon! Be sure to check your registered
              email to activate your creator account at HyprClub.{" "}
            </p>

            <p className={styles.addContribution}>Add a Contribution</p>
          </div>
          <form>
            <div
              className={clsx("d-flex align-items-baseline", styles.inputDIV)}
            >
              <div
                className={clsx("d-flex align-items-end", styles.inputAndINR)}
              >
                <input
                  required
                  min={100}
                  onChange={(e) => setThanksValue(e.target.value)}
                  value={thanksValue}
                  className={styles.input}
                  type="number"
                />
                <span className={styles.INR}>INR</span>
              </div>
              <div className={styles.thanksBtn}>
                <GradientBorder
                  onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSayThanks(e)
                  }
                  disable={parseInt(thanksValue) < 100}
                  text="Say Thanks"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default User;
