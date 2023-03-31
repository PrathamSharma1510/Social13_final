import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./PreviewNFT.module.css";
import clsx from "clsx";
import PostButton from "../../postButton/PostButton";




const PreviewNFT = () => {

    return (
        <>
            <div className={styles.wrapper}>
                <span className={styles.span} >Preview</span>
                <div className={styles.card}>

                    {/* <Link className={styles.link} to={item.url}> */}
                    <div className={styles.body}>
                        <div className={styles.line}>
                            <div className={clsx(styles.imgAndBtn, 'position-relative w-100')}>
                                <img className={styles.image} src="images/createdImg.png" alt="" />

                                <div className={styles.btn}>
                                    <PostButton small={true} btnText="Buy Now" />
                                </div>

                            </div>
                            <div className={styles.title}>European Themed Collage</div>
                            <div className={styles.desc}>Classic collage capturing the essence of Europian fashion.</div>
                            <div className={styles.Cost}>
                                <div className={styles.price}>10,753 INR</div>
                                <div className={styles.stock}>In Stock</div>
                            </div>
                        </div>
                    </div>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
};

export default PreviewNFT;
