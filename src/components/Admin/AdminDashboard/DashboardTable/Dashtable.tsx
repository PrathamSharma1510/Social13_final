import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashtable.module.css";

const Content = [
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Sucess",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
  {
    product: "Homegrown Tulips",
    date: "21/01/2022",
    id: "HYPR9459207532",
    status: "Success",
    color: "#95FF63",
    price: "INR 46,450.00",
    to: "",
  },
];
const Dashtable = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Transaction History</h2>
      <table className={styles.table}>
        <tr className={styles.head}>
          <th className={styles.heading}>Product</th>
          <th className={styles.heading}>Date</th>
          <th className={styles.heading}>Transaction ID</th>
          <th className={styles.heading}>Status</th>
          <th className={styles.heading}>Order Total</th>
        </tr>
        {Content.map((e) => (
          <tr className={styles.body} key={e.id}>
            <td className={styles.items}>
              <Link to={e.to} className={styles.link}>
                {" "}
                {e.product}{" "}
              </Link>
            </td>
            <td className={styles.items}> {e.date}</td>
            <td className={styles.items}> {e.id}</td>
            <td className={styles.items}>
              {" "}
              <span
                className={styles.circle}
                style={{ backgroundColor: e.color }}
              />
              {e.status}
            </td>
            <td className={styles.items}> {e.price} </td>
          </tr>
        ))}
      </table>
      <button type="submit" className={styles.btn}>
        <p className={styles.p}>Load More</p>
      </button>
    </div>
  );
};

export default Dashtable;
