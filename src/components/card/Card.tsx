import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import clsx from "clsx";
import PostButton from "../postButton/PostButton";

const Card = ({ className, item, created }: any) => {
  return (
    <div className={cn(styles.card, className)}>
      {/* <Link className={styles.link} to={item.url}> */}
      <div className={styles.body}>
        <div className={styles.line}>
          <div className={clsx(styles.imgAndBtn, "position-relative w-100")}>
            {item.video ? (
              <video
                id="video"
                className={styles.image}
                src={item.nftMedia}
                autoPlay
                loop
              />
            ) : (
              <img className={styles.image} src={item.nftMedia} alt="NFT" />
            )}
            {true && (
              <span
                className={clsx(
                  item.state === "PENDING" && styles.underRev,
                  item.state === "REJECTED" && styles.rejected,
                  item.state === "APPROVED" && styles.approved
                )}
              >
                {item.state}
              </span>
            )}
          </div>
          <div className={styles.title}>{item.title}</div>
          <div
            className={clsx(
              "d-flex align-items-center justify-content-between w-100 mt-2"
            )}
          >
            <div className={clsx("d-flex align-items-center")}>
              <img
                className={styles.creatorImg}
                src={item.creatorImg || "/images/content/avatar-big.jpg"}
                alt=""
              />
              <div className={styles.ownerAndUsername}>
                <p className={styles.owner}>Owner</p>
                <p className={styles.username}>@{item.creatorUsername}</p>
              </div>
            </div>
            <div className={styles.price}>
              <span className={styles.pricetxt}>INR {item.price}</span>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Card;
