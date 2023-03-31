import React from 'react';
import styles from "./Hero_section.module.css"

const Hero_section = () => {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <img className={styles.img} src="./images/Harsh_Gujral.png" alt="harsh_gujaral" />
                <img className={styles.imgmob} src="./images/Harsh_Gujral_mob.png" alt="harsh_gujaral" />
            </div>
            <div className={styles.head}>
                <h2 className={styles.h2}>Launching Exclusive</h2>
                <h1 className={styles.h1}>Harsh Gujral Collection</h1>
            </div>
            <div className={styles.logo}>
                <img id={styles.logoimg} src="./images/hyprlogowhite.png" alt=""/>
            </div>

        </div>
    );
};

export default Hero_section;