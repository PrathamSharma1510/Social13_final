import clsx from "clsx";
import { Funnel, X } from "phosphor-react";
import { Range, getTrackBackground } from "react-range";
import React, { useState } from "react";
import styles from "./Explore.module.css";
import GradBorder from "../../NFTs/GradBorder/GradBorder";
import Dropdown from "../../Dropdown/Dropdown";
import ExploreCard from "./ExploreCard/ExploreCard";
import Explore_Card1 from "./ExploreCard/Explore_Card1";
import Items_1 from "../../../Items_house.json";
const dateOptions = ["Recently added", "Long Added"];
const navLinks = ["All", "Subleasing"];
const priceOptions = ["5", "4", "3", "2", "1"];
const likesOptions = ["5", "4", "3", "2", "1"];
const creatorOptions = ["High Rating", "All", "Most liked"];

interface explore {
  items: any;
}

// const card_items = [
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
//   {
//     title: "Amazing digital art",
//     price: "INR 10,753",
//     image: "images/nftImg.png",
//     creatorImg: "images/pfx.png",
//     creatorUsername: "chootalks",
//     url: "/",
//   },
// ];

const Explore = ({ items }: explore) => {
  const [date, setDate] = useState(dateOptions[0]);
  const [navlinks, setNavlinks] = useState(navLinks[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState(priceOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [values, setValues] = useState([2000]);
  const STEP = 50;
  const MIN = 0.1;
  const MAX = 2000;
  // const STEP = 10;
  // const MIN = 250;
  // const MAX = 2000;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.grad}>Find Your Perfect Home with Ease </h2>
      <div className={styles.head}>
        <div className={styles.Navbar}>
          {navLinks.map((x: any, index: number) => (
            <button
              className={clsx(styles.btn, {
                [styles.active]: index === activeIndex,
              })}
              onClick={() => setActiveIndex(index)}
            >
              {x}
            </button>
          ))}
        </div>

        <button
          className={clsx(styles.filter, { [styles.active]: visible })}
          onClick={() => setVisible(!visible)}
        >
          <p className={styles.filter_text}>Filter</p>
          <div className={styles.toggle}>
            {visible ? (
              <X size={16} id={styles.X} />
            ) : (
              <Funnel size={16} id={styles.funnel} />
            )}
          </div>
        </button>
      </div>
      <div className={clsx(styles.filters, { [styles.active]: visible })}>
        <div className={styles.sorting}>
          <div className={clsx(styles.cell, styles.tabletView)}>
            <div className={styles.label}>Category</div>
            <Dropdown
              className={styles.dropdown_1}
              value={navlinks}
              setValue={setNavlinks}
              options={navLinks}
              height=" max(min(3.35vw,48px),40px)"
            />
          </div>
          <div className={styles.cell}>
            <div className={styles.label}>Overall Rating</div>
            <Dropdown
              className={styles.dropdown_1}
              value={price}
              setValue={setPrice}
              options={priceOptions}
              height=" max(min(3.35vw,48px),40px)"
            />
          </div>
          <div className={styles.cell}>
            <div className={styles.label}>Safety Rating</div>
            <Dropdown
              className={styles.dropdown_1}
              value={likes}
              setValue={setLikes}
              options={likesOptions}
              height=" max(min(3.35vw,48px),40px)"
            />
          </div>
          {/* <div className={styles.cell}>
            <div className={styles.label}>creator</div>
            <Dropdown
              className={styles.dropdown_1}
              value={creator}
              setValue={setCreator}
              options={creatorOptions}
              height=" max(min(3.35vw,48px),40px)"
            />
          </div> */}
          <div className={styles.cell}>
            <div className={styles.label}>Price range</div>
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "27px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "8px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values,
                        colors: ["#3772FF", "#E6E8EC"],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#3772FF",
                    border: "4px solid #FCFCFD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-33px",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontFamily: "Poppins",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      backgroundColor: "#141416",
                    }}
                  >
                    {values[0].toFixed(1)}
                  </div>
                </div>
              )}
            />
            <div className={styles.scale}>
              <div className={styles.number}>250 USD</div>
              <div className={styles.number}>2000 USD</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.grid}>
          {/* {card_items?.map((x: any, index: any) => (
            <ExploreCard className={styles.card} items={} key={index} />
          ))} */}
          {activeIndex === 1 &&
            items?.map((x: any, index: any) => (
              <ExploreCard className={styles.card} items={x} key={index} />
            ))}
          {activeIndex === 0 &&
            Items_1?.filter((x) => Number(x.security_rating) <= Number(likes))
              .filter((x) => Number(x.customer_rating) <= Number(price))
              .filter((x) => Number(x.rent) <= Number(values))
              .map((x: any, index: any) => (
                <Explore_Card1 className={styles.card} items={x} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
