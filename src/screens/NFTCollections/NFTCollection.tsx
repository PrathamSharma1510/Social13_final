import { Avatar } from '@mui/material';
import { Student } from 'phosphor-react';
import React from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/card/Card';
import GradientBorder from '../../components/gradientBorderBtn/GradientBorder';
import Header_login from '../../components/header/header_after_login/Header_login';
import GradBorder from '../../components/NFTs/GradBorder/GradBorder';
import CollectionCard from '../../components/NFTsCollection/CollectionCard';
import styles from "./NFTCollections.module.css"

const CARD_ITEMS = [
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    },
    {
        title: "Amazing digital art",
        price: "INR 10,753",
        image: "images/nftImg.png",
        creatorImg: "images/pfx.png",
        creatorUsername: 'chootalks',
        url: "/",

    }]

const NFTCollection = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header_login />
            <div className={styles.container}>
                <div className={styles.top} style={{ backgroundImage: `url(images/bg-img.png)` }}>
                    <h1 className={styles.heading}>Choo Talks Collection</h1>
                    <h5 className={styles.pieces}> 24 pieces</h5>
                </div>
                <div className={styles.mid}>
                    <div className={styles.desc_container}>
                        <h3 className={styles.desc_heading}>Description</h3>
                        <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae veritatis laborum quis voluptate sint laboriosam laudantium neque harum fuga optio aut saepe impedit illo quas odio ducimus porro, quasi nesciunt? Facere sit velit pariatur amet provident voluptas laborum nihil esse eligendi dignissimos, sint ullam minima, culpa quaerat architecto beatae blanditiis.</p>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info_head}>
                            <Avatar id={styles.avatar} alt="Creator" src="./images/bassi.png" />
                            <section className={styles.user_info}>
                                <h4 className={styles.name}>ChooTalks</h4>
                                <h6 className={styles.username}>@chootalks</h6>
                            </section>
                        </div>
                        <div className={styles.info_body}>
                            <GradBorder className={styles.button} text="Visit Creator Profile" onClick={() => navigate("#")} />
                            <div className={styles.created}>
                                <img id={styles.calender} src="./images/calenderIcon.svg" alt="" />
                                <p className={styles.date}>Created March 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    {CARD_ITEMS.map((x, index) => (
                        <CollectionCard item={x} key={index} className={styles.card} />
                    ))
                    }
                </div>

            </div>
        </>
    );
};

export default NFTCollection;