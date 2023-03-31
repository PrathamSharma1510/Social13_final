import React from "react";
import styles from "./Landing.module.css";
import PostButton from "../../components/postButton/PostButton";
import Header from "../../components/header/header_before_login/Header";
import { height, style } from "@mui/system";
import { Button } from "react-bootstrap";
import BG_STARS from "./BG_STARS.svg";
import Header_login from "../../components/header/header_after_login/Header_login";
import clsx from "clsx";
import GradientBorder from "../../components/gradientBorderBtn/GradientBorder";
import Slider from "react-slick";
const Landing = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <>
      <div className={styles.mainDiv}>
      {/* <Header /> */}
      <Header_login></Header_login>
      {/* style={{ backgroundImage: `url(${BG_STARS})` }} */}

      <div className={styles.part1}>
        <div className={styles.hypr}>
          <span>
            <a>HYPRCLUB</a>&nbsp;PRESENTS
          </span>
        </div>
        <div className={styles.Revolution}>
          The Next{" "}
          <span>
            Social <br></br> Revolution
          </span>
        </div>
        <div className={styles.SocialNetwork}>
          A Social Network where Creator Economy<br></br> meets the Metaverse.
        </div>
        <Button className={styles.postBtna}>
          {" "}
          <span className={styles.PostbtnTexta}>Get Early Access</span>
        </Button>
        {/* <PostButton btnText='Get Early Access' small={false}></PostButton></div> */}
      </div>
      <div className={styles.buyNFT}>
        <p className={styles.forthefirsttime}>FOR THE FIRST TIME IN INDIA</p>
        <p className={styles.buyNFTwithUPI}>Buy NFTs with UPI.</p>
        <p className={styles.buyNFTdesc}>
          It is no longer difficult or complex to be a part of the metaverse.
          Easily Buy or Sell NFTs through existing transaction methods like UPI,
          <br /> Credit/Debit & BNPL.
        </p>
        <div>
          <p className={styles.paymentSec}>Payments secured through</p>
          <img src="images/razorpay.png" alt="" />
        </div>
        <div>
          <img className={styles.visaImg} src="images/visa.png" alt="" />
          <img
            className={styles.mastercardImg}
            src="images/mastercard.png"
            alt=""
          />
          <img className={styles.upiImg} src="images/upi.png" alt="" />
          <img className={styles.rupayImg} src="images/rupay.png" alt="" />
        </div>

        <img className={styles.nftcards} src="images/nft cards.png" alt="" />
      </div>

      <div className={clsx(styles.creativity)}>
        <h1 className={styles.title}>
          <span className={styles.gradient}>Creativity </span>Meets <br />
          <span className={styles.gradient}> Commerce</span>
        </h1>
        <p className={styles.desc}>
          Create or Join Exclusive Memberships, Buy or Sell Digital & Physical
          Items via Shop, Support your favourite creator through easy One-Time
          Payments.{" "}
        </p>



        
        <div className={styles.desktopcards}>


        <div className={clsx(styles.card, styles.thanks)}>
          <div className={styles.cardInside}>
            <div className={styles.imgDiv}>
              <img
                className={styles.cardImg}
                src="images/Present-1.png"
                alt=""
              />
            </div>
            <h3 className={styles.cardTitle}>Say Thanks</h3>
            <p>
              Encourage your favorite creator to continue their work by
              contributing with ‘Say Thanks’!
            </p>
          </div>
        </div>
        <div className={clsx(styles.card, styles.CreatorStore)}>
          <div className={styles.cardInside}>
            <div className={styles.imgDiv}>
              <img className={styles.cardImg} src="images/Trolly2.png" alt="" />
            </div>
            <h3 className={styles.cardTitle}>Creator Store</h3>
            <p>
              Buy NFTs from your favorite creators and unlock special perks
              curated exclusively!
            </p>
          </div>
        </div>
        <div className={clsx(styles.card, styles.nftWithPerks)}>
          <div className={styles.cardInside}>
            <div className={styles.imgDiv}>
              <img className={styles.cardImg} src="images/Diamond.png" alt="" />
            </div>
            <h3 className={styles.cardTitle}>NFTs With Perks</h3>
            <p>
              Buy NFTs from your favorite creators and unlock special perks
              curated exclusively!
            </p>
          </div>
        </div>
        <div className={clsx(styles.card, styles.membership)}>
          <div className={styles.cardInside}>
            <div className={styles.imgDiv}>
              <img className={styles.cardImg} src="images/shoping.png" alt="" />
            </div>
            <h3 className={styles.cardTitle}>Memberships</h3>
            <p>
              Buy NFTs from your favorite creators and unlock special perks
              curated exclusively!
            </p>
          </div>
        </div>
        </div>
                 
      </div>

    <div className={styles.mobileonly}>


      <Slider {...settings}>
         
         <div>
           <div className={styles.cardmob}>
            <div className={styles.cardInsidemob}>
              <div className={styles.imgDivmob}>
                <img
                  className={styles.cardImgmob}
                  src="images/Present-1.png"
                  alt=""
                />
              </div>
              <h3 className={styles.cardTitle}>Say Thanks</h3>
              <p>
                Encourage your favorite creator to continue their work by
                contributing with ‘Say Thanks’!
              </p>
            </div>
          </div>
        </div>


        <div >
          <div className={styles.cardmob}>
            <div className={styles.cardInsidemob}>
              <div className={styles.imgDivmob}>
                <img className={styles.cardImgmob} src="images/Trolly2.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>Creator Store</h3>
              <p>
                Buy NFTs from your favorite creators and unlock special perks
                curated exclusively!
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.cardmob}>
            <div className={styles.cardInsidemob}>
              <div className={styles.imgDivmob}>
                <img className={styles.cardImgmob} src="images/Diamond.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>NFTs With Perks</h3>
              <p>
                Buy NFTs from your favorite creators and unlock special perks
                curated exclusively!
              </p>
            </div>
          </div>
        </div>


        <div>
          <div className={styles.cardmob}>
            <div className={styles.cardInsidemob}>
              <div className={styles.imgDivmob}>
                <img className={styles.cardImgmob} src="images/shoping.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>Memberships</h3>
              <p>
                Buy NFTs from your favorite creators and unlock special perks
                curated exclusively!
              </p>
            </div>
          </div>
        </div>
      </Slider>
      </div>


      {/* Get your Social GAME going. */}

      <div className={styles.getYourSocialGame}>
        <div className={styles.getSocialGameImgDiv}>
          <img
            className={styles.getSocialGameImg}
            src="images/profil.png"
            alt=""
          />
          <img
            className={styles.getSocialGameImgPhone}
            src="images/profil.png"
            alt=""
          />
        </div>
        <div className={styles.getSocialGameContent}>
          <p className={styles.forthefirsttime}>FOR THE FIRST TIME IN INDIA</p>
          <h1 className={styles.getSocialHeader}>
            Get your Social <span className={styles.game}>GAME</span> going.
          </h1>
          <p className={styles.getSocialDesc}>
            Level up by gaining Experience,<br></br> Get Virtual Currency or
            Gems <br></br>which can be used to purchase<br></br> various items
            in our Store like,<br></br> Power Ups, Boosts and Amazing Deals.{" "}
          </p>

          <div className={styles.button}>
            <Button className={styles.postBtn}>
              <span className={styles.PostbtnText}>Get Early Access</span>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
// width 120
// Trolly2
// height55
export default Landing;
