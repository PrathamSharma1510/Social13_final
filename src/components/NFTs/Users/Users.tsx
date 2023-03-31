import React from "react";
import cn from "classnames";
import styles from "./Users.module.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface Users {
  className: any;
  items: any;
}

const Users = ({ className, items }: Users) => {
  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.list}>
          {items.map((x: any, index: number) => (
            <Link to={`${x.profile}`}>
              <div className={styles.item} key={index}>
                <Avatar alt="avatar" src={x.avatar} id={styles.avatar} />
                <div className={styles.details}>
                  <div className={styles.position}>{x.position}</div>
                  <div className={styles.name}>{x.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
