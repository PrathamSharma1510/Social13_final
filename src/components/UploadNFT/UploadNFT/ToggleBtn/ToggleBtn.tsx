import React from "react"
import styles from "./ToggleBtn.module.css"


const ToggleBtn = () => {
    return (
        <>
            <label className={styles.switch}>
                <input className={styles.input} type="checkbox" />
                <span className={styles.slider} />
            </label>
        </>
    );
};
export default ToggleBtn