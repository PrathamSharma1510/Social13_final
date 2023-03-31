import React from "react";
import cn from "classnames";
import styles from "./followers.module.css";


interface Item {
    name: string,
    counter: string,
    avatar: string,
    url: string,
    buttonClass: string,
    buttonContent: string,
    gallery: string[]
}

interface FollowersType{
    className: string,
    items: Item[]
}

const Followers = ({ className, items }:FollowersType) => {
  return (
    <div className={cn(styles.followers, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.follower}>
              <div className={styles.avatar}>
                <img src={x.avatar} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>{x.name}</div>
                <div className={styles.counter}>{x.counter}</div>
                <a
                  className={cn(
                    { "button-small": x.buttonClass === "blue" },
                    {
                      "button-stroke button-small": x.buttonClass === "stroke",
                    },
                    styles.button
                  )}
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {x.buttonContent}
                </a>
              </div>
            </div>
            <div className={styles.wrap}>
              <div className={styles.gallery}>
                {x.gallery.map((x, index) => (
                  <div className={styles.preview} key={index}>
                    <img src={x} alt="Follower" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
