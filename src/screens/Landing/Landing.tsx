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
              <a>Social 13</a>&nbsp;PRESENTS
            </span>
          </div>
          <div className={styles.Revolution}>
            Effortlessly find your dream home in <span>Gainesville.</span>
          </div>
          <div className={styles.SocialNetwork}>
            Welcome to the streamlined housing search <br></br> experience in
            Gainesville!
          </div>
          {/* <Button className={styles.postBtna}>
            {" "}
            <span className={styles.PostbtnTexta}>Get Early Access</span>
          </Button> */}
          {/* <PostButton btnText='Get Early Access' small={false}></PostButton></div> */}
        </div>
        <div className={styles.buyNFT}>
          <p className={styles.forthefirsttime}>
            Streamline Your Home Search in Gainesville
          </p>
          <p className={styles.buyNFTwithUPI}>
            Find Your Perfect Home in Gainesville
          </p>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <img
                className={styles.nftcards}
                src="images/housing_landing .jpeg"
                alt=""
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <p className={styles.buyNFTdesc}>
                Finding the perfect home can be a daunting task, but our
                platform is here to make it easy and efficient for everyone. Our
                user-friendly website offers a convenient and dynamic
                experience, making the process of finding Gainesville houses a
                breeze.
              </p>
            </div>
          </div>
        </div>

        <div className={clsx(styles.creativity)}>
          <h1 className={styles.title}>
            <span className={styles.gradient}> Team</span>
          </h1>
          <p className={styles.desc}>
            <a className="text-primary" href="social13.netlify.app">
              Team Website
            </a>
            <p>
              Our team comprises highly skilled individuals with diverse
              expertise in web development, design, and project management. Led
              by Professor Pedro Guillermo, we're dedicated to delivering a
              platform that makes a real difference in the lives of Gainesville
              residents.
            </p>
          </p>

          <div className={styles.desktopcards}>
            <div className={clsx(styles.card, styles.thanks)}>
              <div className={styles.cardInside}>
                <div className={styles.imgDiv}>
                  <img
                    className={styles.cardImg}
                    src="images/kushargra_photo.jpg"
                    alt=""
                  />
                </div>
                <h3 className={styles.cardTitle}>Kushagra Sikka</h3>
                <p>Data Analyst Student at UF.</p>
              </div>
            </div>
            <div className={clsx(styles.card, styles.CreatorStore)}>
              <div className={styles.cardInside}>
                <div className={styles.imgDiv}>
                  <img
                    className={styles.cardImg}
                    src="images/jv_photo.jpg"
                    alt=""
                  />
                </div>
                <h3 className={styles.cardTitle}>Jayavidhi Kumar</h3>
                <p>Ui/UX developer, Student at UF.</p>
              </div>
            </div>
            <div className={clsx(styles.card, styles.nftWithPerks)}>
              <div className={styles.cardInside}>
                <div className={styles.imgDiv}>
                  <img
                    className={styles.cardImg}
                    src="images/pratham_photo.jpeg"
                    alt=""
                  />
                </div>
                <h3 className={styles.cardTitle}> Pratham Sharma</h3>
                <p>Frontend Developer Student at UF.</p>
              </div>
            </div>
            <div className={clsx(styles.card, styles.membership)}>
              <div className={styles.cardInside}>
                <div className={styles.imgDiv}>
                  <img
                    className={styles.cardImg}
                    src="images/archit_photo.jpg"
                    alt=""
                  />
                </div>
                <h3 className={styles.cardTitle}>Archit Mittal</h3>
                <p>Backend Developer Student at UF.</p>
              </div>
            </div>
            <div className={clsx(styles.card, styles.last_person)}>
              <div className={styles.cardInside}>
                <div className={styles.imgDiv}>
                  <img
                    className={styles.cardImg}
                    src="images/jarvis_photo.png"
                    alt=""
                  />
                </div>
                <h3 className={styles.cardTitle}>Jarvis Thuluri</h3>
                <p>Ui/Ux designer Student at UF.</p>
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
                      src="images/kushargra_photo.jpg"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Kushagra Sikka</h3>
                  <p>Data Analyst Student at UF.</p>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.cardmob}>
                <div className={styles.cardInsidemob}>
                  <div className={styles.imgDivmob}>
                    <img
                      className={styles.cardImg}
                      src="images/jv_photo.jpg"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Jayavidhi Kumar</h3>
                  <p>Ui/UX developer, Student at UF.</p>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.cardmob}>
                <div className={styles.cardInsidemob}>
                  <div className={styles.imgDivmob}>
                    <img
                      className={styles.cardImg}
                      src="images/pratham_photo.jpeg"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.cardTitle}> Pratham Sharma</h3>
                  <p>Frontend Developer Student at UF.</p>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.cardmob}>
                <div className={styles.cardInsidemob}>
                  <div className={styles.imgDivmob}>
                    <img
                      className={styles.cardImg}
                      src="images/archit_photo.jpg"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Archit Mittal</h3>
                  <p>Backend Developer Student at UF.</p>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.cardmob}>
                <div className={styles.cardInsidemob}>
                  <div className={styles.imgDivmob}>
                    <img
                      className={styles.cardImg}
                      src="images/jarvis_photo.png"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Jarvis Thuluri</h3>
                  <p>Ui/Ux designer Student at UF.</p>
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
              src="images/house.jpeg"
              alt=""
            />
          </div>
          <div className={styles.getSocialGameContent}>
            <p className={styles.forthefirsttime}>
              Find Your Dream Home Effortlessly
            </p>
            <h1 className={styles.getSocialHeader}>
              Innovative Features and
              <span className={styles.game}>Easy Navigation</span>
            </h1>
            <p className={styles.getSocialDesc}>
              Our platform makes searching for your dream home easy with
              interactive design and user-friendly features. Whether you're a
              student, a professional, or a retiree, our accessible platform is
              here to help you find the perfect home.
            </p>
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
