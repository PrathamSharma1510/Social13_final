import React, { useState } from "react"

import styles from "../../../screens/NFTs/NFTS.module.css";


const ReadMore = ({ children }: any) => {
    const text = children;
    const [isView, setIsView] = useState(true);
    const toggleView = () => {
        setIsView(!isView);
    };
    return (
        <>
            <p className={styles.info}>
                {isView ? text.slice(0, 110) : text}
                <span onClick={toggleView} className={styles.infoMore}>
                    {isView ? "..." : " "}
                </span>
            </p>
            <span onClick={toggleView} className={styles.readHide}>
                {isView ? "View more" : " View less"}
            </span>
        </>
    );
};

export default ReadMore
