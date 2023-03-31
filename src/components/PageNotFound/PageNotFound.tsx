import React from 'react';
import styles from "./PageNotFound.module.css"
import {useNavigate} from  "react-router-dom"

const PageNotFound = () => {
    const navigate=useNavigate();
    return (
        <div className={styles.container} style={{backgroundImage:`url(images/error.webp)`}}>
            <div className={styles.text}>
            <h1 className={styles.h1}>Whoops!</h1>
            <p className={styles.p}>Sorry the Page you Are Looking for doesn't exist.</p>
            <button className={styles.btn} onClick={()=>navigate("/")}>Go back</button>
            </div>
            <div className={styles.image}>
                {/* <img src="./images/error.webp" alt=""/> */}
            </div>
            
        </div>
    );
};

export default PageNotFound;